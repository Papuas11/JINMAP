'use client';

import { seedCompanies } from '@/lib/sample-data';
import type { Company, CompanyInput, CompanyStatus } from '@/lib/types';

const KEY = 'jinja_maps_companies';

const isBrowser = () => typeof window !== 'undefined';

function read(): Company[] {
  if (!isBrowser()) return seedCompanies;
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seedCompanies));
    return seedCompanies;
  }
  try {
    return JSON.parse(raw) as Company[];
  } catch {
    localStorage.setItem(KEY, JSON.stringify(seedCompanies));
    return seedCompanies;
  }
}

function write(companies: Company[]) {
  if (isBrowser()) localStorage.setItem(KEY, JSON.stringify(companies));
}

export const companyStore = {
  list(): Company[] {
    return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  create(input: CompanyInput, status: CompanyStatus = 'pending'): Company {
    const companies = read();
    const company: Company = {
      id: crypto.randomUUID(),
      ...input,
      status,
      createdAt: new Date().toISOString(),
    };
    companies.push(company);
    write(companies);
    return company;
  },

  update(id: string, patch: Partial<Company>): Company | null {
    const companies = read();
    const next = companies.map((company) =>
      company.id === id ? { ...company, ...patch } : company,
    );
    const updated = next.find((company) => company.id === id) ?? null;
    write(next);
    return updated;
  },

  remove(id: string) {
    const companies = read().filter((company) => company.id !== id);
    write(companies);
  },
};
