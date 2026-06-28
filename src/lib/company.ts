// Single source of truth for Linaw Dinig Hearing Aid Center company details.
// Sourced from the official company profile.

export const COMPANY = {
  name: "Linaw Dinig Hearing Aid Center",
  shortName: "Linaw Dinig",
  // "Linaw Dinig" translates to "Clear Hearing"
  tagline: "Clear Hearing. Better Living.",
  nameMeaning: "Clear Hearing",
  industry: "Healthcare / Hearing Solutions",
  established: "June 14, 2021",
  email: "linaw.dinig.hac@gmail.com",
  // Primary contact number (Tanay main office)
  phone: "0917 553 2999",
  phoneHref: "tel:+639175532999",
  social: {
    tiktok: "@linawdinighearing",
    tiktokHref: "https://www.tiktok.com/@linawdinighearing",
  },
} as const;

export type Branch = {
  name: string;
  main?: boolean;
  address: string;
  phone: string;
  phoneHref: string;
  hours: string;
  facebookLabel: string;
  facebookHref: string;
  image: string;
};

export const BRANCHES: Branch[] = [
  {
    name: "Tanay, Rizal (Main Office)",
    main: true,
    address:
      "98 Unit B G-Complex Sampaloc Rd., Brgy. Plaza Aldea, Tanay, Rizal 1980",
    phone: "0917 553 2999",
    phoneHref: "tel:+639175532999",
    hours: "Monday to Friday, 9AM – 5PM",
    facebookLabel: "Linaw Dinig Hearing Aid Center – Tanay",
    facebookHref: "https://web.facebook.com/linawdinigtanay/",
    image: "/assets/branch-tanay.webp",
  },
  {
    name: "Cebu City, Cebu",
    address:
      "3rd Flr. Anchor Lab Medical Center, Aspac Bldg., N. Bacalso Ave., Sambag I, Cebu City, Cebu",
    phone: "0917 851 8899",
    phoneHref: "tel:+639178518899",
    hours: "Monday to Friday, 9AM – 5PM",
    facebookLabel: "Linaw Dinig Hearing Aid Center – Cebu",
    facebookHref: "https://web.facebook.com/linawdinigcebu/",
    image: "/assets/branch-cebu.webp",
  },
  {
    name: "Dasmariñas City, Cavite",
    address:
      "2nd Flr. JaroMed and Diagnostic Center, GRJ Jaro Bldg., Aguinaldo Highway, Salitran I, Dasmariñas City, Cavite",
    phone: "0917 770 0288",
    phoneHref: "tel:+639177700288",
    hours: "By Appointment, 9AM – 5PM",
    facebookLabel: "Linaw Dinig Hearing Aid Center – Dasma",
    facebookHref: "https://web.facebook.com/linawdinigdasma/",
    image: "/assets/branch-dasmarinas.webp",
  },
  {
    name: "Rosario, La Union",
    address:
      "Rosario Diagnostic Center, MacArthur Highway, Rosario, La Union",
    phone: "0917 620 9898",
    phoneHref: "tel:+639176209898",
    hours: "Monday to Friday, 9AM – 4PM",
    facebookLabel: "Linaw Dinig Hearing Aid Center – La Union",
    facebookHref: "https://web.facebook.com/linawdiniglaunion/",
    image: "/assets/branch-rosario.webp",
  },
];
