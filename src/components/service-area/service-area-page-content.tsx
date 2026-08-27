import Link from "next/link";
import { Container } from "@/components/container";
import { ServiceAreaHubJsonLd } from "@/components/service-area/service-area-hub-json-ld";
import { TexasServiceAreaMap } from "@/components/service-area/texas-service-area-map";
import { getServiceAreaCopy } from "@/i18n/service-area-copy";
import { site } from "@/lib/site";
import {
  buildTexasCountyMap,
  EXTENDED_SERVICE_COUNT,
  EXTENDED_SERVICE_COUNTIES,
  PRIMARY_SERVICE_COUNT,
  PRIMARY_SERVICE_COUNTIES,
  TOTAL_SERVICE_COUNT
} from "@/lib/service-area";

const HAR_CORE_COUNTIES = [
  { name: "Harris", note: "The central hub, including Houston proper, Cypress, and Spring" },
  { name: "Fort Bend", note: "Sugar Land, Missouri City, Katy" },
  { name: "Montgomery", note: "The Woodlands, Conroe" },
  { name: "Brazoria", note: "Pearland, Alvin" },
  { name: "Galveston", note: "Galveston, League City, Friendswood" },
  { name: "Liberty", note: "Liberty, Cleveland" },
  { name: "Waller", note: "Hempstead, Prairie View" },
  { name: "Chambers", note: "Baytown, Anahuac" },
  { name: "Austin", note: "Bellville, Sealy" }
] as const;

const HAR_EXTENDED_MARKET_COUNTIES = [
  { name: "Walker", note: "Huntsville" },
  { name: "San Jacinto", note: "Coldspring, Shepherd" },
  { name: "Wharton", note: "Wharton, El Campo" },
  { name: "Colorado", note: "Columbus, Eagle Lake" },
  { name: "Matagorda", note: "Bay City, Palacios" },
  { name: "Grimes", note: "Navasota" },
  { name: "Washington", note: "Brenham" }
] as const;

const HAR_CORE_COUNTY_NAMES = HAR_CORE_COUNTIES.map((county) => county.name);
const HAR_EXTENDED_MARKET_COUNTY_NAMES = HAR_EXTENDED_MARKET_COUNTIES.map((county) => county.name);
const HAR_TOTAL_MARKET_COUNT = HAR_CORE_COUNTIES.length + HAR_EXTENDED_MARKET_COUNTIES.length;
const HOUSTON_HAR_MARKET_MAP = buildTexasCountyMap({
  primaryCounties: HAR_CORE_COUNTY_NAMES,
  extendedCounties: HAR_EXTENDED_MARKET_COUNTY_NAMES
});

function CountyChip({
  name,
  tone = "secondary",
  className = ""
}: {
  name: string;
  tone?: "primary" | "secondary";
  className?: string;
}) {
  const chipClass = [
    "inline-flex border px-3 py-1 text-xs font-semibold tracking-wide",
    tone === "primary"
      ? "border-[var(--gold)] bg-[var(--cream)] text-[var(--navy)]"
      : "border-[var(--stone)] bg-[var(--ivory)] text-[var(--navy)]",
    className
  ].join(" ");

  return <span className={chipClass}>{name} County</span>;
}

function CountyChipGrid({
  counties,
  tone = "secondary",
  className = ""
}: {
  counties: readonly string[];
  tone?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <ul className={["mt-4 grid gap-2 sm:grid-cols-2", className].join(" ")}>
      {counties.map((county) => (
        <li key={county}>
          <CountyChip name={county} tone={tone} className="w-full justify-center text-center sm:justify-start sm:text-left" />
        </li>
      ))}
    </ul>
  );
}

function MarketCountyList({ counties }: { counties: readonly { name: string; note: string }[] }) {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {counties.map((county) => (
        <li key={county.name} className="border border-[var(--stone)] bg-[var(--ivory)] p-3">
          <span className="font-semibold text-[var(--navy)]">{county.name} County</span>
          <span className="text-[var(--muted)]"> ({county.note})</span>
        </li>
      ))}
    </ul>
  );
}

function StatPill({
  label,
  value,
  tone = "secondary"
}: {
  label: string;
  value: number;
  tone?: "primary" | "secondary";
}) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        tone === "primary"
          ? "border-[var(--gold)] bg-[var(--cream)] text-[var(--navy)]"
          : "border-[var(--stone)] bg-[var(--ivory)] text-[var(--muted)]"
      ].join(" ")}
    >
      <span className={["h-2.5 w-2.5 rounded-full", tone === "primary" ? "bg-[var(--gold)]" : "bg-[var(--navy)]"].join(" ")} />
      {value} {label}
    </div>
  );
}

