"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#que-hacemos", label: "¿Qué hacemos?" },
    { href: "#nicho", label: "Tu nicho" },
    { href: "#sobre-mi", label: "Sobre Nosotros" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="#inicio" aria-label="Ir al inicio">
          <Image
            src="/logonew.png"
            alt="Redes y Marketing"
            width={120}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-snow/80 transition-colors hover:text-volt"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            className="rounded-full bg-ember px-5 py-2.5 text-sm font-bold text-ink transition-all hover:bg-volt hover:shadow-[0_0_30px_rgba(255,236,1,0.4)]"
          >
            Quiero escalar mi marca
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 bg-snow transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-5 bg-snow transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 bg-snow transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-white/10 bg-ink/95 p-5 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-snow/90 hover:text-volt"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#contacto"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ember px-5 py-3 text-center font-bold text-ink"
            >
              Quiero escalar mi marca
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}