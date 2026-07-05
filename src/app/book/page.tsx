import type { Metadata } from "next";
import BookPage from "./BookPage";

export const metadata: Metadata = {
  title: "Book a Hearing Test — Linaw Dinig Hearing Aid Center",
  description: "Book a hearing assessment with our qualified audiologists. Online booking takes under two minutes.",
  openGraph: {
    title: "Book a Hearing Test — Linaw Dinig Hearing Aid Center",
    description: "Book a hearing assessment with our qualified audiologists.",
  },
};

export default function Page() {
  return <BookPage />;
}
