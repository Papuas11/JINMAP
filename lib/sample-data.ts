import type { Company } from '@/lib/types';

export const seedCompanies: Company[] = [
  {
    id: 'c1',
    name: 'Jinja Solar Labs',
    category: 'Energy',
    description: 'Solar design and field installation specialists.',
    address: 'Nile Avenue, Jinja',
    latitude: 0.431,
    longitude: 33.204,
    website: 'https://example.com',
    status: 'approved',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c2',
    name: 'Lakeview Agro Co-op',
    category: 'Agriculture',
    description: 'Farmer cooperative for crop processing and exports.',
    address: 'Main Street, Jinja',
    latitude: 0.428,
    longitude: 33.201,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];
