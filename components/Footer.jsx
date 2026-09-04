"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M19.6 7.2a5.3 5.3 0 0 1-3.2-1.1 5.3 5.3 0 0 1-1.9-2.8h-3.2v11.9a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V8.9a6.3 6.3 0 0 0-.9-.06 6.2 6.2 0 1 0 6.2 6.2V8.9a8.4 8.4 0 0 0 5 1.7V7.4a5.2 5.2 0 0 1-.9-.2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-2.6A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 1.6 1.6-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.6-.8-1.8-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4a8.6 8.6 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3 0-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[40rem] rounded-full bg-ember/20 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-snow/70">
              Asesoría personalizada · Respondemos hoy
            </span>
            <h2 className="mx-auto max-w-5xl text-4xl font-bold uppercase leading-[1.05] text-snow md:text-6xl">
              ¿Listo para dominar tu{" "}
              <span className="text-ember">mercado digital</span>?
            </h2>
          </div>
        </Reveal>

        {/* CTA Gigante */}
        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <Link
              href="https://wa.me/584125012969?text=Hola%20Redes%20y%20Marketing%2C%20quiero%20escalar%20mi%20marca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Iniciar asesoría inmediata por WhatsApp"
              className="group relative w-full max-w-4xl"
            >
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-ember via-volt to-ember opacity-40 blur-lg transition-opacity group-hover:opacity-70" />
              <span className="relative flex items-center justify-center gap-4 rounded-full bg-gradient-to-r from-ember to-volt px-6 py-7 text-center text-xl font-black uppercase tracking-wide text-ink transition-transform duration-300 group-hover:scale-[1.03] md:py-9 md:text-3xl">
                Iniciar asesoría inmediata
                <svg viewBox="0 0 24 24" className="h-8 w-8 transition-transform group-hover:translate-x-2 md:h-10 md:w-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
          <p className="mt-5 text-center text-sm text-snow/50">
            Da el primer paso. Tu presencia digital empieza hoy.
          </p>
        </Reveal>

        {/* Redes y contacto */}
        <div className="mt-20 flex flex-col items-center gap-10 border-t border-white/10 pt-14">
          <div className="flex items-center gap-3">
            <Image
              src="/logonew.png"
              alt="Redes y Marketing"
              width={56}
              height={56}
              className="h-12 w-12 rounded-2xl"
            />
            <div>
              <p className="font-display text-xl font-black text-snow">Redes y Marketing</p>
              <p className="text-sm font-semibold text-ember">@redesymarketting</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { href: "https://instagram.com/redesymarketting", label: "Instagram de Redes y Marketing", Icon: InstagramIcon },
              { href: "https://facebook.com/redesymarketting", label: "Facebook de Redes y Marketing", Icon: FacebookIcon },
              { href: "https://tiktok.com/@redesymarketting", label: "TikTok de Redes y Marketing", Icon: TikTokIcon },
              { href: "https://wa.me/584125012969", label: "WhatsApp de Redes y Marketing", Icon: WhatsAppIcon },
            ].map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-snow/80 transition-all hover:scale-110 hover:border-volt hover:bg-volt hover:text-ink"
              >
                <Icon />
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <a
              href="mailto:hola@redesymarketting.com"
              className="text-sm font-medium text-snow/70 transition-colors hover:text-volt"
            >
              hola@redesymarketting.com
            </a>
            <a
              href="https://wa.me/584125012969"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-snow/70 transition-colors hover:text-volt"
            >
              +58 412-501-2969
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-xs text-snow/40 sm:flex-row lg:px-8">
          <p>© {year} Redes y Marketing. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            Hecho con <span className="text-ember">♥</span> y estrategia digital
          </p>
        </div>
      </div>
    </footer>
  );
}