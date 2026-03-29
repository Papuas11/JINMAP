import Link from 'next/link';
import { TopNav } from '@/components/layout/top-nav';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <section className="surface-card p-8 lg:p-10">
          <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Foundation Ready
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            Discover businesses in Jinja with a clean, premium map experience.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600 lg:text-lg">
            This is the initial frontend foundation for JINJA MAPS. The structure is prepared for business listings,
            map integrations, and admin workflows in upcoming steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">
              Open Admin Panel
            </Link>
            <Link
              href="/admin/login"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700"
            >
              Admin Login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