export function ServiceAreaPageContent() {
  const t = getServiceAreaCopy();
  const visibleExtendedCounties = EXTENDED_SERVICE_COUNTIES.slice(0, 12);
  const hiddenExtendedCounties = EXTENDED_SERVICE_COUNTIES.slice(12);

  return (
    <div className="py-10 sm:py-14">
      <ServiceAreaHubJsonLd />
      <Container>
        <div className="mx-auto max-w-7xl space-y-8">
          <header className="space-y-4">
            <div className="text-xs font-semibold tracking-widest text-[var(--gold-dark)]">{t.eyebrow}</div>
            <h1 className="section-title">{t.title}</h1>
            <p className="max-w-4xl text-base text-[var(--muted)]">{t.intro}</p>
            <div className="flex flex-wrap gap-2">
              <StatPill label={t.statPrimary} value={PRIMARY_SERVICE_COUNT} tone="primary" />
              <StatPill label={t.statExtended} value={EXTENDED_SERVICE_COUNT} />
              <StatPill label={t.statTotal} value={TOTAL_SERVICE_COUNT} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-[var(--gold)]/40 bg-[var(--cream)] p-4">
                <div className="text-xs font-semibold tracking-widest text-[var(--gold-dark)]">{t.activeCoverageLabel}</div>
                <div className="mt-2 text-base font-semibold text-[var(--navy)]">{t.activeCoverageTitle}</div>
                <p className="mt-2 text-sm text-[var(--muted)]">{t.activeCoverageBody}</p>
              </div>
              <div className="border border-[var(--stone)] bg-[var(--ivory)] p-4">
                <div className="text-xs font-semibold tracking-widest text-[var(--navy)]">{t.marketRefLabel}</div>
                <div className="mt-2 text-base font-semibold text-[var(--navy)]">{t.marketRefTitle}</div>
                <p className="mt-2 text-sm text-[var(--muted)]">{t.marketRefBody}</p>
              </div>
            </div>
          </header>

          <div className="overflow-hidden border border-[var(--stone)] bg-[var(--white)]">
            <div className="border-b border-[var(--stone)] p-4 sm:p-5 lg:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-2">
                  <div className="text-xs font-semibold tracking-widest text-[var(--gold-dark)]">{t.activeListqikLabel}</div>
                  <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--navy)] sm:text-3xl">
                    {t.activeListqikTitle}
                  </h2>
                  <p className="text-sm text-[var(--muted)] sm:text-base">{t.activeListqikBody}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatPill label={t.statPrimaryShort} value={PRIMARY_SERVICE_COUNT} tone="primary" />
                  <StatPill label={t.statExtendedShort} value={EXTENDED_SERVICE_COUNT} />
                </div>
              </div>
            </div>

            <div className="grid items-start gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
              <div className="border-b border-[var(--stone)] p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-6">
                <TexasServiceAreaMap />
                <div className="mt-4 grid gap-2 text-xs text-[var(--muted)] sm:flex sm:flex-wrap sm:gap-4">
                  <div className="inline-flex items-center gap-2 border border-[var(--stone)] bg-[var(--ivory)] px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <span className="h-3 w-3 rounded-full bg-[#c9a96e]" />
                    {t.mapLegendPrimary}
                  </div>
                  <div className="inline-flex items-center gap-2 border border-[var(--stone)] bg-[var(--ivory)] px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <span className="h-3 w-3 rounded-full bg-[#14213d]" />
                    {t.mapLegendExtended}
                  </div>
                  <div className="inline-flex items-center gap-2 border border-[var(--stone)] bg-[var(--ivory)] px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <span className="h-3 w-3 rounded-full bg-[#e8e0d3]" />
                    {t.mapLegendOther}
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5 lg:p-6">
                <section className="border border-[var(--gold)]/40 bg-[var(--cream)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-semibold text-[var(--navy)]">{t.primaryCountiesTitle}</h2>
                    <span className="text-xs font-mono text-[var(--gold-dark)]">
                      {t.primaryCountiesMeta.replace("{count}", String(PRIMARY_SERVICE_COUNT))}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{t.primaryCountiesBody}</p>
                  <CountyChipGrid counties={PRIMARY_SERVICE_COUNTIES} tone="primary" />
                </section>

                <section className="border border-[var(--stone)] bg-[var(--ivory)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-semibold text-[var(--navy)]">{t.extendedCountiesTitle}</h2>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {t.extendedCountiesMeta.replace("{count}", String(EXTENDED_SERVICE_COUNT))}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{t.extendedCountiesBody}</p>
                  <CountyChipGrid counties={visibleExtendedCounties} />
                  {hiddenExtendedCounties.length > 0 ? (
                    <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{t.fullListBelow}</div>
                  ) : null}
                </section>
              </div>
            </div>

            {hiddenExtendedCounties.length > 0 ? (
              <div className="border-t border-[var(--stone)] bg-[var(--ivory)] px-4 py-4 sm:px-5 lg:px-6">
                <details className="group">
                  <summary className="list-none cursor-pointer border border-[var(--gold)] bg-[var(--cream)] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--navy)] transition hover:bg-[var(--gold)]">
                    <span className="group-open:hidden">{t.viewMore.replace("{count}", String(hiddenExtendedCounties.length))}</span>
                    <span className="hidden group-open:inline">{t.viewLess}</span>
                  </summary>
                  <div className="mt-4 border border-[var(--stone)] bg-[var(--white)] p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{t.remainingCounties}</div>
                    <CountyChipGrid counties={hiddenExtendedCounties} className="mt-4 lg:grid-cols-3 xl:grid-cols-4" />
                  </div>
                </details>
              </div>
            ) : null}

            <div className="border-t border-[var(--stone)] bg-[var(--cream)] px-4 py-4 text-sm text-[var(--muted)] sm:px-5">
              <span className="font-semibold text-[var(--navy)]">{t.importantNote}</span> {t.importantNoteBody}
              <div className="mt-3 flex flex-wrap gap-3">
                <Link href="/neighborhoods" className="btn-gold">
                  {t.startListing}
                </Link>
                <a href={`mailto:${site.email}?subject=Service%20Area%20Question`} className="btn-ghost">
                  {t.contactConcierge}
                </a>
              </div>
            </div>
          </div>

          <section className="overflow-hidden border border-[var(--stone)] bg-[var(--white)]">
            <div className="border-b border-[var(--stone)] p-5 sm:p-6">
              <div className="space-y-4">
                <div className="text-xs font-semibold tracking-widest text-[var(--gold-dark)]">{t.harEyebrow}</div>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--navy)] sm:text-3xl">
                  {t.harTitle}
                </h2>
                <p className="max-w-4xl text-sm text-[var(--muted)] sm:text-base">{t.harIntro}</p>
                <div className="border border-[var(--stone)] bg-[var(--ivory)] p-4 text-sm text-[var(--muted)]">
                  <span className="font-semibold text-[var(--navy)]">{t.harCompatNote}</span> {t.harCompatBody}
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatPill label={t.statHarCore} value={HAR_CORE_COUNTIES.length} tone="primary" />
                  <StatPill label={t.statHarExtended} value={HAR_EXTENDED_MARKET_COUNTIES.length} />
                  <StatPill label={t.statHarTotal} value={HAR_TOTAL_MARKET_COUNT} />
                </div>
              </div>
            </div>

            <div className="grid items-start gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
              <div className="border-b border-[var(--stone)] p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-6">
                <TexasServiceAreaMap map={HOUSTON_HAR_MARKET_MAP} ariaLabel={t.harMapAria} />
                <div className="mt-4 grid gap-2 text-xs text-[var(--muted)] sm:flex sm:flex-wrap sm:gap-4">
                  <div className="inline-flex items-center gap-2 border border-[var(--stone)] bg-[var(--ivory)] px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <span className="h-3 w-3 rounded-full bg-[#c9a96e]" />
                    {t.harLegendCore}
                  </div>
                  <div className="inline-flex items-center gap-2 border border-[var(--stone)] bg-[var(--ivory)] px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <span className="h-3 w-3 rounded-full bg-[#14213d]" />
                    {t.harLegendExtended}
                  </div>
                  <div className="inline-flex items-center gap-2 border border-[var(--stone)] bg-[var(--ivory)] px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <span className="h-3 w-3 rounded-full bg-[#e8e0d3]" />
                    {t.mapLegendOther}
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5 lg:p-6">
                <section className="border border-[var(--gold)]/40 bg-[var(--cream)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-[var(--navy)]">{t.harCoreTitle}</h3>
                    <span className="text-xs font-mono text-[var(--gold-dark)]">
                      {HAR_CORE_COUNTIES.length} {t.countiesWord}
                    </span>
                  </div>
                  <MarketCountyList counties={HAR_CORE_COUNTIES} />
                </section>

                <section className="border border-[var(--stone)] bg-[var(--ivory)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-[var(--navy)]">{t.harExtendedTitle}</h3>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {HAR_EXTENDED_MARKET_COUNTIES.length} {t.countiesWord}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{t.harExtendedBody1}</p>
                  <p className="mt-3 text-sm text-[var(--muted)]">{t.harExtendedBody2}</p>
                  <MarketCountyList counties={HAR_EXTENDED_MARKET_COUNTIES} />
                </section>
              </div>
            </div>

            <div className="border-t border-[var(--stone)] bg-[var(--cream)] px-5 py-4 text-sm text-[var(--muted)]">
              <span className="font-semibold text-[var(--navy)]">{t.statewideNote}</span> {t.statewideBody}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
