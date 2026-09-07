"use client";

import { useEffect, useRef, useState } from "react";
import { nuevoClienteHref } from "@/lib/clientesNichos";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

function ClienteCard({ cliente }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border-2 border-ember bg-white p-6 shadow-[0_10px_30px_rgba(2,2,2,0.06)]">
      <h5 className="text-xl font-black text-ink">{cliente.nombre}</h5>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">
        {cliente.descripcion}
      </p>
      {cliente.url && (
        <div className="mt-auto pt-5">
          <a
            href={cliente.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar el perfil de ${cliente.nombre}`}
            className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition-all hover:bg-volt"
          >
            Visitar
            <ExternalIcon />
          </a>
        </div>
      )}
    </article>
  );
}

export default function ClientesModal({ open, onClose, nicho, clientes }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timeout = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clientes-modal-title"
          className={`relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl sm:p-10 transition-all duration-300 ${
            visible ? "scale-100 opacity-100" : "scale-95 translate-y-4 opacity-0"
          }`}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ember hover:text-ink"
          >
            <CloseIcon />
          </button>

          <header className="pr-12 text-center sm:text-left">
            {nicho && (
              <span
                className="mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-ink"
                style={{ backgroundColor: nicho.primary }}
              >
                {nicho.badge}
              </span>
            )}
            <h3
              id="clientes-modal-title"
              className="text-2xl font-black uppercase text-ink md:text-3xl"
            >
              Marcas que confían en{" "}
              <span className="text-ember">Redes y Marketting</span>
            </h3>
            {nicho && (
              <p className="mx-auto mt-2 max-w-lg font-medium text-ink/60 sm:mx-0">
                Clientes del nicho {nicho.nombre} que ya potenciamos con diseño
                y estrategia.
              </p>
            )}
          </header>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {clientes.map((cliente) => (
              <ClienteCard key={cliente.id} cliente={cliente} />
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-ink px-6 py-8 text-center sm:px-10">
            <p className="text-lg font-black uppercase tracking-wide text-snow">
              ¿Quieres ser nuestro{" "}
              <span className="text-volt">próximo cliente</span>?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium text-snow/70">
              Cuéntanos tu marca y diseñemos juntos tu presencia digital.
            </p>
            <a
              href={nuevoClienteHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Quiero ser el próximo cliente por WhatsApp"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-ember px-8 py-3.5 text-sm font-black uppercase tracking-wide text-ink transition-all hover:scale-105 hover:bg-volt glow-ember-soft"
            >
              Cotizar por WhatsApp
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}