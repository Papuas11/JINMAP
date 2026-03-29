'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { CompanyCard } from '@/components/cards/company-card';
import { Alert } from '@/components/feedback/alert';
import { EmptyState } from '@/components/feedback/state';
import { CompanyForm } from '@/components/forms/company-form';
import { companyStore } from '@/lib/store';
import type { Company } from '@/lib/types';

const CompanyMap = dynamic(
  () => import('@/components/map/company-map').then((m) => m.CompanyMap),
  { ssr: false },
);

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>(() => companyStore.list());
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<Company | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);


  const approved = useMemo(() => companies.filter((c) => c.status === 'approved'), [companies]);
  const categories = useMemo(
    () => ['all', ...new Set(approved.map((c) => c.category))],
    [approved],
  );

  const filtered = useMemo(
    () =>
      approved.filter((company) => {
        const q = query.toLowerCase();
        const matchesQuery =
          company.name.toLowerCase().includes(q) ||
          company.description.toLowerCase().includes(q) ||
          company.address.toLowerCase().includes(q);
        const matchesCategory = category === 'all' || company.category === category;
        return matchesQuery && matchesCategory;
      }),
    [approved, query, category],
  );


  return (
    <main className="container grid" style={{ gap: 20 }}>
      <section className="section-card" style={{ padding: 24 }}>
        <h1 className="page-title">Discover trusted companies in Jinja</h1>
        <p style={{ color: 'var(--text-muted)' }}>Search approved businesses and submit new companies for review.</p>
        <div className="grid grid-2">
          <input className="input" placeholder="Search companies" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </section>

      <CompanyMap companies={filtered} />

      {notice && <Alert kind="success" message={notice} />}

      {filtered.length === 0 ? (
        <EmptyState title="No companies found" subtitle="Try another search term or category." />
      ) : (
        <section className="grid grid-3">
          {filtered.map((company) => (
            <CompanyCard key={company.id} company={company} onView={setSelected} />
          ))}
        </section>
      )}

      <section className="section-card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Submit your company</h2>
        <p style={{ color: 'var(--text-muted)' }}>Submissions are reviewed by admins before appearing publicly.</p>
        <CompanyForm
          submitLabel="Submit for review"
          loading={submitting}
          onSubmit={async (value) => {
            setSubmitting(true);
            companyStore.create(value, 'pending');
            setCompanies(companyStore.list());
            setNotice('Submission received. It is now pending admin approval.');
            setSubmitting(false);
          }}
        />
      </section>

      {selected && (
        <section className="section-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ marginTop: 0 }}>{selected.name}</h2>
            <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
          </div>
          <p><strong>Category:</strong> {selected.category}</p>
          <p><strong>Address:</strong> {selected.address}</p>
          <p>{selected.description}</p>
          {selected.website && (
            <a className="btn btn-secondary" href={selected.website} target="_blank" rel="noreferrer">Visit website</a>
          )}
        </section>
      )}
    </main>
  );
}
