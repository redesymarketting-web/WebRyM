export const WHATSAPP_NUMBER = "584125012969";

export function whatsappHref(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const PLAN_PERSONALIZADO_TEXT =
  "Hola Redes y Marketting, no encontré un plan ajustado a mi necesidad y quiero un plan personalizado que se adapte a mi marca.";

export const PLANES_REDES = [
  {
    id: "identidad-visual",
    icon: "paint",
    title: "Identidad Visual",
    tagline: "La base visual de tu marca, lista para conquistar.",
    features: [
      "Diseño de logo",
      "Definición de paleta de colores",
    ],
    note: "El logo se entrega vectorizado, listo para usar. La paleta de colores se entrega con los códigos en RGB y CMYK para evitar cambios en piezas impresas o diseños digitales.",
    whatsappText: "Hola Redes y Marketting, quiero cotizar el plan de Identidad Visual",
  },
  {
    id: "first-step",
    icon: "rocket",
    title: "First Step",
    tagline: "De cero a un perfil optimizado y profesional.",
    features: [
      "Diseño de plantilla corporativa para las publicaciones",
      "Diseño de avatar para Instagram",
      "Paleta de colores y tipografía",
      "Redacción de biografía en Instagram",
      "Configuración de cuenta Instagram",
      "Diseño de 4 highlights o portadas para las historias",
    ],
    note: "Este plan aplica para marcas que no cuenten con perfiles creados previamente o que lo tengan pero que no esté optimizado o actualizado. Esta inversión se realiza una sola vez.",
    whatsappText: "Hola Redes y Marketting, quiero cotizar el plan First Step",
  },
  {
    id: "asesoria-personalizada",
    icon: "chat",
    title: "Asesoría Personalizada",
    tagline: "Acompañamiento directo para tu marca personal.",
    features: [
      "2 horas, el día de su preferencia con previo acuerdo",
      "Contexto digital para marcas personales en la actualidad",
      "Mejores prácticas del sector para gestión de Instagram",
    ],
    note: null,
    whatsappText: "Hola Redes y Marketting, quiero cotizar la Asesoría Personalizada",
  },
  {
    id: "plan-inicial",
    icon: "chart",
    title: "Plan Inicial",
    tagline: "20 publicaciones mensuales con estrategia y diseño.",
    features: [
      "Diseño de 8 post para feed (una sola imagen conectada con la audiencia: efemérides, tips sobre el ramo, citas de empresarios exitosos, entre otras)",
      "Diseño de 2 carruseles con fotos de los servicios que ofrecen, tips sobre el ramo, etc.",
      "Diseño de 2 videos o reels (showing time, contenido de valor, datos de contacto, tips) con elementos corporativos",
      "Diseño de 8 banners para las historias",
      "Totalización de 20 publicaciones al mes (3 semanales por 4 semanas en el feed y 2 historias semanales)",
      "Redacción de copy (texto debajo de la imagen) de las publicaciones",
      "Atención de comentarios (positivos y negativos) de los seguidores",
    ],
    note: null,
    whatsappText: "Hola Redes y Marketting, quiero cotizar el Plan Inicial",
  },
];