"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "./actions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset({ email });
    setLoading(false);
    setSent(true);
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
          {sent ? (
            <>
              <h1 className="text-xl font-bold mb-1">Check your email</h1>
              <p className="text-sm text-muted-foreground mb-6">
                If an account exists for <span className="font-medium">{email}</span>,
                we&apos;ve sent a link to reset your password. The link expires in 1
                hour.
              </p>
              <Link
                href="/admin/login"
                className="inline-flex w-full h-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Back to login
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold mb-1">Reset password</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your account email and we&apos;ll send you a reset link.
              </p>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Send reset link"}
                </button>
                <Link
                  href="/admin/login"
                  className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to login
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
