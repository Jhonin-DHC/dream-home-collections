import { site } from "@/lib/site";

const links = [
  { href: site.socials.facebook, label: "Facebook", icon: FacebookIcon },
  { href: site.socials.youtube, label: "YouTube", icon: YouTubeIcon },
  { href: site.socials.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.socials.pinterest, label: "Pinterest", icon: PinterestIcon }
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="inline-flex h-8 w-8 items-center justify-center transition hover:text-[var(--gold)]"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M14.5 8.5H16V6h-1.5c-2 0-3.3 1.2-3.3 3.2V11H10v2.4h1.2V20h2.5v-6.6H16l.4-2.4h-2.7V9.4c0-.6.3-.9.8-.9Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM9.8 15.5v-6.6l6.2 3.3-6.2 3.3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4Zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm5.8-8.8a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1ZM12 4.4c-2.1 0-2.3 0-3.2.1-.8 0-1.3.2-1.8.4a3.6 3.6 0 0 0-1.3.9 3.6 3.6 0 0 0-.9 1.3c-.2.5-.3 1-.4 1.8 0 .9-.1 1.1-.1 3.2s0 2.3.1 3.2c0 .8.2 1.3.4 1.8a3.6 3.6 0 0 0 .9 1.3 3.6 3.6 0 0 0 1.3.9c.5.2 1 .3 1.8.4.9 0 1.1.1 3.2.1s2.3 0 3.2-.1c.8 0 1.3-.2 1.8-.4a3.6 3.6 0 0 0 1.3-.9 3.6 3.6 0 0 0 .9-1.3c.2-.5.3-1 .4-1.8 0-.9.1-1.1.1-3.2s0-2.3-.1-3.2c0-.8-.2-1.3-.4-1.8a3.6 3.6 0 0 0-.9-1.3 3.6 3.6 0 0 0-1.3-.9c-.5-.2-1-.3-1.8-.4-.9 0-1.1-.1-3.2-.1Zm0 1.4c2 0 2.3 0 3.1.1.7 0 1.1.2 1.4.3.4.1.6.3.9.6.3.3.5.5.6.9.1.3.2.7.3 1.4 0 .8.1 1 .1 3.1s0 2.3-.1 3.1c0 .7-.2 1.1-.3 1.4-.1.4-.3.6-.6.9-.3.3-.5.5-.9.6-.3.1-.7.2-1.4.3-.8 0-1-.1-3.1-.1s-2.3 0-3.1.1c-.7 0-1.1-.2-1.4-.3-.4-.1-.6-.3-.9-.6-.3-.3-.5-.5-.6-.9-.1-.3-.2-.7-.3-1.4 0-.8-.1-1-.1-3.1s0-2.3.1-3.1c0-.7.2-1.1.3-1.4.1-.4.3-.6.6-.9.3-.3.5-.5.9-.6.3-.1.7-.2 1.4-.3.8 0 1.1-.1 3.1-.1Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.4-6s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1.1 4.2-.3 1.2.6 2.3 1.8 2.3 2.2 0 3.7-2.8 3.7-6.1 0-2.5-1.7-4.4-4.8-4.4-3.5 0-5.6 2.6-5.6 5.5 0 1 .3 1.7.8 2.3.2.2.2.3.1.6l-.3 1.1c0 .4-.3.5-.7.3-1.9-.8-2.8-2.9-2.8-5.2C4.2 7.3 7.1 4 12.2 4c4.1 0 6.8 3 6.8 6.2 0 4.3-2.4 7.5-5.9 7.5-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-1 2.2-1.5 2.9A10 10 0 1 0 12 2Z" />
    </svg>
  );
}
