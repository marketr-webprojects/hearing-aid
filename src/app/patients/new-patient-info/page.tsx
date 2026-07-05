import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "New Patient Information — Linaw Dinig Hearing Aid Center",
  description: "What to bring, how long to allow, and what to expect at your first appointment with Linaw Dinig Hearing Aid Center.",
  openGraph: {
    title: "New Patient Information",
    description: "How to prepare for your first visit.",
  },
};

export default function Page() {
  return (
    <SubPage eyebrow="For Patients" title="New Patient Information" subtitle="A few small things that make your first visit smooth and stress-free.">
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="What to bring">Doctor&rsquo;s referral for hearing test (if available) and Senior Citizen or PWD ID. It also helps if you tag along a family member or friend.</InfoCard>
        <InfoCard title="Time to allow">Around 60 minutes for a full hearing assessment and chat.</InfoCard>
        <InfoCard title="Parking & access">
          <span className="block"><strong>Tanay:</strong> Ample parking space and wheelchair accessible.</span>
          <span className="mt-1 block"><strong>Cebu:</strong> Limited parking space. Not accessible by wheelchair.</span>
          <span className="mt-1 block"><strong>Dasma:</strong> Limited parking space. Accessible by wheelchair.</span>
          <span className="mt-1 block"><strong>La Union:</strong> Limited parking space. Limited mobility for wheelchair users.</span>
        </InfoCard>
        <InfoCard title="Fees">Each hearing assessment has its corresponding rate. Please call us to know the exact amount.</InfoCard>
      </div>
    </SubPage>
  );
}
