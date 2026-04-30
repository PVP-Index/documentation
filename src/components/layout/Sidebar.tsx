import { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { NAV, type NavSection } from '../../content/nav';

interface SidebarProps {
  onNavigate: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const params = useParams();
  const location = useLocation();
  const activeSection = params.section ?? null;

  // Each section is open if it matches the active route, OR the user has
  // manually toggled it. Initialise: only the active section is open.
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of NAV) {
      initial[section.key] = section.key === activeSection;
    }
    // If we are on the landing page, open the first section so the
    // sidebar isn't a wall of collapsed groups.
    if (!activeSection) initial[NAV[0].key] = true;
    return initial;
  });

  // When the user navigates to a different section, auto-open that group
  // (without closing the others they have manually opened).
  useEffect(() => {
    if (activeSection) {
      setOpen((prev) => (prev[activeSection] ? prev : { ...prev, [activeSection]: true }));
    }
  }, [activeSection, location.pathname]);

  return (
    <nav className="space-y-1">
      {NAV.map((section) => (
        <SidebarSection
          key={section.key}
          section={section}
          isOpen={!!open[section.key]}
          onToggle={() =>
            setOpen((prev) => ({ ...prev, [section.key]: !prev[section.key] }))
          }
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

function SidebarSection({
  section,
  isOpen,
  onToggle,
  onNavigate,
}: {
  section: NavSection;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const params = useParams();
  const isActiveSection = params.section === section.key;

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition ${
          isActiveSection ? 'text-ink-100' : 'text-ink-300 hover:text-ink-100'
        }`}
      >
        <svg
          className="h-4 w-4 shrink-0 text-ink-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={section.iconPath} />
        </svg>
        <span className="flex-1 text-left">{section.label}</span>
        <svg
          className={`h-3.5 w-3.5 text-ink-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="mt-1 ml-3 border-l border-ink-700/80 pl-3 space-y-0.5">
          {section.items.map((item) => (
            <li key={item.slug}>
              <NavLink
                to={`/${section.key}/${item.slug}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `relative block rounded-md px-2.5 py-1.5 text-sm transition ${
                    isActive
                      ? 'bg-brand/10 text-brand font-medium'
                      : 'text-ink-300 hover:bg-ink-800/60 hover:text-ink-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-px bg-brand shadow-[0_0_6px_rgb(34_197_94/0.8)]" />
                    )}
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
