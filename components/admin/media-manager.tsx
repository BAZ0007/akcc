"use client";

import { useState, useTransition } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MediaAsset } from "@/types/cms";

export function MediaManager({ assets }: { assets: MediaAsset[] }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");

  async function handleUpload(formData: FormData) {
    setMessage("");
    startTransition(async () => {
      const file = formData.get("file");
      const bucket = String(formData.get("bucket") || "site-media");
      const title = String(formData.get("title") || "Untitled asset");
      const altText = String(formData.get("alt_text") || "");

      if (!(file instanceof File) || !file.size) {
        setMessage("Please choose a file to upload.");
        return;
      }

      try {
        const supabase = createSupabaseBrowserClient();
        const filePath = `${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
        const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

        if (uploadError) {
          setMessage(uploadError.message);
          return;
        }

        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        const { error: insertError } = await supabase.from("media_assets").insert({
          title,
          bucket,
          file_path: filePath,
          public_url: publicUrlData.publicUrl,
          mime_type: file.type,
          alt_text: altText || null,
        });

        if (insertError) {
          setMessage(insertError.message);
          return;
        }

        setMessage("Upload complete. Refresh the page to see the new asset.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Upload failed.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Asset</CardTitle>
          <CardDescription>Files are uploaded to Supabase Storage and indexed in the media library.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleUpload} className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="media-title">Title</Label>
              <Input id="media-title" name="title" placeholder="Homepage hero" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="media-bucket">Bucket</Label>
              <Input id="media-bucket" name="bucket" defaultValue="site-media" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="media-alt-text">Alt Text</Label>
              <Input id="media-alt-text" name="alt_text" placeholder="Describe the image for accessibility" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="media-file">File</Label>
              <Input id="media-file" name="file" type="file" />
            </div>
            {message ? <p className="text-sm text-slate-600 md:col-span-2">{message}</p> : null}
            <div className="md:col-span-2">
              <Button type="submit" disabled={pending}>{pending ? "Uploading..." : "Upload Asset"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Media Registry</CardTitle>
          <CardDescription>{assets.length} tracked asset(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {assets.map((asset) => (
              <div key={asset.id} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                <p className="font-medium text-slate-900">{asset.title}</p>
                <p className="text-slate-500">{asset.bucket} / {asset.file_path}</p>
                {asset.public_url ? <a href={asset.public_url} target="_blank" rel="noreferrer" className="text-primary">Open asset</a> : null}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

