import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { AboutWhyChooseUsContent } from "@/lib/content/registry";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { CardGrid } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about-why-choose-us");
}

export default async function Page() {
  const c = await getPageContent<AboutWhyChooseUsContent>("about-why-choose-us");

  return (
    <CmsSubPage pageKey="about-why-choose-us">
      <p>{c.intro}</p>
      <CardGrid items={c.reasons} columns={2} />
      <p>{c.closing}</p>
    </CmsSubPage>
  );
}
