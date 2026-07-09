import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { HearingAidFittingsContent } from "@/lib/content/registry";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { CardGrid, ImageCardGrid, Prose } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services-hearing-aid-fittings");
}

export default async function Page() {
  const c = await getPageContent<HearingAidFittingsContent>("services-hearing-aid-fittings");

  return (
    <CmsSubPage pageKey="services-hearing-aid-fittings">
      <Prose paragraphs={c.intro} />
      <ImageCardGrid items={c.stages} columns={2} />
      <CardGrid items={c.highlights} columns={3} />
    </CmsSubPage>
  );
}
