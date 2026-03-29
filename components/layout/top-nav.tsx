import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/admin', label: 'Admin' },
  { href: '/admin/login', label: 'Admin Login' },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-slate-900">
          JINJA MAPS
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
