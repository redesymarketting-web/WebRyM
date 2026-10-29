import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { obtenerEstadoAdmin } from "@/lib/admin/guardia";
import FormularioLogin from "@/components/admin/FormularioLogin";
import { AvisoConfiguracion, AvisoInfo } from "@/components/admin/Aviso";

export const metadata = {
  title: "Iniciar sesión",
};

const beneficios = [
  "Edita los textos del inicio sin tocar código.",
  "Administra planes, nichos y clientes.",
  "Sube imágenes directo a Supabase Storage.",
];

export default async function PaginaIniciarSesion() {
  const estado = await obtenerEstadoAdmin();

  if (!estado.configurado) {
    return <AvisoConfiguracion />;
  }

  if (estado.esAdmin) {
    redirect("/admin/inicio");
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-ember/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-volt/10 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <section className="max-w-xl">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logonew.png"
              alt="Redes y Marketting"
              width={64}
              height={64}
              className="h-14 w-14 rounded-2xl object-contain"
              priority
            />
            <span>
              <span className="block text-sm font-black uppercase tracking-wide text-snow">
                Redes y Marketting
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-ember">
                Panel administrativo
              </span>
            </span>
          </Link>

          <h1 className="mt-8 text-4xl font-black uppercase leading-[0.95] text-snow md:text-6xl">
            Tu marca,
            <br />
            <span className="text-ember">bajo control.</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-snow/60">
            Este espacio es privado. Desde aquí puedes actualizar el contenido
            del sitio, gestionar tus nichos y mantener tu portafolio al día.
          </p>

          <ul className="mt-8 space-y-3">
            {beneficios.map((beneficio) => (
              <li
                key={beneficio}
                className="flex items-start gap-3 text-sm text-snow/70"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-volt" />
                {beneficio}
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-snow/40 transition hover:text-ember"
          >
            <span aria-hidden="true">←</span>
            Volver al sitio
          </Link>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-sm md:p-8">
          <span className="inline-flex rounded-full bg-ember px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ink">
            Acceso restringido
          </span>
          <h2 className="mt-4 text-2xl font-black uppercase text-snow">
            Iniciar sesión
          </h2>
          <p className="mt-2 text-sm text-snow/50">
            Ingresa con la cuenta de administrador autorizada.
          </p>

          {estado.usuario && !estado.esAdmin ? (
            <div className="mt-5">
              <AvisoInfo>
                La sesión actual no tiene permisos de administrador. Puedes
                ingresar con otra cuenta.
              </AvisoInfo>
            </div>
          ) : null}

          <div className="mt-6">
            <FormularioLogin />
          </div>

          <p className="mt-6 border-t border-white/10 pt-4 text-center text-[11px] text-snow/30">
            Solo personal autorizado de Redes y Marketting.
          </p>
        </section>
      </div>
    </main>
  );
}
