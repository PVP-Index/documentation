import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniSearch, { type SearchResult } from 'minisearch';
import { FLAT_NAV } from '../../content/nav';
import { getDoc } from '../../content/loader';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface IndexDoc {
  id: string; // "<section>/<slug>"
  section: string;
  sectionLabel: string;
  slug: string;
  title: string;
  headings: string;
  body: string;
}

function buildIndex() {
  const docs: IndexDoc[] = FLAT_NAV.map((entry) => {
    const raw = getDoc(entry.file) ?? '';
    // Strip code fences then collect headings + plain body.
    const noFences = raw.replace(/```[\s\S]*?```/g, ' ');
    const headings = Array.from(noFences.matchAll(/^#{2,4}\s+(.+)$/gm))
      .map((m) => m[1])
      .join(' · ');
    const body = noFences
      .replace(/^#{1,6}\s+.+$/gm, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`>#-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return {
      id: `${entry.section.key}/${entry.slug}`,
      section: entry.section.key,
      sectionLabel: entry.section.label,
      slug: entry.slug,
      title: entry.label,
      headings,
      body,
    };
  });

  const mini = new MiniSearch<IndexDoc>({
    fields: ['title', 'headings', 'body', 'sectionLabel'],
    storeFields: ['title', 'sectionLabel', 'section', 'slug', 'body'],
    searchOptions: {
      boost: { title: 4, headings: 2, sectionLabel: 1.5, body: 1 },
      prefix: true,
      fuzzy: 0.2,
    },
  });
  mini.addAll(docs);
  return { mini, docs };
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mini, docs } = useMemo(buildIndex, []);

  // Reset query and refocus every time the palette opens.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      // Defer to the next tick so the ref is attached.
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Close on ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results: Array<SearchResult & { snippet: string }> = useMemo(() => {
    if (!query.trim()) {
      // Show every page grouped by section as a default "browse" view.
      return docs.slice(0, 8).map((d) => ({
        id: d.id,
        score: 0,
        terms: [],
        queryTerms: [],
        match: {},
        title: d.title,
        sectionLabel: d.sectionLabel,
        section: d.section,
        slug: d.slug,
        snippet: d.body.slice(0, 120),
      })) as Array<SearchResult & { snippet: string }>;
    }
    return mini
      .search(query, { prefix: true, fuzzy: 0.2 })
      .slice(0, 12)
      .map((r) => {
        const body = (r.body as string) ?? '';
        const lower = body.toLowerCase();
        const idx = lower.indexOf(query.toLowerCase());
        const start = Math.max(0, idx - 30);
        const snippet = idx >= 0 ? body.slice(start, start + 120) : body.slice(0, 120);
        return { ...r, snippet } as SearchResult & { snippet: string };
      });
  }, [query, mini, docs]);

  // Clamp active index when results change.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, results.length - 1)));
  }, [results.length]);

  const go = (id: string) => {
    onClose();
    navigate(`/${id}`);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-ink-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card-accent w-full max-w-xl p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink-700 px-4 py-3">
          <svg className="h-4 w-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                const r = results[active];
                if (r) go(r.id as string);
              }
            }}
            placeholder="Search documentation…"
            className="flex-1 bg-transparent text-ink-100 placeholder-ink-400 outline-none text-sm"
          />
          <kbd className="font-mono text-[10px] rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 text-ink-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-ink-400">No results for "{query}".</p>
          )}
          {results.map((r, i) => (
            <button
              key={r.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.id as string)}
              className={`w-full text-left px-4 py-2.5 transition flex items-start gap-3 ${
                i === active ? 'bg-ink-800/80' : 'hover:bg-ink-800/40'
              }`}
            >
              <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${i === active ? 'bg-brand' : 'bg-ink-600'}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-ink-100 truncate">{r.title as string}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500 shrink-0">
                    {r.sectionLabel as string}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-ink-400 line-clamp-2">{r.snippet}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-ink-700 px-4 py-2 flex items-center justify-between text-[11px] text-ink-500">
          <span>
            <kbd className="font-mono">↑↓</kbd> navigate · <kbd className="font-mono">↵</kbd> open
          </span>
          <span className="text-ink-500">{results.length} result{results.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
}
