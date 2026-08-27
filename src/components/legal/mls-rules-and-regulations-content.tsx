import { readFileSync } from "node:fs";
import path from "node:path";

const fullRulesText = readFileSync(path.join(process.cwd(), "src/data/legal/mls-rules-and-regulations.txt"), "utf8");

export function MlsRulesAndRegulationsContent() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-[var(--ink)]">
      <p className="text-[var(--muted)]">
        Full extracted text from the source PDF: Texas REALTORS Multiple Listing Service Rules and Regulations, as
        amended by Texas REALTORS Executive Board on 02/14/22.
      </p>
      <pre className="overflow-x-auto whitespace-pre-wrap border border-[var(--stone)] bg-[var(--ivory)] p-4 font-mono text-xs leading-6 text-[var(--ink)]">
        {fullRulesText}
      </pre>
    </div>
  );
}
