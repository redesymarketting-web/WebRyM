-- ============================================================
-- Redes y Marketting - Esquema inicial de BDWebRyM
-- Ejecutar completo en Supabase -> SQL Editor
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Administradores
-- ------------------------------------------------------------
create table if not exists public.administradores (
  usuario_id uuid primary key references auth.users(id) on delete cascade,
  correo text not null unique,
  activo boolean not null default true,
  creado_en timestamptz not null default now()
);

create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.administradores a
    where a.usuario_id = auth.uid()
      and a.activo = true
  );
$$;

revoke all on function public.es_admin() from public;
grant execute on function public.es_admin() to authenticated;

-- ------------------------------------------------------------
-- Trigger reutilizable para actualizado_en
-- ------------------------------------------------------------
create or replace function public.actualizar_actualizado_en()
returns trigger
language plpgsql
as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- 1. seccion_inicio
-- ------------------------------------------------------------
create table if not exists public.seccion_inicio (
  id uuid primary key default gen_random_uuid(),
  etiqueta_superior text not null default '',
  titulo_principal text not null default '',
  texto_descripcion text not null default '',
  texto_boton_principal text not null default '',
  url_boton_principal text not null default '#contacto',
  texto_boton_secundario text not null default '',
  url_boton_secundario text not null default '#nicho',
  actualizado_en timestamptz not null default now()
);

drop trigger if exists trg_seccion_inicio_actualizado_en on public.seccion_inicio;
create trigger trg_seccion_inicio_actualizado_en
before update on public.seccion_inicio
for each row execute function public.actualizar_actualizado_en();

-- ------------------------------------------------------------
-- 2. tarjetas_flotantes_inicio
-- ------------------------------------------------------------
create table if not exists public.tarjetas_flotantes_inicio (
  id uuid primary key default gen_random_uuid(),
  nombre_marca text not null default '',
  url_imagen text not null default '',
  megustas text not null default '0',
  comentarios text not null default '0',
  orden integer not null default 0,
  actualizado_en timestamptz not null default now()
);

create index if not exists idx_tarjetas_inicio_orden
  on public.tarjetas_flotantes_inicio (orden);

drop trigger if exists trg_tarjetas_inicio_actualizado_en on public.tarjetas_flotantes_inicio;
create trigger trg_tarjetas_inicio_actualizado_en
before update on public.tarjetas_flotantes_inicio
for each row execute function public.actualizar_actualizado_en();

-- ------------------------------------------------------------
-- 3. planes_redes
-- ------------------------------------------------------------
create table if not exists public.planes_redes (
  id uuid primary key default gen_random_uuid(),
  nombre_plan text not null default '',
  subtitulo text not null default '',
  caracteristicas jsonb not null default '[]'::jsonb,
  nota_destacada text,
  url_boton_whatsapp text not null default '',
  icono text not null default 'chat',
  orden integer not null default 0,
  actualizado_en timestamptz not null default now(),
  constraint planes_redes_caracteristicas_array
    check (jsonb_typeof(caracteristicas) = 'array')
);

create index if not exists idx_planes_redes_orden
  on public.planes_redes (orden);

drop trigger if exists trg_planes_redes_actualizado_en on public.planes_redes;
create trigger trg_planes_redes_actualizado_en
before update on public.planes_redes
for each row execute function public.actualizar_actualizado_en();

-- ------------------------------------------------------------
-- 4. nichos
-- ------------------------------------------------------------
create table if not exists public.nichos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titulo_tarjeta text not null default '',
  icono text not null default 'postres',
  url_imagen_tarjeta text not null default '',
  etiqueta_categoria text not null default '',
  titulo_descripcion text not null default '',
  texto_descripcion text not null default '',
  etiquetas_destacadas jsonb not null default '[]'::jsonb,
  url_imagen_feed_1 text not null default '',
  url_imagen_feed_2 text not null default '',
  url_imagen_feed_3 text not null default '',
  color_primario text not null default '#f7651c',
  orden integer not null default 0,
  actualizado_en timestamptz not null default now(),
  constraint nichos_etiquetas_array
    check (jsonb_typeof(etiquetas_destacadas) = 'array')
);

create index if not exists idx_nichos_orden
  on public.nichos (orden);

drop trigger if exists trg_nichos_actualizado_en on public.nichos;
create trigger trg_nichos_actualizado_en
before update on public.nichos
for each row execute function public.actualizar_actualizado_en();

-- ------------------------------------------------------------
-- 5. clientes_nicho
-- ------------------------------------------------------------
create table if not exists public.clientes_nicho (
  id uuid primary key default gen_random_uuid(),
  nicho_id uuid not null references public.nichos(id) on delete cascade,
  nombre_cliente text not null default '',
  descripcion_cliente text not null default '',
  url_sitio text not null default '',
  estado text not null default 'SITIO EN VIVO',
  orden integer not null default 0,
  actualizado_en timestamptz not null default now()
);

create index if not exists idx_clientes_nicho_nicho_id
  on public.clientes_nicho (nicho_id);
