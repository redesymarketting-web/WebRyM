import { whatsappHref } from "@/lib/planes";

export const SERVICIOS_WEB = [
  {
    id: "landing",
    icon: "landing",
    title: "Landing Pages de Alta Conversión",
    desc: "Diseñadas estratégicamente para captar y atraer a los leads que de verdad se ajustan a tu nicho.",
  },
  {
    id: "medida",
    icon: "web",
    title: "Páginas Web a Medida",
    desc: "Estéticas y funcionales, creadas para transmitir con precisión la identidad y el propósito de tu marca.",
  },
  {
    id: "dinamicos",
    icon: "panel",
    title: "Sitios Estáticos y Dinámicos",
    desc: "Totalmente autoadministrables, equipados con un panel de control intuitivo para que tengas el dominio absoluto de tu contenido.",
  },
];

export const PORTAFOLIO_WEB = [
  {
    id: "dlr",
    nombre: "DLR Transaction Coordinator",
    descripcion:
      "Sitio creado para marca en Naples, Florida dedicada a la Coordinación de Transacciones Inmobiliarias en: SouthWest Florida - Orlando - Miami - Tampa",
    url: "https://www.dlr-transactioncoordinator.com/",
  },
];

export const PROYECTO_WEB_MENSAJE =
  "Hola Redes y Marketting, quiero crear o renovar mi sitio web y quiero cotizar";

export function proyectoWebHref() {
  return whatsappHref(PROYECTO_WEB_MENSAJE);
}