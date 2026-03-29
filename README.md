# JINJA MAPS

JINJA MAPS is a single Next.js application for discovering companies in Jinja on a searchable directory + map, with an admin review workflow for public submissions.

## Project overview

- Public directory page with search, category filters, company cards, detail panel, and interactive map.
- Public company submission form (submissions enter `pending` state).
- Admin dashboard for login + CRUD + moderation (`approve` / `reject`).
- Public page only shows `approved` companies.
- Local demo mode by default (browser localStorage seed data).
- Supabase-ready schema + environment variable setup for production-backed persistence.

## Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **UI:** CSS (global design tokens + reusable components)
- **Map:** Leaflet + react-leaflet (OpenStreetMap tiles)
- **Backend (ready):** Supabase client configuration and SQL schema

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment template:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment variables

Set these in `.env.local` for local and Vercel for deployment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ADMIN_EMAIL`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

> In local demo mode, if Supabase values are empty the app still runs with localStorage data.

## Supabase setup

1. Create a Supabase project.
2. Run the SQL from `supabase/schema.sql`.
3. Enable Row Level Security and add policies according to your security model.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## SQL schema

The schema file is included at:

- `supabase/schema.sql`

It includes:

- `companies` table
- `company_status` enum (`approved`, `pending`, `rejected`)
- indexes for status/category/search

## Admin login setup

Admin login uses environment values:

- `NEXT_PUBLIC_ADMIN_EMAIL`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

On successful login, a local auth flag is stored in browser localStorage for the admin session.

## Public submission flow

1. Visitor submits company on homepage.
2. Record is stored as `pending`.
3. Admin reviews in dashboard and approves/rejects.
4. Only `approved` companies appear on public directory + map.

## Demo checklist

1. Open `/` and verify approved cards and map markers render.
2. Submit a company and confirm success feedback.
3. Open `/admin` and login.
4. Approve/reject pending item.
5. Create, edit, and delete a company.
6. Return to `/` and confirm only approved companies are shown.

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import repo in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

Notes:

- No secrets are hardcoded in source.
- `.env.local` is gitignored.
- App is a single clean Next.js project for demo and production evolution.
