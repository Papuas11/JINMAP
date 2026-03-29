export const dynamic = "force-dynamic";

import PublicMapView from "@/components/PublicMapView";
import { getApprovedCompanies } from "@/lib/companies";

export default async function HomePage() {
  const companies = await getApprovedCompanies();

  return <PublicMapView companies={companies} />;
}
