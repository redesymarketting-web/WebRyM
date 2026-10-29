import { requerirAdmin } from "@/lib/admin/guardia";
import PanelAdmin from "@/components/admin/PanelAdmin";
import { AvisoConfiguracion } from "@/components/admin/Aviso";

export default async function LayoutPanel({ children }) {
  const estado = await requerirAdmin();

  if (!estado.configurado) {
    return <AvisoConfiguracion />;
  }

  return <PanelAdmin correo={estado.correo}>{children}</PanelAdmin>;
}
