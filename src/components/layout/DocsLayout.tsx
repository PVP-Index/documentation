import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { CommandPalette } from '../search/CommandPalette';
import { useGlobalHotkey } from '../../hooks/useGlobalHotkey';

export function DocsLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  useGlobalHotkey({ key: 'k', meta: true }, openPalette);
  useGlobalHotkey({ key: 'k', ctrl: true }, openPalette);
  useGlobalHotkey({ key: '/', meta: false, ctrl: false }, openPalette);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        onOpenSearch={openPalette}
        onToggleNav={() => setMobileNavOpen((v) => !v)}
        mobileNavOpen={mobileNavOpen}
      />

      <div className="flex flex-1 mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        {/* Sidebar — fixed on desktop, slide-over on mobile */}
        <aside
          className={`fixed inset-y-0 left-0 top-14 z-40 w-72 transform border-r border-ink-700/80 bg-ink-900/95 backdrop-blur-md overflow-y-auto transition-transform duration-200 lg:static lg:top-0 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:backdrop-blur-none lg:w-64 lg:shrink-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="lg:sticky lg:top-20 px-4 lg:px-0 py-6 lg:pr-6">
            <Sidebar onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-ink-950/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0 py-8 lg:py-12 lg:pl-10">
          <Outlet />
        </main>
      </div>

      <footer className="mt-16 border-t border-ink-700/80 py-8">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>
            <span className="font-display font-semibold text-ink-200">PvPIndex</span> Documentation ·
            Built for server owners, moderators, developers, and players.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://pvpindex.com" className="hover:text-brand transition">pvpindex.com</a>
            <a href="https://github.com/PVP-Index" className="hover:text-brand transition">GitHub</a>
          </div>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
