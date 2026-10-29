"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { requerirAdminAccion } from "@/lib/admin/guardia";
import {
  normalizarUrl,
  obtenerColor,
  obtenerIconoNicho,
  obtenerListaJson,
  obtenerSlug,
  obtenerTexto,
  obtenerUuid,
} from "@/lib/admin/validacion";
import { guardarOrden, moverEnLista } from "@/lib/admin/orden";

function respuestaError(error) {
  return {
    ok: false,
    error: error?.message || "No se pudo completar la operación.",
  };
}

function revalidarNichos(nichoId) {
  revalidatePath("/admin/nichos");
  if (nichoId) revalidatePath(`/admin/nichos/${nichoId}`);
  revalidatePath("/admin", "layout");
}

function obtenerDireccion(formData) {
  const direccion = String(formData.get("direccion") || "");
  if (!["subir", "bajar"].includes(direccion)) {
    throw new Error("La dirección de movimiento no es válida.");
  }
  return direccion;
}

function urlOpcional(formData, campo, etiqueta) {
  return normalizarUrl(
    obtenerTexto(formData, campo, { etiqueta, max: 2000 }),
    { etiqueta }
  );
}

function datosNicho(formData) {
  return {
    slug: obtenerSlug(formData),
    titulo_tarjeta: obtenerTexto(formData, "titulo_tarjeta", {
      etiqueta: "título de la tarjeta",
      requerido: true,
      max: 120,
    }),
    icono: obtenerIconoNicho(formData),
    url_imagen_tarjeta: normalizarUrl(
      obtenerTexto(formData, "url_imagen_tarjeta", {
        etiqueta: "imagen de la tarjeta",
        requerido: true,
        max: 2000,
      }),
      { permitirVacio: false, etiqueta: "imagen de la tarjeta" }
    ),
    etiqueta_categoria: obtenerTexto(formData, "etiqueta_categoria", {
      etiqueta: "etiqueta de categoría",
      requerido: true,
      max: 120,
    }),
    titulo_descripcion: obtenerTexto(formData, "titulo_descripcion", {
      etiqueta: "título descriptivo",
      requerido: true,
      max: 250,
    }),
    texto_descripcion: obtenerTexto(formData, "texto_descripcion", {
      etiqueta: "texto descriptivo",
      requerido: true,
      max: 2500,
    }),
    etiquetas_destacadas: obtenerListaJson(formData, "etiquetas_destacadas", {
      maxElementos: 12,
      maxLongitud: 120,
    }),
    url_imagen_feed_1: urlOpcional(formData, "url_imagen_feed_1", "imagen de feed 1"),
    url_imagen_feed_2: urlOpcional(formData, "url_imagen_feed_2", "imagen de feed 2"),
    url_imagen_feed_3: urlOpcional(formData, "url_imagen_feed_3", "imagen de feed 3"),
    color_primario: obtenerColor(formData, "color_primario"),
  };
}

function datosCliente(formData) {
  return {
    nicho_id: obtenerUuid(formData, "nicho_id", {
      etiqueta: "nicho",
    }),
    nombre_cliente: obtenerTexto(formData, "nombre_cliente", {
      etiqueta: "nombre del cliente",
      requerido: true,
      max: 180,
    }),
    descripcion_cliente: obtenerTexto(formData, "descripcion_cliente", {
      etiqueta: "descripción del cliente",
      max: 2500,
    }),
    url_sitio: urlOpcional(formData, "url_sitio", "URL del sitio"),
    estado: obtenerTexto(formData, "estado", {
      etiqueta: "estado",
      max: 80,
      defecto: "SITIO EN VIVO",
    }) || "SITIO EN VIVO",
  };
}

export async function guardarNicho(prevState, formData) {
  let nuevoId = null;
  let id = null;

  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    id = obtenerUuid(formData, "id", {
      requerido: false,
      etiqueta: "nicho",
    });

    const payload = datosNicho(formData);

    if (id) {
      const { error } = await supabase
        .from("nichos")
        .update(payload)
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data: ultimo, error: errorOrden } = await supabase
        .from("nichos")
        .select("orden")
        .order("orden", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (errorOrden) throw new Error(errorOrden.message);

      const { data, error } = await supabase
        .from("nichos")
        .insert({ ...payload, orden: (ultimo?.orden ?? -1) + 1 })
        .select("id")
        .single();

      if (error) throw new Error(error.message);
      nuevoId = data.id;
    }

    revalidarNichos(id || nuevoId);
  } catch (error) {
    if (String(error?.message || "").includes("duplicate key")) {
      return {
        ok: false,
        error: "Ya existe un nicho con ese slug. Usa un slug diferente.",
      };
    }
    return respuestaError(error);
  }

  if (nuevoId) {
    redirect(`/admin/nichos/${nuevoId}`);
  }

  return { ok: true, mensaje: "Nicho actualizado correctamente." };
}

export async function eliminarNicho(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "nicho" });

  const { error } = await supabase.from("nichos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidarNichos(id);
}

export async function moverNicho(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "nicho" });
  const direccion = obtenerDireccion(formData);

  const { data: nichos, error } = await supabase
    .from("nichos")
    .select("id, orden")
    .order("orden", { ascending: true });

  if (error) throw new Error(error.message);

  const nuevaLista = moverEnLista(nichos || [], id, direccion);
  if (!nuevaLista) return;

  await guardarOrden(supabase, "nichos", nuevaLista);
  revalidarNichos();
}

export async function guardarClienteNicho(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    const id = obtenerUuid(formData, "id", {
      requerido: false,
      etiqueta: "cliente",
    });

    const payload = datosCliente(formData);

    if (id) {
      const { error } = await supabase
        .from("clientes_nicho")
        .update(payload)
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data: ultimo, error: errorOrden } = await supabase
        .from("clientes_nicho")
        .select("orden")
        .eq("nicho_id", payload.nicho_id)
        .order("orden", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (errorOrden) throw new Error(errorOrden.message);

      const { error } = await supabase.from("clientes_nicho").insert({
        ...payload,
        orden: (ultimo?.orden ?? -1) + 1,
      });
      if (error) throw new Error(error.message);
    }

    revalidarNichos(payload.nicho_id);
    return {
      ok: true,
      mensaje: id
        ? "Cliente actualizado correctamente."
        : "Cliente agregado correctamente.",
    };
  } catch (error) {
    return respuestaError(error);
  }
}

export async function eliminarClienteNicho(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "cliente" });
  const nichoId = obtenerUuid(formData, "nicho_id", { etiqueta: "nicho" });

  const { error } = await supabase.from("clientes_nicho").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidarNichos(nichoId);
}

export async function moverClienteNicho(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "cliente" });
  const nichoId = obtenerUuid(formData, "nicho_id", { etiqueta: "nicho" });
  const direccion = obtenerDireccion(formData);

  const { data: clientes, error } = await supabase
    .from("clientes_nicho")
    .select("id, orden")
    .eq("nicho_id", nichoId)
    .order("orden", { ascending: true });

  if (error) throw new Error(error.message);

  const nuevaLista = moverEnLista(clientes || [], id, direccion);
  if (!nuevaLista) return;

  await guardarOrden(supabase, "clientes_nicho", nuevaLista);
  revalidarNichos(nichoId);
}