create index if not exists idx_clientes_nicho_orden
  on public.clientes_nicho (nicho_id, orden);

drop trigger if exists trg_clientes_nicho_actualizado_en on public.clientes_nicho;
create trigger trg_clientes_nicho_actualizado_en
before update on public.clientes_nicho
for each row execute function public.actualizar_actualizado_en();

-- ------------------------------------------------------------
-- 6. sobre_nosotros
-- ------------------------------------------------------------
create table if not exists public.sobre_nosotros (
  id uuid primary key default gen_random_uuid(),
  url_imagen_pareja text not null default '',
  url_isologo_flotante text not null default '',
  titulo_porque_naranja text not null default '',
  texto_porque_naranja text not null default '',
  titulo_sobre_nosotros text not null default '',
  texto_sobre_nosotros text not null default '',
  descripcion_marux text not null default '',
  descripcion_doug text not null default '',
  texto_enfasis_venezolanos text not null default '',
  valor_marcas_potenciadas text not null default '10+',
  valor_proyectos_disenados text not null default '100+',
  valor_anos_estrategia text not null default '3+',
  firma_texto text not null default '',
  firma_subtitulo text not null default '',
  slogan text not null default '',
  actualizado_en timestamptz not null default now()
);

drop trigger if exists trg_sobre_nosotros_actualizado_en on public.sobre_nosotros;
create trigger trg_sobre_nosotros_actualizado_en
before update on public.sobre_nosotros
for each row execute function public.actualizar_actualizado_en();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.administradores enable row level security;
alter table public.seccion_inicio enable row level security;
alter table public.tarjetas_flotantes_inicio enable row level security;
alter table public.planes_redes enable row level security;
alter table public.nichos enable row level security;
alter table public.clientes_nicho enable row level security;
alter table public.sobre_nosotros enable row level security;

-- Administradores: cada usuario autenticado solo puede ver su propio registro.
drop policy if exists "administrador_lee_su_registro" on public.administradores;
create policy "administrador_lee_su_registro"
  on public.administradores
  for select
  to authenticated
  using (usuario_id = auth.uid());

-- Lectura publica
drop policy if exists "lectura_publica_seccion_inicio" on public.seccion_inicio;
create policy "lectura_publica_seccion_inicio"
  on public.seccion_inicio for select to anon, authenticated using (true);

drop policy if exists "lectura_publica_tarjetas_inicio" on public.tarjetas_flotantes_inicio;
create policy "lectura_publica_tarjetas_inicio"
  on public.tarjetas_flotantes_inicio for select to anon, authenticated using (true);

drop policy if exists "lectura_publica_planes_redes" on public.planes_redes;
create policy "lectura_publica_planes_redes"
  on public.planes_redes for select to anon, authenticated using (true);

drop policy if exists "lectura_publica_nichos" on public.nichos;
create policy "lectura_publica_nichos"
  on public.nichos for select to anon, authenticated using (true);

drop policy if exists "lectura_publica_clientes_nicho" on public.clientes_nicho;
create policy "lectura_publica_clientes_nicho"
  on public.clientes_nicho for select to anon, authenticated using (true);

drop policy if exists "lectura_publica_sobre_nosotros" on public.sobre_nosotros;
create policy "lectura_publica_sobre_nosotros"
  on public.sobre_nosotros for select to anon, authenticated using (true);

-- Escritura exclusiva para administradores
drop policy if exists "escritura_admin_seccion_inicio" on public.seccion_inicio;
create policy "escritura_admin_seccion_inicio"
  on public.seccion_inicio for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

drop policy if exists "escritura_admin_tarjetas_inicio" on public.tarjetas_flotantes_inicio;
create policy "escritura_admin_tarjetas_inicio"
  on public.tarjetas_flotantes_inicio for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

drop policy if exists "escritura_admin_planes_redes" on public.planes_redes;
create policy "escritura_admin_planes_redes"
  on public.planes_redes for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

drop policy if exists "escritura_admin_nichos" on public.nichos;
create policy "escritura_admin_nichos"
  on public.nichos for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

drop policy if exists "escritura_admin_clientes_nicho" on public.clientes_nicho;
create policy "escritura_admin_clientes_nicho"
  on public.clientes_nicho for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

drop policy if exists "escritura_admin_sobre_nosotros" on public.sobre_nosotros;
create policy "escritura_admin_sobre_nosotros"
  on public.sobre_nosotros for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

-- ============================================================
-- Storage: bucket publico para imagenes
-- ============================================================
insert into storage.buckets (id, name, public)
values ('imagenes', 'imagenes', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "imagenes_lectura_publica" on storage.objects;
create policy "imagenes_lectura_publica"
  on storage.objects for select to public
  using (bucket_id = 'imagenes');

drop policy if exists "imagenes_escritura_admin" on storage.objects;
create policy "imagenes_escritura_admin"
  on storage.objects for all to authenticated
  using (bucket_id = 'imagenes' and public.es_admin())
  with check (bucket_id = 'imagenes' and public.es_admin());
