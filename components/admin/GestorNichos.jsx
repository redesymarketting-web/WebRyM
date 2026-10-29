"use client";

import Link from "next/link";
import { eliminarNicho, moverNicho } from "@/app/admin/acciones/nichos";

function BotonOrden({ nicho, direccion, children, label }) {
  return (
    <form action={moverNicho}>
      <input type="hidden" name="id" value={nicho.id} />
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

export default function GestorNichos({ nichos = [] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black uppercase text-snow">
            Tarjetas de nicho
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Administra los nichos, su descripción, feed y clientes.
          </p>
        </div>
        <Link
          href="/admin/nichos/nuevo"
          className="rounded-full bg-ember px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-volt"
        >
          + Nuevo nicho
        </Link>
      </div>

      {nichos.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 px-5 py-12 text-center">
          <p className="text-sm text-snow/45">
            Todavía no hay nichos registrados.
          </p>
          <Link
            href="/admin/nichos/nuevo"
            className="mt-4 inline-flex rounded-full bg-ember px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-volt"
          >
            Crear el primero
          </Link>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        {nichos.map((nicho, indice) => (
          <article
            key={nicho.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-ink">
              {nicho.url_imagen_tarjeta ? (
                <img
                  src={nicho.url_imagen_tarjeta}
                  alt={`Imagen del nicho ${nicho.titulo_tarjeta}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs font-bold uppercase tracking-wide text-snow/30">
                  Sin imagen
                </div>
              )}
              <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/90 text-xs font-black text-volt">
                {indice + 1}
              </span>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-lg font-black uppercase text-snow">
                  {nicho.titulo_tarjeta || "Nicho sin título"}
                </p>
                <p className="mt-1 text-xs font-semibold text-ember">
                  /{nicho.slug}
                </p>
                {nicho.etiqueta_categoria ? (
                  <p className="mt-2 inline-flex rounded-full bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-snow/55">
                    {nicho.etiqueta_categoria}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/nichos/${nicho.id}`}
                  className="rounded-full border border-ember/40 bg-ember/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-ember transition hover:bg-ember hover:text-ink"
                >
                  Editar nicho
                </Link>

                <BotonOrden
                  nicho={nicho}
                  direccion="subir"
                  label={`Mover ${nicho.titulo_tarjeta} hacia arriba`}
                >
                  ↑
                </BotonOrden>
                <BotonOrden
                  nicho={nicho}
                  direccion="bajar"
                  label={`Mover ${nicho.titulo_tarjeta} hacia abajo`}
                >
                  ↓
                </BotonOrden>

                <form
                  action={eliminarNicho}
                  onSubmit={(evento) => {
                    if (
                      !window.confirm(
                        `¿Eliminar el nicho "${nicho.titulo_tarjeta}" y todos sus clientes? Esta acción no se puede deshacer.`
                      )
                    ) {
                      evento.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={nicho.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-200 transition hover:bg-red-400 hover:text-ink"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
