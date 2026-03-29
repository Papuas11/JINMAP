import { approveSubmission, rejectSubmission, signOutAdmin } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase/server';

type PendingCompany = {
  id: string;
  company_name: string;
  category: string;
  phone_number: string;
  exact_address: string;
  latitude: number;
  longitude: number;
};

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: pending } = await supabase
    .from('companies')
    .select('id, company_name, category, phone_number, exact_address, latitude, longitude')
    .eq('status', 'pending')
    .order('company_name');

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Admin Panel</h1>
        <form action={signOutAdmin}>
          <button className="btn-ghost" type="submit">
            Logout
          </button>
        </form>
      </section>

      <section className="moderation-section">
        <h2>Pending Submissions</h2>
        {!(pending as PendingCompany[] | null)?.length ? (
          <p className="empty-state">No pending items right now.</p>
        ) : (
          <ul className="pending-list">
            {(pending as PendingCompany[]).map((item) => (
              <li key={item.id} className="pending-card">
                <div>
                  <h3>{item.company_name}</h3>
                  <p>{item.category}</p>
                  <p>{item.phone_number}</p>
                  <small>{item.exact_address}</small>
                  <small>
                    {item.latitude}, {item.longitude}
                  </small>
                </div>
                <div className="action-row">
                  <form action={approveSubmission}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="btn-primary" type="submit">
                      Approve
                    </button>
                  </form>
                  <form action={rejectSubmission}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="btn-danger" type="submit">
                      Reject
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
