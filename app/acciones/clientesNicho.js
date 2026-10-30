"use server";

import { unstable_noStore as noStore } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { configuracionSupabase } from "@/lib/supabase/config";

export async function obtenerClientesNichoPublico(slug) {
  noStore();

  const slugLimpio = String(slug || "").trim();

  if (!slugLimpio) {
    return { datos: [], error: null };
  }

  const { configurado } = configuracionSupabase();

  if (!configurado) {
    return {
      datos: [],
      error:
        "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  try {
    const supabase = crearClienteServidor();
    const { data: nicho, error: errorNicho } = await supabase
      .from("nichos")
      .select("id")
      .eq("slug", slugLimpio)
      .maybeSingle();

    if (errorNicho) throw new Error(errorNicho.message);
    if (!nicho) return { datos: [], error: null };

    const { data, error } = await supabase
      .from("clientes_nicho")
      .select(
        "id, nombre_cliente, descripcion_cliente, url_sitio, estado, orden"
      )
      .eq("nicho_id", nicho.id)
      .order("orden", { ascending: true });

    if (error) throw new Error(error.message);

    return { datos: data || [], error: null };
  } catch (error) {
    return {
      datos: [],
      error: error?.message || "No se pudieron cargar los clientes.",
    };
  }
}
