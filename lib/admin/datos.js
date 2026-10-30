import { crearClienteServidor } from "@/lib/supabase/servidor";
import { configuracionSupabase } from "@/lib/supabase/config";

async function ejecutar(consulta) {
  const { configurado } = configuracionSupabase();

  if (!configurado) {
    return {
      datos: null,
      error:
        "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  try {
    const supabase = crearClienteServidor();
    const { data, error } = await consulta(supabase);

    if (error) {
      return { datos: null, error: error.message };
    }

    return { datos: data, error: null };
  } catch (error) {
    return {
      datos: null,
      error: error?.message || "No se pudo consultar la base de datos.",
    };
  }
}

export async function obtenerSeccionInicioAdmin() {
  return ejecutar((supabase) =>
    supabase.from("seccion_inicio").select("*").limit(1).maybeSingle()
  );
}

export async function obtenerTarjetasInicioAdmin() {
  return ejecutar((supabase) =>
    supabase
      .from("tarjetas_flotantes_inicio")
      .select("*")
      .order("orden", { ascending: true })
  );
}

export async function obtenerPlanesAdmin() {
  return ejecutar((supabase) =>
    supabase.from("planes_redes").select("*").order("orden", { ascending: true })
  );
}

export async function obtenerServiciosWebAdmin() {
  return ejecutar((supabase) =>
    supabase.from("servicios_web").select("*").order("orden", { ascending: true })
  );
}

export async function obtenerProyectosWebAdmin() {
  return ejecutar((supabase) =>
    supabase.from("proyectos_web").select("*").order("orden", { ascending: true })
  );
}

export async function obtenerNichosAdmin() {
  return ejecutar((supabase) =>
    supabase.from("nichos").select("*").order("orden", { ascending: true })
  );
}

export async function obtenerNichoAdmin(id) {
  return ejecutar((supabase) =>
    supabase.from("nichos").select("*").eq("id", id).maybeSingle()
  );
}

export async function obtenerClientesNichoAdmin(nichoId) {
  return ejecutar((supabase) =>
    supabase
      .from("clientes_nicho")
      .select("*")
      .eq("nicho_id", nichoId)
      .order("orden", { ascending: true })
  );
}

export async function obtenerSobreNosotrosAdmin() {
  return ejecutar((supabase) =>
    supabase.from("sobre_nosotros").select("*").limit(1).maybeSingle()
  );
}

export async function obtenerResumenAdmin() {
  return ejecutar(async (supabase) => {
    const [tarjetas, planes, nichos, clientes] = await Promise.all([
      supabase
        .from("tarjetas_flotantes_inicio")
        .select("id", { count: "exact", head: true }),
      supabase.from("planes_redes").select("id", { count: "exact", head: true }),
      supabase.from("nichos").select("id", { count: "exact", head: true }),
      supabase
        .from("clientes_nicho")
        .select("id", { count: "exact", head: true }),
    ]);

    const primerError =
      tarjetas.error || planes.error || nichos.error || clientes.error;

    if (primerError) {
      return { data: null, error: primerError };
    }

    return {
      data: {
        tarjetas: tarjetas.count || 0,
        planes: planes.count || 0,
        nichos: nichos.count || 0,
        clientes: clientes.count || 0,
      },
      error: null,
    };
  });
}
