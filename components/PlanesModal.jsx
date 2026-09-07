"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappHref, PLAN_PERSONALIZADO_TEXT } from "@/lib/planes";

function PaintIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3a9 9 0 0 0 0 18c-1.2 0-2-.8-2-2 0-.6.3-1 .6-1.3.4-.3.6-.7.6-1.2a2 2 0 0 0-2-2H7a4 4 0 0 1-4-4c0-3.6 3.4-8.5 9-7.5z" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 7.5a3.5 3.5 0 0 1-3.5 3.5 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3.5 3.5 0 0 1 3.5 2.5" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.2" cy="10.2" r="0.9" fill="#f7651c" />
      <circle cx="10" cy="7.4" r="0.9" fill="#f7651c" />
    </svg>
  );
}

function RocketIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14.6 2.5c2.4 0 5.9 1 7.9 4-1.1 3.9-3.5 6.9-7.4 8.9L12 18.3 9.6 16c-2.5-3-3.5-6-3-9 2-2.4 4.5-4.5 8-4.5z" stroke="#f7651c" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="13" cy="8.2" r="2.2" stroke="#f7651c" strokeWidth="1.8" />
      <path d="M9 14.5 5.5 18M9.5 20.4l1.4-1.9M13.2 19l1.8-1.4" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.4 10.2 4.5 11l3 .9M14.5 5.6l1.7-1.4" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 11.4c0-3 2.5-5.4 5.5-5.4h5c3 0 5.5 2.4 5.5 5.4 0 2.9-2.3 5.2-5 5.4v2.7l-3.3-2H9.5c-3 0-5.5-2.4-5.5-5.1z" stroke="#f7651c" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="9.8" cy="11.3" r="1.2" fill="#f7651c" />
      <circle cx="14.2" cy="11.3" r="1.2" fill="#f7651c" />
    </svg>
  );
}

function ChartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="#f7651c" strokeWidth="1.8" />
      <path d="M3.5 9.5h17M7.5 7.5V5M16.5 7.5V5" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m7 14.5 2.2-2.4 1.9 1.8L14.6 10l2.4 2.2" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckDot() {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ember/15 text-ember">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m5 13 4 4 10-10" />
      </svg>
    </span>
  );
}

function WhatsAppMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-2.6A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 1.6 1.6-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.6-.8-1.8-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4a8.6 8.6 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3 0-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

const ICONS = {
  paint: PaintIcon,
  rocket: RocketIcon,
  chat: ChatIcon,
  chart: ChartIcon,
};

function PlanCard({ plan }) {
  const Icon = ICONS[plan.icon] ?? ChatIcon;

  return (
    <article className="flex h-full flex-col rounded-2xl bg-snow p-6 shadow-[0_15px_40px_rgba(2,2,2,0.08)] ring-1 ring-black/10">
      <div className="mb-5 flex justify-center">
        <div className="inline-flex rounded-2xl bg-white p-3.5 shadow-[0_10px_30px_rgba(2,2,2,0.10)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-11 w-11 sm:h-12 sm:w-12" />
        </div>
      </div>

      <h4 className="text-center text-xl font-black uppercase text-ink">
        {plan.title}
      </h4>
      <p className="mt-1 text-center text-sm font-medium text-ink/50">
        {plan.tagline}
      </p>

      <ul className="mt-5 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckDot />
            <span className="text-sm leading-snug text-ink/80">{feature}</span>
          </li>
        ))}
      </ul>

      {plan.note && (
        <p className="mt-5 rounded-xl bg-ember/10 p-3.5 text-sm font-medium leading-snug text-ember">
          {plan.note}
        </p>
      )}

      <div className="mt-auto pt-6">
        <a
          href={whatsappHref(plan.whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Cotizar el plan ${plan.title} por WhatsApp`}
          className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-ember px-6 py-3.5 text-sm font-black uppercase tracking-wide text-ink transition-all hover:scale-[1.02] hover:bg-volt glow-ember-soft"
        >
          Cotizar por WhatsApp
          <span className="transition-transform group-hover:scale-110">
            <WhatsAppMiniIcon />
          </span>
        </a>
      </div>
    </article>
  );
}

export default function PlanesModal({ open, onClose, title, subtitle, planes }) {
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
          aria-labelledby="planes-modal-title"
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
              id="planes-modal-title"
              className="text-2xl font-black uppercase text-ink md:text-3xl"
            >
              {title}
            </h3>
            {subtitle && (
              <p className="mx-auto mt-2 max-w-lg font-medium text-ink/60 sm:mx-0">
                {subtitle}
              </p>
            )}
          </header>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {planes.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-ink px-6 py-8 text-center sm:px-10">
            <p className="text-lg font-black uppercase tracking-wide text-snow">
              ¿No encuentras un plan{" "}
              <span className="text-volt">para tu marca</span>?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium text-snow/70">
              Cuéntanos tu dolor y diseñamos un plan personalizado que se adapte
              a tu necesidad.
            </p>
            <a
              href={whatsappHref(PLAN_PERSONALIZADO_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar plan personalizado por WhatsApp"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-ember px-8 py-3.5 text-sm font-black uppercase tracking-wide text-ink transition-all hover:scale-105 hover:bg-volt glow-ember-soft"
            >
              Consultar plan personalizado
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