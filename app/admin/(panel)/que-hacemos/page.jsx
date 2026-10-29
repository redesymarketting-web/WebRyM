import { obtenerPlanesAdmin } from "@/lib/admin/datos";
import { AvisoError } from "@/components/admin/Aviso";
import GestorPlanes from "@/components/admin/GestorPlanes";

export const metadata = {
  title: "Qué Hacemos",
};

export default async function PaginaQueHacemosAdmin() {
  const planes = await obtenerPlanesAdmin();

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-ember/20 bg-ember/[0.06] px-5 py-4">
        <p className="text-sm leading-relaxed text-snow/65">
          <strong className="text-ember">Planes de gestión de redes.</strong> El
          orden de esta lista es el mismo que se muestra en el modal del sitio.
          Cada plan abre WhatsApp con el mensaje configurado.
        </p>
      </div>

      {planes.error ? <AvisoError>{planes.error}</AvisoError> : null}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <GestorPlanes planes={planes.datos || []} />
      </section>
    </div>
  );
}
