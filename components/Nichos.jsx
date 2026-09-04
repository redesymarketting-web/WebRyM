"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const nichos = [
  {
    id: "postres",
    nombre: "Postres",
    emoji: "🧁",
    slug: "Postres",
    primary: "#f472b6",
    primarySoft: "rgba(244,114,182,0.14)",
    badge: "Sweet Branding",
    heros: [
      { src: "/crunchiebite.jpg", alt: "Producto Crunchie Bite de Postres" },
      { src: "/dulzuras.jpg", alt: "Feed de Instagram para pastelerías" },
    ],
    titulo: "Pastelerías que venden con los ojos",
    descripcion:
      "Diseño de marca colorido, fotos de producto irresistibles y feeds que endulzan tu audiencia.",
  },
  {
    id: "dojos",
    nombre: "Dojos & Gimnasios",
    emoji: "🥋",
    slug: "Dojos & Gimnasios",
    primary: "#ef4444",
    primarySoft: "rgba(239,68,68,0.14)",
    badge: "Fitness Power",
    heros: [
      { src: "/ylanflores.jpg", alt: "Volante de entrenamiento especial para gimnasio" },
    ],
    titulo: "Entrenamiento que inspira disciplina",
    descripcion:
      "Volantes de retos, promos de clases y contenido que convierten seguidores en atletas.",
  },
  {
    id: "realestate",
    nombre: "Real Estate",
    emoji: "🏠",
    slug: "Real Estate",
    primary: "#38bdf8",
    primarySoft: "rgba(56,189,248,0.14)",
    badge: "Premium Property",
    heros: [
      { src: "/javiercanizares.jpg", alt: "Volante inmobiliario de Javier Cañizares" },
      { src: "/doloresrodriguez.jpg", alt: "Imagen de Dolores Rodríguez para Real Estate" },
    ],
    titulo: "Propiedades premium, presentación premium",
    descripcion:
      "Volantes elegantes y publicaciones que posicionan tu marca como la asesora de confianza del mercado.",
  },
  {
    id: "talleres",
    nombre: "Talleres Automotrices",
    emoji: "🔧",
    slug: "Talleres Automotrices",
    primary: "#ffec01",
    primarySoft: "rgba(255,236,1,0.14)",
    badge: "Auto Industry",
    heros: [
      { src: "/dayarey.jpg", alt: "Logo de Radiadores Dayarey Aponte para taller automotriz" },
    ],
    titulo: "Mecánica de primer nivel, imagen de primer nivel",
    descripcion:
      "Identidad gráfica y contenido que transmiten confianza y calidad en tu taller.",
  },
];

function FeedMockup({ items, primary }) {
  const icons = ["❤️", "💬", "📤"];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-ink/80">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink" style={{ backgroundColor: primary }}>
          Feed Instagram
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {items.map((it) => (
          <div key={it.src + it.alt} className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 hidden items-center justify-around bg-gradient-to-t from-black/80 to-transparent px-2 py-1 text-[10px] text-white sm:flex">
              {icons.map((ic) => (
                <span key={ic}>{ic} 231</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneMockup({ primary, primarySoft, titulo, badge, heros, emoji }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border-4 border-white/20 bg-ink shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="text-lg font-extrabold text-snow">{emoji} Marca</span>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: primary }}>
          {badge}
        </span>
      </div>
      <div className="relative h-36 overflow-hidden bg-gradient-to-br sm:h-44" style={{ backgroundColor: primarySoft }}>
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="mb-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide text-ink" style={{ backgroundColor: primary }}>
            Redes y Marketing · {badge}
          </span>
          <p className="text-sm font-bold text-snow sm:text-base">{titulo}</p>
          <span className="mt-2 h-1.5 w-16 rounded-full" style={{ backgroundColor: primary }} />
        </div>
      </div>
      <div className="h-12" style={{ backgroundColor: primarySoft }} />
      <div className="flex items-center gap-2 px-4 py-3">
        {heros.slice(0, 1).map((h) => (
          <div key={h.src} className="relative aspect-square w-10 overflow-hidden rounded-xl">
            <Image src={h.src} alt={h.alt} fill sizes="40px" className="object-cover" />
          </div>
        ))}
        <div className="space-y-1.5">
          <div className="h-2 w-40 rounded-full bg-white/15" />
          <div className="h-2 w-28 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function Nichos() {
  const [activo, setActivo] = useState(0);
  const current = nichos[activo];
  const areaRef = useRef(null);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    const t = window.setTimeout(() => {
      el.style.transition = "opacity .45s ease, transform .45s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 40);
    return () => window.clearTimeout(t);
  }, [activo]);

  return (
    <section id="nicho" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-ember/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block h-px w-16 bg-ember" />
            <h2 className="text-4xl font-bold uppercase text-snow md:text-5xl">
              Adaptable a tu <span className="text-ember">nicho</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-snow/70">
              Diseñamos guerrillas visuales y estrategias a la medida de cada industria.
              Elige tu sector y mira el resultado en tiempo real.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* Tabs */}
          <div
            className="mb-10 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Nichos de mercado"
          >
            {nichos.map((n, i) => {
              const activa = i === activo;
              return (
                <button
                  key={n.id}
                  type="button"
                  role="tab"
                  aria-selected={activa}
                  aria-controls={`panel-${n.id}`}
                  id={`tab-${n.id}`}
                  onClick={() => setActivo(i)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 sm:px-6 sm:text-base ${
                    activa
                      ? "scale-105 text-ink"
                      : "border border-white/15 text-snow/70 hover:border-volt hover:text-volt"
                  }`}
                  style={activa ? { backgroundColor: n.primary, boxShadow: `0 0 30px ${n.primarySoft}` } : undefined}
                >
                  <span className="mr-2">{n.emoji}</span>
                  {n.nombre}
                </button>
              );
            })}
          </div>

          {/* Panel de vista previa */}
          <div
            ref={areaRef}
            className="overflow-hidden rounded-[2.5rem] border border-white/10 p-6 md:p-10"
            style={{ backgroundColor: `color-mix(in srgb, ${current.primary} 6%, #020202)` }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
              style={{ animation: "glow 4s ease-in-out infinite" }}
            />

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <ArticleInfo current={current} />
              <div className="grid gap-6 sm:grid-cols-2">
                <PhoneMockup
                  primary={current.primary}
                  primarySoft={current.primarySoft}
                  titulo={current.titulo}
                  badge={current.badge}
                  heros={current.heros}
                  emoji={current.emoji}
                />
                <FeedMockup items={current.heros} primary={current.primary} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArticleInfo({ current }) {
  return (
    <div>
      <span
        className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-ink"
        style={{ backgroundColor: current.primary }}
      >
        {current.badge}
      </span>
      <h3 className="text-3xl font-bold uppercase text-snow md:text-4xl">
        {current.titulo}
      </h3>
      <p className="mt-4 max-w-md text-lg text-snow/70">{current.descripcion}</p>

      <ul className="mt-8 space-y-3">
        {["Diseño de contenido exclusivo", "Calendario estratégico", "Identidad gráfica para tu negocio"].map((t) => (
          <li key={t} className="flex items-center gap-3 font-medium text-snow/85">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-black text-ink"
              style={{ backgroundColor: current.primary }}
            >
              ✓
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}