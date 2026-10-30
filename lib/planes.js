export const WHATSAPP_NUMBER = "584125012969";

export function whatsappHref(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const PLAN_PERSONALIZADO_TEXT =
  "Hola Redes y Marketting, no encontré un plan ajustado a mi necesidad y quiero un plan personalizado que se adapte a mi marca.";