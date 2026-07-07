import { notFound } from "next/navigation";
import { getPageDef } from "@/lib/content/registry";
import {
  getPageData,
  getAllPageOverrides,
} from "@/lib/content/page-content.server";
import PageEditor from "./PageEditor";

export const dynamic = "force-dynamic";

export default async function PageEditorPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const def = getPageDef(key);
  if (!def) notFound();

  const [content, overrides] = await Promise.all([
    getPageData(key),
    getAllPageOverrides(),
  ]);

  return (
    <PageEditor
      def={def}
      initial={content}
      customised={def.path in overrides}
    />
  );
}
