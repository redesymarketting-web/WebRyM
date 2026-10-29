"use client";

import { useState } from "react";
import { crearClienteNavegador } from "@/lib/supabase/cliente";
import { configuracionSupabase } from "@/lib/supabase/config";

function limpiarNombreArchivo(nombre) {
  return String(nombre || "imagen")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .slice(-70);
}

export default function CampoImagen({
  name,
  label,
  defaultValue = "",
  help = "",
  required = false,
  carpeta = "general",
}) {
  const [valor, setValor] = useState(defaultValue || "");
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");
  const { configurado } = configuracionSupabase();

  async function subirArchivo(evento) {
    const archivo = evento.target.files?.[0];
    evento.target.value = "";

    if (!archivo) return;

    if (!configurado) {
      setError("Configura Supabase para habilitar la subida de archivos.");
      return;
    }

    if (!archivo.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen.");
      return;
    }

    if (archivo.size > 10 * 1024 * 1024) {
      setError("La imagen no puede superar los 10 MB.");
      return;
    }

    setError("");
    setSubiendo(true);

    try {
      const supabase = crearClienteNavegador();
      const carpetaSegura = limpiarNombreArchivo(carpeta).toLowerCase();
      const archivoSeguro = limpiarNombreArchivo(archivo.name);
      const ruta = `${carpetaSegura}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}-${archivoSeguro}`;

      const { error: errorSubida } = await supabase.storage
        .from("imagenes")
        .upload(ruta, archivo, {
          cacheControl: "3600",
          contentType: archivo.type,
          upsert: false,
        });

      if (errorSubida) throw new Error(errorSubida.message);

      const { data } = supabase.storage.from("imagenes").getPublicUrl(ruta);
      setValor(data.publicUrl);
    } catch (errorSubida) {
      setError(
        errorSubida?.message ||
          "No se pudo subir la imagen. Revisa las políticas del bucket imagenes."
      );
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={`imagen-${name}`}
        className="block text-xs font-black uppercase tracking-widest text-snow/60"
      >
        {label}
      </label>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center">
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-ink sm:w-36">
          {valor ? (
            <img
              src={valor}
              alt={`Vista previa de ${label}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-[11px] font-bold uppercase tracking-wide text-snow/35">
              Sin imagen
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            id={`imagen-${name}`}
            name={name}
            type="text"
            value={valor}
            onChange={(evento) => setValor(evento.target.value)}
            required={required}
            placeholder="/imagen.jpg o https://..."
            className="w-full rounded-xl border border-white/10 bg-ink px-3 py-2.5 text-sm text-snow outline-none transition focus:border-ember"
          />

          <div className="flex flex-wrap items-center gap-2">
            <label
              className={`inline-flex cursor-pointer items-center justify-center rounded-full border border-ember/40 bg-ember/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-ember transition hover:bg-ember hover:text-ink ${
                subiendo || !configurado ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {subiendo ? "Subiendo..." : "Subir imagen"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={subirArchivo}
                disabled={subiendo || !configurado}
              />
            </label>

            {valor ? (
              <button
                type="button"
                onClick={() => setValor("")}
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-snow/60 transition hover:border-red-400 hover:text-red-300"
              >
                Quitar
              </button>
            ) : null}

            {!configurado ? (
              <span className="text-[11px] font-semibold text-snow/40">
                Subida deshabilitada
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {help ? <p className="text-xs text-snow/45">{help}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-semibold text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
