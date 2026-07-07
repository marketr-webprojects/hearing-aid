import { createAdminClient } from "@/lib/supabase/admin";
import LogsClient from "./LogsClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activity Logs | Linaw Dinig Admin" };

export type ActivityLog = {
  id: string;
  user_email: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  details: string | null;
  created_at: string;
};

export default async function LogsPage() {
  let logs: ActivityLog[] = [];
  try {
    const { data } = await createAdminClient()
      .from("activity_logs")
      .select("id, user_email, action, table_name, record_id, details, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    logs = (data ?? []) as ActivityLog[];
  } catch {
    // table/keys not ready
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Activity Logs</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Audit trail of admin actions (last 200).
        </p>
      </div>
      <LogsClient logs={logs} />
    </div>
  );
}
