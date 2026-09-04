"use client";

import Link from "next/link";
import Reveal from "./Reveal";

function PcTabletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16" aria-hidden="true">
      <defs>
        <linearGradient id="gradPc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7651c" />
          <stop offset="100%" stopColor="#ffec01" />
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="url(#gradPc)" strokeWidth="1.6" />
      <path d="M9 18h14M9 18h9M14 14v4M14 18h4" stroke="url(#gradPc)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="13" width="5" height="4" rx="1" stroke="url(#gradPc)" strokeWidth="1.6" />
      <path d="M7 9h4" stroke="url(#gradPc)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16" aria-hidden="true">
      <defs>
        <linearGradient id="gradNet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7651c" />
          <stop offset="100%" stopColor="#ffec01" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="5" r="2.2" stroke="url(#gradNet)" strokeWidth="1.6" />
      <circle cx="5" cy="19" r="2.2" stroke="url(#gradNet)" strokeWidth="1.6" />
      <circle cx="19" cy="19" r="2.2" stroke="url(#gradNet)" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.2" stroke="url(#gradNet)" strokeWidth="1.6" />
      <path d="M10.6 6.6 6.4 17M13.4 6.6 17.6 17M6.6 17.5l10.8 0M11 13.8l-3.5 2.8M13 13.8l3.5 2.8" stroke="url(#gradNet)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-volt" aria-hidden="true">
      <path d="M12 2l2.4 6.1L20.5 8l-5 4.5 1.5 6.2L12 15.4 7 18.7l1.5-6.2L3.5 8l6.1.1L12 2z" />
    </svg>
  );
}

export default function QueHacemos() {
  const cards = [
    {
      icon: <PcTabletIcon />,
      title: "Desarrollo Web",
      desc: "Landing Pages, Web de Servicios",
      tags: ["Landing Pages", "Web de Servicios"],
    },
    {
      icon: <NetworkIcon />,
      title: "Gestión de Redes",
      desc: "Diseño, Contenido, Estrategia",
      tags: ["Diseño", "Contenido", "Estrategia"],
    },
  ];

  return (
    <section id="que-hacemos" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-volt/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 inline-block h-px w-16 bg-ember" />
              <h2 className="text-4xl font-bold uppercase text-snow md:text-5xl">
                ¿Qué <span className="text-ember">hacemos</span>?
              </h2>
            </div>
            <p className="max-w-md text-snow/70">
              Un servicio integral para que tu marca comunique, convierta y crezca.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-ember/60 hover:bg-white/[0.05] md:p-10">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember/10 blur-3xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-8 inline-flex rounded-2xl border border-white/10 bg-ink p-4 glow-ember-soft transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-snow md:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-lg text-snow/70">{card.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1.5 text-sm font-medium text-snow/80"
                      >
                        <StarsIcon />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center gap-4">
            <Link
              href="#nicho"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-snow/20 px-10 py-4 text-lg font-bold uppercase tracking-wide text-snow transition-all hover:border-volt hover:text-ink hover:bg-volt"
            >
              Ver Portafolio
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <p className="text-sm text-snow/50">
              Explora los nichos que ya dominamos
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}