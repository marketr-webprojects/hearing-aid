"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminUser } from "./page";
import {
  createUser,
  deleteUser,
  upsertUserProfile,
  setUserPassword,
} from "./actions";
import {
  PERMISSION_KEYS,
  PERMISSION_LABELS,
  type PermissionKey,
  type Role,
} from "@/lib/rbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Plus, Pencil, Trash2, KeyRound, UserCircle } from "lucide-react";

type Profile = { user_id: string; role: string; permissions: string[] };

export default function UsersClient({
  initialUsers,
  profileMap,
}: {
  initialUsers: AdminUser[];
  profileMap: Record<string, Profile>;
}) {
  const router = useRouter();
  const [users] = useState(initialUsers);
  const [dialog, setDialog] = useState<
    { mode: "new" } | { mode: "edit"; user: AdminUser } | { mode: "password"; user: AdminUser } | null
  >(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleDelete(id: string) {
    setBusy(true);
    await deleteUser(id);
    setConfirmDeleteId(null);
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Admin accounts and their access. Admins see everything; employees see
            only the sections you grant.
          </p>
        </div>
        <Button size="sm" onClick={() => setDialog({ mode: "new" })}>
          <Plus className="h-4 w-4" /> New user
        </Button>
      </div>

      {users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No users found. Make sure the Supabase service-role key is set.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3 hidden md:table-cell">Access</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => {
                const profile = profileMap[u.id];
                const role = (profile?.role as Role) ?? "employee";
                const perms = (profile?.permissions ?? []) as PermissionKey[];
                const confirming = confirmDeleteId === u.id;
                return (
                  <tr key={u.id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          role === "admin"
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {role}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell text-xs text-muted-foreground">
                      {role === "admin"
                        ? "All sections"
                        : perms.length
                          ? perms.join(", ")
                          : "None"}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Edit access"
                          onClick={() => setDialog({ mode: "edit", user: u })}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Set password"
                          onClick={() => setDialog({ mode: "password", user: u })}
                        >
                          <KeyRound className="h-3.5 w-3.5" />
                        </Button>
                        {confirming ? (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={busy}
                              onClick={() => handleDelete(u.id)}
                            >
                              Confirm
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Delete"
                            onClick={() => setConfirmDeleteId(u.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {dialog?.mode === "new" && (
        <UserDialog onClose={() => setDialog(null)} onSaved={() => { setDialog(null); router.refresh(); }} />
      )}
      {dialog?.mode === "edit" && (
        <AccessDialog
          user={dialog.user}
          profile={profileMap[dialog.user.id]}
          onClose={() => setDialog(null)}
          onSaved={() => { setDialog(null); router.refresh(); }}
        />
      )}
      {dialog?.mode === "password" && (
        <PasswordDialog
          user={dialog.user}
          onClose={() => setDialog(null)}
          onSaved={() => setDialog(null)}
        />
      )}
    </div>
  );
}

function PermissionGrid({
  role,
  setRole,
  permissions,
  toggle,
}: {
  role: Role;
  setRole: (r: Role) => void;
  permissions: PermissionKey[];
  toggle: (k: PermissionKey) => void;
}) {
  return (
    <>
      <div className="space-y-1.5">
        <Label>Role</Label>
        <div className="flex gap-2">
          {(["admin", "employee"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                role === r
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      {role === "employee" && (
        <div className="space-y-1.5">
          <Label>Section access</Label>
          <div className="grid grid-cols-2 gap-2">
            {PERMISSION_KEYS.map((k) => (
              <label
                key={k}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="checkbox"
                  className="accent-[var(--primary)]"
                  checked={permissions.includes(k)}
                  onChange={() => toggle(k)}
                />
                {PERMISSION_LABELS[k]}
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function UserDialog({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("employee");
  const [permissions, setPermissions] = useState<PermissionKey[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (k: PermissionKey) =>
    setPermissions((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 6)
      return setError("Email and a password of at least 6 characters are required.");
    setSaving(true);
    setError(null);
    const res = await createUser({
      email: email.trim(),
      password,
      role,
      permissions: role === "admin" ? [] : permissions,
    });
    setSaving(false);
    if (res.error) return setError(res.error);
    onSaved();
  }

  return (
    <Modal open onClose={onClose} title="New user">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Temporary password</Label>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </div>
        <PermissionGrid role={role} setRole={setRole} permissions={permissions} toggle={toggle} />
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Creating…" : "Create user"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function AccessDialog({
  user,
  profile,
  onClose,
  onSaved,
}: {
  user: AdminUser;
  profile?: Profile;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [role, setRole] = useState<Role>((profile?.role as Role) ?? "employee");
  const [permissions, setPermissions] = useState<PermissionKey[]>(
    (profile?.permissions ?? []) as PermissionKey[]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (k: PermissionKey) =>
    setPermissions((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await upsertUserProfile(
      user.id,
      role,
      role === "admin" ? [] : permissions
    );
    setSaving(false);
    if (res.error) return setError(res.error);
    onSaved();
  }

  return (
    <Modal open onClose={onClose} title={`Access — ${user.email}`}>
      <form onSubmit={onSubmit} className="space-y-4">
        <PermissionGrid role={role} setRole={setRole} permissions={permissions} toggle={toggle} />
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save access"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function PasswordDialog({
  user,
  onClose,
  onSaved,
}: {
  user: AdminUser;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setSaving(true);
    setError(null);
    const res = await setUserPassword(user.id, password);
    setSaving(false);
    if (res.error) return setError(res.error);
    setDone(true);
    setTimeout(onSaved, 800);
  }

  return (
    <Modal open onClose={onClose} title={`Set password — ${user.email}`}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>New password</Label>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </div>
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving || done}>
            {done ? "Updated" : saving ? "Saving…" : "Set password"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
