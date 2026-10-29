"use client";

import { useFormState } from "react-dom";
import {
  actualizarTarjetaInicio,
  crearTarjetaInicio,
  eliminarTarjetaInicio,
  moverTarjetaInicio,
} from "@/app/admin/acciones/inicio";
import BotonEnviar from "./BotonEnviar";
import CampoImagen from "./CampoImagen";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoTexto } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

function FormularioTarjeta({ tarjeta, esNueva = false }) {
  const accion = esNueva ? crearTarjetaInicio : actualizarTarjetaInicio;
  const [estado, formAction] = useFormState(accion, estadoInicial);

  return (
    <form action={formAction} className="space-y-5">
      {!esNueva ? <input type="hidden" name="id" value={tarjeta.id} /> : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <CampoImagen
        name="url_imagen"
        label="Imagen de la tarjeta"
        defaultValue={tarjeta?.url_imagen}
        required
        carpeta="inicio"
        help="Sube una imagen o pega una ruta /archivo.jpg o una URL https://."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <CampoTexto
          name="nombre_marca"
          label="Nombre de la marca"
          defaultValue={tarjeta?.nombre_marca}
          required
          maxLength={120}
          placeholder="Dulzuras"
        />
        <CampoTexto
          name="megustas"
          label="Me gustas"
          defaultValue={tarjeta?.megustas || "0"}
          maxLength={50}
          placeholder="2.4k"
        />
        <CampoTexto
          name="comentarios"
          label="Comentarios"
          defaultValue={tarjeta?.comentarios || "0"}
          maxLength={50}
          placeholder="128"
        />
      </div>

      <div className="flex justify-end">
        <BotonEnviar>
          {esNueva ? "Agregar tarjeta" : "Guardar tarjeta"}
        </BotonEnviar>
      </div>
    </form>
  );
}

function BotonOrden({ id, direccion, children, label }) {
  return (
    <form action={moverTarjetaInicio}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direccion" value={direccion} />
      <button
        type="submit"
        aria-label={label}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-snow/60 transition hover:border-volt hover:text-volt"
      >
        {children}
      </button>
    </form>
  );
}

export default function GestorTarjetasInicio({ tarjetas = [] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black uppercase text-snow">
            Tarjetas flotantes del Hero
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Se muestran de arriba hacia abajo según el orden. Usa las flechas para
            moverlas.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-snow/50">
          {tarjetas.length} tarjetas
        </span>
      </div>

      {tarjetas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-sm text-snow/45">
          Todavía no hay tarjetas. Agrega la primera aquí abajo.
        </div>
      ) : null}

      <div className="space-y-5">
        {tarjetas.map((tarjeta, indice) => (
          <article
            key={tarjeta.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember text-xs font-black text-ink">
                  {indice + 1}
                </span>
                <p className="text-sm font-black uppercase tracking-wide text-snow/80">
                  {tarjeta.nombre_marca || "Tarjeta sin nombre"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <BotonOrden
                  id={tarjeta.id}
                  direccion="subir"
                  label={`Mover ${tarjeta.nombre_marca} hacia arriba`}
                >
                  ↑
                </BotonOrden>
                <BotonOrden
                  id={tarjeta.id}
                  direccion="bajar"
                  label={`Mover ${tarjeta.nombre_marca} hacia abajo`}
                >
                  ↓
                </BotonOrden>
                <form
                  action={eliminarTarjetaInicio}
                  onSubmit={(evento) => {
                    if (
                      !window.confirm(
                        `¿Eliminar la tarjeta "${tarjeta.nombre_marca}"? Esta acción no se puede deshacer.`
                      )
                    ) {
                      evento.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={tarjeta.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-red-200 transition hover:bg-red-400 hover:text-ink"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>

            <FormularioTarjeta tarjeta={tarjeta} />
          </article>
        ))}
      </div>

      <details className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-wide text-ember">
          + Agregar nueva tarjeta
        </summary>
        <div className="mt-5">
          <FormularioTarjeta tarjeta={null} esNueva />
        </div>
      </details>
    </div>
  );
}
