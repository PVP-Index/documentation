import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#060912',
          900: '#0a0e1a',
          850: '#0d121f',
          800: '#111827',
          750: '#161e30',
          700: '#1a2236',
          600: '#252e44',
          500: '#3a4560',
          400: '#5a6580',
          300: '#94a3b8',
          200: '#cbd5e1',
          100: '#e2e8f0',
        },
        brand: {
          DEFAULT: '#22c55e',
          dim: '#16a34a',
          dark: '#15803d',
          glow: '#4ade80',
        },
        accent: {
          DEFAULT: '#f59e0b',
          dim: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        soft: '0 0 0 1px rgb(58 69 96 / 0.2), 0 8px 30px rgb(2 6 23 / 0.45)',
        glow: '0 0 32px -8px rgb(34 197 94 / 0.55)',
        ring: '0 0 0 1px rgb(34 197 94 / 0.4), 0 0 24px -4px rgb(34 197 94 / 0.35)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgb(58 69 96 / 0.18) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'fade-bottom': 'linear-gradient(180deg, transparent 0%, #0a0e1a 100%)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(34 197 94 / 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgb(34 197 94 / 0)' },
        },
      },
      animation: {
        sweep: 'sweep 2.5s linear infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
