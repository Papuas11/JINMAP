import { DashboardShell } from '@/components/layout/dashboard-shell';

export default function AdminLoginPage() {
  return (
    <DashboardShell>
      <section className="mx-auto w-full max-w-md surface-card">
        <h1 className="section-title">Admin Login</h1>
        <p className="section-copy">Secure sign-in entry point for administrators.</p>
        <form className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="font-medium text-slate-700">Email</span>
            <input
              type="email"
              placeholder="admin@jinjamaps.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-blue-200 transition focus:ring"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="font-medium text-slate-700">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-blue-200 transition focus:ring"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Continue
          </button>
        </form>
      </section>
    </DashboardShell>
  );
}
