import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { WhatToExpectContent } from "@/lib/content/registry";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { CardGrid, NumberedList, Prose } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("patients-what-to-expect");
}

export default async function Page() {
  const c = await getPageContent<WhatToExpectContent>("patients-what-to-expect");

  return (
    <CmsSubPage pageKey="patients-what-to-expect">
      <NumberedList items={c.steps} />

      <h2 className="text-2xl md:text-3xl">{c.resultsHeading}</h2>
      <Prose paragraphs={c.resultsParagraphs} />

      <h2 className="text-2xl md:text-3xl">{c.goodToKnowHeading}</h2>
      <CardGrid items={c.goodToKnow} columns={3} />
    </CmsSubPage>
  );
}
