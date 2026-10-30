"use server";

import { revalidatePath } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { requerirAdminAccion } from "@/lib/admin/guardia";
import {
  normalizarUrl,
  obtenerIconoPlan,
  obtenerListaJson,
  obtenerTexto,
  obtenerTextoOpcional,
  obtenerUuid,
} from "@/lib/admin/validacion";
import { guardarOrden, moverEnLista } from "@/lib/admin/orden";

function respuestaError(error) {
  return {
    ok: false,
    error: error?.message || "No se pudo completar la operación.",
  };
}

function revalidarPlanes() {
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

function datosPlan(formData) {
  return {
    nombre_plan: obtenerTexto(formData, "nombre_plan", {
      etiqueta: "nombre del plan",
      requerido: true,
      max: 160,
    }),
    subtitulo: obtenerTexto(formData, "subtitulo", {
      etiqueta: "subtítulo",
      requerido: true,
      max: 300,
    }),
    caracteristicas: obtenerListaJson(formData, "caracteristicas", {
      maxElementos: 40,
      maxLongitud: 600,
    }),
    nota_destacada: obtenerTextoOpcional(formData, "nota_destacada", {
      etiqueta: "nota destacada",
      max: 2500,
    }),
    url_boton_whatsapp: normalizarUrl(
      obtenerTexto(formData, "url_boton_whatsapp", {
        etiqueta: "URL de WhatsApp",
        requerido: true,
        max: 2000,
      }),
      { permitirVacio: false, etiqueta: "URL de WhatsApp" }
    ),
    icono: obtenerIconoPlan(formData),
  };
}

export async function guardarPlan(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    const id = obtenerUuid(formData, "id", {
      requerido: false,
      etiqueta: "plan",
    });

    const payload = datosPlan(formData);

    if (id) {
      const { error } = await supabase
        .from("planes_redes")
        .update(payload)
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data: ultimo, error: errorOrden } = await supabase
        .from("planes_redes")
        .select("orden")
        .order("orden", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (errorOrden) throw new Error(errorOrden.message);

      const { error } = await supabase.from("planes_redes").insert({
        ...payload,
        orden: (ultimo?.orden ?? -1) + 1,
      });
      if (error) throw new Error(error.message);
    }

    revalidarPlanes();
    return {
      ok: true,
      mensaje: id ? "Plan actualizado correctamente." : "Plan creado correctamente.",
    };
  } catch (error) {
    return respuestaError(error);
  }
}

export async function eliminarPlan(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "plan" });

  const { error } = await supabase.from("planes_redes").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidarPlanes();
}

export async function moverPlan(formData) {
  await requerirAdminAccion();
  const supabase = crearClienteServidor();
  const id = obtenerUuid(formData, "id", { etiqueta: "plan" });
  const direccion = obtenerDireccion(formData);

  const { data: planes, error } = await supabase
    .from("planes_redes")
    .select("id, orden")
    .order("orden", { ascending: true });

  if (error) throw new Error(error.message);

  const nuevaLista = moverEnLista(planes || [], id, direccion);
  if (!nuevaLista) return;

  await guardarOrden(supabase, "planes_redes", nuevaLista);
  revalidarPlanes();
}
