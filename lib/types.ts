export type CompanyStatus = 'approved' | 'pending' | 'rejected';

export interface Company {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  website?: string;
  status: CompanyStatus;
  createdAt: string;
}

export interface CompanyInput {
  name: string;
  category: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  website?: string;
}
