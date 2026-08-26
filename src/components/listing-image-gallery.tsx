"use client";

import { useState } from "react";
import { RemoteImage } from "@/components/remote-image";

export function ListingImageGallery({ name, imageUrl, imageUrls = [] }: { name: string; imageUrl: string; imageUrls?: string[] }) {
  const images = [imageUrl, ...imageUrls.filter((url) => url && url !== imageUrl)];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? imageUrl;

  return (
    <div className="space-y-3">
      <div className="relative h-[300px] w-full overflow-hidden md:h-[480px]">
        <RemoteImage src={activeImage} alt={name} className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden border ${
                index === activeIndex ? "border-[var(--gold)]" : "border-[var(--stone)]"
              }`}
              aria-label={`Show image ${index + 1}`}
            >
              <RemoteImage src={url} alt="" className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
