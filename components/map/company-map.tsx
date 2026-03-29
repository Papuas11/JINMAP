'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import type { Company } from '@/lib/types';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function CompanyMap({ companies }: { companies: Company[] }) {
  const center: [number, number] = companies.length
    ? [companies[0].latitude, companies[0].longitude]
    : [0.431, 33.204];

  return (
    <div className="section-card" style={{ overflow: 'hidden' }}>
      <MapContainer center={center} zoom={13} style={{ height: 420, width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {companies.map((company) => (
          <Marker key={company.id} position={[company.latitude, company.longitude]} icon={icon}>
            <Popup>
              <strong>{company.name}</strong>
              <br />
              {company.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
