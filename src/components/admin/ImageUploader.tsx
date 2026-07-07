"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { convertToWebp } from "@/lib/convertToWebp";
import { Upload, X, Link as LinkIcon } from "lucide-react";

/**
 * Uploads an image to the public `media` Supabase Storage bucket (converting to
 * WebP first) and returns its public URL via onChange. Also accepts a pasted
 * URL/path as a fallback, so it works even before any image is uploaded.
 */
export function ImageUploader({
  value,
  onChange,
  heightClass = "h-40",
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  heightClass?: string;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const converted = await convertToWebp(file);
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, converted, { upsert: true, contentType: "image/webp" });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium text-muted-foreground">{label}</p>}
      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className={`w-full ${heightClass} object-cover`} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white transition hover:bg-black/80"
            title="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label
          className={`flex ${heightClass} cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border transition hover:border-primary hover:bg-primary/5 ${
            uploading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          {uploading ? (
            <span className="text-xs text-muted-foreground">Uploading…</span>
          ) : (
            <>
              <Upload className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Click to upload</span>
              <span className="text-[10px] text-muted-foreground">JPG / PNG / WebP → WebP</span>
            </>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={uploading}
            onChange={handleUpload}
          />
        </label>
      )}

      <button
        type="button"
        onClick={() => setShowUrl((v) => !v)}
        className="flex items-center gap-1 text-[11px] text-muted-foreground transition hover:text-foreground"
      >
        <LinkIcon className="h-3 w-3" /> {showUrl ? "Hide URL field" : "or paste a URL / path"}
      </button>
      {showUrl && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/image.jpg or https://…"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
