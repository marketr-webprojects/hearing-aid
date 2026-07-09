import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { BookContent } from "@/lib/content/registry";
import BookPage from "./BookPage";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("book");
}

export default async function Page() {
  const content = await getPageContent<BookContent>("book");
  return <BookPage content={content} />;
}
