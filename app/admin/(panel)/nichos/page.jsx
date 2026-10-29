import { obtenerNichosAdmin } from "@/lib/admin/datos";
import { AvisoError } from "@/components/admin/Aviso";
import GestorNichos from "@/components/admin/GestorNichos";

export const metadata = {
  title: "Nichos",
};

export default async function PaginaNichosAdmin() {
  const nichos = await obtenerNichosAdmin();

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-ember/20 bg-ember/[0.06] px-5 py-4">
        <p className="text-sm leading-relaxed text-snow/65">
          <strong className="text-ember">Nichos.</strong> Cada nicho tiene su
          tarjeta, descripción, feed de Instagram y lista de clientes. El orden
          de las tarjetas se controla con las flechas.
        </p>
      </div>

      {nichos.error ? <AvisoError>{nichos.error}</AvisoError> : null}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <GestorNichos nichos={nichos.datos || []} />
      </section>
    </div>
  );
}
