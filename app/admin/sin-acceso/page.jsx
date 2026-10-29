import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { obtenerEstadoAdmin } from "@/lib/admin/guardia";
import { cerrarSesion } from "@/app/admin/acciones/autenticacion";
import { AvisoConfiguracion } from "@/components/admin/Aviso";

export const metadata = {
  title: "Sin acceso",
};

export default async function PaginaSinAcceso() {
  const estado = await obtenerEstadoAdmin();

  if (!estado.configurado) {
    return <AvisoConfiguracion />;
  }

  if (!estado.usuario) {
    redirect("/admin/iniciar-sesion");
  }

  if (estado.esAdmin) {
    redirect("/admin/inicio");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center shadow-2xl md:p-9">
        <Image
          src="/logonew.png"
          alt="Redes y Marketting"
          width={72}
          height={72}
          className="mx-auto h-16 w-16 rounded-2xl object-contain"
        />

        <span className="mt-6 inline-flex rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-200">
          Acceso denegado
        </span>

        <h1 className="mt-4 text-3xl font-black uppercase text-snow">
          Sin permisos
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-snow/60">
          La cuenta{" "}
          <strong className="text-snow">{estado.usuario.email}</strong> inició
          sesión correctamente, pero no está registrada como administradora
          activa en la tabla{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-volt">
            administradores
          </code>
          .
        </p>

        <p className="mt-3 text-sm leading-relaxed text-snow/45">
          Si deberías tener acceso, verifica el registro y el campo{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-volt">
            activo
          </code>{" "}
          en Supabase.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <form action={cerrarSesion}>
            <button
              type="submit"
              className="w-full rounded-full bg-ember px-5 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-volt sm:w-auto"
            >
              Cerrar sesión
            </button>
          </form>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-snow/60 transition hover:border-volt hover:text-volt"
          >
            Volver al sitio
          </Link>
        </div>
      </section>
    </main>
  );
}
