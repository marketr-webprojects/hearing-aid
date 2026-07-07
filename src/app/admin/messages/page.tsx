import { createClient } from "@/lib/supabase/server";
import MessagesClient from "./MessagesClient";

export const dynamic = "force-dynamic";

export type Message = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  dob: string;
  location: string;
  appointment_type: string;
  preferred_date: string;
  preferred_time: string;
  hear_about: string;
  notes: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
};

export default async function MessagesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return <MessagesClient initialMessages={(data ?? []) as Message[]} />;
}
