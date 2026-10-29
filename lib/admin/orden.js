export function moverEnLista(lista, id, direccion) {
  const indice = lista.findIndex((elemento) => elemento.id === id);
  if (indice === -1) return null;

  const destino = direccion === "subir" ? indice - 1 : indice + 1;
  if (destino < 0 || destino >= lista.length) return null;

  const copia = [...lista];
  const [elemento] = copia.splice(indice, 1);
  copia.splice(destino, 0, elemento);
  return copia;
}

export async function guardarOrden(supabase, tabla, lista) {
  const resultados = await Promise.all(
    lista.map((elemento, indice) =>
      supabase.from(tabla).update({ orden: indice }).eq("id", elemento.id)
    )
  );

  const error = resultados.find((resultado) => resultado.error)?.error;
  if (error) throw new Error(error.message);
}
