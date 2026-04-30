// Loads every markdown file under src/content/**.md at build time as raw
// strings via Vite's import.meta.glob. The keys returned by Vite are paths
// like "./server_owner/installation.md" — we normalize to the form used in
// nav.ts (e.g. "server_owner/installation.md").

const RAW = import.meta.glob('./**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const DOCS: Record<string, string> = Object.fromEntries(
  Object.entries(RAW).map(([k, v]) => [k.replace(/^\.\//, ''), v]),
);

export function getDoc(file: string): string | null {
  return DOCS[file] ?? null;
}

export function getAllDocs(): Array<{ file: string; raw: string }> {
  return Object.entries(DOCS).map(([file, raw]) => ({ file, raw }));
}

/** Pull the first H1 line out of a markdown string, if present. */
export function extractTitle(raw: string): string | null {
  const match = raw.match(/^#\s+(.+?)\s*$/m);
  return match ? match[1] : null;
}
