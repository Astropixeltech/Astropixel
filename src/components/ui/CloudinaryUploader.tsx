'use client';

import React, { useState } from 'react';
import { Upload, Film, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string, result: any) => void;
  folder?: string;
  resourceType?: 'image' | 'video' | 'auto';
  label?: string;
  accept?: string;
  currentUrl?: string;
}

export function CloudinaryUploader({
  onUploadSuccess,
  folder = 'astropixel-uploads',
  resourceType = 'auto',
  label = 'Upload Image or Video to Cloudinary',
  accept = 'image/*,video/*',
  currentUrl,
}: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('resource_type', resourceType);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload to Cloudinary');
      }

      setPreviewUrl(data.url);
      onUploadSuccess(data.url, data);
      toast.success('Media uploaded successfully to Cloudinary!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-xs font-semibold text-foreground/80 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider">Cloudinary Hosted</span>
      </label>

      <div className="relative group border-2 border-dashed border-border/60 hover:border-primary/50 rounded-xl p-4 transition-all bg-secondary/30 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden min-h-[140px]">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground font-medium">Uploading to Cloudinary CDN...</span>
          </div>
        ) : previewUrl ? (
          <div className="relative w-full flex flex-col items-center gap-2">
            {previewUrl.includes('/video/') || previewUrl.endsWith('.mp4') || previewUrl.endsWith('.webm') ? (
              <video src={previewUrl} controls className="max-h-36 rounded-lg object-contain" />
            ) : (
              <img src={previewUrl} alt="Cloudinary Preview" className="max-h-36 rounded-lg object-contain" />
            )}
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-1">
              <CheckCircle2 size={14} />
              <span>Hosted on Cloudinary</span>
            </div>
            <span className="text-[10px] text-muted-foreground underline truncate max-w-full px-2">Click to replace file</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Upload size={20} />
            </div>
            <span className="text-xs font-semibold text-foreground">Click or Drag File to Upload</span>
            <span className="text-[10px] text-muted-foreground">Supports JPG, PNG, WEBP, MP4, WEBM</span>
          </div>
        )}
      </div>
    </div>
  );
}
