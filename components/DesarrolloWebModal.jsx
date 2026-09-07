"use client";

import { useEffect, useRef, useState } from "react";
import {
  SERVICIOS_WEB,
  PORTAFOLIO_WEB,
  proyectoWebHref,
} from "@/lib/desarrolloWeb";

function LandingIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3.5" width="18" height="13" rx="2" stroke="#f7651c" strokeWidth="1.8" />
      <path d="M3 8h18M6.5 11h5M6.5 14h8" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17.5" cy="18.5" r="3" stroke="#f7651c" strokeWidth="1.8" />
      <circle cx="17.5" cy="18.5" r="1.2" fill="#f7651c" />
      <path d="M14.5 13.8 17 18.3" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WebIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="13" rx="2" stroke="#f7651c" strokeWidth="1.8" />
      <path d="M2 8h20M9 21h6M12 17v4" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PanelIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="#f7651c" strokeWidth="1.8" />
      <path d="M3 9h18" stroke="#f7651c" strokeWidth="1.8" />
      <circle cx="7" cy="14" r="1" fill="#f7651c" />
      <circle cx="11" cy="14" r="1" fill="#f7651c" />
      <circle cx="15" cy="14" r="1" fill="#f7651c" />
      <path d="M18 13.2v1.6M19.2 14H16.8" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  landing: LandingIcon,
  web: WebIcon,
  panel: PanelIcon,
};

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

function ServicioCard({ servicio }) {
  const Icon = ICONS[servicio.icon] ?? WebIcon;

  return (
    <article className="rounded-2xl bg-snow p-5 ring-1 ring-black/10">
      <div className="mb-4 flex justify-center">
        <div className="inline-flex rounded-2xl bg-white p-3 shadow-[0_8px_25px_rgba(2,2,2,0.08)] ring-1 ring-black/5">
          <Icon className="h-10 w-10" />
        </div>
      </div>
      <h5 className="text-center text-sm font-black uppercase tracking-wide text-ink">
        {servicio.title}
      </h5>
      <p className="mt-2 text-center text-xs leading-relaxed text-ink/60">
        {servicio.desc}
      </p>
    </article>
  );
}

export default function DesarrolloWebModal({ open, onClose }) {
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
          aria-labelledby="web-modal-title"
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
            <h3
              id="web-modal-title"
              className="text-2xl font-black uppercase text-ink md:text-3xl"
            >
              Desarrollo Web
            </h3>
            <p className="mx-auto mt-2 max-w-lg font-medium text-ink/60 sm:mx-0">
              Sitios y landing pages estratégicamente diseñados para impulsar tu
              negocio.
            </p>
          </header>

          <div className="mt-8">
            <h4 className="text-xl font-black uppercase text-ink sm:text-2xl">
              Haz que cada visita se convierta en una{" "}
              <span className="text-ember">oportunidad real</span>.
            </h4>
            <p className="mt-3 font-medium leading-relaxed text-ink/70">
              Creamos espacios digitales diseñados a la medida exacta de tu
              marca para impulsar tus objetivos de negocio de forma clara y
              efectiva:
            </p>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {SERVICIOS_WEB.map((servicio) => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </div>

          <div className="mt-10">
            <div className="mb-5 text-center sm:text-left">
              <h4 className="text-2xl font-black uppercase text-ink">
                Proyectos <span className="text-ember">publicados</span>
              </h4>
              <p className="text-sm font-medium text-ink/50">
                Marcas que ya confían en Redes y Marketing para su presencia web.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {PORTAFOLIO_WEB.map((proyecto) => (
                <article
                  key={proyecto.id}
                  className="flex h-full flex-col rounded-2xl bg-ink p-6"
                >
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-volt">
                    <span className="h-1.5 w-1.5 rounded-full bg-volt" />
                    Sitio en vivo
                  </p>
                  <h5 className="mt-2 text-xl font-black text-snow">
                    {proyecto.nombre}
                  </h5>
                  <p className="mt-2 text-sm leading-relaxed text-snow/70">
                    {proyecto.descripcion}
                  </p>
                  <a
                    href={proyecto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar el sitio de ${proyecto.nombre}`}
                    className="mt-auto pt-5"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition-all hover:bg-volt">
                      Visitar sitio
                      <ExternalIcon />
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-ink px-6 py-8 text-center sm:px-10">
            <p className="text-lg font-black uppercase tracking-wide text-snow">
              ¿Quieres una web <span className="text-volt">a la medida</span>?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium text-snow/70">
              Cuéntanos tu proyecto y diseñamos el sitio perfecto para tu marca.
            </p>
            <a
              href={proyectoWebHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cotizar un sitio web por WhatsApp"
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