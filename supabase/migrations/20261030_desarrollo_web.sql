-- ------------------------------------------------------------
-- Desarrollo Web: servicios y portafolio
-- ------------------------------------------------------------
create table if not exists public.servicios_web (
  id uuid primary key default gen_random_uuid(),
  icono text not null default 'web',
  titulo text not null default '',
  descripcion text not null default '',
  orden integer not null default 0,
  actualizado_en timestamptz not null default now()
);

create index if not exists idx_servicios_web_orden
  on public.servicios_web (orden);

drop trigger if exists trg_servicios_web_actualizado_en on public.servicios_web;
create trigger trg_servicios_web_actualizado_en
before update on public.servicios_web
for each row execute function public.actualizar_actualizado_en();

create table if not exists public.proyectos_web (
  id uuid primary key default gen_random_uuid(),
  nombre text not null default '',
  descripcion text not null default '',
  url_sitio text not null default '',
  orden integer not null default 0,
  actualizado_en timestamptz not null default now()
);

create index if not exists idx_proyectos_web_orden
  on public.proyectos_web (orden);

drop trigger if exists trg_proyectos_web_actualizado_en on public.proyectos_web;
create trigger trg_proyectos_web_actualizado_en
before update on public.proyectos_web
for each row execute function public.actualizar_actualizado_en();

alter table public.servicios_web enable row level security;
alter table public.proyectos_web enable row level security;

drop policy if exists "lectura_publica_servicios_web" on public.servicios_web;
create policy "lectura_publica_servicios_web"
  on public.servicios_web for select to anon, authenticated using (true);

drop policy if exists "lectura_publica_proyectos_web" on public.proyectos_web;
create policy "lectura_publica_proyectos_web"
  on public.proyectos_web for select to anon, authenticated using (true);

drop policy if exists "escritura_admin_servicios_web" on public.servicios_web;
create policy "escritura_admin_servicios_web"
  on public.servicios_web for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

drop policy if exists "escritura_admin_proyectos_web" on public.proyectos_web;
create policy "escritura_admin_proyectos_web"
  on public.proyectos_web for all to authenticated
  using (public.es_admin()) with check (public.es_admin());

insert into public.servicios_web (id, icono, titulo, descripcion, orden)
values
(
  'e0000000-0000-4000-8000-000000000001',
  'landing',
  'Landing Pages de Alta Conversión',
  'Diseñadas estratégicamente para captar y atraer a los leads que de verdad se ajustan a tu nicho.',
  0
),
(
  'e0000000-0000-4000-8000-000000000002',
  'web',
  'Páginas Web a Medida',
  'Estéticas y funcionales, creadas para transmitir con precisión la identidad y el propósito de tu marca.',
  1
),
(
  'e0000000-0000-4000-8000-000000000003',
  'panel',
  'Sitios Estáticos y Dinámicos',
  'Totalmente autoadministrables, equipados con un panel de control intuitivo para que tengas el dominio absoluto de tu contenido.',
  2
)
on conflict (id) do nothing;

insert into public.proyectos_web (id, nombre, descripcion, url_sitio, orden)
values
(
  'f0000000-0000-4000-8000-000000000001',
  'DLR Transaction Coordinator',
  'Sitio creado para marca en Naples, Florida dedicada a la Coordinación de Transacciones Inmobiliarias en: SouthWest Florida - Orlando - Miami - Tampa',
  'https://www.dlr-transactioncoordinator.com/',
  0
)
on conflict (id) do nothing;
