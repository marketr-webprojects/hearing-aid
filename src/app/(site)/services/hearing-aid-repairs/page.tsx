import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { HearingAidRepairsContent } from "@/lib/content/registry";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { BulletList, CardGrid } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services-hearing-aid-repairs");
}

export default async function Page() {
  const c = await getPageContent<HearingAidRepairsContent>("services-hearing-aid-repairs");

  return (
    <CmsSubPage pageKey="services-hearing-aid-repairs">
      <p>{c.intro}</p>
      <CardGrid items={c.quickFacts} columns={3} />

      <h2 className="text-2xl md:text-3xl">{c.problemsHeading}</h2>
      <p>{c.problemsIntro}</p>
      <CardGrid items={c.problems} columns={2} />

      <h2 className="text-2xl md:text-3xl">{c.careHeading}</h2>
      <p>{c.careIntro}</p>
      <BulletList items={c.careTips} />
      <p>{c.closing}</p>
    </CmsSubPage>
  );
}
