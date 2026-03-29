create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  category text not null,
  phone_number text not null,
  exact_address text not null,
  latitude double precision not null,
  longitude double precision not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  source_type text not null default 'user' check (source_type in ('user', 'seed', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.companies enable row level security;

create policy "Public can submit pending companies"
on public.companies
for insert
with check (status = 'pending' and source_type = 'user');

create policy "Public can read only approved companies"
on public.companies
for select
using (status = 'approved');

create policy "Authenticated admins can manage companies"
on public.companies
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
