const PATRON = /(\*\*[^*]+\*\*|__[^_]+__)/g;

export default function TextoEnriquecido({
  texto = "",
  className = "",
  claseNaranja = "font-black text-ember",
  claseAmarillo = "font-black text-volt",
}) {
  const partes = String(texto || "").split(PATRON).filter(Boolean);

  return (
    <span className={className}>
      {partes.map((parte, indice) => {
        if (parte.startsWith("**") && parte.endsWith("**")) {
          return (
            <span key={indice} className={claseNaranja}>
              {parte.slice(2, -2)}
            </span>
          );
        }

        if (parte.startsWith("__") && parte.endsWith("__")) {
          return (
            <span key={indice} className={claseAmarillo}>
              {parte.slice(2, -2)}
            </span>
          );
        }

        return <span key={indice}>{parte}</span>;
      })}
    </span>
  );
}
