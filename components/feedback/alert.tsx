interface AlertProps {
  kind: 'success' | 'error' | 'info';
  message: string;
}

export function Alert({ kind, message }: AlertProps) {
  const color =
    kind === 'success' ? '#ecfdf3' : kind === 'error' ? '#fee4e2' : '#eff8ff';
  const border =
    kind === 'success' ? '#abefc6' : kind === 'error' ? '#fecdca' : '#b2ddff';

  return (
    <div style={{ background: color, border: `1px solid ${border}`, borderRadius: 12, padding: 12 }}>
      {message}
    </div>
  );
}
