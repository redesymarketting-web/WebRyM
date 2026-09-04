"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { DoodleSpiral, DoodleHeart, DoodleCircle, DoodleScribble } from "./Doodles";

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden py-24 md:py-32">
      <DoodleSpiral className="pointer-events-none absolute right-[10%] top-16 hidden h-14 w-14 opacity-60 lg:block" />
      <DoodleHeart className="pointer-events-none absolute bottom-28 left-[8%] hidden h-9 w-9 opacity-60 lg:block" />
      <DoodleCircle className="pointer-events-none absolute left-[42%] bottom-24 hidden h-12 w-12 opacity-40 lg:block" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Título */}
        <Reveal>
          <div className="mb-14 flex flex-wrap items-center gap-x-6 gap-y-3">
            <h2 className="text-[clamp(1.9rem,4vw,3.4rem)] font-black uppercase text-snow">
              Sobre{" "}
              <span className="relative inline-block">
                mí
                <DoodleScribble className="pointer-events-none absolute -bottom-3 left-0 w-full opacity-70" />
              </span>
            </h2>
            <div className="flex items-center gap-4 text-[clamp(1.5rem,3vw,2.6rem)] font-black uppercase">
              <span className="bg-ember px-4 py-1 text-ink">Maru</span>
              <span className="bg-volt px-4 py-1 text-ink">Doug</span>
            </div>
          </div>
        </Reveal>

        <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Foto */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <Image
                src="/dougymaru.png"
                alt="Maru y Doug, creadores de Redes y Marketing"
                width={520}
                height={620}
                className="h-[520px] w-full object-cover"
                priority
              />

              {/* Isologo flotante */}
              <div className="animate-floaty absolute -bottom-8 -right-8 h-28 w-28 md:h-32 md:w-32">
                <Image
                  src="/logonew.png"
                  alt="Isologo de Redes y Marketing"
                  width={128}
                  height={128}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </Reveal>

          {/* Texto + firma */}
          <Reveal delay={120}>
            <div className="relative flex h-full flex-col">
              <div className="space-y-5 text-lg leading-relaxed text-snow/85">
                <p>
                  A <span className="font-black text-ember">creatividad</span> y{" "}
                  <span className="font-black text-ember">movimiento</span> se les
                  añade estrategia: así nace{" "}
                  <span className="font-black text-volt">Redes y Marketing</span>.
                </p>
                <p>
                  Somos <span className="font-black text-snow">Maru</span> y{" "}
                  <span className="font-black text-snow">Doug</span>, un equipo
                  de diseñadores y estrategas que convierte cada marca en una
                  presencia digital que conecta, inspira y vende.
                </p>
                <p>
                  Diseño, contenido y estrategia en un mismo lugar, trabajando
                  para que domines tu mercado.
                </p>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                {[
                  { n: "50+", l: "Marcas potenciadas" },
                  { n: "100+", l: "Proyectos diseñados" },
                  { n: "3+", l: "Años de estrategia" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-center">
                    <p className="text-2xl font-black text-ember">{s.n}</p>
                    <p className="mt-1 text-xs font-medium text-snow/70">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Firma caligráfica */}
              <div className="mt-auto pt-12 text-right">
                <DoodleHeart className="pointer-events-none absolute right-14 top-8 hidden h-8 w-8 opacity-60 lg:block" />
                <p className="font-script text-4xl text-snow md:text-5xl">
                  Maru y Doug
                </p>
                <p className="font-script text-3xl text-ember md:text-4xl">
                  Redes y Maketting
                </p>
                <DoodleScribble className="pointer-events-none ml-auto mt-1 w-32 md:w-44" />
                <p className="font-script mt-2 text-3xl text-volt md:text-4xl">
                  Somos Diferentes para Ti
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}