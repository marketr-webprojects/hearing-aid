import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Follow-up Care & Counseling | Linaw Dinig Hearing Aid Center",
  description:
    "Ongoing support, counseling and fine-tuning to help you adapt to your hearing aids and get the most from your hearing every day — available across our Tanay, Cebu, Dasmariñas and La Union branches.",
  keywords: [
    "hearing aid follow-up care",
    "hearing aid counseling Philippines",
    "hearing aid adjustment",
    "aural rehabilitation",
    "hearing care support",
  ],
  openGraph: {
    title: "Follow-up Care & Counseling",
    description: "Ongoing support to help you adapt and maximize your hearing potential.",
  },
};

export default function Page() {
  return (
    <SubPage
      eyebrow="Services"
      title="Follow-up Care & Counseling"
      subtitle="Hearing well is a journey, not a one-time visit. We stay with you every step of the way."
    >
      <p>
        Adjusting to better hearing takes time and support. Our follow-up care helps you adapt to your devices, build
        confidence in everyday situations, and maximize your hearing potential — with your family supported alongside you.
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Who it's for">Anyone adapting to new hearing aids, or returning for regular check-ups and adjustments.</InfoCard>
        <InfoCard title="What to expect">Fine-tuning sessions, listening practice, cleaning and friendly guidance whenever you need it.</InfoCard>
        <InfoCard title="Family counseling">We educate and support families so everyone can help on the journey to better hearing.</InfoCard>
      </div>
    </SubPage>
  );
}
