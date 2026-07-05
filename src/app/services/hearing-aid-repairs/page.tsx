import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Hearing Aid Repair & Maintenance | Linaw Dinig",
  description: "Reliable repair and maintenance for your hearing devices in the Philippines. In-clinic servicing at our Tanay, Cebu, Dasmariñas and La Union branches.",
  keywords: [
    "hearing aid repair Philippines",
    "hearing aid maintenance",
    "hearing aid servicing",
    "hearing aid cleaning",
    "hearing aid repair Tanay Cebu Dasmariñas La Union",
  ],
  openGraph: {
    title: "Hearing Aid Repair & Maintenance",
    description: "Reliable repair and maintenance for your hearing devices.",
  },
};

export default function Page() {
  return (
    <SubPage eyebrow="Services" title="Hearing Aid Repair & Maintenance" subtitle="Reliable repair and maintenance for your hearing devices.">
      <p>Routine maintenance and minor cleaning can be done in-clinic the same day. For more complex issues, we send to the manufacturer and keep you updated every step of the way.</p>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Who it's for">For clients using hearing aid brands we offer.</InfoCard>
        <InfoCard title="Turnaround">Often same-day for cleaning and minor fixes. 2 weeks to 1 month for manufacturer repairs.</InfoCard>
        <InfoCard title="Cost">A quote is provided before any chargeable work begins — no surprises.</InfoCard>
      </div>
    </SubPage>
  );
}
