import {
  obtenerPlanesAdmin,
  obtenerProyectosWebAdmin,
  obtenerServiciosWebAdmin,
} from "@/lib/admin/datos";
import { AvisoError } from "@/components/admin/Aviso";
import GestorPlanes from "@/components/admin/GestorPlanes";
import GestorProyectosWeb from "@/components/admin/GestorProyectosWeb";
import GestorServiciosWeb from "@/components/admin/GestorServiciosWeb";

export const metadata = {
  title: "Qué Hacemos",
};

export default async function PaginaQueHacemosAdmin() {
  const [planes, servicios, proyectos] = await Promise.all([
    obtenerPlanesAdmin(),
    obtenerServiciosWebAdmin(),
    obtenerProyectosWebAdmin(),
  ]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-ember/20 bg-ember/[0.06] px-5 py-4">
        <p className="text-sm leading-relaxed text-snow/65">
          <strong className="text-ember">¿Qué Hacemos?</strong> Administra los
          planes de gestión de redes, los servicios de desarrollo web y el
          portafolio publicado. El orden de cada lista es el mismo que se muestra
          en las modales del sitio.
        </p>
      </div>

      {planes.error ? <AvisoError>{planes.error}</AvisoError> : null}
      {servicios.error ? <AvisoError>{servicios.error}</AvisoError> : null}
      {proyectos.error ? <AvisoError>{proyectos.error}</AvisoError> : null}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <GestorPlanes planes={planes.datos || []} />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <GestorServiciosWeb servicios={servicios.datos || []} />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <GestorProyectosWeb proyectos={proyectos.datos || []} />
      </section>
    </div>
  );
}
