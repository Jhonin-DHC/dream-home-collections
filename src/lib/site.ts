export const site = {
  name: "Dream Home Collections",
  shortName: "DHC",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dreamhomecollections.com",
  email: "concierge@resolutionrealtygroup.com",
  phone: "(469) 727-6477",
  phoneHref: "tel:+14697276477",
  tagline: "Making Your Dream Home a Reality",
  description:
    "Dream Home Collections showcases Texas’s most luxurious homes, exclusive estates, and curated real estate experiences. Explore high-end properties, market insights, and expert guidance designed for discerning buyers and dreamers alike.",
  socials: {
    facebook: "https://www.facebook.com/davidcjosh/about_contact_and_basic_info",
    youtube: "https://www.youtube.com/@DreamHomeCollections",
    instagram: "https://www.instagram.com/bydavidjosh/",
    pinterest: "https://www.pinterest.com/DHCDreamHomeCollections/"
  },
  logo: "/brand/logo.png",
  icon: "/brand/icon.png"
} as const;

export const reservedSlugs = new Set([
  "admin",
  "account",
  "api",
  "neighborhoods",
  "our-blogs",
  "blog",
  "category",
  "privacy-policy-page",
  "terms-of-service",
  "login",
  "register",
  "service-area",
  "resources"
]);
