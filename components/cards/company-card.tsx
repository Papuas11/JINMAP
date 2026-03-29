import type { Company } from '@/lib/types';

export function CompanyCard({ company, onView }: { company: Company; onView: (c: Company) => void }) {
  return (
    <article className="section-card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{ margin: '0 0 8px' }}>{company.name}</h3>
        <span className={`badge badge-${company.status}`}>{company.status.toUpperCase()}</span>
      </div>
      <p style={{ marginTop: 0, color: 'var(--text-muted)' }}>{company.category}</p>
      <p style={{ minHeight: 48 }}>{company.description}</p>
      <button className="btn btn-primary" onClick={() => onView(company)}>
        View details
      </button>
    </article>
  );
}
