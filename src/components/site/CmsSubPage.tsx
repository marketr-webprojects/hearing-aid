import type { ReactNode } from "react";
import { SubPage } from "./SubPage";
import { PageHero } from "./PageHero";
import { getPageData } from "@/lib/content/page-content.server";

/**
 * Server wrappers that render a page hero from the CMS-editable page content
 * (admin → Pages), falling back to the in-code defaults in the registry.
 */
export async function CmsSubPage({
  pageKey,
  cta = true,
  children,
}: {
  pageKey: string;
  cta?: boolean;
  children: ReactNode;
}) {
  const content = await getPageData(pageKey);
  return (
    <SubPage
      eyebrow={content.eyebrow}
      title={content.title}
      subtitle={content.subtitle}
      cta={cta}
    >
      {children}
    </SubPage>
  );
}

export async function CmsPageHero({ pageKey }: { pageKey: string }) {
  const content = await getPageData(pageKey);
  return (
    <PageHero
      eyebrow={content.eyebrow}
      title={content.title}
      subtitle={content.subtitle}
    />
  );
}
