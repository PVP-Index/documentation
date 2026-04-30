import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Right-rail "On this page" table of contents. Reads h2/h3 elements out of
 * the rendered markdown DOM (after every page change) and tracks the active
 * one with an IntersectionObserver as the user scrolls.
 */
export function Toc({ contentSelector = '.doc-prose' }: { contentSelector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) return;
    const nodes = root.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]');
    const list: Heading[] = Array.from(nodes).map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: Number(el.tagName.substring(1)),
    }));
    setHeadings(list);
    setActiveId(list[0]?.id ?? null);

    if (list.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [contentSelector]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0 pl-8">
      <div className="sticky top-24">
        <p className="eyebrow mb-3">On this page</p>
        <ul className="space-y-1.5 border-l border-ink-700/80">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${h.id}`}
                className={`block border-l-2 -ml-px pl-3 py-0.5 text-sm transition ${
                  activeId === h.id
                    ? 'border-brand text-brand'
                    : 'border-transparent text-ink-400 hover:text-ink-200'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
