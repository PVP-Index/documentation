import { useEffect } from 'react';

/**
 * Bind a global keyboard shortcut.
 *
 * @example
 *   useGlobalHotkey({ key: 'k', meta: true }, () => setOpen(true));
 */
export function useGlobalHotkey(
  combo: { key: string; meta?: boolean; ctrl?: boolean },
  handler: () => void,
) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== combo.key.toLowerCase()) return;
      const wantsMod = combo.meta || combo.ctrl;
      if (wantsMod && !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      handler();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [combo.key, combo.meta, combo.ctrl, handler]);
}
