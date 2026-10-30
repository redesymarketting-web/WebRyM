import { whatsappHref } from "@/lib/planes";

export const PROYECTO_WEB_MENSAJE =
  "Hola Redes y Marketting, quiero crear o renovar mi sitio web y quiero cotizar";

export function proyectoWebHref() {
  return whatsappHref(PROYECTO_WEB_MENSAJE);
}