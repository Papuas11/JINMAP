import { supabase } from "@/lib/supabase";
import type { Company, CompanyInput } from "@/types/company";

export async function getApprovedCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Company[];
}

export async function getAllCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Company[];
}

export async function createCompany(input: CompanyInput): Promise<void> {
  const payload = {
    ...input,
    status: "approved",
    source_type: "admin",
  };

  const { error } = await supabase.from("companies").insert(payload);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCompany(id: string, input: CompanyInput): Promise<void> {
  const { error } = await supabase.from("companies").update(input).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteCompany(id: string): Promise<void> {
  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
