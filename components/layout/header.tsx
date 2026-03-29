'use client';

import Link from 'next/link';
import { adminAuth } from '@/lib/auth';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <header className="container" style={{ paddingBottom: 12 }}>
      <nav
        className="section-card"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14 }}
      >
        <div>
          <strong>JINJA MAPS</strong>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Company discovery map</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link className="btn btn-secondary" href="/">
            Public Directory
          </Link>
          <Link className="btn btn-secondary" href="/admin">
            Admin
          </Link>
          {isAdmin && (
            <button
              className="btn btn-danger"
              onClick={() => {
                adminAuth.logout();
                router.push('/');
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
