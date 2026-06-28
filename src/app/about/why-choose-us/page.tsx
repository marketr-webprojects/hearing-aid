import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Why Choose Linaw Dinig Hearing Aid Center | Philippine Audiology",
  description: "Experienced audiologists, the latest hearing technology, affordable and flexible payment plans, friendly patient-focused service, and free consultations. Here's why patients across the Philippines choose Linaw Dinig.",
  openGraph: {
    title: "Why Choose Linaw Dinig",
    description: "Experienced, affordable, patient-focused hearing care.",
  },
};

export default function Page() {
  return (
    <SubPage eyebrow="About" title="Why Choose Linaw Dinig?" subtitle="A few reasons our patients keep coming back — and bringing their families.">
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Experienced audiologists & technicians">Licensed professionals who assess, fit and care for your hearing with genuine expertise.</InfoCard>
        <InfoCard title="Latest hearing technology & brands">Advanced hearing aids and audiometric tools matched to your needs.</InfoCard>
        <InfoCard title="Affordable & flexible payment plans">Quality hearing care that fits your lifestyle, degree of hearing loss and budget.</InfoCard>
        <InfoCard title="Friendly, patient-focused service">We never rush. Your questions and your comfort always come first.</InfoCard>
        <InfoCard title="Free consultations & trial options">Start with a free hearing consultation and try before you commit.</InfoCard>
        <InfoCard title="Care for every age">Comprehensive evaluation and support for both adults and children.</InfoCard>
      </div>
    </SubPage>
  );
}
