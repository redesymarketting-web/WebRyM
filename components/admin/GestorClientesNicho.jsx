"use client";

import { useFormState } from "react-dom";
import {
  eliminarClienteNicho,
  guardarClienteNicho,
  moverClienteNicho,
} from "@/app/admin/acciones/nichos";
import BotonEnviar from "./BotonEnviar";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoTextarea, CampoTexto } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

function FormularioCliente({ nichoId, cliente, esNuevo = false }) {
  const [estado, formAction] = useFormState(
    guardarClienteNicho,
    estadoInicial
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="nicho_id" value={nichoId} />
      {!esNuevo ? <input type="hidden" name="id" value={cliente.id} /> : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <CampoTexto
          name="nombre_cliente"
          label="Nombre del cliente"
          defaultValue={cliente?.nombre_cliente}
          required
          maxLength={180}
          placeholder="Dulzuras by IR"
        />
        <CampoTexto
          name="estado"
          label="Estado"
          defaultValue={cliente?.estado || "SITIO EN VIVO"}
          maxLength={80}
          placeholder="SITIO EN VIVO"
        />
      </div>

      <CampoTextarea
        name="descripcion_cliente"
        label="Descripción"
        defaultValue={cliente?.descripcion_cliente}
        rows={3}
        maxLength={2500}
        placeholder="Marca de postres con especialidad en Alfajores"
      />

      <CampoTexto
        name="url_sitio"
        label="URL del sitio o perfil"
        defaultValue={cliente?.url_sitio}
        maxLength={2000}
        placeholder="https://www.instagram.com/..."
        help="Acepta https://, mailto:, tel:, rutas internas o anclas."
      />

      <div className="flex justify-end">
        <BotonEnviar>
          {esNuevo ? "Agregar cliente" : "Guardar cliente"}
        </BotonEnviar>
      </div>
    </form>
  );
}

function BotonOrden({ nichoId, cliente, direccion, children, label }) {
  return (
    <form action={moverClienteNicho}>
      <input type="hidden" name="nicho_id" value={nichoId} />
      <input type="hidden" name="id" value={cliente.id} />
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

export default function GestorClientesNicho({ nichoId, clientes = [] }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black uppercase text-snow">
            Clientes que confían
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Clientes asociados a este nicho. Se muestran en el modal de la landing.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-snow/50">
          {clientes.length} clientes
        </span>
      </div>

      {clientes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-sm text-snow/45">
          Este nicho todavía no tiene clientes.
        </div>
      ) : null}

      <div className="space-y-4">
        {clientes.map((cliente, indice) => (
          <article
            key={cliente.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember text-xs font-black text-ink">
                  {indice + 1}
                </span>
                <p className="text-sm font-black uppercase tracking-wide text-snow/80">
                  {cliente.nombre_cliente || "Cliente sin nombre"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <BotonOrden
                  nichoId={nichoId}
                  cliente={cliente}
                  direccion="subir"
                  label={`Mover ${cliente.nombre_cliente} hacia arriba`}
                >
                  ↑
                </BotonOrden>
                <BotonOrden
                  nichoId={nichoId}
                  cliente={cliente}
                  direccion="bajar"
                  label={`Mover ${cliente.nombre_cliente} hacia abajo`}
                >
                  ↓
                </BotonOrden>
                <form
                  action={eliminarClienteNicho}
                  onSubmit={(evento) => {
                    if (
                      !window.confirm(
                        `¿Eliminar el cliente "${cliente.nombre_cliente}"? Esta acción no se puede deshacer.`
                      )
                    ) {
                      evento.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="nicho_id" value={nichoId} />
                  <input type="hidden" name="id" value={cliente.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-red-200 transition hover:bg-red-400 hover:text-ink"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>

            <FormularioCliente nichoId={nichoId} cliente={cliente} />
          </article>
        ))}
      </div>

      <details className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-wide text-ember">
          + Agregar cliente a este nicho
        </summary>
        <div className="mt-5">
          <FormularioCliente nichoId={nichoId} cliente={null} esNuevo />
        </div>
      </details>
    </section>
  );
}
