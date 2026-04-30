interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tightest text-ink-100">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-ink-300 max-w-2xl text-balance">{description}</p>
      )}
      <div className="mt-6 divider-brand" />
    </header>
  );
}
