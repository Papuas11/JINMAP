import { TopNav } from './top-nav';

export function DashboardShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr] lg:px-10">
        <aside className="surface-card h-fit">
          <h2 className="section-title">Workspace</h2>
          <p className="section-copy">Navigation and controls for future business map management.</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-700">
            <li className="rounded-lg bg-slate-100 px-3 py-2">Overview</li>
            <li className="rounded-lg px-3 py-2">Businesses</li>
            <li className="rounded-lg px-3 py-2">Categories</li>
          </ul>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
