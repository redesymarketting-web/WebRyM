"use client";

import { useFormState } from "react-dom";
import {
  eliminarServicioWeb,
  guardarServicioWeb,
  moverServicioWeb,
} from "@/app/admin/acciones/desarrolloWeb";
import BotonEnviar from "./BotonEnviar";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoSelect, CampoTextarea, CampoTexto } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

const opcionesIcono = [
  { value: "landing", label: "Landing page" },
  { value: "web", label: "Página web" },
  { value: "panel", label: "Panel autoadministrable" },
];

function FormularioServicio({ servicio, esNuevo = false }) {
  const [estado, formAction] = useFormState(
    guardarServicioWeb,
    estadoInicial
  );

  return (
    <form action={formAction} className="space-y-4">
      {!esNuevo ? (
        <input type="hidden" name="id" value={servicio.id} />
      ) : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <CampoTexto
          name="titulo"
          label="Título del servicio"
          defaultValue={servicio?.titulo}
          required
          maxLength={180}
          placeholder="Landing Pages de Alta Conversión"
        />
        <CampoSelect
          name="icono"
          label="Icono del servicio"
          defaultValue={servicio?.icono || "web"}
          options={opcionesIcono}
        />
      </div>

      <CampoTextarea
        name="descripcion"
        label="Descripción"
        defaultValue={servicio?.descripcion}
        required
        rows={3}
        maxLength={2500}
        placeholder="Diseñadas estratégicamente para captar y atraer a los leads..."
      />

      <div className="flex justify-end">
        <BotonEnviar>
          {esNuevo ? "Agregar servicio" : "Guardar servicio"}
        </BotonEnviar>
      </div>
    </form>
  );
}

function BotonOrden({ id, direccion, children, label }) {
  return (
    <form action={moverServicioWeb}>
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

export default function GestorServiciosWeb({ servicios = [] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black uppercase text-snow">
            Servicios de Desarrollo Web
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Administra los servicios que aparecen en el modal de Desarrollo Web.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-snow/50">
          {servicios.length} servicios
        </span>
      </div>

      {servicios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-sm text-snow/45">
          Todavía no hay servicios. Crea el primero aquí abajo.
        </div>
      ) : null}

      <div className="space-y-4">
        {servicios.map((servicio, indice) => (
          <article
            key={servicio.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember text-xs font-black text-ink">
                  {indice + 1}
                </span>
                <p className="text-sm font-black uppercase tracking-wide text-snow/80">
                  {servicio.titulo || "Servicio sin título"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <BotonOrden
                  id={servicio.id}
                  direccion="subir"
                  label={`Mover ${servicio.titulo} hacia arriba`}
                >
                  ↑
                </BotonOrden>
                <BotonOrden
                  id={servicio.id}
                  direccion="bajar"
                  label={`Mover ${servicio.titulo} hacia abajo`}
                >
                  ↓
                </BotonOrden>
                <form
                  action={eliminarServicioWeb}
                  onSubmit={(evento) => {
                    if (
                      !window.confirm(
                        `¿Eliminar el servicio "${servicio.titulo}"? Esta acción no se puede deshacer.`
                      )
                    ) {
                      evento.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={servicio.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-red-200 transition hover:bg-red-400 hover:text-ink"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>

            <FormularioServicio servicio={servicio} />
          </article>
        ))}
      </div>

      <details className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-wide text-ember">
          + Agregar servicio
        </summary>
        <div className="mt-5">
          <FormularioServicio servicio={null} esNuevo />
        </div>
      </details>
    </div>
  );
}
