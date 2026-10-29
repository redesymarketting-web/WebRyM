import { redirect } from "next/navigation";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { configuracionSupabase } from "@/lib/supabase/config";

export async function obtenerEstadoAdmin() {
  const { configurado } = configuracionSupabase();

  if (!configurado) {
    return {
      configurado: false,
      usuario: null,
      esAdmin: false,
      correo: null,
      error: null,
    };
  }

  try {
    const supabase = crearClienteServidor();
    const {
      data: { user },
      error: errorUsuario,
    } = await supabase.auth.getUser();

    if (errorUsuario || !user) {
      return {
        configurado: true,
        usuario: null,
        esAdmin: false,
        correo: null,
        error: null,
      };
    }

    const { data: registro, error: errorAdmin } = await supabase
      .from("administradores")
      .select("correo, activo")
      .eq("usuario_id", user.id)
      .maybeSingle();

    return {
      configurado: true,
      usuario: user,
      esAdmin: Boolean(registro?.activo),
      correo: registro?.correo || user.email || null,
      error: errorAdmin?.message || null,
    };
  } catch (error) {
    return {
      configurado: true,
      usuario: null,
      esAdmin: false,
      correo: null,
      error: error?.message || "No se pudo verificar la sesión.",
    };
  }
}

export async function requerirAdmin() {
  const estado = await obtenerEstadoAdmin();

  if (!estado.configurado) return estado;
  if (!estado.usuario) redirect("/admin/iniciar-sesion");
  if (!estado.esAdmin) redirect("/admin/sin-acceso");

  return estado;
}

export async function requerirAdminAccion() {
  const estado = await obtenerEstadoAdmin();

  if (!estado.configurado) {
    throw new Error(
      "Supabase no está configurado. Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  if (!estado.usuario) {
    throw new Error("Debes iniciar sesión para realizar esta acción.");
  }

  if (!estado.esAdmin) {
    throw new Error("Tu usuario no tiene permisos de administrador.");
  }

  return estado;
}
