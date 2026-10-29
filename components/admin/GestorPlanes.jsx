"use client";

import { useFormState } from "react-dom";
import {
  eliminarPlan,
  guardarPlan,
  moverPlan,
} from "@/app/admin/acciones/planes";
import BotonEnviar from "./BotonEnviar";
import ListaTexto from "./ListaTexto";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoSelect, CampoTextarea, CampoTexto } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

const opcionesIcono = [
  { value: "paint", label: "Paleta / Identidad visual" },
  { value: "rocket", label: "Cohete / Lanzamiento" },
  { value: "chat", label: "Chat / Asesoría" },
  { value: "chart", label: "Gráfico / Estrategia" },
];

function FormularioPlan({ plan, esNuevo = false }) {
  const [estado, formAction] = useFormState(guardarPlan, estadoInicial);

  return (
    <form action={formAction} className="space-y-5">
      {!esNuevo ? <input type="hidden" name="id" value={plan.id} /> : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <CampoTexto
          name="nombre_plan"
          label="Nombre del plan"
          defaultValue={plan?.nombre_plan}
          required
          maxLength={160}
          placeholder="PLAN INICIAL"
        />
        <CampoSelect
          name="icono"
          label="Icono del plan"
          defaultValue={plan?.icono || "chat"}
          options={opcionesIcono}
        />
      </div>

      <CampoTexto
        name="subtitulo"
        label="Subtítulo"
        defaultValue={plan?.subtitulo}
        required
        maxLength={300}
        placeholder="20 publicaciones mensuales con estrategia y diseño."
      />

      <ListaTexto
        name="caracteristicas"
        label="Características"
        defaultValue={plan?.caracteristicas || []}
        placeholder="Ej: Diseño de logo"
        help="Cada línea se mostrará como un punto dentro del plan."
      />

      <CampoTextarea
        name="nota_destacada"
        label="Nota destacada"
        defaultValue={plan?.nota_destacada}
        rows={4}
        maxLength={2500}
        help="Opcional. Se muestra resaltada en naranja dentro del plan."
      />

      <CampoTexto
        name="url_boton_whatsapp"
        label="URL del botón de WhatsApp"
        defaultValue={plan?.url_boton_whatsapp}
        required
        maxLength={2000}
        placeholder="https://wa.me/584125012969?text=Hola..."
        help="Debe ser una URL completa de WhatsApp."
      />

      <div className="flex justify-end">
        <BotonEnviar>{esNuevo ? "Crear plan" : "Guardar plan"}</BotonEnviar>
      </div>
    </form>
  );
}

function BotonOrden({ id, direccion, children, label }) {
  return (
    <form action={moverPlan}>
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

export default function GestorPlanes({ planes = [] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black uppercase text-snow">
            Planes de Gestión de Redes
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Administra los planes que aparecen en el modal de la sección ¿Qué
            Hacemos?
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-snow/50">
          {planes.length} planes
        </span>
      </div>

      {planes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-sm text-snow/45">
          Todavía no hay planes. Crea el primero aquí abajo.
        </div>
      ) : null}

      <div className="space-y-5">
        {planes.map((plan, indice) => (
          <article
            key={plan.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-volt text-xs font-black text-ink">
                  {indice + 1}
                </span>
                <p className="text-sm font-black uppercase tracking-wide text-snow/80">
                  {plan.nombre_plan || "Plan sin nombre"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <BotonOrden
                  id={plan.id}
                  direccion="subir"
                  label={`Mover ${plan.nombre_plan} hacia arriba`}
                >
                  ↑
                </BotonOrden>
                <BotonOrden
                  id={plan.id}
                  direccion="bajar"
                  label={`Mover ${plan.nombre_plan} hacia abajo`}
                >
                  ↓
                </BotonOrden>
                <form
                  action={eliminarPlan}
                  onSubmit={(evento) => {
                    if (
                      !window.confirm(
                        `¿Eliminar el plan "${plan.nombre_plan}"? Esta acción no se puede deshacer.`
                      )
                    ) {
                      evento.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={plan.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-red-200 transition hover:bg-red-400 hover:text-ink"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>

            <FormularioPlan plan={plan} />
          </article>
        ))}
      </div>

      <details className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-wide text-ember">
          + Crear nuevo plan
        </summary>
        <div className="mt-5">
          <FormularioPlan plan={null} esNuevo />
        </div>
      </details>
    </div>
  );
}
