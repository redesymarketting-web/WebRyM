"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import { configuracionSupabase } from "@/lib/supabase/config";

export async function iniciarSesion(prevState, formData) {
  const { configurado } = configuracionSupabase();

  if (!configurado) {
    return {
      error:
        "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const correo = String(formData.get("correo") || "").trim().toLowerCase();
  const contrasena = String(formData.get("contrasena") || "");

  if (!correo || !contrasena) {
    return { error: "Ingresa tu correo y contraseña." };
  }

  const supabase = crearClienteServidor();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: correo,
    password: contrasena,
  });

  if (error || !data.user) {
    return { error: "Correo o contraseña incorrectos." };
  }

  const { data: registro, error: errorAdmin } = await supabase
    .from("administradores")
    .select("activo")
    .eq("usuario_id", data.user.id)
    .maybeSingle();

  if (errorAdmin || !registro?.activo) {
    await supabase.auth.signOut();
    return {
      error:
        "Este usuario no tiene permisos de administrador. Verifica la tabla administradores.",
    };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin/inicio");
}

export async function cerrarSesion() {
  const { configurado } = configuracionSupabase();

  if (configurado) {
    const supabase = crearClienteServidor();
    await supabase.auth.signOut();
  }

  revalidatePath("/admin", "layout");
  redirect("/admin/iniciar-sesion");
}
