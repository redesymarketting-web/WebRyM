import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { configuracionSupabase } from "@/lib/supabase/config";

const RUTA_LOGIN = "/admin/iniciar-sesion";

export async function middleware(request) {
  const { url, anonKey, configurado } = configuracionSupabase();

  if (!configurado) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesParaEstablecer) {
        cookiesParaEstablecer.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesParaEstablecer.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;
  const esLogin = pathname === RUTA_LOGIN;

  if (!user && !esLogin) {
    const destino = request.nextUrl.clone();
    destino.pathname = RUTA_LOGIN;
    destino.search = "";
    destino.searchParams.set("siguiente", `${pathname}${search}`);
    return NextResponse.redirect(destino);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
