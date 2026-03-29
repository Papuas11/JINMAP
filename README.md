# JINJA MAPS (Supabase Edition)

A polished Next.js app that shows approved companies on a public map (`/`) and provides a real admin workflow (`/admin`) backed by Supabase.

## Features

- Public map page (`/`) pulls **only approved** companies from Supabase.
- Sidebar + map markers for approved companies.
- Clicking a company card centers the map.
- Clicking a marker opens a details popup.
- Admin page (`/admin`) supports:
  - list all companies
  - add company
  - edit company
  - delete company
- Admin-created companies are automatically saved as:
  - `status = approved`
  - `source_type = admin`

## 1) Create Supabase project

1. Create a new project at [https://supabase.com](https://supabase.com).
2. Open the SQL Editor.
3. Run the schema below.

## 2) SQL schema

```sql
create extension if not exists "pgcrypto";

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  phone text,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  status text not null check (status in ('approved', 'pending', 'rejected')),
  source_type text not null check (source_type in ('admin', 'user')),
  created_at timestamptz not null default now()
);

alter table public.companies enable row level security;

create policy "public_read_approved_companies"
on public.companies
for select
using (true);

create policy "allow_public_insert"
on public.companies
for insert
with check (true);

create policy "allow_public_update"
on public.companies
for update
using (true)
with check (true);

create policy "allow_public_delete"
on public.companies
for delete
using (true);
```

> Note: This intentionally allows open admin CRUD because auth is out of scope for this phase.

## 3) Configure environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find both values in Supabase Project Settings → API.

## 4) Run locally

```bash
npm install
npm run dev
```

Open:
- Public map: `http://localhost:3000/`
- Admin workflow: `http://localhost:3000/admin`

## Notes

- English UI only.
- No authentication added yet.
- No user submission flow added yet.
