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
        <InfoCard title="What to bring">Photo ID, any GP referrals (not required), a list of current medications and — if helpful — a family member or friend.</InfoCard>
        <InfoCard title="Time to allow">Around 60 minutes for a full hearing assessment and chat.</InfoCard>
        <InfoCard title="Parking & access">Street parking is available, plus a wheelchair-accessible entrance.</InfoCard>
        <InfoCard title="Fees & rebates">Initial assessments are free. Hearing aid pricing and any rebates are discussed up-front.</InfoCard>
      </div>
    </SubPage>
  );
}
