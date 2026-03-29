"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Company } from "@/types/company";
import { useMemo } from "react";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function CenterOnCompany({ company }: { company: Company | null }) {
  const map = useMap();

  if (company) {
    map.flyTo([company.latitude, company.longitude], 15, { duration: 1 });
  }

  return null;
}

interface Props {
  companies: Company[];
  selectedCompany: Company | null;
}

export default function CompanyMap({ companies, selectedCompany }: Props) {
  const defaultCenter = useMemo<[number, number]>(() => {
    if (companies.length > 0) {
      return [companies[0].latitude, companies[0].longitude];
    }
    return [0.3476, 32.5825];
  }, [companies]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterOnCompany company={selectedCompany} />
      {companies.map((company) => (
        <Marker key={company.id} position={[company.latitude, company.longitude]} icon={markerIcon}>
          <Popup>
            <strong>{company.name}</strong>
            <br />
            {company.category}
            <br />
            {company.address}
            {company.phone ? (
              <>
                <br />
                {company.phone}
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
