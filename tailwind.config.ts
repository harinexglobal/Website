import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        /* ARC-style deep navy spine */
        navy: {
          50: '#EEF3F9',
          100: '#D6E2F0',
          200: '#AFC5DF',
          300: '#7C9BC6',
          400: '#4A6E9F',
          500: '#2A4E7D',
          600: '#134074',
          700: '#0B2545',
          800: '#0A192F',
          900: '#071426',
          950: '#040D1A',
        },
        /* Interactive blue */
        azure: {
          50: '#EAF4FF',
          100: '#CFE6FF',
          200: '#9FCBFF',
          300: '#63A9FF',
          400: '#2F88FA',
          500: '#0066CC',
          600: '#0052A6',
          700: '#004080',
          800: '#002E5C',
          900: '#001E3D',
        },
        /* Growth / bilateral-bridge emerald */
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        /* Brand orange, taken from the HariNex logo */
        saffron: {
          50: '#FFF6EB',
          100: '#FFE8CC',
          200: '#FFCF99',
          300: '#FCB160',
          400: '#F5972F',
          500: '#E8821E',
          600: '#C96912',
          700: '#A15210',
          800: '#7A3E0F',
          900: '#5C2F0D',
        },
        /* Brand deep green, taken from the HariNex logo wordmark */
        forest: {
          500: '#2E7D32',
          600: '#1B5E20',
          700: '#14481A',
        },
        ink: '#1E293B',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      backgroundImage: {
        'navy-grad': 'linear-gradient(135deg, #071426 0%, #0A192F 45%, #0B2545 100%)',
        'bridge-grad': 'linear-gradient(90deg, #E8821E 0%, #10B981 100%)',
        'grid-fade':
          'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,25,47,0.04), 0 8px 24px -12px rgba(10,25,47,0.18)',
        'card-lg': '0 2px 4px rgba(10,25,47,0.05), 0 24px 48px -20px rgba(10,25,47,0.28)',
        glow: '0 0 0 1px rgba(16,185,129,0.25), 0 0 32px -8px rgba(16,185,129,0.45)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-node': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-1000' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'pulse-node': 'pulse-node 3s ease-in-out infinite',
        'dash-flow': 'dash-flow 24s linear infinite',
        shimmer: 'shimmer 2.5s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
