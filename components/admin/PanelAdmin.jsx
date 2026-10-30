"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cerrarSesion } from "@/app/admin/acciones/autenticacion";

const enlaces = [
  {
    href: "/admin/inicio",
    label: "Inicio",
    descripcion: "Hero y tarjetas flotantes",
    icono: "inicio",
  },
  {
    href: "/admin/que-hacemos",
    label: "Qué Hacemos",
    descripcion: "Planes, servicios y portafolio web",
    icono: "planes",
  },
  {
    href: "/admin/nichos",
    label: "Nichos",
    descripcion: "Tarjetas, feed y clientes",
    icono: "nichos",
  },
  {
    href: "/admin/sobre-nosotros",
    label: "Sobre Nosotros",
    descripcion: "Historia, métricas y firma",
    icono: "nosotros",
  },
];

function Icono({ nombre, className = "h-5 w-5" }) {
  const props = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (nombre === "inicio") {
    return (
      <svg viewBox="0 0 24 24" {...props}>
        <path d="M4 11 12 4.5 20 11" />
        <path d="M6 10.5V20h12v-9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    );
  }

  if (nombre === "planes") {
    return (
      <svg viewBox="0 0 24 24" {...props}>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17M7.5 7.5V5M16.5 7.5V5" />
        <path d="m7 14.5 2.2-2.4 1.9 1.8L14.6 10l2.4 2.2" />
      </svg>
    );
  }

  if (nombre === "nichos") {
    return (
      <svg viewBox="0 0 24 24" {...props}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    );
  }

  if (nombre === "nosotros") {
    return (
      <svg viewBox="0 0 24 24" {...props}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M4 19c.7-3.2 2.5-4.8 5-4.8s4.3 1.6 5 4.8" />
        <circle cx="17" cy="9.5" r="2.4" />
        <path d="M15 14.5c2.7-.5 4.6 1.1 5 4" />
      </svg>
    );
  }

  return null;
}

function MenuIcono({ abierto }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {abierto ? (
        <path d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function PanelAdmin({ correo, children }) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  const enlaceActivo =
    enlaces.find((enlace) => pathname.startsWith(enlace.href)) || enlaces[0];

  return (
    <div className="min-h-screen bg-ink text-snow lg:flex">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link href="/admin/inicio" className="flex items-center gap-2">
          <Image
            src="/logonew.png"
            alt="Redes y Marketting"
            width={80}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-snow"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
        >
          <MenuIcono abierto={abierto} />
        </button>
      </header>

      <aside
        className={`${
          abierto ? "block" : "hidden"
        } border-b border-white/10 bg-[#060606] lg:block lg:min-h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r`}
      >
        <div className="flex h-full flex-col p-5">
          <Link
            href="/admin/inicio"
            className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 lg:flex"
            onClick={() => setAbierto(false)}
          >
            <Image
              src="/logonew.png"
              alt="Redes y Marketting"
              width={44}
              height={44}
              className="h-10 w-10 rounded-xl object-contain"
            />
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-snow">
                Redes y Marketting
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-ember">
                Panel administrativo
              </p>
            </div>
          </Link>

          <nav className="mt-6 space-y-2" aria-label="Módulos del panel">
            {enlaces.map((enlace) => {
              const activo = pathname.startsWith(enlace.href);

              return (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  className={`group flex items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                    activo
                      ? "border-ember/40 bg-ember/15 text-ember"
                      : "border-transparent text-snow/65 hover:border-white/10 hover:bg-white/[0.04] hover:text-snow"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                      activo ? "bg-ember text-ink" : "bg-white/5 text-snow/60"
                    }`}
                  >
                    <Icono nombre={enlace.icono} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-black uppercase tracking-wide">
                      {enlace.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-snow/40">
                      {enlace.descripcion}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-8">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-black uppercase tracking-wide text-snow/60 transition hover:border-volt hover:text-volt"
            >
              Ver sitio
              <span aria-hidden="true">↗</span>
            </Link>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-snow/35">
                Sesión activa
              </p>
              <p className="mt-1 truncate text-xs font-semibold text-snow/75">
                {correo}
              </p>
              <form action={cerrarSesion} className="mt-3">
                <button
                  type="submit"
                  className="w-full rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-200 transition hover:bg-red-400 hover:text-ink"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-7 hidden items-center justify-between gap-4 lg:flex">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-ember">
                Panel administrativo
              </p>
              <h1 className="mt-1 text-2xl font-black uppercase text-snow">
                {enlaceActivo.label}
              </h1>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-snow/50">
              {correo}
            </span>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
