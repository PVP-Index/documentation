import { Link } from 'react-router-dom';
import { findNeighbors } from '../../content/nav';

export function PrevNext({ section, slug }: { section: string; slug: string }) {
  const { prev, next } = findNeighbors(section, slug);
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-ink-700/80 pt-8">
      {prev ? (
        <Link
          to={`/${prev.section.key}/${prev.slug}`}
          className="card card-hover group flex flex-col items-start gap-1 sm:items-end sm:text-right"
        >
          <span className="eyebrow">← Previous</span>
          <span className="font-display font-semibold text-ink-100 group-hover:text-brand transition">
            {prev.label}
          </span>
          <span className="text-xs text-ink-400">{prev.section.label}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`/${next.section.key}/${next.slug}`}
          className="card card-hover group flex flex-col items-start gap-1"
        >
          <span className="eyebrow">Next →</span>
          <span className="font-display font-semibold text-ink-100 group-hover:text-brand transition">
            {next.label}
          </span>
          <span className="text-xs text-ink-400">{next.section.label}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
