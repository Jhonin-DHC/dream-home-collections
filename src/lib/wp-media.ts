/** WordPress still hosts the original media library after DNS moved to Vercel. */
export const WP_MEDIA_ORIGIN = "https://l97d0gtmtn.wpdns.site";
export const WP_UPLOADS_BASE = `${WP_MEDIA_ORIGIN}/wp-content/uploads`;

const LEGACY_WP_HOSTS = new Set(["dreamhomecollections.com", "www.dreamhomecollections.com"]);

export function rewriteLegacyWpMediaUrl(url: string) {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    if (LEGACY_WP_HOSTS.has(parsed.hostname) && parsed.pathname.startsWith("/wp-content/")) {
      return `${WP_MEDIA_ORIGIN}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
    return url;
  } catch {
    return rewriteLegacyWpMediaInText(url);
  }
}

export function rewriteLegacyWpMediaInText(text: string) {
  if (!text) return text;
  return text.replace(
    /https?:\/\/(?:www\.)?dreamhomecollections\.com\/wp-content/gi,
    `${WP_MEDIA_ORIGIN}/wp-content`
  );
}
