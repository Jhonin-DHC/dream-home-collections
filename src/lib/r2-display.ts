import { rewriteLegacyWpMediaUrl } from "@/lib/wp-media";

const MEDIA_PREFIXES = ["listings/", "neighborhoods/", "posts/", "uploads/"];

function isAllowedMediaKey(key: string) {
  return (
    Boolean(key) &&
    MEDIA_PREFIXES.some((prefix) => key.startsWith(prefix)) &&
    !key.includes("..") &&
    !key.includes("\\")
  );
}

export function toDisplayImageUrl(url: string) {
  if (!url) return url;
  url = rewriteLegacyWpMediaUrl(url);
  if (url.startsWith("/api/media/") || url.startsWith("/brand/") || url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    const key = parsed.pathname.replace(/^\/+/, "");
    if (isAllowedMediaKey(key)) {
      return `/api/media/${key.split("/").map(encodeURIComponent).join("/")}`;
    }
    return url;
  } catch {
    return url;
  }
}

export function toDisplayImageUrls(urls: string[]) {
  return urls.map(toDisplayImageUrl);
}
