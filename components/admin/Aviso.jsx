export function AvisoExito({ children }) {
  return (
    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-200">
      {children}
    </div>
  );
}

export function AvisoError({ children }) {
  return (
    <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200">
      {children}
    </div>
  );
}

export function AvisoInfo({ children }) {
  return (
    <div className="rounded-2xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm font-semibold text-ember">
      {children}
    </div>
  );
}

export function AvisoConfiguracion() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center px-5 py-16">
      <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl md:p-10">
        <span className="inline-flex rounded-full bg-ember px-4 py-1.5 text-xs font-black uppercase tracking-widest text-ink">
          Configuración pendiente
        </span>
        <h1 className="mt-5 text-3xl font-black uppercase text-snow md:text-4xl">
          Falta conectar Supabase
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-snow/70">
          El panel administrativo está listo, pero necesita las credenciales del
          proyecto <strong className="text-snow">BDWebRyM</strong>. Sigue estos
          pasos:
        </p>

        <ol className="mt-6 space-y-4 text-sm leading-relaxed text-snow/80">
          <li>
            <span className="font-black text-ember">1.</span> Ejecuta el archivo{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-volt">
              supabase/migrations/20261029_esquema_inicial.sql
            </code>{" "}
            en el SQL Editor de Supabase.
          </li>
          <li>
            <span className="font-black text-ember">2.</span> Ejecuta el archivo{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-volt">
              supabase/seed.sql
            </code>{" "}
            para cargar el contenido inicial.
          </li>
          <li>
            <span className="font-black text-ember">3.</span> Agrega en{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-volt">
              .env.local
            </code>{" "}
            y en Vercel:
            <pre className="mt-2 overflow-x-auto rounded-xl bg-ink p-4 text-xs text-snow/80">
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
            </pre>
          </li>
          <li>
            <span className="font-black text-ember">4.</span> Crea el usuario{" "}
            <strong className="text-snow">redesymarketting@gmail.com</strong> en
            Supabase Authentication y registra su UUID en la tabla{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-volt">
              administradores
            </code>
            . También puedes usar{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-volt">
              npm run crear-admin
            </code>{" "}
            con la service role key solo en tu `.env.local`.
          </li>
        </ol>

        <p className="mt-6 text-xs text-snow/40">
          Después de configurar, recarga esta página e inicia sesión.
        </p>
      </div>
    </div>
  );
}
