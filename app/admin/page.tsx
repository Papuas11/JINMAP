'use client';

import { useMemo, useState } from 'react';
import { Alert } from '@/components/feedback/alert';
import { EmptyState } from '@/components/feedback/state';
import { CompanyForm } from '@/components/forms/company-form';
import { adminAuth } from '@/lib/auth';
import { companyStore } from '@/lib/store';
import type { Company } from '@/lib/types';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => adminAuth.isLoggedIn());
  const [companies, setCompanies] = useState<Company[]>(() => companyStore.list());
  const [message, setMessage] = useState<{ kind: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);


  const pending = useMemo(() => companies.filter((c) => c.status === 'pending'), [companies]);


  if (!loggedIn) {
    return (
      <main className="container">
        <section className="section-card" style={{ maxWidth: 460, margin: '0 auto', padding: 24 }}>
          <h1 className="page-title" style={{ fontSize: '1.6rem' }}>Admin Login</h1>
          <p style={{ color: 'var(--text-muted)' }}>Use your configured admin credentials.</p>
          {message && <Alert kind={message.kind} message={message.text} />}
          <form
            className="grid"
            onSubmit={(e) => {
              e.preventDefault();
              const valid = adminAuth.login(email, password);
              if (valid) {
                setLoggedIn(true);
                setMessage({ kind: 'success', text: 'Signed in successfully.' });
              } else {
                setMessage({ kind: 'error', text: 'Invalid credentials.' });
              }
            }}
          >
            <input className="input" type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn btn-primary">Login</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="container grid" style={{ gap: 20 }}>
      <section className="section-card" style={{ padding: 24 }}>
        <h1 className="page-title">Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Review pending submissions and maintain company records.</p>
        {message && <Alert kind={message.kind} message={message.text} />}
      </section>

      <section className="section-card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Pending approvals ({pending.length})</h2>
        {pending.length === 0 ? (
          <EmptyState title="No pending submissions" subtitle="All submissions have been reviewed." />
        ) : (
          <div className="grid">
            {pending.map((company) => (
              <article key={company.id} className="section-card" style={{ padding: 16, boxShadow: 'none' }}>
                <h3 style={{ marginTop: 0 }}>{company.name}</h3>
                <p>{company.description}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary" onClick={() => { companyStore.update(company.id, { status: 'approved' }); setCompanies(companyStore.list()); setMessage({ kind: 'success', text: `${company.name} approved.` }); }}>
                    Approve
                  </button>
                  <button className="btn btn-danger" onClick={() => { companyStore.update(company.id, { status: 'rejected' }); setCompanies(companyStore.list()); setMessage({ kind: 'info', text: `${company.name} rejected.` }); }}>
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section-card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>{editing ? 'Edit company' : 'Create approved company'}</h2>
        <CompanyForm
          initial={editing ?? undefined}
          loading={saving}
          submitLabel={editing ? 'Save changes' : 'Create company'}
          onSubmit={async (value) => {
            setSaving(true);
            if (editing) {
              companyStore.update(editing.id, value);
              setMessage({ kind: 'success', text: 'Company updated.' });
              setEditing(null);
            } else {
              companyStore.create(value, 'approved');
              setMessage({ kind: 'success', text: 'Company created and approved.' });
            }
            setCompanies(companyStore.list());
            setSaving(false);
          }}
        />
      </section>

      <section className="section-card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>All companies</h2>
        <div className="grid">
          {companies.map((company) => (
            <article key={company.id} className="section-card" style={{ padding: 16, boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{company.name}</strong>
                  <p style={{ margin: '6px 0', color: 'var(--text-muted)' }}>{company.category} • {company.address}</p>
                </div>
                <span className={`badge badge-${company.status}`}>{company.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary" onClick={() => setEditing(company)}>Edit</button>
                <button className="btn btn-danger" onClick={() => { companyStore.remove(company.id); setCompanies(companyStore.list()); setMessage({ kind: 'success', text: 'Company deleted.' }); }}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
