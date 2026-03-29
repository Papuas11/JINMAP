"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Company } from "@/types/company";

const CompanyMap = dynamic(() => import("@/components/CompanyMap"), {
  ssr: false,
  loading: () => <div style={{ padding: "1rem" }}>Loading map…</div>,
});

export default function PublicMapView({ companies }: { companies: Company[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(companies[0]?.id ?? null);

  const selectedCompany = useMemo(
    () => companies.find((company) => company.id === selectedId) ?? null,
    [companies, selectedId],
  );

  return (
    <main style={{ minHeight: "100vh", padding: "24px" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "20px",
        }}
      >
        <aside
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            padding: "20px",
            height: "calc(100vh - 48px)",
            overflowY: "auto",
          }}
        >
          <h1 style={{ marginTop: 0, marginBottom: "4px" }}>JINJA MAPS</h1>
          <p style={{ marginTop: 0, color: "#64748b" }}>Approved companies</p>

          <div style={{ display: "grid", gap: "12px" }}>
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setSelectedId(company.id)}
                style={{
                  border: selectedId === company.id ? "2px solid #2563eb" : "1px solid #dbe5f0",
                  background: selectedId === company.id ? "#eff6ff" : "#fff",
                  borderRadius: "14px",
                  textAlign: "left",
                  padding: "12px",
                  cursor: "pointer",
                }}
              >
                <strong>{company.name}</strong>
                <div style={{ color: "#334155", marginTop: "4px" }}>{company.category}</div>
                <div style={{ color: "#64748b", marginTop: "4px", fontSize: "0.9rem" }}>{company.address}</div>
              </button>
            ))}
            {companies.length === 0 ? (
              <div style={{ color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: "12px", padding: "12px" }}>
                No approved companies yet.
              </div>
            ) : null}
          </div>
        </aside>
        <section
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
            height: "calc(100vh - 48px)",
          }}
        >
          <CompanyMap companies={companies} selectedCompany={selectedCompany} />
        </section>
      </div>
    </main>
  );
}
