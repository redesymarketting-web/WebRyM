import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const RUTA_ENV = resolve(process.cwd(), ".env.local");

function cargarEnvLocal() {
  if (!existsSync(RUTA_ENV)) return;

  const contenido = readFileSync(RUTA_ENV, "utf8").replace(/^\uFEFF/, "");

  for (const linea of contenido.split(/\r?\n/)) {
    const coincidencia = linea.match(
      /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/
    );
    if (!coincidencia) continue;

    const clave = coincidencia[1];
    let valor = coincidencia[2].trim();

    if (
      (valor.startsWith('"') && valor.endsWith('"')) ||
      (valor.startsWith("'") && valor.endsWith("'"))
    ) {
      valor = valor.slice(1, -1);
    }

    if (!process.env[clave]) {
      process.env[clave] = valor;
    }
  }
}

function leerEnv(clave) {
  return String(process.env[clave] || "").trim();
}

function fallar(mensaje) {
  console.error(`\n[crear-admin] ${mensaje}\n`);
  process.exit(1);
}

async function main() {
  cargarEnvLocal();

  const url = leerEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRole = leerEnv("SUPABASE_SERVICE_ROLE_KEY");
  const correo = (
    leerEnv("ADMIN_EMAIL") || "redesymarketting@gmail.com"
  ).toLowerCase();
  const contrasena = leerEnv("ADMIN_PASSWORD");

  const faltantes = [];

  if (!url) faltantes.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRole) faltantes.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!contrasena) faltantes.push("ADMIN_PASSWORD");

  if (faltantes.length > 0) {
    fallar(
      `Faltan variables en .env.local: ${faltantes.join(
        ", "
      )}. La service role key solo se usa en este script local y nunca debe exponerse con prefijo NEXT_PUBLIC_.`
    );
  }

  try {
    new URL(url);
  } catch {
    fallar("NEXT_PUBLIC_SUPABASE_URL no es una URL válida.");
  }

  if (contrasena.length < 6) {
    fallar("ADMIN_PASSWORD debe tener al menos 6 caracteres.");
  }

  const supabase = createClient(url, serviceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log(`[crear-admin] Proyecto: ${url}`);
  console.log(`[crear-admin] Correo administrador: ${correo}`);

  let usuario = null;
  let creado = false;

  const creacion = await supabase.auth.admin.createUser({
    email: correo,
    password: contrasena,
    email_confirm: true,
    user_metadata: {
      nombre: "Administrador",
      rol: "admin",
    },
  });

  if (creacion.error) {
    const mensaje = String(creacion.error.message || "").toLowerCase();
    const yaExiste = /already|registered|exist/.test(mensaje);

    if (!yaExiste) {
      fallar(`No se pudo crear el usuario: ${creacion.error.message}`);
    }

    const { data: listado, error: errorListado } =
      await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });

    if (errorListado) {
      fallar(`No se pudo listar usuarios: ${errorListado.message}`);
    }

    usuario = (listado?.users || []).find(
      (item) => String(item.email || "").toLowerCase() === correo
    );

    if (!usuario) {
      fallar(
        "El correo ya existe pero no se encontró en la lista de usuarios. Búscalo manualmente en Supabase Authentication."
      );
    }

    const actualizacion = await supabase.auth.admin.updateUserById(usuario.id, {
      password: contrasena,
      email_confirm: true,
    });

    if (actualizacion.error) {
      fallar(
        `El usuario existe, pero no se pudo actualizar la contraseña: ${actualizacion.error.message}`
      );
    }

    console.log(
      "[crear-admin] El usuario ya existía. Se actualizó la contraseña y se confirmó el correo."
    );
  } else {
    usuario = creacion.data.user;
    creado = true;
    console.log("[crear-admin] Usuario creado en Supabase Authentication.");
  }

  const registro = await supabase.from("administradores").upsert(
    {
      usuario_id: usuario.id,
      correo,
      activo: true,
    },
    { onConflict: "usuario_id" }
  );

  if (registro.error) {
    fallar(
      `No se pudo registrar en la tabla administradores: ${registro.error.message}. Ejecuta primero supabase/migrations/20261029_esquema_inicial.sql.`
    );
  }

  console.log(
    `[crear-admin] ${creado ? "Administrador creado" : "Administrador actualizado"} correctamente.`
  );
  console.log("[crear-admin] UUID:", usuario.id);
  console.log("[crear-admin] Ya puedes iniciar sesión en /admin/iniciar-sesion");
}

main().catch((error) => {
  fallar(error?.message || "Error inesperado al crear el administrador.");
});
