import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { configuracionSupabase } from "./config";

export function crearClienteServidor() {
  const { url, anonKey, configurado } = configuracionSupabase();

  if (!configurado) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const almacenCookies = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return almacenCookies.getAll();
      },
      setAll(cookiesParaEstablecer) {
        try {
          cookiesParaEstablecer.forEach(({ name, value, options }) => {
            almacenCookies.set(name, value, options);
          });
        } catch {
          // En renderizado de servidor no se pueden escribir cookies.
          // El middleware se encarga de refrescar la sesión.
        }
      },
    },
  });
}
