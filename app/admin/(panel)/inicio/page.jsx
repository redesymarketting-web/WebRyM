import {
  obtenerSeccionInicioAdmin,
  obtenerTarjetasInicioAdmin,
} from "@/lib/admin/datos";
import { AvisoError } from "@/components/admin/Aviso";
import FormularioSeccionInicio from "@/components/admin/FormularioSeccionInicio";
import GestorTarjetasInicio from "@/components/admin/GestorTarjetasInicio";

export const metadata = {
  title: "Inicio",
};

export default async function PaginaInicioAdmin() {
  const [seccion, tarjetas] = await Promise.all([
    obtenerSeccionInicioAdmin(),
    obtenerTarjetasInicioAdmin(),
  ]);

  const error = seccion.error || tarjetas.error;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-ember/20 bg-ember/[0.06] px-5 py-4">
        <p className="text-sm leading-relaxed text-snow/65">
          <strong className="text-ember">Sección de inicio.</strong> Edita el
          título principal, los botones y las tarjetas flotantes que se muestran
          en el Hero del sitio.
        </p>
      </div>

      {error ? <AvisoError>{error}</AvisoError> : null}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <div className="mb-6">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-ember">
            Hero
          </p>
          <h2 className="mt-1 text-xl font-black uppercase text-snow">
            Textos principales
          </h2>
          <p className="mt-1 text-sm text-snow/50">
            Los saltos de línea del título se respetan en el sitio.
          </p>
        </div>

        <FormularioSeccionInicio seccion={seccion.datos} />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <GestorTarjetasInicio tarjetas={tarjetas.datos || []} />
      </section>
    </div>
  );
}
