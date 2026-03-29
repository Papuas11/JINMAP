"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createCompany, deleteCompany, getAllCompanies, updateCompany } from "@/lib/companies";
import type { Company, CompanyInput } from "@/types/company";

const emptyForm: CompanyInput = {
  name: "",
  category: "",
  phone: "",
  address: "",
  latitude: 0,
  longitude: 0,
};

export default function AdminDashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [form, setForm] = useState<CompanyInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadCompanies() {
    setLoading(true);
    setError(null);
    try {
      const all = await getAllCompanies();
      setCompanies(all);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load companies");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  const title = useMemo(() => (editingId ? "Edit Company" : "Add Company"), [editingId]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function onEdit(company: Company) {
    setEditingId(company.id);
    setForm({
      name: company.name,
      category: company.category,
      phone: company.phone ?? "",
      address: company.address,
      latitude: company.latitude,
      longitude: company.longitude,
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        await updateCompany(editingId, form);
      } else {
        await createCompany(form);
      }

      await loadCompanies();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save company");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteCompany(id);
      await loadCompanies();
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete company");
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "20px" }}>
        <section style={{ background: "white", borderRadius: "18px", padding: "20px", boxShadow: "0 10px 30px rgba(15,23,42,.08)" }}>
          <h1 style={{ marginTop: 0 }}>Admin Panel</h1>
          <p style={{ color: "#64748b" }}>Manage companies directly in Supabase.</p>

          <h2>{title}</h2>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: "10px" }}>
            <input required placeholder="Company Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input required placeholder="Exact Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <input
              required
              type="number"
              step="0.000001"
              placeholder="Latitude"
              value={form.latitude}
              onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
            />
            <input
              required
              type="number"
              step="0.000001"
              placeholder="Longitude"
              value={form.longitude}
              onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : editingId ? "Update Company" : "Add Company"}
              </button>
              {editingId ? (
                <button type="button" onClick={resetForm}>
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </form>

          {error ? <p style={{ color: "#dc2626" }}>{error}</p> : null}
        </section>

        <section style={{ background: "white", borderRadius: "18px", padding: "20px", boxShadow: "0 10px 30px rgba(15,23,42,.08)" }}>
          <h2 style={{ marginTop: 0 }}>All Companies</h2>
          {loading ? <p>Loading companies...</p> : null}
          <div style={{ display: "grid", gap: "10px" }}>
            {companies.map((company) => (
              <article key={company.id} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px" }}>
                <strong>{company.name}</strong>
                <div style={{ color: "#334155" }}>{company.category}</div>
                <div style={{ color: "#64748b", fontSize: "0.9rem" }}>{company.address}</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "4px" }}>
                  status: {company.status} • source: {company.source_type}
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <button type="button" onClick={() => onEdit(company)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(company.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
            {!loading && companies.length === 0 ? <p>No companies yet.</p> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
