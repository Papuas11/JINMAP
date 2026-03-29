import { DashboardShell } from '@/components/layout/dashboard-shell';

export default function AdminPage() {
  return (
    <DashboardShell>
      <section className="surface-card">
        <h1 className="section-title">Admin Panel</h1>
        <p className="section-copy">Manage business map operations from a focused dashboard interface.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {['Recent Activity', 'Business Queue', 'Platform Status'].map((card) => (
            <article key={card} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-slate-900">{card}</h2>
              <p className="mt-2 text-sm text-slate-600">Placeholder module prepared for future backend integration.</p>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
