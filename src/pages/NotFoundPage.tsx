import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-display text-4xl font-semibold text-ink-100">Page not found</h1>
      <p className="mt-3 text-ink-400">
        That page doesn't exist (yet). Try the sidebar or hit <kbd className="font-mono text-xs rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 text-brand">⌘K</kbd> to search.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back to docs home
      </Link>
    </div>
  );
}
