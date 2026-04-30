import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findItem } from '../content/nav';
import { getDoc, extractTitle } from '../content/loader';
import { MarkdownRenderer } from '../components/docs/MarkdownRenderer';
import { PageHeader } from '../components/docs/PageHeader';
import { PrevNext } from '../components/docs/PrevNext';
import { Toc } from '../components/docs/Toc';
import { NotFoundPage } from './NotFoundPage';

export function DocPage() {
  const { section, slug } = useParams<{ section: string; slug: string }>();
  const entry = section && slug ? findItem(section, slug) : null;
  const raw = entry ? getDoc(entry.file) : null;
  const title = raw ? (extractTitle(raw) ?? entry?.label ?? '') : (entry?.label ?? '');

  // Scroll to top whenever we navigate to a new doc page (or jump to a #hash).
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [section, slug]);

  // Update the document title for nicer browser tabs.
  useEffect(() => {
    if (!entry) return;
    const previous = document.title;
    document.title = `${title} · ${entry.section.label} · PvPIndex Docs`;
    return () => {
      document.title = previous;
    };
  }, [title, entry]);

  if (!section || !slug || !entry) return <NotFoundPage />;
  if (raw === null) {
    return (
      <div className="card-accent">
        <p className="eyebrow mb-2">Missing content</p>
        <h1 className="font-display text-xl font-semibold">This page has no markdown file yet.</h1>
        <p className="mt-2 text-sm text-ink-400">
          Expected file: <code>src/content/{entry.file}</code>
        </p>
      </div>
    );
  }

  // Strip the H1 line from the rendered body — we render it via PageHeader.
  const body = raw.replace(/^#\s+.+\r?\n/, '');

  return (
    <div className="flex gap-0">
      <article className="min-w-0 flex-1 max-w-3xl">
        <nav className="mb-4 flex items-center gap-2 text-xs text-ink-400">
          <Link to="/" className="hover:text-brand transition">Docs</Link>
          <span>/</span>
          <Link to={`/${entry.section.key}/${entry.section.items[0].slug}`} className="hover:text-brand transition">
            {entry.section.label}
          </Link>
          <span>/</span>
          <span className="text-ink-200">{entry.label}</span>
        </nav>

        <PageHeader
          eyebrow={entry.section.label}
          title={title}
          description={entry.description}
        />

        <MarkdownRenderer source={body} />

        <PrevNext section={section} slug={slug} />
      </article>

      <Toc key={`${section}/${slug}`} />
    </div>
  );
}
