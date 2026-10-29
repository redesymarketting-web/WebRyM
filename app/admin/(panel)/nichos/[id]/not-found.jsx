import Link from "next/link";

export default function NichoNoEncontrado() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
      <span className="inline-flex rounded-full bg-ember px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ink">
        404
      </span>
      <h2 className="mt-4 text-2xl font-black uppercase text-snow">
        Nicho no encontrado
      </h2>
      <p className="mt-2 text-sm text-snow/50">
        El nicho que buscas no existe o fue eliminado.
      </p>
      <Link
        href="/admin/nichos"
        className="mt-6 inline-flex rounded-full bg-ember px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-volt"
      >
        Volver a nichos
      </Link>
    </div>
  );
}
