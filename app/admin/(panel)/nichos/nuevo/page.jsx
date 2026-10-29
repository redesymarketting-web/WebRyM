import Link from "next/link";
import FormularioNicho from "@/components/admin/FormularioNicho";

export const metadata = {
  title: "Nuevo nicho",
};

export default function PaginaNuevoNicho() {
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/nichos"
            className="text-xs font-black uppercase tracking-widest text-snow/40 transition hover:text-ember"
          >
            ← Volver a nichos
          </Link>
          <h2 className="mt-2 text-2xl font-black uppercase text-snow">
            Crear nuevo nicho
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Después de guardar podrás administrar sus clientes y sus imágenes de
            feed.
          </p>
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <FormularioNicho nicho={null} esNuevo />
      </section>
    </div>
  );
}
