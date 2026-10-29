"use client";

import { useFormState } from "react-dom";
import { iniciarSesion } from "@/app/admin/acciones/autenticacion";
import BotonEnviar from "./BotonEnviar";
import { AvisoError } from "./Aviso";

const estadoInicial = { error: null };

export default function FormularioLogin() {
  const [estado, formAction] = useFormState(iniciarSesion, estadoInicial);

  return (
    <form action={formAction} className="space-y-5">
      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}

      <div className="space-y-2">
        <label
          htmlFor="correo"
          className="block text-xs font-black uppercase tracking-widest text-snow/60"
        >
          Correo electrónico
        </label>
        <input
          id="correo"
          name="correo"
          type="email"
          autoComplete="email"
          autoFocus
          required
          placeholder="redesymarketting@gmail.com"
          className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-snow outline-none transition focus:border-ember"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contrasena"
          className="block text-xs font-black uppercase tracking-widest text-snow/60"
        >
          Contraseña
        </label>
        <input
          id="contrasena"
          name="contrasena"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Tu contraseña"
          className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-snow outline-none transition focus:border-ember"
        />
      </div>

      <BotonEnviar pendingText="Ingresando..." className="w-full py-3.5">
        Ingresar al panel
      </BotonEnviar>
    </form>
  );
}
