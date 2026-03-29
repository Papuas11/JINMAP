'use client';

import { useState } from 'react';
import type { Company, CompanyInput } from '@/lib/types';

const defaultValue: CompanyInput = {
  name: '',
  category: '',
  description: '',
  address: '',
  latitude: 0.431,
  longitude: 33.204,
  website: '',
};

export function CompanyForm({
  initial,
  onSubmit,
  submitLabel,
  loading,
}: {
  initial?: Company;
  onSubmit: (value: CompanyInput) => Promise<void> | void;
  submitLabel: string;
  loading?: boolean;
}) {
  const [value, setValue] = useState<CompanyInput>(
    initial
      ? {
          name: initial.name,
          category: initial.category,
          description: initial.description,
          address: initial.address,
          latitude: initial.latitude,
          longitude: initial.longitude,
          website: initial.website,
        }
      : defaultValue,
  );

  return (
    <form
      className="grid"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(value);
      }}
    >
      <input className="input" placeholder="Company name" value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} required />
      <input className="input" placeholder="Category" value={value.category} onChange={(e) => setValue({ ...value, category: e.target.value })} required />
      <textarea className="textarea" placeholder="Description" value={value.description} onChange={(e) => setValue({ ...value, description: e.target.value })} rows={3} required />
      <input className="input" placeholder="Address" value={value.address} onChange={(e) => setValue({ ...value, address: e.target.value })} required />
      <div className="grid grid-2">
        <input className="input" type="number" step="0.0001" placeholder="Latitude" value={value.latitude} onChange={(e) => setValue({ ...value, latitude: Number(e.target.value) })} required />
        <input className="input" type="number" step="0.0001" placeholder="Longitude" value={value.longitude} onChange={(e) => setValue({ ...value, longitude: Number(e.target.value) })} required />
      </div>
      <input className="input" placeholder="Website (optional)" value={value.website} onChange={(e) => setValue({ ...value, website: e.target.value })} />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
