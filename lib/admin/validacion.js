const ICONOS_NICHO = ["postres", "dojos", "realestate", "talleres", "makeup"];
const ICONOS_PLAN = ["paint", "rocket", "chat", "chart"];

export function obtenerTexto(formData, campo, opciones = {}) {
  const {
    etiqueta = campo,
    max = 8000,
    requerido = false,
    defecto = "",
  } = opciones;

  const valorOriginal = formData.get(campo);
  const valor = typeof valorOriginal === "string" ? valorOriginal.trim() : defecto;

  if (requerido && !valor) {
    throw new Error(`El campo "${etiqueta}" es obligatorio.`);
  }

  if (valor.length > max) {
    throw new Error(`El campo "${etiqueta}" supera el máximo de ${max} caracteres.`);
  }

  return valor;
}

export function obtenerTextoOpcional(formData, campo, opciones = {}) {
  const valor = obtenerTexto(formData, campo, opciones);
  return valor || null;
}

export function obtenerEntero(formData, campo, opciones = {}) {
  const { defecto = 0, etiqueta = campo } = opciones;
  const valor = formData.get(campo);

  if (valor === null || valor === "") return defecto;

  const numero = Number.parseInt(String(valor), 10);

  if (Number.isNaN(numero)) {
    throw new Error(`El campo "${etiqueta}" debe ser un número entero.`);
  }

  return numero;
}

export function obtenerUuid(formData, campo, opciones = {}) {
  const { requerido = true, etiqueta = campo } = opciones;
  const valor = obtenerTexto(formData, campo, { etiqueta, max: 64 });

  if (!valor && !requerido) return null;

  const patron =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!patron.test(valor)) {
    throw new Error(`El identificador de "${etiqueta}" no es válido.`);
  }

  return valor;
}

export function normalizarUrl(valor, opciones = {}) {
  const { permitirVacio = true, etiqueta = "URL" } = opciones;
  const limpio = String(valor || "").trim();

  if (!limpio) {
    if (permitirVacio) return "";
    throw new Error(`El campo "${etiqueta}" es obligatorio.`);
  }

  if (limpio.startsWith("#") || limpio.startsWith("/")) return limpio;

  if (/^(https?:\/\/|mailto:|tel:)/i.test(limpio)) {
    return limpio;
  }

  throw new Error(
    `La ${etiqueta} debe iniciar con http://, https://, mailto:, tel:, / o #.`
  );
}

export function obtenerListaJson(formData, campo, opciones = {}) {
  const { maxElementos = 100, maxLongitud = 500 } = opciones;
  const valor = formData.get(campo);

  if (!valor) return [];

  let lista;
  try {
    lista = JSON.parse(String(valor));
  } catch {
    throw new Error(`La lista del campo "${campo}" no tiene un formato válido.`);
  }

  if (!Array.isArray(lista)) {
    throw new Error(`El campo "${campo}" debe ser una lista.`);
  }

  return lista
    .map((elemento) => String(elemento).trim())
    .filter(Boolean)
    .slice(0, maxElementos)
    .map((elemento) => elemento.slice(0, maxLongitud));
}

export function normalizarSlug(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function obtenerSlug(formData, campo = "slug") {
  const original = obtenerTexto(formData, campo, {
    etiqueta: "slug",
    requerido: true,
    max: 100,
  });
  const slug = normalizarSlug(original);

  if (!slug) {
    throw new Error("El slug debe contener al menos una letra o número.");
  }

  return slug;
}

export function obtenerColor(formData, campo, opciones = {}) {
  const { defecto = "#f7651c" } = opciones;
  const valor = String(formData.get(campo) || "").trim();
  return /^#[0-9a-f]{6}$/i.test(valor) ? valor : defecto;
}

export function obtenerIconoNicho(formData, campo = "icono") {
  const valor = String(formData.get(campo) || "").trim();
  return ICONOS_NICHO.includes(valor) ? valor : "postres";
}

export function obtenerIconoPlan(formData, campo = "icono") {
  const valor = String(formData.get(campo) || "").trim();
  return ICONOS_PLAN.includes(valor) ? valor : "chat";
}

export function obtenerCorreo(formData, campo = "correo") {
  const valor = obtenerTexto(formData, campo, {
    etiqueta: "correo",
    requerido: true,
    max: 320,
  }).toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    throw new Error("El correo electrónico no es válido.");
  }

  return valor;
}
