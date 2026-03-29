import { AddPlaceModal } from '@/components/add-place-modal';
import { createClient } from '@/lib/supabase/server';

type Company = {
  id: string;
  company_name: string;
  category: string;
  exact_address: string;
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data: companies } = await supabase
    .from('companies')
    .select('id, company_name, category, exact_address')
    .eq('status', 'approved')
    .order('company_name');

  return (
    <main className="page-wrap">
      <section className="hero">
        <div>
          <p className="eyebrow">JINJA MAPS</p>
          <h1>Premium Discovery for Trusted Places</h1>
          <p className="subtitle">A Yandex-inspired look with curated companies only.</p>
        </div>
        <AddPlaceModal />
      </section>

      <section className="layout">
        <div className="map-panel">
          <div className="map-placeholder">Map Canvas Area</div>
        </div>

        <aside className="sidebar">
          <h2>Visible Places</h2>
          <ul>
            {(companies as Company[] | null)?.map((company) => (
              <li key={company.id} className="place-card">
                <h3>{company.company_name}</h3>
                <p>{company.category}</p>
                <small>{company.exact_address}</small>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
