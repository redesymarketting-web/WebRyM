import { obtenerSobreNosotrosAdmin } from "@/lib/admin/datos";
import { AvisoError } from "@/components/admin/Aviso";
import FormularioSobreNosotros from "@/components/admin/FormularioSobreNosotros";

export const metadata = {
  title: "Sobre Nosotros",
};

export default async function PaginaSobreNosotrosAdmin() {
  const seccion = await obtenerSobreNosotrosAdmin();

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-ember/20 bg-ember/[0.06] px-5 py-4">
        <p className="text-sm leading-relaxed text-snow/65">
          <strong className="text-ember">Sobre Nosotros.</strong> Actualiza la
          historia, las biografías, los contadores y la firma que aparecen en el
          sitio. Usa **texto** para naranja y __texto__ para amarillo.
        </p>
      </div>

      {seccion.error ? <AvisoError>{seccion.error}</AvisoError> : null}

      <FormularioSobreNosotros seccion={seccion.datos} />
    </div>
  );
}
