export type CompanyStatus = "approved" | "pending" | "rejected";
export type CompanySource = "admin" | "user";

export interface Company {
  id: string;
  name: string;
  category: string;
  phone: string | null;
  address: string;
  latitude: number;
  longitude: number;
  status: CompanyStatus;
  source_type: CompanySource;
  created_at: string;
}

export interface CompanyInput {
  name: string;
  category: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
}
