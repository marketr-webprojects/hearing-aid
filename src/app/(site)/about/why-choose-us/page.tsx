import type { Metadata } from "next";
import { pageMetadata } from "@/lib/content/page-content.server";

import { InfoCard } from "@/components/site/SubPage";
import { CmsSubPage } from "@/components/site/CmsSubPage";

const staticMetadata: Metadata = {
  title: "Why Choose Linaw Dinig Hearing Aid Center | Philippine Audiology",
  description: "Experienced audiologists, the latest hearing technology, affordable and flexible payment plans, and friendly patient-focused service. Here's why patients across the Philippines choose Linaw Dinig.",
  openGraph: {
    title: "Why Choose Linaw Dinig",
    description: "Experienced, affordable, patient-focused hearing care.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about-why-choose-us", staticMetadata);
}

export default function Page() {
  return (
    <CmsSubPage pageKey="about-why-choose-us">
      <p>
        Choosing where to have your hearing tested — or where to invest in hearing aids — is a decision you&rsquo;ll
        live with every day. As an independent, private practice established in June 2021, we&rsquo;re free to
        recommend what genuinely suits you rather than what a supplier wants us to sell. That independence, combined
        with qualified clinicians and four branches across Luzon and the Visayas, is what our patients tell us they
        value most.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Experienced audiologists & technicians">Qualified professionals who assess, fit and care for your hearing with genuine expertise.</InfoCard>
        <InfoCard title="Latest hearing technology & brands">Advanced hearing aids and audiometric tools matched to your needs.</InfoCard>
        <InfoCard title="Affordable & flexible payment plans">Quality hearing care that fits your lifestyle, degree of hearing loss and budget.</InfoCard>
        <InfoCard title="Friendly, patient-focused service">We never rush. Your questions and your comfort always come first.</InfoCard>
        <InfoCard title="In-clinic trial options">Experience the difference with a no-pressure, in-clinic trial session before you commit.</InfoCard>
        <InfoCard title="Care for every age">Comprehensive evaluation and support for both adults and children.</InfoCard>
      </div>
      <p>
        Most of all, we&rsquo;re local. Our patients see the same faces visit after visit, and our name — Linaw Dinig,
        &ldquo;Clear Hearing&rdquo; — is a promise we get to keep in person, whether you visit us in Tanay, Cebu City,
        Dasmariñas or Rosario, La Union.
      </p>
    </CmsSubPage>
  );
}
