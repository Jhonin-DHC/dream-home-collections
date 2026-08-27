import { TEXAS_SERVICE_AREA_MAP, type TexasCountyMapData } from "@/lib/service-area";

const TIER_FILL: Record<"primary" | "extended" | "other", string> = {
  primary: "#c9a96e",
  extended: "#14213d",
  other: "#e8e0d3"
};

const TIER_STROKE: Record<"primary" | "extended" | "other", string> = {
  primary: "#f7f1e6",
  extended: "#c9a96e",
  other: "#d4ccbe"
};

export function TexasServiceAreaMap({
  map = TEXAS_SERVICE_AREA_MAP,
  ariaLabel = "Texas county map showing primary and extended service areas"
}: {
  map?: TexasCountyMapData;
  ariaLabel?: string;
}) {
  const { width, height, statePath, counties } = map;

  return (
    <div className="border border-[var(--stone)] bg-[var(--cream)] p-3 sm:p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label={ariaLabel}>
        <rect width={width} height={height} fill="transparent" />
        {counties.map((county) => (
          <path
            key={county.name}
            d={county.path}
            fill={TIER_FILL[county.tier]}
            stroke={TIER_STROKE[county.tier]}
            strokeWidth={county.tier === "primary" ? 1.8 : 1}
            vectorEffect="non-scaling-stroke"
          >
            <title>{county.label}</title>
          </path>
        ))}
        {statePath ? (
          <path d={statePath} fill="none" stroke="#14213d" strokeWidth={2.6} vectorEffect="non-scaling-stroke" />
        ) : null}
      </svg>
    </div>
  );
}
