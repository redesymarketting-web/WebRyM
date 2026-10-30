"use server";

import { unstable_noStore as noStore } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { configuracionSupabase } from "@/lib/supabase/config";

const ERROR_CONFIGURACION =
  "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.";

export async function obtenerPlanesRedesPublicos() {
  noStore();

  const { configurado } = configuracionSupabase();

  if (!configurado) {
    return { datos: [], error: ERROR_CONFIGURACION };
  }

  try {
    const supabase = crearClienteServidor();
    const { data, error } = await supabase
      .from("planes_redes")
      .select(
        "id, nombre_plan, subtitulo, caracteristicas, nota_destacada, url_boton_whatsapp, icono, orden"
      )
      .order("orden", { ascending: true });

    if (error) throw new Error(error.message);

    return { datos: data || [], error: null };
  } catch (error) {
    return {
      datos: [],
      error: error?.message || "No se pudieron cargar los planes.",
    };
  }
}

export async function obtenerDesarrolloWebPublico() {
  noStore();

  const { configurado } = configuracionSupabase();

  if (!configurado) {
    return {
      datos: { servicios: [], proyectos: [] },
      error: ERROR_CONFIGURACION,
    };
  }

  try {
    const supabase = crearClienteServidor();
    const [servicios, proyectos] = await Promise.all([
      supabase
        .from("servicios_web")
        .select("id, icono, titulo, descripcion, orden")
        .order("orden", { ascending: true }),
      supabase
        .from("proyectos_web")
        .select("id, nombre, descripcion, url_sitio, orden")
        .order("orden", { ascending: true }),
    ]);

    const primerError = servicios.error || proyectos.error;
    if (primerError) throw new Error(primerError.message);

    return {
      datos: {
        servicios: servicios.data || [],
        proyectos: proyectos.data || [],
      },
      error: null,
    };
  } catch (error) {
    return {
      datos: { servicios: [], proyectos: [] },
      error:
        error?.message || "No se pudo cargar el contenido de Desarrollo Web.",
    };
  }
}
