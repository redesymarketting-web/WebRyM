"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { DoodleSpiral, DoodleWave } from "./Doodles";

function PcTabletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16" aria-hidden="true">
      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="#f7651c" strokeWidth="1.8" />
      <path d="M9 18h14M9 18h9M14 14v4M14 18h4" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="13" width="5" height="4" rx="1" stroke="#f7651c" strokeWidth="1.8" />
      <path d="M7 9h4" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SocialEngagementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16" aria-hidden="true">
      <path d="M4 15.2c0-1.3.9-2.1 2-2.1.55 0 1.05.25 1.4.6.35-.35.85-.6 1.4-.6 1.1 0 2 .8 2 2.1 0 1.1-1.2 1.9-3.4 3.3C5.2 17.1 4 16.3 4 15.2z" stroke="#f7651c" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12.4h4.6a1.6 1.6 0 0 1 1.6 1.6v2.9a1.6 1.6 0 0 1-1.6 1.6h-2.3L9.6 20.6v-2.1h-.1A1.6 1.6 0 0 1 7.9 17v-2.9a1.6 1.6 0 0 1 1.6-1.7z" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.8 13.8v3.4M10.1 15.5h3.4" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19.3 4.8 14 11.6M19.3 4.8l-.9 6.2M19.3 4.8H13" stroke="#f7651c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 13 4 4 10-10" />
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
      icon: <SocialEngagementIcon />,
      title: "Gestión de Redes",
      desc: "Diseño, Contenido, Estrategia",
      tags: ["Diseño", "Contenido", "Estrategia"],
    },
  ];

  return (
    <section id="que-hacemos" className="relative overflow-hidden py-24 md:py-32">
      <DoodleSpiral className="pointer-events-none absolute right-[8%] top-16 hidden h-14 w-14 opacity-70 lg:block" />
      <DoodleWave className="pointer-events-none absolute left-[5%] bottom-24 hidden w-24 opacity-60 lg:block" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-black uppercase text-snow md:text-6xl">
              ¿Qué <span className="text-ember">hacemos</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-snow/70">
              Un servicio integral para que tu marca comunique, convierta y crezca.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-[2rem] bg-snow p-8 text-center transition-transform duration-300 hover:-translate-y-2 md:p-12">
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-ember/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-8 flex justify-center">
                    <div className="inline-flex rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(2,2,2,0.15)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                      {card.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-ink md:text-3xl">
                    {card.title}
                  </h3>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-extrabold text-snow"
                      >
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ember text-ink">
                          <CheckIcon />
                        </span>
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
              className="group inline-flex items-center gap-3 rounded-full bg-ember px-12 py-5 text-lg font-black uppercase tracking-wide text-ink transition-all hover:scale-105 hover:bg-volt glow-ember-soft"
            >
              Ver Portafolio
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <p className="text-sm font-medium text-snow/50">
              Explora los nichos que ya dominamos
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}