"use client";

import { useFormState } from "react-dom";
import { guardarNicho } from "@/app/admin/acciones/nichos";
import BotonEnviar from "./BotonEnviar";
import CampoImagen from "./CampoImagen";
import ListaTexto from "./ListaTexto";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoSelect, CampoTextarea, CampoTexto, Etiqueta } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

const opcionesIcono = [
  { value: "postres", label: "Postres / Repostería" },
  { value: "dojos", label: "Dojos / Gimnasios" },
  { value: "realestate", label: "Real Estate / Inmobiliaria" },
  { value: "talleres", label: "Talleres automotrices" },
  { value: "makeup", label: "Makeup / Belleza" },
];

export default function FormularioNicho({ nicho, esNuevo = false }) {
  const [estado, formAction] = useFormState(guardarNicho, estadoInicial);
  const carpeta = `nichos/${nicho?.slug || "nuevo"}`;

  return (
    <form action={formAction} className="space-y-7">
      {!esNuevo ? <input type="hidden" name="id" value={nicho.id} /> : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-ember">
          Identificación del nicho
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <CampoTexto
            name="titulo_tarjeta"
            label="Título de la tarjeta"
            defaultValue={nicho?.titulo_tarjeta}
            required
            maxLength={120}
            placeholder="POSTRES"
          />
          <CampoTexto
            name="slug"
            label="Slug"
            defaultValue={nicho?.slug}
            required
            maxLength={100}
            placeholder="postres"
            help="Solo letras minúsculas, números y guiones. Debe ser único."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CampoSelect
            name="icono"
            label="Icono"
            defaultValue={nicho?.icono || "postres"}
            options={opcionesIcono}
          />
          <div>
            <Etiqueta>Color principal</Etiqueta>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="color_primario"
                defaultValue={nicho?.color_primario || "#f7651c"}
                className="h-11 w-16 cursor-pointer rounded-lg border border-white/10 bg-ink p-1"
              />
              <p className="text-xs text-snow/45">
                Se usa como acento de la etiqueta de categoría.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CampoTexto
            name="etiqueta_categoria"
            label="Etiqueta de categoría"
            defaultValue={nicho?.etiqueta_categoria}
            required
            maxLength={120}
            placeholder="SWEET BRANDING"
          />
        </div>

        <CampoImagen
          name="url_imagen_tarjeta"
          label="Imagen de la tarjeta"
          defaultValue={nicho?.url_imagen_tarjeta}
          required
          carpeta={carpeta}
          help="Imagen vertical que se ve en la tarjeta del nicho."
        />
      </section>

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-black uppercase tracking-widest text-ember">
          Descripción y etiquetas
        </h2>

        <CampoTexto
          name="titulo_descripcion"
          label="Título descriptivo"
          defaultValue={nicho?.titulo_descripcion}
          required
          maxLength={250}
          placeholder="PASTELERÍAS QUE VENDEN CON LOS OJOS"
        />

        <CampoTextarea
          name="texto_descripcion"
          label="Texto descriptivo"
          defaultValue={nicho?.texto_descripcion}
          required
          rows={4}
          maxLength={2500}
          placeholder="Diseño de marca colorido, fotos de producto irresistibles..."
        />

        <ListaTexto
          name="etiquetas_destacadas"
          label="Etiquetas destacadas"
          defaultValue={nicho?.etiquetas_destacadas || []}
          placeholder="Ej: Diseño exclusivo"
          help="Se muestran como tres bloques debajo de la descripción."
          maxElementos={12}
        />
      </section>

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-ember">
            Feed de Instagram
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Tres imágenes que se muestran en la vista previa del feed.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <CampoImagen
            name="url_imagen_feed_1"
            label="Imagen de feed 1"
            defaultValue={nicho?.url_imagen_feed_1}
            carpeta={`${carpeta}/feed`}
          />
          <CampoImagen
            name="url_imagen_feed_2"
            label="Imagen de feed 2"
            defaultValue={nicho?.url_imagen_feed_2}
            carpeta={`${carpeta}/feed`}
          />
          <CampoImagen
            name="url_imagen_feed_3"
            label="Imagen de feed 3"
            defaultValue={nicho?.url_imagen_feed_3}
            carpeta={`${carpeta}/feed`}
          />
        </div>
      </section>

      <div className="flex justify-end border-t border-white/10 pt-5">
        <BotonEnviar>
          {esNuevo ? "Crear nicho" : "Guardar nicho"}
        </BotonEnviar>
      </div>
    </form>
  );
}
