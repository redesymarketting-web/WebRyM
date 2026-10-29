"use client";

import { createBrowserClient } from "@supabase/ssr";
import { configuracionSupabase } from "./config";

let cliente = null;

export function crearClienteNavegador() {
  const { url, anonKey, configurado } = configuracionSupabase();

  if (!configurado) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  if (!cliente) {
    cliente = createBrowserClient(url, anonKey);
  }

  return cliente;
}
