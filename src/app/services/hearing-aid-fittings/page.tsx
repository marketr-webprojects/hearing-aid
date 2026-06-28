import type { Metadata } from "next";

import { SubPage, InfoCard, ImageCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Hearing Aid Fitting & Customization | Linaw Dinig",
  description:
    "Tailored hearing aid solutions in the Philippines — matched to your lifestyle, degree of hearing loss and budget. Includes hearing aid counseling, precise fitting and ongoing customization at our Tanay, Cebu, Dasmariñas and La Union branches.",
  keywords: [
    "hearing aid fitting Philippines",
    "hearing aid customization",
    "hearing aid counseling",
    "hearing aids Tanay Cebu Dasmariñas La Union",
    "affordable hearing aids",
  ],
  openGraph: {
    title: "Hearing Aid Fitting & Customization",
    description: "Tailored solutions matched to your lifestyle, hearing loss and budget.",
  },
};

export default function Page() {
  return (
    <SubPage
      eyebrow="Services"
      title="Hearing Aid Fitting & Customization"
      subtitle="Tailored solutions matched to your lifestyle, degree of hearing loss, and budget."
    >
      <p>
        A great hearing aid is only as good as its fitting. At Linaw Dinig, fitting is a guided, unhurried process: we
        start by understanding how and where you struggle to hear, recommend the right technology for your needs and
        budget, then fit and fine-tune every device so each sound reaches you exactly as it should.
      </p>
      <p>
        From the first counseling session to long-term adjustments, our licensed audiologists make sure your hearing aids
        feel natural, comfortable and genuinely helpful in everyday life — at home, at work and in noisy places.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <ImageCard title="Hearing Aid Counseling" img="/assets/hearing-aid-counseling.webp" alt="Audiologist counseling a patient about hearing aid options">
          We help you choose the right technology and style for your lifestyle, degree of hearing loss and budget — with
          honest advice and no pressure to buy.
        </ImageCard>
        <ImageCard title="Hearing Aid Fitting" img="/assets/hearing-aid-fitting.webp" alt="Audiologist fitting a hearing aid to a patient's ear">
          Precise fitting, programming and a hands-on demonstration of features, so you leave confident in how to use and
          care for your devices.
        </ImageCard>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Personalized customization">Fine-tuning tailored to how and where you listen, day to day.</InfoCard>
        <InfoCard title="Flexible & affordable">Options across budgets, with affordable and flexible payment plans.</InfoCard>
        <InfoCard title="Ongoing support">Follow-up adjustments and care to keep you hearing your best over time.</InfoCard>
      </div>
    </SubPage>
  );
}
