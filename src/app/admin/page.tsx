import type { Metadata } from "next";
import AdminPage from "./AdminPage";

export const metadata: Metadata = {
  title: "Content Manager — Linaw Dinig Hearing Aid Center",
  description: "Internal CMS for managing testimonials and team members.",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <AdminPage />;
}
