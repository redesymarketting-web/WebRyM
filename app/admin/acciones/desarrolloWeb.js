"use server";

import { revalidatePath } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { requerirAdminAccion } from "@/lib/admin/guardia";
import {
  normalizarUrl,
  obtenerIconoWeb,
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

function revalidarDesarrolloWeb() {
  revalidatePath("/admin/que-hacemos");
  revalidatePath("/admin", "layout");
  revalidatePath("/");
}

function obtenerDireccion(formData) {
  const direccion = String(formData.get("direccion") || "");
  if (!["subir", "bajar"].includes(direccion)) {
    throw new Error("La dirección de movimiento no es válida.");
  }
  return direccion;
}

function datosServicio(formData) {
  return {
    icono: obtenerIconoWeb(formData),
    titulo: obtenerTexto(formData, "titulo", {
      etiqueta: "título del servicio",
      requerido: true,
      max: 180,
    }),
    descripcion: obtenerTexto(formData, "descripcion", {
      etiqueta: "descripción del servicio",
      requerido: true,
      max: 2500,
    }),
  };
}

function datosProyecto(formData) {
  return {
    nombre: obtenerTexto(formData, "nombre", {
      etiqueta: "nombre del proyecto",
      requerido: true,
      max: 180,
    }),
    descripcion: obtenerTexto(formData, "descripcion", {
      etiqueta: "descripción del proyecto",
      requerido: true,
      max: 2500,
    }),
    url_sitio: normalizarUrl(
      obtenerTexto(formData, "url_sitio", {
        etiqueta: "URL del sitio",
        requerido: true,
        max: 2000,
      }),
      { permitirVacio: false, etiqueta: "URL del sitio" }
    ),
  };
}

export async function guardarServicioWeb(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    const id = obtenerUuid(formData, "id", {
      requerido: false,
      etiqueta: "servicio web",
    });
    const payload = datosServicio(formData);

    if (id) {
      const { error } = await supabase
        .from("servicios_web")
        .update(payload)
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data: ultimo, error: errorOrden } = await supabase
        .from("servicios_web")
        .select("orden")
        .order("orden", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (errorOrden) throw new Error(errorOrden.message);

      const { error } = await supabase.from("servicios_web").insert({
        ...payload,
        orden: (ultimo?.orden ?? -1) + 1,
      });
      if (error) throw new Error(error.message);
    }

    revalidarDesarrolloWeb();
    return {
      ok: true,
      mensaje: id
        ? "Servicio actualizado correctamente."
        : "Servicio agregado correctamente.",
    };
  } catch (error) {
    return respuestaError(error);
  }
}

export async function eliminarServicioWeb(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "servicio web" });

  const { error } = await supabase.from("servicios_web").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidarDesarrolloWeb();
}

export async function moverServicioWeb(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "servicio web" });
  const direccion = obtenerDireccion(formData);

  const { data: servicios, error } = await supabase
    .from("servicios_web")
    .select("id, orden")
    .order("orden", { ascending: true });

  if (error) throw new Error(error.message);

  const nuevaLista = moverEnLista(servicios || [], id, direccion);
  if (!nuevaLista) return;

  await guardarOrden(supabase, "servicios_web", nuevaLista);
  revalidarDesarrolloWeb();
}

export async function guardarProyectoWeb(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    const id = obtenerUuid(formData, "id", {
      requerido: false,
      etiqueta: "proyecto web",
    });
    const payload = datosProyecto(formData);

    if (id) {
      const { error } = await supabase
        .from("proyectos_web")
        .update(payload)
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data: ultimo, error: errorOrden } = await supabase
        .from("proyectos_web")
        .select("orden")
        .order("orden", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (errorOrden) throw new Error(errorOrden.message);

      const { error } = await supabase.from("proyectos_web").insert({
        ...payload,
        orden: (ultimo?.orden ?? -1) + 1,
      });
      if (error) throw new Error(error.message);
    }

    revalidarDesarrolloWeb();
    return {
      ok: true,
      mensaje: id
        ? "Proyecto actualizado correctamente."
        : "Proyecto agregado correctamente.",
    };
  } catch (error) {
    return respuestaError(error);
  }
}

export async function eliminarProyectoWeb(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "proyecto web" });

  const { error } = await supabase.from("proyectos_web").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidarDesarrolloWeb();
}

export async function moverProyectoWeb(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "proyecto web" });
  const direccion = obtenerDireccion(formData);

  const { data: proyectos, error } = await supabase
    .from("proyectos_web")
    .select("id, orden")
    .order("orden", { ascending: true });

  if (error) throw new Error(error.message);

  const nuevaLista = moverEnLista(proyectos || [], id, direccion);
  if (!nuevaLista) return;

  await guardarOrden(supabase, "proyectos_web", nuevaLista);
  revalidarDesarrolloWeb();
}
