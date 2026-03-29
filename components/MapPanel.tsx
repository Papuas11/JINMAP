"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { Company } from "@/data/companies";

const jinjaCenter: [number, number] = [0.4244, 33.2042];

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function RecenterMap({ selectedCompany }: { selectedCompany: Company | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCompany) {
      map.flyTo([selectedCompany.latitude, selectedCompany.longitude], 15, {
        duration: 1.1
      });
    }
  }, [map, selectedCompany]);

  return null;
}

function MapClickHandler() {
  useMapEvents({
    click(event) {
      // Reserved for future public map click workflow extensions.
      console.debug("Map clicked at:", event.latlng);
    }
  });

  return null;
}

type MapPanelProps = {
  companies: Company[];
  selectedCompany: Company | null;
  onSelectCompany: (company: Company) => void;
};

export default function MapPanel({ companies, selectedCompany, onSelectCompany }: MapPanelProps) {
  return (
    <MapContainer center={jinjaCenter} zoom={13} scrollWheelZoom className="map-canvas">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <RecenterMap selectedCompany={selectedCompany} />
      {companies.map((company) => (
        <Marker
          key={company.id}
          icon={markerIcon}
          position={[company.latitude, company.longitude]}
          eventHandlers={{
            click: () => onSelectCompany(company)
          }}
        >
          <Popup>
            <div className="popup-content">
              <strong>{company.name}</strong>
              <span>{company.category}</span>
              <span>{company.phone}</span>
              <span>{company.address}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
