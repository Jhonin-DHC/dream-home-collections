"use client";

import { useState } from "react";
import { toDisplayImageUrl } from "@/lib/r2-display";

interface RemoteImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function RemoteImage({ src, alt, className }: RemoteImageProps) {
  const [failed, setFailed] = useState(false);
  if (!src) return null;
  const displaySrc = toDisplayImageUrl(src);

  if (failed) {
    return <div className="absolute inset-0 bg-[var(--navy)]" aria-hidden />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displaySrc}
      alt={alt}
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
