import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { FollowUpCareContent } from "@/lib/content/registry";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { BulletList, CardGrid, Prose } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services-follow-up-care");
}

export default async function Page() {
  const c = await getPageContent<FollowUpCareContent>("services-follow-up-care");

  return (
    <CmsSubPage pageKey="services-follow-up-care">
      <p>{c.intro}</p>
      <CardGrid items={c.quickFacts} columns={3} />

      <h2 className="text-2xl md:text-3xl">{c.firstWeeksHeading}</h2>
      <Prose paragraphs={c.firstWeeksParagraphs} />

      <h2 className="text-2xl md:text-3xl">{c.visitHeading}</h2>
      <CardGrid items={c.visitCards} columns={2} />

      <h2 className="text-2xl md:text-3xl">{c.whenHeading}</h2>
      <BulletList items={c.whenBullets} />
      <p>{c.closing}</p>
    </CmsSubPage>
  );
}
