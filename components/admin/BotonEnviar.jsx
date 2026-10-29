"use client";

import { useFormStatus } from "react-dom";

export default function BotonEnviar({
  children,
  pendingText = "Guardando...",
  className = "",
  variant = "primario",
}) {
  const { pending } = useFormStatus();

  const estilos =
    variant === "peligro"
      ? "bg-red-500 text-white hover:bg-red-400"
      : variant === "secundario"
        ? "border border-white/20 bg-white/5 text-snow hover:border-volt hover:text-volt"
        : "bg-ember text-ink hover:bg-volt";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-60 ${estilos} ${className}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
