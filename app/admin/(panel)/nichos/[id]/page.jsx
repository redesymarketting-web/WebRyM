import Link from "next/link";
import { notFound } from "next/navigation";
import {
  obtenerClientesNichoAdmin,
  obtenerNichoAdmin,
} from "@/lib/admin/datos";
import { AvisoError } from "@/components/admin/Aviso";
import FormularioNicho from "@/components/admin/FormularioNicho";
import GestorClientesNicho from "@/components/admin/GestorClientesNicho";

export const metadata = {
  title: "Editar nicho",
};

export default async function PaginaEditarNicho({ params }) {
  const { id } = params;
  const [nicho, clientes] = await Promise.all([
    obtenerNichoAdmin(id),
    obtenerClientesNichoAdmin(id),
  ]);

  if (nicho.error) {
    return (
      <div className="space-y-5">
        <AvisoError>{nicho.error}</AvisoError>
        <Link
          href="/admin/nichos"
          className="inline-flex text-xs font-black uppercase tracking-widest text-snow/40 transition hover:text-ember"
        >
          ← Volver a nichos
        </Link>
      </div>
    );
  }

  if (!nicho.datos) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/nichos"
            className="text-xs font-black uppercase tracking-widest text-snow/40 transition hover:text-ember"
          >
            ← Volver a nichos
          </Link>
          <h2 className="mt-2 text-2xl font-black uppercase text-snow">
            {nicho.datos.titulo_tarjeta}
          </h2>
          <p className="mt-1 text-sm text-snow/45">
            Slug: <span className="text-ember">/{nicho.datos.slug}</span>
          </p>
        </div>
        <Link
          href="/#nicho"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-black uppercase tracking-wide text-snow/60 transition hover:border-volt hover:text-volt"
        >
          Ver en el sitio ↗
        </Link>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <FormularioNicho nicho={nicho.datos} />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        {clientes.error ? <AvisoError>{clientes.error}</AvisoError> : null}
        <div className={clientes.error ? "mt-5" : ""}>
          <GestorClientesNicho
            nichoId={nicho.datos.id}
            clientes={clientes.datos || []}
          />
        </div>
      </section>
    </div>
  );
}
