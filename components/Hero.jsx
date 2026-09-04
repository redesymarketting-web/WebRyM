"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function InstagramCard({ img, tilt, duration, delay, className }) {
  return (
    <div
      className={`absolute ${className} animate-floaty glow-ember-soft rounded-3xl border border-white/15 bg-ink/80 p-3 backdrop-blur-md`}
      style={{ "--tilt": `${tilt}deg`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      <div className="flex items-center gap-2 pb-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-ember to-volt text-[10px] font-black text-ink">
          R
        </span>
        <span className="text-xs font-semibold text-snow">@redesymarketting</span>
        <span className="ml-auto text-snow/40">⋯</span>
      </div>
      <Image
        src={img}
        alt="Contenido de redes sociales de Redes y Marketing"
        width={200}
        height={200}
        className="aspect-square w-full rounded-2xl object-cover"
      />
      <div className="flex items-center gap-3 pt-2 text-sm text-snow/80">
        <span>♥ 2.4k</span>
        <span>💬 128</span>
        <span className="ml-auto text-volt">↗</span>
      </div>
    </div>
  );
}

function NotificationCard({ children, tilt, delay, duration, className }) {
  return (
    <div
      className={`absolute ${className} animate-floaty2 rounded-2xl border border-white/15 bg-ink/90 px-4 py-3 backdrop-blur-md glow-ember-soft`}
      style={{ "--tilt": `${tilt}deg`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
}

function FlyerCard({ img, tilt, delay, duration, className }) {
  return (
    <div
      className={`absolute ${className} animate-floaty glow-ember-soft overflow-hidden rounded-3xl border-2 border-volt/70 shadow-[0_0_40px_rgba(255,236,1,0.25)]`}
      style={{ "--tilt": `${tilt}deg`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      <Image
        src={img}
        alt="Flyer de marca realizado por Redes y Marketing"
        width={220}
        height={280}
        className="w-full object-cover"
      />
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <section
      id="inicio"
      className="bg-grid relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-40"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-ember/25 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* Texto */}
        <div className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ember">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ember" />
            Marketing Digital · Diseño · Estrategia
          </span>

          <h1 className="text-4xl font-bold uppercase leading-[1.05] tracking-tight text-snow sm:text-5xl lg:text-6xl xl:text-7xl">
            Potenciamos tu{" "}
            <span className="text-ember">presencia digital</span> con{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-volt">diseño</span>
              <span className="absolute inset-x-0 bottom-2 -z-0 h-3 bg-ember/40 blur-sm" />
            </span>{" "}
            y <span className="text-ember">estrategia</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-snow/70">
            Convertimos tu marca en un referente de su nicho. Diseño de alto
            impacto, contenido estratégico y desarrollo web que vende.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 text-lg font-extrabold uppercase tracking-wide text-ink transition-all hover:scale-105 hover:bg-volt glow-ember"
            >
              Quiero escalar mi marca
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="#nicho"
              className="inline-flex items-center gap-2 rounded-full border border-snow/20 px-8 py-4 text-lg font-semibold text-snow transition-all hover:border-volt hover:text-volt"
            >
              Ver tu nicho
            </Link>
          </div>
        </div>

        {/* Collage flotante */}
        <div className="relative mx-auto h-[560px] w-full max-w-md lg:h-[640px]">
          <div className="absolute inset-0 rounded-full bg-ember/15 blur-3xl" />

          {/* Card principal centro */}
          <div className="animate-pulseSoft absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2 sm:w-52">
            <Image
              src="/crunchiebite.jpg"
              alt="Ejemplo de contenido: producto Crunchie Bite"
              width={240}
              height={300}
              className="glow-ember-soft w-full rounded-[2rem] border-2 border-snow/20 object-cover"
            />
          </div>

          {/* Cards de Instagram flotantes */}
          <InstagramCard
            img="/dulzuras.jpg"
            className="left-0 top-8 w-40 sm:w-44"
            tilt={-8}
            delay={0}
            duration={6}
          />
          <InstagramCard
            img="/ylanflores.jpg"
            className="right-0 top-24 w-36 sm:w-40"
            tilt={7}
            delay={1.2}
            duration={7}
          />

          {/* Flyers */}
          <FlyerCard
            img="/javiercanizares.jpg"
            className="bottom-6 left-2 w-36 sm:w-40"
            tilt={6}
            delay={0.6}
            duration={6.5}
          />
          <FlyerCard
            img="/dayarey.jpg"
            className="bottom-24 right-2 w-32 sm:w-36"
            tilt={-9}
            delay={1.8}
            duration={7.5}
          />

          {/* Notificaciones */}
          <NotificationCard tilt={3} delay={0.4} duration={6} className="left-6 top-1/2 -translate-y-1/2">
            <p className="text-xs font-bold text-snow">Nuevo seguidor 🔥</p>
            <p className="text-[11px] text-snow/60">@tu.marca · hace 2 min</p>
          </NotificationCard>

          <NotificationCard tilt={-4} delay={1.5} duration={7} className="right-2 top-10">
            <p className="text-xs font-bold text-volt">+2.3k alcance</p>
            <p className="text-[11px] text-snow/60">Campaña de diseño</p>
          </NotificationCard>

          <NotificationCard tilt={2} delay={2.2} duration={6.8} className="bottom-40 right-8">
            <p className="text-xs font-bold text-snow">📸 Sección en vivo</p>
            <p className="text-[11px] text-snow/60">Publicación programada</p>
          </NotificationCard>
        </div>
      </div>

      {/* Marquee inferior */}
      <div className="mt-20 border-y border-white/10 bg-white/[0.02] py-5">
        <div className="flex overflow-hidden">
          <div className="flex min-w-full shrink-0 animate-marquee items-center gap-12 whitespace-nowrap pr-12">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12 text-sm font-semibold uppercase tracking-widest text-snow/50">
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