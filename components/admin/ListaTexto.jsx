"use client";

import { useState } from "react";

export default function ListaTexto({
  name,
  label,
  defaultValue = [],
  placeholder = "Escribe un elemento",
  help = "",
  maxElementos = 40,
}) {
  const inicial =
    Array.isArray(defaultValue) && defaultValue.length > 0
      ? defaultValue.map((elemento) => String(elemento))
      : [""];

  const [elementos, setElementos] = useState(inicial);

  function actualizar(indice, valor) {
    setElementos((actuales) =>
      actuales.map((elemento, posicion) =>
        posicion === indice ? valor : elemento
      )
    );
  }

  function agregar() {
    if (elementos.length >= maxElementos) return;
    setElementos((actuales) => [...actuales, ""]);
  }

  function quitar(indice) {
    setElementos((actuales) =>
      actuales.length === 1
        ? [""]
        : actuales.filter((_, posicion) => posicion !== indice)
    );
  }

  const valorEnviado = JSON.stringify(
    elementos.map((elemento) => elemento.trim()).filter(Boolean)
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="block text-xs font-black uppercase tracking-widest text-snow/60">
          {label}
        </span>
        <button
          type="button"
          onClick={agregar}
          disabled={elementos.length >= maxElementos}
          className="rounded-full border border-ember/40 bg-ember/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-ember transition hover:bg-ember hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          + Agregar
        </button>
      </div>

      <input type="hidden" name={name} value={valorEnviado} />

      <div className="space-y-2">
        {elementos.map((elemento, indice) => (
          <div key={indice} className="flex items-center gap-2">
            <input
              type="text"
              value={elemento}
              onChange={(evento) => actualizar(indice, evento.target.value)}
              placeholder={placeholder}
              className="w-full rounded-xl border border-white/10 bg-ink px-3 py-2.5 text-sm text-snow outline-none transition focus:border-ember"
            />
            <button
              type="button"
              onClick={() => quitar(indice)}
              aria-label={`Quitar elemento ${indice + 1}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-snow/50 transition hover:border-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {help ? <p className="text-xs text-snow/45">{help}</p> : null}
    </div>
  );
}
