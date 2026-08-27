type LegalPageHeaderProps = {
  updatedAt: string;
  fallbackTitle: string;
};

export function LegalPageHeader({ updatedAt, fallbackTitle }: LegalPageHeaderProps) {
  return (
    <header className="space-y-3">
      <div className="text-xs font-semibold tracking-widest text-[var(--gold-dark)]">RESOURCES / LEGAL</div>
      <h1 className="section-title">{fallbackTitle}</h1>
      <p className="text-sm text-[var(--muted)]">
        Updated <span className="font-mono text-[var(--navy)]">{updatedAt}</span>
      </p>
    </header>
  );
}
