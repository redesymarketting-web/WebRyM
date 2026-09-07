import { whatsappHref } from "@/lib/planes";

export const CLIENTES_NICHOS = {
  postres: [
    {
      id: "dulzuras",
      nombre: "Dulzuras by IR",
      descripcion: "Marca de postres con especialidad en Alfajores",
      url: "https://www.instagram.com/dulzurasbyir/",
    },
    {
      id: "crunchie",
      nombre: "Crunchie Bite",
      descripcion: "Marca de postres con especialidad en Galletas NY",
      url: "https://www.instagram.com/crunchievzla/",
    },
  ],
  dojos: [
    {
      id: "ylanflores",
      nombre: "Dojo Ylan Flores",
      descripcion: "Dojo de Karate",
      url: "https://www.instagram.com/dojoylanjflores/",
    },
  ],
  realestate: [
    {
      id: "jcanizares",
      nombre: "Javier Canizares",
      descripcion: "Agente Inmobiliario Naples, FL",
      url: "https://www.instagram.com/jcanizaresrealtor/",
    },
    {
      id: "drodriguez",
      nombre: "Dolores Rodríguez",
      descripcion: "Agente Inmobiliario SouthWest Florida",
      url: "https://www.instagram.com/doloresrodriguezrealtor/",
    },
  ],
  talleres: [
    {
      id: "dayarey",
      nombre: "Radiadores DAYAREY",
      descripcion:
        "Taller de Radiadores Automotrices y Plantas Eléctricas",
      url: "https://www.instagram.com/radiadoresdayarey",
    },
  ],
};

export const NUEVO_CLIENTE_MENSAJE =
  "Hola Redes y Marketting, quiero ser el próximo cliente de mi nicho";

export function nuevoClienteHref() {
  return whatsappHref(NUEVO_CLIENTE_MENSAJE);
}