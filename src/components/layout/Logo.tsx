interface LogoProps {
  className?: string;
}

/**
 * Inline copy of the PvPIndex diamond+swords mark used across the platform.
 * Same artwork as apps/web/public/icon.svg so the docs site visually
 * brands itself identically to pvpindex.com.
 */
export function Logo({ className = 'h-7 w-7' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="PvPIndex"
    >
      <defs>
        <linearGradient id="docs-bl1" x1="17" y1="17" x2="47" y2="47" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="35%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="docs-bl2" x1="47" y1="17" x2="17" y2="47" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="35%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="docs-rim" x1="2" y1="2" x2="62" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="55%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <radialGradient id="docs-bg" cx="32" cy="20" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0d2010" />
          <stop offset="100%" stopColor="#040a05" />
        </radialGradient>
        <clipPath id="docs-clip">
          <path d="M32 2 L62 32 L32 62 L2 32 Z" />
        </clipPath>
      </defs>
      <path d="M32 2 L62 32 L32 62 L2 32 Z" fill="url(#docs-bg)" />
      <path d="M2 32 L32 62 L62 32 Z" fill="rgba(0,0,0,0.14)" />
      <path d="M32 2 L62 32 L32 62 L2 32 Z" stroke="url(#docs-rim)" strokeWidth="2.5" />
      <path d="M32 13 L51 32 L32 51 L13 32 Z" stroke="#22c55e" strokeWidth="0.75" strokeOpacity="0.22" />
      <g clipPath="url(#docs-clip)">
        <line x1="17" y1="17" x2="47" y2="47" stroke="url(#docs-bl1)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="47" y1="17" x2="17" y2="47" stroke="url(#docs-bl2)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="25" y1="33" x2="33" y2="25" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="31" y1="25" x2="39" y2="33" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="47" cy="47" r="3" fill="#0a1a0b" stroke="#22c55e" strokeWidth="1.25" />
        <circle cx="17" cy="47" r="3" fill="#0a1a0b" stroke="#22c55e" strokeWidth="1.25" />
        <circle cx="32" cy="32" r="2.5" fill="#4ade80" />
      </g>
    </svg>
  );
}
