import type { Metadata } from "next";
import { pageMetadata, getPageData } from "@/lib/content/page-content.server";
import BookPage from "./BookPage";

const staticMetadata: Metadata = {
  title: "Book a Hearing Test — Linaw Dinig Hearing Aid Center",
  description: "Book a hearing assessment with our qualified audiologists. Online booking takes under two minutes.",
  openGraph: {
    title: "Book a Hearing Test — Linaw Dinig Hearing Aid Center",
    description: "Book a hearing assessment with our qualified audiologists.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("book", staticMetadata);
}

export default async function Page() {
  const content = await getPageData("book");
  return (
    <BookPage
      eyebrow={content.eyebrow}
      title={content.title}
      subtitle={content.subtitle}
    />
  );
}
