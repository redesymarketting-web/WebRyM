import { unstable_noStore as noStore } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { configuracionSupabase } from "@/lib/supabase/config";

const ERROR_CONFIGURACION =
  "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.";

const CAMPOS_INICIO =
  "etiqueta_superior, titulo_principal, texto_descripcion, texto_boton_principal, url_boton_principal, texto_boton_secundario, url_boton_secundario";

const CAMPOS_TARJETA =
  "id, nombre_marca, url_imagen, megustas, comentarios, orden";

const CAMPOS_NICHO =
  "id, slug, titulo_tarjeta, icono, url_imagen_tarjeta, etiqueta_categoria, titulo_descripcion, texto_descripcion, etiquetas_destacadas, url_imagen_feed_1, url_imagen_feed_2, url_imagen_feed_3, color_primario, orden";

const CAMPOS_SOBRE_NOSOTROS =
  "url_imagen_pareja, url_isologo_flotante, titulo_porque_naranja, texto_porque_naranja, titulo_sobre_nosotros, texto_sobre_nosotros, descripcion_marux, descripcion_doug, texto_enfasis_venezolanos, valor_marcas_potenciadas, valor_proyectos_disenados, valor_anos_estrategia, firma_texto, firma_subtitulo, slogan";

export async function obtenerContenidoLanding() {
  noStore();

  const { configurado } = configuracionSupabase();

  if (!configurado) {
    return {
      inicio: null,
      tarjetas: [],
      nichos: [],
      sobre: null,
      error: ERROR_CONFIGURACION,
    };
  }

  try {
    const supabase = crearClienteServidor();

    const [inicio, tarjetas, nichos, sobre] = await Promise.all([
      supabase
        .from("seccion_inicio")
        .select(CAMPOS_INICIO)
        .limit(1)
        .maybeSingle(),
      supabase
        .from("tarjetas_flotantes_inicio")
        .select(CAMPOS_TARJETA)
        .order("orden", { ascending: true }),
      supabase
        .from("nichos")
        .select(CAMPOS_NICHO)
        .order("orden", { ascending: true }),
      supabase
        .from("sobre_nosotros")
        .select(CAMPOS_SOBRE_NOSOTROS)
        .limit(1)
        .maybeSingle(),
    ]);

    const primerError =
      inicio.error || tarjetas.error || nichos.error || sobre.error;

    return {
      inicio: inicio.data || null,
      tarjetas: tarjetas.data || [],
      nichos: nichos.data || [],
      sobre: sobre.data || null,
      error: primerError?.message || null,
    };
  } catch (error) {
    return {
      inicio: null,
      tarjetas: [],
      nichos: [],
      sobre: null,
      error: error?.message || "No se pudo cargar el contenido de la página.",
    };
  }
}
