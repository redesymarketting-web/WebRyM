"use client";

import Image from "next/image";
import Reveal from "./Reveal";

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-volt/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* Foto con marco geométrico asimétrico */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute -inset-6 rotate-6 rounded-[2.5rem] bg-gradient-to-br from-ember/40 to-volt/40 blur-2xl" />

            {/* Marco geométrico */}
            <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-[2.5rem] border-2 border-ember/60">
              <Image
                src="/dougymaru.png"
                alt="Alan Flores, creador de Redes y Marketing"
                width={520}
                height={620}
                className="h-[520px] w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>

            {/* Isologo circular */}
            <div className="animate-floaty absolute -bottom-8 -left-8 flex h-28 w-28 items-center justify-center rounded-full border-4 border-ink bg-gradient-to-tr from-ember to-volt p-2 shadow-[0_0_50px_rgba(247,101,28,0.6)]">
              <Image
                src="/logonew.png"
                alt="Isologo de Redes y Marketing"
                width={96}
                height={96}
                className="rounded-full object-contain bg-ink"
              />
            </div>

            <div className="animate-floaty2 absolute -right-6 -top-6 rounded-2xl border border-white/15 bg-ink/90 px-5 py-3 backdrop-blur-md glow-ember-soft">
              <p className="text-sm font-black uppercase text-volt">+3 años</p>
              <p className="text-xs text-snow/70">Potenciando marcas</p>
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal delay={120}>
          <div>
            <span className="mb-3 inline-block h-px w-16 bg-ember" />
            <h2 className="text-4xl font-bold uppercase text-snow md:text-5xl">
              Sobre <span className="text-ember">mí</span>
            </h2>
            <span className="mt-2 inline-block rounded-full border border-volt/40 bg-volt/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-volt">
              Creador de Redes y Marketing
            </span>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-snow/80">
              <p>
                A creatividad y <span className="font-bold text-ember">movimiento</span>{" "}
                se les añade estrategia: así nace{" "}
                <span className="font-bold text-volt">Redes y Marketing</span>.
              </p>
              <p>
                Cada marca tiene una historia visual que contar. Mi trabajo es
                encontrarla, diseñarla y convertirla en una presencia digital que
                conecte, inspire y venda.
              </p>
              <p>
                Diseño, contenido y estrategia. Un mismo equipo trabajando para
                que domines tu mercado.
              </p>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { n: "50+", l: "Marcas potenciadas" },
                { n: "100+", l: "Proyectos diseñados" },
                { n: "3+", l: "Años de estrategia" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <p className="font-display text-2xl font-black text-ember">{s.n}</p>
                  <p className="mt-1 text-xs text-snow/70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}