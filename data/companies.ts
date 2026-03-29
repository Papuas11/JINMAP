export type Company = {
  id: string;
  name: string;
  category: "Hotel" | "Restaurant" | "Health" | "Education" | "Retail" | "Tourism";
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const approvedCompanies: Company[] = [
  {
    id: "source-of-the-smile",
    name: "Source of the Smile Café",
    category: "Restaurant",
    phone: "+256 772 140 201",
    address: "14 Main Street, Jinja, Uganda",
    latitude: 0.4249,
    longitude: 33.2042
  },
  {
    id: "nile-crown-hotel",
    name: "Nile Crown Hotel",
    category: "Hotel",
    phone: "+256 752 331 129",
    address: "26 Kiira Road, Jinja, Uganda",
    latitude: 0.4376,
    longitude: 33.1964
  },
  {
    id: "busoga-health-hub",
    name: "Busoga Health Hub",
    category: "Health",
    phone: "+256 702 991 875",
    address: "Plot 8 Nalufenya Road, Jinja, Uganda",
    latitude: 0.4389,
    longitude: 33.2141
  },
  {
    id: "jinja-tech-academy",
    name: "Jinja Tech Academy",
    category: "Education",
    phone: "+256 709 502 338",
    address: "41 Lubas Road, Jinja, Uganda",
    latitude: 0.4418,
    longitude: 33.2074
  },
  {
    id: "victoria-crafts",
    name: "Victoria Crafts Market",
    category: "Retail",
    phone: "+256 788 650 411",
    address: "7 Bell Avenue, Jinja, Uganda",
    latitude: 0.4274,
    longitude: 33.1987
  },
  {
    id: "nile-river-adventures",
    name: "Nile River Adventures",
    category: "Tourism",
    phone: "+256 770 244 650",
    address: "18 Clive Road, Jinja, Uganda",
    latitude: 0.4278,
    longitude: 33.2123
  },
  {
    id: "jinja-garden-bistro",
    name: "Jinja Garden Bistro",
    category: "Restaurant",
    phone: "+256 754 082 600",
    address: "33 Gabula Road, Jinja, Uganda",
    latitude: 0.4335,
    longitude: 33.2058
  }
];
