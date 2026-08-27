export type LegalPage = {
  slug: string;
  title: string;
  updatedAt: string;
};

export const legalPages: LegalPage[] = [
  {
    slug: "iabs",
    title: "Information About Brokerage Services (IABS)",
    updatedAt: "2026-03-31"
  },
  {
    slug: "consumer-protection-notice",
    title: "Consumer Protection Notice",
    updatedAt: "2026-03-31"
  },
  {
    slug: "mls-rule-schedule-of-fines",
    title: "MLS Rule Schedule of Fines",
    updatedAt: "2026-04-23"
  },
  {
    slug: "mls-rules-and-regulations",
    title: "MLS Rules and Regulations",
    updatedAt: "2026-04-23"
  },
  {
    slug: "fair-housing",
    title: "Fair Housing Rules & Guidelines",
    updatedAt: "2026-05-14"
  }
];
