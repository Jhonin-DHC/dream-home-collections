"use client";

import Image from "next/image";
import { toDisplayImageUrl } from "@/lib/r2-display";

interface RemoteImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function RemoteImage({ src, alt, className, sizes = "256px" }: RemoteImageProps) {
  if (!src) return null;
  const displaySrc = toDisplayImageUrl(src);

  if (displaySrc.startsWith("/api/media/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={displaySrc} alt={alt} className={`absolute inset-0 h-full w-full ${className ?? ""}`} />
    );
  }

  return <Image src={displaySrc} alt={alt} fill className={className} sizes={sizes} />;
}
