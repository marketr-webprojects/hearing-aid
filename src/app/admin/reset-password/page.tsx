"use client";

import { useState } from "react";
import { updatePassword } from "./actions";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await updatePassword({ password });
    if (res?.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    // Session is now active — land in the admin dashboard.
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/LDregistered.webp"
            alt="Linaw Dinig"
            className="h-16 w-16 rounded-2xl bg-white object-contain p-2"
          />
          <p className="mt-3 font-display text-2xl font-bold tracking-wide text-white">
            LINAW DINIG
          </p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 shadow-xl">
          <h1 className="text-xl font-bold mb-1">Choose a new password</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter a new password for your admin account.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium block">
                New password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-input bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="confirm" className="text-sm font-medium block">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-input bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Saving…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
