import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { NewPatientInfoContent } from "@/lib/content/registry";
import { getBranches } from "@/lib/branches.server";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { InfoCard } from "@/components/site/SubPage";
import { BulletCards } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("patients-new-patient-info");
}

export default async function Page() {
  const [c, branches] = await Promise.all([
    getPageContent<NewPatientInfoContent>("patients-new-patient-info"),
    getBranches(),
  ]);

  // The access card is built from each branch's own access notes, so it stays
  // in step with the Branches table instead of repeating it as page copy.
  const accessCard = (
    <InfoCard key="__access" title={c.accessCardTitle}>
      {branches.map((b, i) => (
        <span key={b.slug} className={i === 0 ? "block" : "mt-1 block"}>
          <strong>{b.shortName}:</strong> {b.access}
        </span>
      ))}
    </InfoCard>
  );

  const facts = c.quickFacts.map((f) => (
    <InfoCard key={f.title} title={f.title}>
      {f.body}
    </InfoCard>
  ));

  return (
    <CmsSubPage pageKey="patients-new-patient-info">
      <div className="grid gap-5 md:grid-cols-2">
        {facts.slice(0, 2)}
        {accessCard}
        {facts.slice(2)}
      </div>

      <h2 className="text-2xl md:text-3xl">{c.beforeHeading}</h2>
      <p>{c.beforeIntro}</p>
      <BulletCards items={c.beforeBullets} />

      <h2 className="text-2xl md:text-3xl">{c.paymentsHeading}</h2>
      <p>{c.paymentsBody}</p>

      <h2 className="text-2xl md:text-3xl">{c.bookingHeading}</h2>
      <p>{c.bookingBody}</p>
    </CmsSubPage>
  );
}
