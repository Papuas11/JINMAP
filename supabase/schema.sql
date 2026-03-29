create type company_status as enum ('approved', 'pending', 'rejected');

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  website text,
  status company_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists companies_status_idx on companies(status);
create index if not exists companies_category_idx on companies(category);
create index if not exists companies_name_idx on companies(name);
