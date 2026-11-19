-- LeadCapture — Schema Base de Utilizadores, Perfis e Área de Cliente (Supabase PostgreSQL + RLS)
-- Nota: Preparado para ativação na fase de Área de Cliente e Integrações.

create type public.user_role as enum ('client', 'admin');

-- 1. Perfis únicos de utilizadores (1:1 com auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  company_name text,
  nif text,
  sector text,
  role public.user_role not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Trigger automático para criar perfil único no registo (Email ou Google OAuth)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Entidades da Área de Cliente (isoladas por client_id)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending',
  total_eur numeric(10,2),
  created_at timestamptz not null default now()
);

create table if not exists public.client_services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  catalog_product_id text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  accepted_at timestamptz,
  document_url text
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  amount_eur numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  label text not null,
  file_url text not null,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

-- 4. Row Level Security (RLS) — Isolamento estrito por cliente e permissões admin
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.client_services enable row level security;
alter table public.contracts enable row level security;
alter table public.payments enable row level security;
alter table public.materials enable row level security;
alter table public.support_tickets enable row level security;

-- Helper para verificar se o utilizador autenticado é admin
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Políticas de Perfis
create policy "Client reads own profile" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "Client updates own profile" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- Políticas genéricas de isolamento estrito por client_id
create policy "Client owns orders" on public.orders
  for all using (auth.uid() = client_id or public.is_admin());

create policy "Client owns services" on public.client_services
  for all using (auth.uid() = client_id or public.is_admin());

create policy "Client owns contracts" on public.contracts
  for all using (auth.uid() = client_id or public.is_admin());

create policy "Client owns payments" on public.payments
  for all using (auth.uid() = client_id or public.is_admin());

create policy "Client owns materials" on public.materials
  for all using (auth.uid() = client_id or public.is_admin());

create policy "Client owns support tickets" on public.support_tickets
  for all using (auth.uid() = client_id or public.is_admin());
