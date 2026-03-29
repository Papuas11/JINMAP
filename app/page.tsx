"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { approvedCompanies } from "@/data/companies";
import type { Company } from "@/data/companies";

const MapPanel = dynamic(() => import("@/components/MapPanel"), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>
});

const allCategories = ["All", ...Array.from(new Set(approvedCompanies.map((company) => company.category)))];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(approvedCompanies[0] ?? null);

  const filteredCompanies = useMemo(() => {
    return approvedCompanies.filter((company) => {
      const byName = company.name.toLowerCase().includes(search.trim().toLowerCase());
      const byCategory = category === "All" || company.category === category;
      return byName && byCategory;
    });
  }, [category, search]);

  return (
    <main className="homepage-shell">
      <header className="top-header">
        <div>
          <p className="eyebrow">Verified Business Discovery</p>
          <h1>JINJA MAPS</h1>
        </div>
        <button className="primary-button" type="button">
          Add Place
        </button>
      </header>

      <section className="controls-panel">
        <label className="search-control" htmlFor="company-search">
          <span>Search company</span>
          <input
            id="company-search"
            placeholder="Type a company name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="select-control" htmlFor="category-filter">
          <span>Category</span>
          <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>
            {allCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="content-grid">
        <aside className="sidebar">
          <div className="sidebar-heading">
            <h2>Approved Companies</h2>
            <p>{filteredCompanies.length} listed</p>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="empty-state">
              <p>No companies match your current search and filter.</p>
              <small>Try clearing the search or selecting another category.</small>
            </div>
          ) : (
            <ul className="company-list">
              {filteredCompanies.map((company) => (
                <li key={company.id}>
                  <button
                    className={`company-card ${selectedCompany?.id === company.id ? "selected" : ""}`}
                    type="button"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <strong>{company.name}</strong>
                    <p>{company.category}</p>
                    <p>{company.phone}</p>
                    <small>{company.address}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="map-wrapper">
          <MapPanel
            companies={filteredCompanies}
            selectedCompany={selectedCompany && filteredCompanies.some((c) => c.id === selectedCompany.id) ? selectedCompany : null}
            onSelectCompany={setSelectedCompany}
          />
        </div>
      </section>
    </main>
  );
}
