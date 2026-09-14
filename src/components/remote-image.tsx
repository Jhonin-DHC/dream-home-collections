"use client";

import { useEffect, useState } from "react";
import { toDisplayImageUrl } from "@/lib/r2-display";

interface RemoteImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function RemoteImage({ src, alt, className }: RemoteImageProps) {
  const [failed, setFailed] = useState(false);
  const displaySrc = toDisplayImageUrl(src);

  useEffect(() => {
    setFailed(false);
  }, [src, displaySrc]);

  if (!src) return null;

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
