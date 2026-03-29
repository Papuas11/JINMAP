export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="section-card" style={{ padding: 30, textAlign: 'center', color: 'var(--text-muted)' }}>
      <h3 style={{ marginTop: 0, color: 'var(--text)' }}>{title}</h3>
      <p style={{ marginBottom: 0 }}>{subtitle}</p>
    </div>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="section-card" style={{ padding: 24, textAlign: 'center' }}>
      <div style={{ fontWeight: 600 }}>{label}</div>
    </div>
  );
}
