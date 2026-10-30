"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextoEnriquecido from "./TextoEnriquecido";
import {
  DoodleSpiral,
  DoodleWavyUnderline,
  DoodleWave,
  DoodleCircle,
  DoodleScribble,
} from "./Doodles";

const ESTILOS_TARJETA = [
  { tilt: "-2deg", anim: "animate-floaty" },
  { tilt: "1deg", anim: "animate-floaty2" },
  { tilt: "0deg", anim: "animate-floaty2" },
  { tilt: "-1deg", anim: "animate-floaty" },
];

function BotonEnlace({ href, className, children }) {
  if (!href) return null;

  if (/^https?:\/\//i.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  if (/^(mailto:|tel:)/i.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Hero({ seccion, tarjetas = [] }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  const tituloLineas = String(seccion?.titulo_principal || "")
    .split(/\r?\n/)
    .filter((linea) => linea.trim() !== "");

  const tarjetasHero = Array.isArray(tarjetas)
    ? tarjetas.filter((tarjeta) => tarjeta?.url_imagen)
    : [];

  return (
    <section id="inicio" className="relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-40">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-ember/20 blur-[140px]" />

      {/* Garabatos decorativos */}
      <DoodleSpiral className="pointer-events-none absolute left-[4%] top-32 hidden h-16 w-16 opacity-80 lg:block" />
      <DoodleWave className="pointer-events-none absolute right-[6%] top-40 hidden w-24 opacity-70 lg:block" />
      <DoodleCircle className="pointer-events-none absolute bottom-40 left-[42%] hidden h-14 w-14 opacity-60 lg:block" />
      <DoodleScribble className="pointer-events-none absolute bottom-32 right-[30%] hidden w-16 opacity-70 lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* Texto */}
        <div className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {seccion?.etiqueta_superior ? (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-ink">
              {seccion.etiqueta_superior}
            </span>
          ) : null}

          <h1 className="text-[clamp(2.1rem,4.5vw,4.25rem)] font-black uppercase leading-[1.02] tracking-tight text-snow">
            {tituloLineas.map((linea, i) => {
              const tieneNaranja = /\*\*[^*]+\*\*/.test(linea);
              const tieneAmarillo = /__[^_]+__/.test(linea);

              return (
                <span
                  key={`${linea}-${i}`}
                  className={i === 0 ? "relative block" : "relative mt-1 block"}
                >
                  <TextoEnriquecido texto={linea} />
                  {tieneNaranja ? (
                    <DoodleWavyUnderline className="pointer-events-none absolute -bottom-2 left-0 w-[90%] opacity-80" />
                  ) : null}
                  {tieneAmarillo ? (
                    <DoodleScribble className="pointer-events-none absolute -bottom-3 left-0 w-[70%]" />
                  ) : null}
                </span>
              );
            })}
          </h1>

          {seccion?.texto_descripcion ? (
            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-snow/75 md:text-lg">
              <TextoEnriquecido
                texto={seccion.texto_descripcion}
                className="whitespace-pre-line"
              />
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {seccion?.texto_boton_principal ? (
              <BotonEnlace
                href={seccion?.url_boton_principal || "#contacto"}
                className="group inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 text-base font-extrabold uppercase tracking-wide text-ink transition-all hover:scale-105 hover:bg-volt glow-ember"
              >
                {seccion.texto_boton_principal}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </BotonEnlace>
            ) : null}
            {seccion?.texto_boton_secundario ? (
              <BotonEnlace
                href={seccion?.url_boton_secundario || "#nicho"}
                className="inline-flex items-center gap-2 rounded-full border-2 border-snow/25 px-8 py-4 text-base font-bold text-snow transition-all hover:border-volt hover:text-volt"
              >
                {seccion.texto_boton_secundario}
              </BotonEnlace>
            ) : null}
          </div>
        </div>

        {/* Panel ordenado de cards */}
        <div className={`relative mx-auto w-full max-w-lg transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-2 gap-4">
            {tarjetasHero.map((card, i) => {
              const estilo = ESTILOS_TARJETA[i % ESTILOS_TARJETA.length];

              return (
                <div
                  key={card.id || `${card.url_imagen}-${i}`}
                  className={`${estilo.anim} glow-ember-soft overflow-hidden rounded-2xl border border-white/15 bg-ink shadow-xl`}
                  style={{
                    transform: `rotate(${estilo.tilt})`,
                    animationDelay: `${i * 0.8}s`,
                  }}
                >
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-ember to-volt text-[9px] font-black text-ink">
                      R
                    </span>
                    <span className="text-[11px] font-semibold text-snow">
                      {card.nombre_marca}
                    </span>
                  </div>
                  <Image
                    src={card.url_imagen}
                    alt={`Post de redes sociales de ${card.nombre_marca || "la marca"}`}
                    width={240}
                    height={300}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="flex items-center gap-3 px-3 py-2 text-[11px] text-snow/80">
                    <span>♥ {card.megustas || "0"}</span>
                    <span>💬 {card.comentarios || "0"}</span>
                    <span className="ml-auto text-volt">↗</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notificación flotante */}
          <div className="animate-floaty2 absolute -right-4 -top-6 rounded-2xl border border-white/15 bg-ink/90 px-4 py-3 backdrop-blur-md glow-ember-soft">
            <p className="text-xs font-extrabold text-volt">+3.2k seguidores · hoy</p>
            <p className="text-[11px] text-snow/70">Estrategia Redes y Marketting</p>
          </div>
        </div>
      </div>

      {/* Marquee inferior */}
      <div className="mt-24 border-y border-white/10 bg-white/[0.02] py-5">
        <div className="flex overflow-hidden">
          <div className="flex min-w-full shrink-0 animate-marquee items-center gap-12 whitespace-nowrap pr-12">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12 text-sm font-extrabold uppercase tracking-widest text-snow/50">
                <span>Diseño</span><span className="text-ember">✦</span>
                <span>Estrategia</span><span className="text-volt">✦</span>
                <span>Desarrollo Web</span><span className="text-ember">✦</span>
                <span>Redes Sociales</span><span className="text-volt">✦</span>
                <span>Branding</span><span className="text-ember">✦</span>
                <span>Contenido Creativo</span><span className="text-volt">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}