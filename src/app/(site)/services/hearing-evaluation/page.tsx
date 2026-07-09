import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { HearingEvaluationContent } from "@/lib/content/registry";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { ImageCardGrid, Prose } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services-hearing-evaluation");
}

export default async function Page() {
  const c = await getPageContent<HearingEvaluationContent>("services-hearing-evaluation");

  return (
    <CmsSubPage pageKey="services-hearing-evaluation">
      <Prose paragraphs={c.intro} />

      <h2 className="text-2xl md:text-3xl">{c.adultHeading}</h2>
      <ImageCardGrid items={c.adultTests} columns={2} />

      <h2 className="text-2xl md:text-3xl">{c.pediatricHeading}</h2>
      <ImageCardGrid items={c.pediatricTests} columns={3} />

      <p className="font-semibold text-primary">{c.note}</p>

      <h2 className="text-2xl md:text-3xl">{c.occupationalHeading}</h2>
      <p>{c.occupationalIntro}</p>
      <ImageCardGrid items={c.occupationalTests} columns={2} />
    </CmsSubPage>
  );
}
