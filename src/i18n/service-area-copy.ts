export type ServiceAreaCopy = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  statPrimary: string;
  statExtended: string;
  statTotal: string;
  activeCoverageLabel: string;
  activeCoverageTitle: string;
  activeCoverageBody: string;
  marketRefLabel: string;
  marketRefTitle: string;
  marketRefBody: string;
  activeListqikLabel: string;
  activeListqikTitle: string;
  activeListqikBody: string;
  statPrimaryShort: string;
  statExtendedShort: string;
  mapLegendPrimary: string;
  mapLegendExtended: string;
  mapLegendOther: string;
  primaryCountiesTitle: string;
  primaryCountiesMeta: string;
  primaryCountiesBody: string;
  extendedCountiesTitle: string;
  extendedCountiesMeta: string;
  extendedCountiesBody: string;
  fullListBelow: string;
  viewMore: string;
  viewLess: string;
  remainingCounties: string;
  importantNote: string;
  importantNoteBody: string;
  startListing: string;
  contactConcierge: string;
  harEyebrow: string;
  harTitle: string;
  harIntro: string;
  harCompatNote: string;
  harCompatBody: string;
  statHarCore: string;
  statHarExtended: string;
  statHarTotal: string;
  harMapAria: string;
  harLegendCore: string;
  harLegendExtended: string;
  harCoreTitle: string;
  harExtendedTitle: string;
  harExtendedBody1: string;
  harExtendedBody2: string;
  statewideNote: string;
  statewideBody: string;
  countiesWord: string;
};

const COPY: ServiceAreaCopy = {
  meta: {
    title: "Texas Service Area | Dream Home Collections",
    description:
      "Dream Home Collections Texas service coverage: DFW primary counties, extended statewide support, and Houston HAR market counties."
  },
  eyebrow: "CURRENT SERVICE AREA",
  title: "Texas service coverage plus Houston HAR market context.",
  intro:
    "The Texas map and county lists below still represent Dream Home Collections' active coverage, led by Collin, Denton, Dallas, and Tarrant counties. The Houston HAR section is a separate market-reference guide, so it complements the existing map rather than replacing it.",
  statPrimary: "Primary Counties",
  statExtended: "Additional Counties",
  statTotal: "Total Counties",
  activeCoverageLabel: "ACTIVE COVERAGE",
  activeCoverageTitle: "DFW primary counties plus extended Texas support",
  activeCoverageBody: "Use this section to answer where Dream Home Collections actively serves buyers today.",
  marketRefLabel: "MARKET REFERENCE",
  marketRefTitle: "Houston HAR metro and extended market counties",
  marketRefBody: "Use this section for Greater Houston MLS context and HAR market positioning.",
  activeListqikLabel: "ACTIVE DREAM HOME COLLECTIONS COVERAGE",
  activeListqikTitle: "Primary DFW counties and extended Texas service support.",
  activeListqikBody:
    "This is the current service-area dataset powering the map, county counts, and coverage messaging on this page.",
  statPrimaryShort: "Primary",
  statExtendedShort: "Extended",
  mapLegendPrimary: "Primary counties",
  mapLegendExtended: "Extended service counties",
  mapLegendOther: "Other Texas counties",
  primaryCountiesTitle: "Primary counties",
  primaryCountiesMeta: "{count} counties",
  primaryCountiesBody: "These are the core counties we want to lead with in messaging and outreach.",
  extendedCountiesTitle: "Extended Texas counties",
  extendedCountiesMeta: "{count} counties",
  extendedCountiesBody:
    "Additional counties pulled from the latest coverage report. These are active counties, not a coming-soon list.",
  fullListBelow: "Full county list available below",
  viewMore: "View more counties ({count})",
  viewLess: "View less counties",
  remainingCounties: "Remaining extended Texas counties",
  importantNote: "Important note:",
  importantNoteBody:
    "If the property you want is just outside one of these counties, contact us anyway. We can confirm nearby coverage and whether there is a workable path for your search.",
  startListing: "Explore neighborhoods",
  contactConcierge: "Contact Concierge",
  harEyebrow: "HOUSTON HAR MARKET AREA",
  harTitle: "Core and extended counties in the Houston HAR footprint.",
  harIntro:
    "These 9 core counties make up the immediate Houston-The Woodlands-Sugar Land metropolitan area. They are the primary focus of HAR's monthly market update reports and represent the densest concentration of MLS activity.",
  harCompatNote: "Compatibility note:",
  harCompatBody:
    "The Houston counties below are a market-reference layer only. They work alongside the Texas service map above and do not replace the existing DFW-led service-area data.",
  statHarCore: "Core HAR Counties",
  statHarExtended: "Extended HAR Counties",
  statHarTotal: "Total HAR Counties",
  harMapAria: "Texas county map showing Houston HAR core and extended market counties",
  harLegendCore: "Core HAR counties",
  harLegendExtended: "Extended HAR market counties",
  harCoreTitle: "9 core counties",
  harExtendedTitle: "Extended HAR market counties",
  harExtendedBody1:
    "Because HAR.com has grown into a large statewide real estate portal, its extended market area includes surrounding and rural counties that feed into the Gulf Coast region, plus adjacent counties monitored by the Houston-Galveston Area Council (H-GAC).",
  harExtendedBody2: "Agents frequently use HAR's MLS to list and search properties in these surrounding areas:",
  statewideNote: "Note on statewide searching:",
  statewideBody:
    "While the counties above represent the physical footprint of the Greater Houston real estate market, HAR.com also features property listings across the entire state of Texas, from Dallas to Austin and San Antonio, due to data-sharing agreements with other regional MLS boards.",
  countiesWord: "counties"
};

export function getServiceAreaCopy(): ServiceAreaCopy {
  return COPY;
}
