import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { AssistiveDevicesContent } from "@/lib/content/registry";

import { CmsSubPage } from "@/components/site/CmsSubPage";
import { CardGrid } from "@/components/site/blocks";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services-assistive-listening-devices");
}

export default async function Page() {
  const c = await getPageContent<AssistiveDevicesContent>("services-assistive-listening-devices");

  return (
    <CmsSubPage pageKey="services-assistive-listening-devices">
      <p>{c.intro}</p>
      <CardGrid items={c.quickFacts} columns={3} />

      <h2 className="text-2xl md:text-3xl">{c.whyHeading}</h2>
      <p>{c.whyBody}</p>

      <h2 className="text-2xl md:text-3xl">{c.situationsHeading}</h2>
      <CardGrid items={c.situations} columns={2} />

      <h2 className="text-2xl md:text-3xl">{c.matchedHeading}</h2>
      <p>{c.matchedBody}</p>
    </CmsSubPage>
  );
}
