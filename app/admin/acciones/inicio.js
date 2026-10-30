"use server";

import { revalidatePath } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { requerirAdminAccion } from "@/lib/admin/guardia";
import {
  normalizarUrl,
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

function revalidarInicio() {
  revalidatePath("/admin/inicio");
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

function datosTarjeta(formData) {
  return {
    nombre_marca: obtenerTexto(formData, "nombre_marca", {
      etiqueta: "nombre de la marca",
      requerido: true,
      max: 120,
    }),
    url_imagen: normalizarUrl(
      obtenerTexto(formData, "url_imagen", {
        etiqueta: "imagen",
        requerido: true,
        max: 2000,
      }),
      { permitirVacio: false, etiqueta: "imagen" }
    ),
    megustas: obtenerTexto(formData, "megustas", {
      etiqueta: "me gustas",
      max: 50,
      defecto: "0",
    }),
    comentarios: obtenerTexto(formData, "comentarios", {
      etiqueta: "comentarios",
      max: 50,
      defecto: "0",
    }),
  };
}

export async function guardarSeccionInicio(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    const id = obtenerUuid(formData, "id", {
      requerido: false,
      etiqueta: "sección de inicio",
    });

    const payload = {
      etiqueta_superior: obtenerTexto(formData, "etiqueta_superior", {
        etiqueta: "etiqueta superior",
        requerido: true,
        max: 200,
      }),
      titulo_principal: obtenerTexto(formData, "titulo_principal", {
        etiqueta: "título principal",
        requerido: true,
        max: 600,
      }),
      texto_descripcion: obtenerTexto(formData, "texto_descripcion", {
        etiqueta: "texto descriptivo",
        max: 2500,
      }),
      texto_boton_principal: obtenerTexto(formData, "texto_boton_principal", {
        etiqueta: "texto del botón principal",
        requerido: true,
        max: 120,
      }),
      url_boton_principal:
        normalizarUrl(
          obtenerTexto(formData, "url_boton_principal", {
            etiqueta: "URL del botón principal",
            max: 2000,
          }),
          { etiqueta: "URL del botón principal" }
        ) || "#contacto",
      texto_boton_secundario: obtenerTexto(
        formData,
        "texto_boton_secundario",
        {
          etiqueta: "texto del botón secundario",
          max: 120,
        }
      ),
      url_boton_secundario:
        normalizarUrl(
          obtenerTexto(formData, "url_boton_secundario", {
            etiqueta: "URL del botón secundario",
            max: 2000,
          }),
          { etiqueta: "URL del botón secundario" }
        ) || "#nicho",
    };

    const { error } = id
      ? await supabase.from("seccion_inicio").update(payload).eq("id", id)
      : await supabase.from("seccion_inicio").insert(payload);

    if (error) throw new Error(error.message);

    revalidarInicio();
    return {
      ok: true,
      mensaje: "La sección de inicio se guardó correctamente.",
    };
  } catch (error) {
    return respuestaError(error);
  }
}

export async function crearTarjetaInicio(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();

    const { data: ultima, error: errorOrden } = await supabase
      .from("tarjetas_flotantes_inicio")
      .select("orden")
      .order("orden", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (errorOrden) throw new Error(errorOrden.message);

    const { error } = await supabase.from("tarjetas_flotantes_inicio").insert({
      ...datosTarjeta(formData),
      orden: (ultima?.orden ?? -1) + 1,
    });

    if (error) throw new Error(error.message);

    revalidarInicio();
    return { ok: true, mensaje: "Tarjeta agregada correctamente." };
  } catch (error) {
    return respuestaError(error);
  }
}

export async function actualizarTarjetaInicio(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    const id = obtenerUuid(formData, "id", { etiqueta: "tarjeta" });

    const { error } = await supabase
      .from("tarjetas_flotantes_inicio")
      .update(datosTarjeta(formData))
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidarInicio();
    return { ok: true, mensaje: "Tarjeta actualizada correctamente." };
  } catch (error) {
    return respuestaError(error);
  }
}

export async function eliminarTarjetaInicio(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "tarjeta" });

  const { error } = await supabase
    .from("tarjetas_flotantes_inicio")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidarInicio();
}

export async function moverTarjetaInicio(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "tarjeta" });
  const direccion = obtenerDireccion(formData);

  const { data: tarjetas, error } = await supabase
    .from("tarjetas_flotantes_inicio")
    .select("id, orden")
    .order("orden", { ascending: true });

  if (error) throw new Error(error.message);

  const nuevaLista = moverEnLista(tarjetas || [], id, direccion);
  if (!nuevaLista) return;

  await guardarOrden(supabase, "tarjetas_flotantes_inicio", nuevaLista);
  revalidarInicio();
}
