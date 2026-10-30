"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import TextoEnriquecido from "./TextoEnriquecido";
import { DoodleSpiral, DoodleHeart, DoodleCircle, DoodleScribble } from "./Doodles";

export default function SobreMi({ contenido }) {
  const contadores = [
    {
      valor: contenido?.valor_marcas_potenciadas || "—",
      etiqueta: "Marcas potenciadas",
    },
    {
      valor: contenido?.valor_proyectos_disenados || "—",
      etiqueta: "Proyectos diseñados",
    },
    {
      valor: contenido?.valor_anos_estrategia || "—",
      etiqueta: "Años de estrategia",
    },
  ];

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
                Nosotros
                <DoodleScribble className="pointer-events-none absolute -bottom-3 left-0 w-full opacity-70" />
              </span>
            </h2>
            <div className="flex items-center gap-4 text-[clamp(1.5rem,3vw,2.6rem)] font-black uppercase">
              <span className="bg-ember px-4 py-1 text-ink">Maru</span>
              <span className="bg-volt px-4 py-1 text-ink">& Doug</span>
            </div>
          </div>
        </Reveal>

        <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Foto */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <Image
                src={contenido?.url_imagen_pareja || "/nosotros.jpg"}
                alt="Marux y Doug, creadores de Redes y Marketting"
                width={520}
                height={620}
                className="h-[520px] w-full object-cover"
                priority
              />

              {/* Isologo flotante */}
              <div className="animate-floaty absolute -bottom-8 -right-8 h-28 w-28 md:h-32 md:w-32">
                <Image
                  src={contenido?.url_isologo_flotante || "/logonew.png"}
                  alt="Isologo de Redes y Marketting"
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
                <h3 className="text-xl font-black uppercase text-ember">
                  <TextoEnriquecido
                    texto={contenido?.titulo_porque_naranja}
                    claseNaranja="text-ember"
                    claseAmarillo="text-volt"
                  />
                </h3>
                <p>
                  <TextoEnriquecido
                    texto={contenido?.texto_porque_naranja}
                    className="whitespace-pre-line"
                  />
                </p>
                <h3 className="text-xl font-black uppercase text-ember">
                  <TextoEnriquecido
                    texto={contenido?.titulo_sobre_nosotros}
                    claseNaranja="text-ember"
                    claseAmarillo="text-volt"
                  />
                </h3>
                <p>
                  <TextoEnriquecido
                    texto={contenido?.texto_sobre_nosotros}
                    className="whitespace-pre-line"
                  />
                </p>
                <p>
                  <span className="font-black text-snow">Marux</span>:{" "}
                  <TextoEnriquecido
                    texto={contenido?.descripcion_marux}
                    className="whitespace-pre-line"
                  />
                </p>
                <p>
                  <span className="font-black text-snow">Doug</span>:{" "}
                  <TextoEnriquecido
                    texto={contenido?.descripcion_doug}
                    className="whitespace-pre-line"
                  />
                </p>
                <p>
                  <TextoEnriquecido
                    texto={contenido?.texto_enfasis_venezolanos}
                    className="whitespace-pre-line"
                  />
                </p>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                {contadores.map((contador) => (
                  <div
                    key={contador.etiqueta}
                    className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-center"
                  >
                    <p className="text-2xl font-black text-ember">
                      {contador.valor}
                    </p>
                    <p className="mt-1 text-xs font-medium text-snow/70">
                      {contador.etiqueta}
                    </p>
                  </div>
                ))}
              </div>

              {/* Firma caligráfica */}
              <div className="mt-auto pt-12 text-right">
                <DoodleHeart className="pointer-events-none absolute right-14 top-8 hidden h-8 w-8 opacity-60 lg:block" />
                <p className="font-script text-4xl text-snow md:text-5xl">
                  {contenido?.firma_texto}
                </p>
                <p className="font-script text-3xl text-ember md:text-4xl">
                  {contenido?.firma_subtitulo}
                </p>
                <DoodleScribble className="pointer-events-none ml-auto mt-1 w-32 md:w-44" />
                <p className="font-script mt-2 text-3xl text-volt md:text-4xl">
                  {contenido?.slogan}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}