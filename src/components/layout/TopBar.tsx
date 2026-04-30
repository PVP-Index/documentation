import { Link } from 'react-router-dom';
import { Logo } from './Logo';

interface TopBarProps {
  onOpenSearch: () => void;
  onToggleNav: () => void;
  mobileNavOpen: boolean;
}

export function TopBar({ onOpenSearch, onToggleNav, mobileNavOpen }: TopBarProps) {
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/80 bg-ink-900/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        {/* Mobile nav toggle */}
        <button
          onClick={onToggleNav}
          className="lg:hidden -ml-1 p-2 text-ink-300 hover:text-ink-100 transition"
          aria-label="Toggle navigation"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileNavOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Logo + wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo className="h-7 w-7" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-semibold text-ink-100 tracking-tightest">PvPIndex</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">Docs</span>
          </div>
        </Link>

        <div className="flex-1" />

        {/* Search trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 px-3 py-1.5 text-sm text-ink-400 transition hover:border-brand/40 hover:text-ink-200 min-w-[220px]"
        >
          <svg className="h-4 w-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="flex-1 text-left">Search docs…</span>
          <kbd className="font-mono text-[10px] rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 text-ink-400">
            {isMac ? '⌘K' : 'Ctrl K'}
          </kbd>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-ink-300 hover:text-ink-100 transition"
          aria-label="Search"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-1 ml-2 border-l border-ink-700 pl-3">
          <a
            href="https://pvpindex.com"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-300 hover:text-ink-100 transition"
          >
            pvpindex.com
          </a>
          <a
            href="https://github.com/PVP-Index"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-ink-300 hover:text-ink-100 transition"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.69-1.29-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
