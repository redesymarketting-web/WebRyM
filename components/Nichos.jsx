"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import ClientesModal from "./ClientesModal";
import { DoodleSpiral, DoodleCircle, DoodleWave } from "./Doodles";

function NicheIcon({ id }) {
  const stroke = "#f7651c";
  const props = { stroke, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  switch (id) {
    case "postres":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path {...props} d="M7.3 12h9.4l-1 6.2a1.9 1.9 0 0 1-1.9 1.6H10.2a1.9 1.9 0 0 1-1.9-1.6z" />
          <path {...props} d="M5.4 10.6c0-1.4 1-2.4 2.4-2.4.1-.8 1-1.2 1.9-1.1.4-1.3 2.1-1.3 2.5 0 .8-.1 1.8.4 1.9 1.2 1.3 0 2.4 1 2.4 2.4z" />
          <path {...props} d="M16.4 7.2a1 1 0 1 0 .01 0" />
        </svg>
      );
    case "dojos":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path {...props} d="M4 9.5v5M6.5 9v6M6.5 12h11M17.5 9v6M20 9.5v5" />
        </svg>
      );
    case "realestate":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path {...props} d="M4 11 12 4.5 20 11" />
          <path {...props} d="M6 10.5V20h12v-9.5" />
          <path {...props} d="M10 20v-5h4v5" />
        </svg>
      );
    case "talleres":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path {...props} d="M21 7a6.5 6.5 0 0 0-11 4.6L4 17.7 6.3 20l6.1-6.1A6.5 6.5 0 0 0 21 7z" />
        </svg>
      );
    case "makeup":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path {...props} d="M9 3h6v7H9z" />
          <path {...props} d="M8 10h8v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
          <path {...props} d="M11 6h2" />
        </svg>
      );
    default:
      return null;
  }
}

function FeedMockup({ items, nombreNicho }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="flex items-center gap-2 border-b border-black/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-snow" style={{ backgroundColor: "#020202" }}>
          Feed Instagram
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {items.map((it, i) => (
          <div key={it + i} className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={it}
              alt={`Post de feed para el nicho ${nombreNicho || "Redes y Marketting"}`}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Nichos({ nichos = [] }) {
  const [activo, setActivo] = useState(0);
  const [isClientesOpen, setIsClientesOpen] = useState(false);
  const listaNichos = Array.isArray(nichos) ? nichos : [];
  const indiceActivo = Math.min(
    activo,
    Math.max(listaNichos.length - 1, 0)
  );
  const current = listaNichos[indiceActivo] || null;
  const feed = current
    ? [
        current.url_imagen_feed_1,
        current.url_imagen_feed_2,
        current.url_imagen_feed_3,
      ].filter(Boolean)
    : [];
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
  }, [indiceActivo]);

  return (
    <section id="nicho" className="relative overflow-hidden py-24 md:py-32">
      <DoodleCircle className="pointer-events-none absolute -left-8 top-1/3 hidden h-14 w-14 opacity-50 lg:block" />
      <DoodleWave className="pointer-events-none absolute right-[6%] bottom-24 hidden w-24 opacity-60 lg:block" />
      <DoodleSpiral className="pointer-events-none absolute left-[46%] top-20 hidden h-12 w-12 opacity-50 lg:block" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black uppercase text-snow md:text-6xl">
              Adaptable a tu <span className="text-ember">nicho</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-snow/70">
              Tarjetas de nicho con diseño a la medida de cada industria.
              Elige tu sector y mira el resultado en tiempo real.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* Tarjetas verticales de nicho */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6" role="tablist" aria-label="Nichos de mercado">
            {listaNichos.map((n, i) => {
              const activa = i === indiceActivo;
              return (
                <button
                  key={n.id}
                  type="button"
                  role="tab"
                  aria-selected={activa}
                  aria-controls={`panel-${n.id}`}
                  id={`tab-${n.id}`}
                  onClick={() => {
                    setActivo(i);
                    areaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  }}
                  className={`group relative overflow-hidden rounded-[1.75rem] text-center transition-all duration-300 ${
                    activa
                      ? "bg-volt text-ink shadow-[0_0_40px_rgba(255,236,1,0.35)] ring-2 ring-volt"
                      : "bg-snow text-ink hover:bg-volt hover:text-ink"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={n.url_imagen_tarjeta || "/placeholder-nicho.svg"}
                      alt={`Fotografía del nicho ${n.titulo_tarjeta || "Redes y Marketting"}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                        activa ? "opacity-95" : ""
                      }`}
                    />
                    {activa && (
                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-black text-volt">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="flex items-center justify-center gap-2 text-lg font-black uppercase leading-tight md:text-xl">
                      <NicheIcon id={n.icono} />
                      <span>{n.titulo_tarjeta}</span>
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Panel de vista previa */}
          {current ? (
            <div
              ref={areaRef}
              id={`panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${current.id}`}
              className="mt-8 scroll-mt-28 overflow-hidden rounded-[2rem] bg-snow p-6 shadow-xl md:p-10"
            >
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <span
                    className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-ink"
                    style={{ backgroundColor: current.color_primario }}
                  >
                    {current.etiqueta_categoria}
                  </span>
                  <h3 className="text-3xl font-black uppercase text-ink md:text-4xl">
                    {current.titulo_descripcion}
                  </h3>
                  <p className="mt-4 max-w-md text-lg font-medium text-ink/70">
                    {current.texto_descripcion}
                  </p>

                  {Array.isArray(current.etiquetas_destacadas) &&
                  current.etiquetas_destacadas.length > 0 ? (
                    <div className="mt-8 grid grid-cols-3 gap-3">
                      {current.etiquetas_destacadas.map((etiqueta, indice) => (
                        <div
                          key={`${etiqueta}-${indice}`}
                          className="rounded-xl bg-ink px-3 py-3 text-center"
                        >
                          <p className="text-xs font-extrabold text-snow">
                            {etiqueta}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div>
                  <FeedMockup
                    items={feed}
                    nombreNicho={current.titulo_tarjeta}
                  />
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsClientesOpen(true)}
                      className="group inline-flex items-center gap-2 rounded-full border-2 border-ember/40 bg-ember/10 px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-ember transition-colors duration-300 hover:bg-ember hover:text-ink"
                    >
                      Clientes que confían
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-snow/20 px-6 py-12 text-center text-sm font-medium text-snow/60">
              Todavía no hay nichos publicados.
            </div>
          )}
        </Reveal>
      </div>

      {current ? (
        <ClientesModal
          open={isClientesOpen}
          onClose={() => setIsClientesOpen(false)}
          nicho={{
            nombre: current.titulo_tarjeta,
            primary: current.color_primario,
            badge: current.etiqueta_categoria,
          }}
          nichoSlug={current.slug}
        />
      ) : null}
    </section>
  );
}
