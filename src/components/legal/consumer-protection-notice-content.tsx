/** Substance of TREC Consumer Protection Notice (CN); see TREC for current official PDF. */
export function ConsumerProtectionNoticeContent() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-[var(--ink)]">
      <p className="text-[var(--muted)]">
        The Texas Real Estate Commission (TREC) regulates real estate brokers and sales agents, real estate inspectors,
        easement or right-of-way agents, and certain related license types. This notice highlights key consumer
        protections and resources.
      </p>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[var(--navy)]">Verify a license</h2>
        <p>
          You can check the status of a license holder and read disciplinary history (where applicable) using
          TREC&apos;s online tools at{" "}
          <a
            href="https://www.trec.texas.gov/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--gold-dark)] underline underline-offset-2 hover:text-[var(--navy)]"
          >
            www.trec.texas.gov
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[var(--navy)]">Complaints</h2>
        <p>
          If you believe a license holder may have violated the Real Estate License Act or TREC rules, you may file a
          complaint with TREC. Complaint forms and instructions are available on the TREC website under consumer
          resources.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[var(--navy)]">Recovery funds</h2>
        <p>
          TREC administers recovery programs that may, in limited circumstances, help satisfy certain civil court
          judgments against licensees when statutory requirements are met. Details and eligibility are described on the
          TREC website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[var(--navy)]">Real estate inspectors</h2>
        <p>
          Real estate inspectors are subject to TREC regulation. Inspectors are generally required to maintain errors
          and omissions coverage, and contracts may include limitations of liability subject to applicable law. Review
          your inspection agreement and ask questions before you sign.
        </p>
      </section>

      <section className="space-y-3 border border-[var(--stone)] bg-[var(--ivory)] p-5">
        <h2 className="text-base font-semibold text-[var(--navy)]">Texas Real Estate Commission</h2>
        <address className="not-italic text-[var(--ink)]">
          <div>P.O. Box 12188</div>
          <div>Austin, Texas 78711-2188</div>
          <div className="mt-2">
            Phone:{" "}
            <a href="tel:+15129363000" className="text-[var(--gold-dark)] hover:text-[var(--navy)]">
              (512) 936-3000
            </a>
          </div>
          <div>
            Web:{" "}
            <a
              href="https://www.trec.texas.gov/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--gold-dark)] underline underline-offset-2 hover:text-[var(--navy)]"
            >
              www.trec.texas.gov
            </a>
          </div>
        </address>
      </section>

      <p className="border-t border-[var(--stone)] pt-4 text-xs text-[var(--muted)]">
        This page summarizes consumer information commonly included on TREC&apos;s Consumer Protection Notice. It is not
        legal advice. For the official current form PDF, see{" "}
        <a
          href="https://www.trec.texas.gov/forms/consumer-protection-notice"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2 hover:text-[var(--navy)]"
        >
          TREC — Consumer Protection Notice
        </a>
        .
      </p>
    </div>
  );
}
