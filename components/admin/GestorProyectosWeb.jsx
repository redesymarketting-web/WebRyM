"use client";

import { useFormState } from "react-dom";
import {
  eliminarProyectoWeb,
  guardarProyectoWeb,
  moverProyectoWeb,
} from "@/app/admin/acciones/desarrolloWeb";
import BotonEnviar from "./BotonEnviar";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoTextarea, CampoTexto } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

function FormularioProyecto({ proyecto, esNuevo = false }) {
  const [estado, formAction] = useFormState(
    guardarProyectoWeb,
    estadoInicial
  );

  return (
    <form action={formAction} className="space-y-4">
      {!esNuevo ? (
        <input type="hidden" name="id" value={proyecto.id} />
      ) : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <CampoTexto
        name="nombre"
        label="Nombre del proyecto"
        defaultValue={proyecto?.nombre}
        required
        maxLength={180}
        placeholder="DLR Transaction Coordinator"
      />

      <CampoTextarea
        name="descripcion"
        label="Descripción"
        defaultValue={proyecto?.descripcion}
        required
        rows={3}
        maxLength={2500}
        placeholder="Sitio creado para marca en Naples, Florida..."
      />

      <CampoTexto
        name="url_sitio"
        label="URL del sitio"
        defaultValue={proyecto?.url_sitio}
        required
        maxLength={2000}
        placeholder="https://www.ejemplo.com/"
        help="Debe iniciar con http:// o https://."
      />

      <div className="flex justify-end">
        <BotonEnviar>
          {esNuevo ? "Agregar proyecto" : "Guardar proyecto"}
        </BotonEnviar>
      </div>
    </form>
  );
}

function BotonOrden({ id, direccion, children, label }) {
  return (
    <form action={moverProyectoWeb}>
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

export default function GestorProyectosWeb({ proyectos = [] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black uppercase text-snow">
            Portafolio de Desarrollo Web
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Proyectos que aparecen publicados en el modal de Desarrollo Web.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-snow/50">
          {proyectos.length} proyectos
        </span>
      </div>

      {proyectos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-sm text-snow/45">
          Todavía no hay proyectos. Crea el primero aquí abajo.
        </div>
      ) : null}

      <div className="space-y-4">
        {proyectos.map((proyecto, indice) => (
          <article
            key={proyecto.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-volt text-xs font-black text-ink">
                  {indice + 1}
                </span>
                <p className="text-sm font-black uppercase tracking-wide text-snow/80">
                  {proyecto.nombre || "Proyecto sin nombre"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <BotonOrden
                  id={proyecto.id}
                  direccion="subir"
                  label={`Mover ${proyecto.nombre} hacia arriba`}
                >
                  ↑
                </BotonOrden>
                <BotonOrden
                  id={proyecto.id}
                  direccion="bajar"
                  label={`Mover ${proyecto.nombre} hacia abajo`}
                >
                  ↓
                </BotonOrden>
                <form
                  action={eliminarProyectoWeb}
                  onSubmit={(evento) => {
                    if (
                      !window.confirm(
                        `¿Eliminar el proyecto "${proyecto.nombre}"? Esta acción no se puede deshacer.`
                      )
                    ) {
                      evento.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={proyecto.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-red-200 transition hover:bg-red-400 hover:text-ink"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>

            <FormularioProyecto proyecto={proyecto} />
          </article>
        ))}
      </div>

      <details className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-wide text-ember">
          + Agregar proyecto
        </summary>
        <div className="mt-5">
          <FormularioProyecto proyecto={null} esNuevo />
        </div>
      </details>
    </div>
  );
}
