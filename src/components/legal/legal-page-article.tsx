import { ConsumerProtectionNoticeContent } from "@/components/legal/consumer-protection-notice-content";
import { FairHousingContent } from "@/components/legal/fair-housing-content";
import { IabsContent } from "@/components/legal/iabs-content";
import { MlsRulesAndRegulationsContent } from "@/components/legal/mls-rules-and-regulations-content";
import { MlsRuleScheduleOfFinesContent } from "@/components/legal/mls-rule-schedule-of-fines-content";

type LegalPageArticleProps = {
  slug: string;
};

export function LegalPageArticle({ slug }: LegalPageArticleProps) {
  return (
    <article className="space-y-4 border border-[var(--stone)] bg-[var(--white)] p-6 sm:p-8">
      {slug === "iabs" ? (
        <IabsContent />
      ) : slug === "consumer-protection-notice" ? (
        <ConsumerProtectionNoticeContent />
      ) : slug === "mls-rules-and-regulations" ? (
        <MlsRulesAndRegulationsContent />
      ) : slug === "mls-rule-schedule-of-fines" ? (
        <MlsRuleScheduleOfFinesContent />
      ) : slug === "fair-housing" ? (
        <FairHousingContent />
      ) : (
        <div className="space-y-4 text-sm text-[var(--muted)]">
          <p>Legal content for this page is not available.</p>
        </div>
      )}
    </article>
  );
}
