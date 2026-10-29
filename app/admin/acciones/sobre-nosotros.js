"use server";

import { revalidatePath } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { requerirAdminAccion } from "@/lib/admin/guardia";
import {
  normalizarUrl,
  obtenerTexto,
  obtenerUuid,
} from "@/lib/admin/validacion";

function respuestaError(error) {
  return {
    ok: false,
    error: error?.message || "No se pudo completar la operación.",
  };
}

export async function guardarSobreNosotros(prevState, formData) {
  try {
    await requerirAdminAccion();
    const supabase = crearClienteServidor();
    const id = obtenerUuid(formData, "id", {
      requerido: false,
      etiqueta: "sobre nosotros",
    });

    const payload = {
      url_imagen_pareja: normalizarUrl(
        obtenerTexto(formData, "url_imagen_pareja", {
          etiqueta: "imagen de la pareja",
          requerido: true,
          max: 2000,
        }),
        { permitirVacio: false, etiqueta: "imagen de la pareja" }
      ),
      url_isologo_flotante: normalizarUrl(
        obtenerTexto(formData, "url_isologo_flotante", {
          etiqueta: "isologo flotante",
          requerido: true,
          max: 2000,
        }),
        { permitirVacio: false, etiqueta: "isologo flotante" }
      ),
      titulo_porque_naranja: obtenerTexto(formData, "titulo_porque_naranja", {
        etiqueta: "título de por qué somos naranja",
        requerido: true,
        max: 250,
      }),
      texto_porque_naranja: obtenerTexto(formData, "texto_porque_naranja", {
        etiqueta: "texto de por qué somos naranja",
        requerido: true,
        max: 4000,
      }),
      titulo_sobre_nosotros: obtenerTexto(formData, "titulo_sobre_nosotros", {
        etiqueta: "título de sobre nosotros",
        requerido: true,
        max: 250,
      }),
      texto_sobre_nosotros: obtenerTexto(formData, "texto_sobre_nosotros", {
        etiqueta: "texto de sobre nosotros",
        requerido: true,
        max: 6000,
      }),
      descripcion_marux: obtenerTexto(formData, "descripcion_marux", {
        etiqueta: "descripción de Marux",
        requerido: true,
        max: 3000,
      }),
      descripcion_doug: obtenerTexto(formData, "descripcion_doug", {
        etiqueta: "descripción de Doug",
        requerido: true,
        max: 3000,
      }),
      texto_enfasis_venezolanos: obtenerTexto(
        formData,
        "texto_enfasis_venezolanos",
        {
          etiqueta: "texto de énfasis venezolano",
          requerido: true,
          max: 3000,
        }
      ),
      valor_marcas_potenciadas: obtenerTexto(
        formData,
        "valor_marcas_potenciadas",
        {
          etiqueta: "marcas potenciadas",
          requerido: true,
          max: 30,
        }
      ),
      valor_proyectos_disenados: obtenerTexto(
        formData,
        "valor_proyectos_disenados",
        {
          etiqueta: "proyectos diseñados",
          requerido: true,
          max: 30,
        }
      ),
      valor_anos_estrategia: obtenerTexto(formData, "valor_anos_estrategia", {
        etiqueta: "años de estrategia",
        requerido: true,
        max: 30,
      }),
      firma_texto: obtenerTexto(formData, "firma_texto", {
        etiqueta: "firma",
        requerido: true,
        max: 180,
      }),
      firma_subtitulo: obtenerTexto(formData, "firma_subtitulo", {
        etiqueta: "subtítulo de la firma",
        requerido: true,
        max: 180,
      }),
      slogan: obtenerTexto(formData, "slogan", {
        etiqueta: "slogan",
        requerido: true,
        max: 250,
      }),
    };

    const { error } = id
      ? await supabase
          .from("sobre_nosotros")
          .update(payload)
          .eq("id", id)
      : await supabase.from("sobre_nosotros").insert(payload);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/sobre-nosotros");
    revalidatePath("/admin", "layout");

    return {
      ok: true,
      mensaje: "La sección Sobre Nosotros se guardó correctamente.",
    };
  } catch (error) {
    return respuestaError(error);
  }
}
