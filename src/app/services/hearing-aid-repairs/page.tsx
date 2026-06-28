import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Hearing Aid Repair & Maintenance — All Brands | Linaw Dinig",
  description: "Fast and reliable hearing aid repair and maintenance for various brands in the Philippines — even if you didn't buy from us. In-clinic servicing at our Tanay, Cebu, Dasmariñas and La Union branches.",
  keywords: [
    "hearing aid repair Philippines",
    "hearing aid maintenance",
    "hearing aid servicing",
    "hearing aid cleaning",
    "hearing aid repair Tanay Cebu Dasmariñas La Union",
  ],
  openGraph: {
    title: "Hearing Aid Repair & Maintenance",
    description: "Fast, reliable repair and maintenance for various hearing aid brands.",
  },
};

export default function Page() {
  return (
    <SubPage eyebrow="Services" title="Hearing Aid Repair & Maintenance" subtitle="Fast and reliable repair and maintenance for various hearing aid brands — even if you didn't buy them from us.">
      <p>Many repairs and routine maintenance can be done in-clinic the same day. For more complex issues, we send to the manufacturer and keep you updated every step of the way.</p>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Who it's for">Anyone with a hearing aid that's not performing the way it should.</InfoCard>
        <InfoCard title="Turnaround">Often same-day for cleaning and minor fixes. 1–2 weeks for manufacturer repairs.</InfoCard>
        <InfoCard title="Cost">Free inspection. Quote provided before any chargeable work begins.</InfoCard>
      </div>
    </SubPage>
  );
}
