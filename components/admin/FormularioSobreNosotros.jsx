"use client";

import { useFormState } from "react-dom";
import { guardarSobreNosotros } from "@/app/admin/acciones/sobre-nosotros";
import BotonEnviar from "./BotonEnviar";
import CampoImagen from "./CampoImagen";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoTextarea, CampoTexto } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

export default function FormularioSobreNosotros({ seccion }) {
  const [estado, formAction] = useFormState(
    guardarSobreNosotros,
    estadoInicial
  );

  return (
    <form action={formAction} className="space-y-7">
      {seccion?.id ? <input type="hidden" name="id" value={seccion.id} /> : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-ember">
          Imágenes
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <CampoImagen
            name="url_imagen_pareja"
            label="Imagen de Marux y Doug"
            defaultValue={seccion?.url_imagen_pareja}
            required
            carpeta="sobre-nosotros"
          />
          <CampoImagen
            name="url_isologo_flotante"
            label="Isologo flotante"
            defaultValue={seccion?.url_isologo_flotante}
            required
            carpeta="sobre-nosotros"
          />
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-ember">
          ¿Por qué somos naranja?
        </h2>
        <CampoTexto
          name="titulo_porque_naranja"
          label="Título"
          defaultValue={seccion?.titulo_porque_naranja}
          required
          maxLength={250}
          placeholder="¿POR QUÉ SOMOS NARANJA?"
        />
        <CampoTextarea
          name="texto_porque_naranja"
          label="Texto"
          defaultValue={seccion?.texto_porque_naranja}
          required
          rows={5}
          maxLength={4000}
          help="Usa **texto** para resaltar en naranja y __texto__ para resaltar en amarillo."
        />
      </section>

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-ember">
          Sobre nosotros
        </h2>
        <CampoTexto
          name="titulo_sobre_nosotros"
          label="Título"
          defaultValue={seccion?.titulo_sobre_nosotros}
          required
          maxLength={250}
          placeholder="SOBRE NOSOTROS"
        />
        <CampoTextarea
          name="texto_sobre_nosotros"
          label="Texto principal"
          defaultValue={seccion?.texto_sobre_nosotros}
          required
          rows={7}
          maxLength={6000}
          help="Puedes usar **texto** y __texto__ para resaltados."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <CampoTextarea
            name="descripcion_marux"
            label="Descripción de Marux"
            defaultValue={seccion?.descripcion_marux}
            required
            rows={4}
            maxLength={3000}
          />
          <CampoTextarea
            name="descripcion_doug"
            label="Descripción de Doug"
            defaultValue={seccion?.descripcion_doug}
            required
            rows={4}
            maxLength={3000}
          />
        </div>
        <CampoTextarea
          name="texto_enfasis_venezolanos"
          label="Texto de énfasis venezolano"
          defaultValue={seccion?.texto_enfasis_venezolanos}
          required
          rows={5}
          maxLength={3000}
          help="Puedes usar __texto__ para resaltar la frase final en amarillo."
        />
      </section>

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-ember">
          Contadores
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <CampoTexto
            name="valor_marcas_potenciadas"
            label="Marcas potenciadas"
            defaultValue={seccion?.valor_marcas_potenciadas || "10+"}
            required
            maxLength={30}
            placeholder="10+"
          />
          <CampoTexto
            name="valor_proyectos_disenados"
            label="Proyectos diseñados"
            defaultValue={seccion?.valor_proyectos_disenados || "100+"}
            required
            maxLength={30}
            placeholder="100+"
          />
          <CampoTexto
            name="valor_anos_estrategia"
            label="Años de estrategia"
            defaultValue={seccion?.valor_anos_estrategia || "3+"}
            required
            maxLength={30}
            placeholder="3+"
          />
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-ember">
          Firma y slogan
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <CampoTexto
            name="firma_texto"
            label="Firma"
            defaultValue={seccion?.firma_texto}
            required
            maxLength={180}
            placeholder="Marux y Doug"
          />
          <CampoTexto
            name="firma_subtitulo"
            label="Subtítulo de la firma"
            defaultValue={seccion?.firma_subtitulo}
            required
            maxLength={180}
            placeholder="Redes y Marketting"
          />
        </div>
        <CampoTexto
          name="slogan"
          label="Slogan"
          defaultValue={seccion?.slogan}
          required
          maxLength={250}
          placeholder="Somos Diferentes para Ti"
        />
      </section>

      <div className="flex justify-end border-t border-white/10 pt-5">
        <BotonEnviar>Guardar Sobre Nosotros</BotonEnviar>
      </div>
    </form>
  );
}
