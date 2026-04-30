import { Link } from 'react-router-dom';
import { NAV } from '../content/nav';

export function HomePage() {
  return (
    <div>
      <section className="py-6">
        <p className="eyebrow mb-4">PvPIndex Documentation</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tightest text-ink-100 max-w-3xl text-balance">
          Everything you need to run, moderate, integrate with, and play on PvPIndex.
        </h1>
        <p className="mt-5 text-ink-300 max-w-2xl">
          PvPIndex is the cross-server PvP ranking and ELO platform for Minecraft.
          Pick the role that matches you — server owner, moderator, developer, or
          player — and we will walk you through everything from installing the
          plugin to disputing a battle.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link to="/server_owner/installation" className="btn-primary">
            Install the plugin
          </Link>
          <Link to="/user/elo-and-rankings" className="btn-secondary">
            How does ELO work?
          </Link>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {NAV.map((section) => (
          <Link
            key={section.key}
            to={`/${section.key}/${section.items[0].slug}`}
            className="card-accent card-hover group flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-xl border border-ink-700 bg-ink-850 text-brand group-hover:border-brand/40 transition">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={section.iconPath} />
                </svg>
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold text-ink-100 group-hover:text-brand transition">
                  {section.label}
                </h2>
                <p className="text-xs text-ink-400">{section.items.length} pages</p>
              </div>
            </div>
            <p className="text-sm text-ink-300">{section.description}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {section.items.slice(0, 4).map((item) => (
                <span key={item.slug} className="chip-ink">
                  {item.label}
                </span>
              ))}
              {section.items.length > 4 && (
                <span className="chip-ink">+{section.items.length - 4} more</span>
              )}
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-14 card-accent">
        <p className="eyebrow mb-3">Tip</p>
        <h2 className="font-display text-xl font-semibold text-ink-100">
          Press <kbd className="font-mono text-sm rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 text-brand">⌘K</kbd> or <kbd className="font-mono text-sm rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 text-brand">Ctrl K</kbd> to search.
        </h2>
        <p className="mt-2 text-sm text-ink-400">
          Search runs entirely in your browser across every page. Try keywords like
          "elo", "claim", "signature", or "arena".
        </p>
      </section>
    </div>
  );
}
