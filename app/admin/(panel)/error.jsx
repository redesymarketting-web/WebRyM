"use client";

import Link from "next/link";

export default function ErrorPanel({ error, reset }) {
  return (
    <div className="rounded-3xl border border-red-400/30 bg-red-400/10 p-6 md:p-8">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-200">
        Ocurrió un problema
      </p>
      <h2 className="mt-2 text-2xl font-black uppercase text-snow">
        No se pudo completar la operación
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-snow/60">
        {error?.message ||
          "Revisa tu conexión con Supabase e inténtalo de nuevo."}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-ember px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-volt"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/admin/inicio"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-snow/60 transition hover:border-volt hover:text-volt"
        >
          Ir al inicio del panel
        </Link>
      </div>
    </div>
  );
}
