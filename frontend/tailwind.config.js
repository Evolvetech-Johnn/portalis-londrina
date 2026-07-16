/**
 * ============================================================
 * PORTALIS — Tailwind CSS Design System
 * Paleta: Obsidian & Premium Gold
 * Tipografia: DM Serif Display (headings) + Inter (corpo)
 * ============================================================
 *
 * REGRAS OBRIGATÓRIAS:
 * - Nunca use cores hex/rgb diretamente nos componentes.
 *   Sempre use tokens: text-primary, bg-surface-card, etc.
 * - Nunca use tamanhos "soltos" (mt-[37px]). Use a escala.
 * - Todos os CTAs usam .btn-primary ou .btn-secondary (index.css).
 * - Mobile-first em todos os componentes.
 *
 * Ver documentação completa em: src/styles/tokens.md
 * ============================================================
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    // ── Sobrescreve defaults perigosos ─────────────────────────────────────
    screens: {
      sm:  '640px',   // Tablet portrait
      md:  '768px',   // Tablet landscape
      lg:  '1024px',  // Desktop
      xl:  '1280px',  // Wide desktop
      '2xl': '1536px',
    },

    extend: {
      // ════════════════════════════════════════════════════════════════════
      // CORES — Paleta Premium Gold
      // Regra 60-30-10: 60% obsidian | 30% surface | 10% gold (CTA)
      // ════════════════════════════════════════════════════════════════════
      colors: {
        // ── Obsidian (BACKGROUND) ─────────────────────────────────────
        obsidian: {
          950: '#000000',
          900: '#050505',   // ← Background principal
          800: '#0A0A0A',
          700: '#111111',   // ← Cards
          600: '#1A1A1A',   // ← Input background
          500: '#262626',
        },

        // ── Gold (PRIMARY/SECONDARY/ACCENT) ──────────────────────────────────
        gold: {
          950: '#33260F',
          900: '#4D3714',
          800: '#66491A',
          700: '#996D26',
          600: '#B07D31',   // ← SECONDARY GOLD
          500: '#D0A040',   // ← PRIMARY GOLD
          400: '#E3B454',   // ← ACCENT GOLD
          300: '#EAC678',
          200: '#F2D89C',
          100: '#F9E9C0',
          50:  '#FCF5E4',
        },

        // ── Slate/Cinza (TEXT) ───────────────────────────────────────────
        slate: {
          50:  '#FFFFFF',
          100: '#F7F7F7',
          200: '#F2F2F2',   // ← TEXT primary
          300: '#E5E5E5',
          400: '#D9D9D9',   // ← TEXT secondary
          500: '#A3A3A3',
          600: '#737373',
          700: '#666666',   // ← TEXT muted / placeholder
          800: '#404040',
          900: '#262626',
        },

        // ── Estados semânticos ────────────────────────────────────────────
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          DEFAULT: '#22c55e',
        },
        warning: {
          400: '#facc15',
          500: '#eab308',
          DEFAULT: '#eab308',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          DEFAULT: '#ef4444',
        },
        info: {
          400: '#60a5fa',
          500: '#3b82f6',
          DEFAULT: '#3b82f6',
        },
      },

      // ════════════════════════════════════════════════════════════════════
      // TIPOGRAFIA
      // ════════════════════════════════════════════════════════════════════
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.625rem',  { lineHeight: '1rem',    letterSpacing: '0.02em' }],
        xs:    ['0.75rem',   { lineHeight: '1rem',    letterSpacing: '0.01em' }],
        sm:    ['0.875rem',  { lineHeight: '1.25rem', letterSpacing: '0' }],
        base:  ['1rem',      { lineHeight: '1.6rem',  letterSpacing: '0' }],
        lg:    ['1.125rem',  { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        xl:    ['1.25rem',   { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem',    { lineHeight: '2rem',    letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem',  { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem',   { lineHeight: '2.5rem',  letterSpacing: '-0.03em' }],
        '5xl': ['3rem',      { lineHeight: '1.1',     letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem',   { lineHeight: '1.05',    letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem',    { lineHeight: '1',       letterSpacing: '-0.04em' }],
        '8xl': ['6rem',      { lineHeight: '1',       letterSpacing: '-0.05em' }],
        '9xl': ['8rem',      { lineHeight: '1',       letterSpacing: '-0.05em' }],
      },

      fontWeight: {
        thin:       '100',
        extralight: '200',
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
        black:      '900',
      },

      // ════════════════════════════════════════════════════════════════════
      // ESPAÇAMENTO
      // ════════════════════════════════════════════════════════════════════
      spacing: {
        px:   '1px',
        0:    '0',
        0.5:  '2px',
        1:    '4px',
        1.5:  '6px',
        2:    '8px',
        2.5:  '10px',
        3:    '12px',
        3.5:  '14px',
        4:    '16px',
        5:    '20px',
        6:    '24px',
        7:    '28px',
        8:    '32px',
        9:    '36px',
        10:   '40px',
        11:   '44px',
        12:   '48px',
        14:   '56px',
        16:   '64px',
        18:   '72px',
        20:   '80px',
        22:   '88px',
        24:   '96px',
        28:   '112px',
        30:   '120px',
        32:   '128px',
        36:   '144px',
        40:   '160px',
        44:   '176px',
        48:   '192px',
        52:   '208px',
        56:   '224px',
        60:   '240px',
        64:   '256px',
        72:   '288px',
        80:   '320px',
        96:   '384px',
        128:  '512px',
      },

      // ════════════════════════════════════════════════════════════════════
      // BORDER RADIUS
      // ════════════════════════════════════════════════════════════════════
      borderRadius: {
        none:  '0',
        sm:    '6px',
        DEFAULT:'10px',
        md:    '10px',
        lg:    '14px',
        xl:    '20px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '48px',
        full:  '9999px',
      },

      // ════════════════════════════════════════════════════════════════════
      // SOMBRAS
      // ════════════════════════════════════════════════════════════════════
      boxShadow: {
        'xs':  '0 1px 2px rgba(0, 0, 0, 0.6)',
        'sm':  '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT:'0 4px 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)',
        'md':  '0 4px 8px rgba(0, 0, 0, 0.7)',
        'lg':  '0 8px 24px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6)',
        'xl':  '0 16px 48px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.6)',
        '2xl': '0 24px 64px rgba(0, 0, 0, 0.95)',

        'accent':    '0 4px 20px rgba(208, 160, 64, 0.25)',
        'accent-lg': '0 8px 40px rgba(208, 160, 64, 0.4)',
        'accent-xl': '0 12px 60px rgba(208, 160, 64, 0.5)',

        'glow-gold':  '0 0 20px rgba(208, 160, 64, 0.4)',
        'glow-gold-subtle': '0 0 20px rgba(208, 160, 64, 0.15)',

        'glass':        '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
        'glass-hover':  '0 16px 48px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.08)',

        'inner-sm': 'inset 0 1px 3px rgba(0, 0, 0, 0.6)',
        'inner':    'inset 0 2px 6px rgba(0, 0, 0, 0.7)',
        none: 'none',
      },

      // ════════════════════════════════════════════════════════════════════
      // GRADIENTES
      // ════════════════════════════════════════════════════════════════════
      backgroundImage: {
        'page':              'linear-gradient(180deg, #050505 0%, #050505 100%)',
        'section-alt':       'linear-gradient(180deg, #111111 0%, #050505 100%)',
        'hero':              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(208,160,64,0.12) 0%, transparent 70%), linear-gradient(180deg, #050505 0%, #111111 100%)',

        'gold-gradient':   'linear-gradient(135deg, #B07D31 0%, #D0A040 50%, #E3B454 100%)',
        'gold-gradient-h': 'linear-gradient(90deg, #B07D31 0%, #D0A040 50%, #E3B454 100%)',

        'glass':             'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'glass-border':      'linear-gradient(135deg, rgba(208,160,64,0.2) 0%, rgba(208,160,64,0.02) 100%)',

        'glow-top':          'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(208,160,64,0.1) 0%, transparent 70%)',
        'glow-center':       'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(208,160,64,0.08) 0%, transparent 70%)',
        'noise':             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",

        'fade-bottom':       'linear-gradient(180deg, transparent 0%, #050505 100%)',
        'fade-top':          'linear-gradient(0deg, transparent 0%, #050505 100%)',
      },

      // ════════════════════════════════════════════════════════════════════
      // ANIMAÇÕES & TRANSIÇÕES
      // ════════════════════════════════════════════════════════════════════
      transitionDuration: {
        75:   '75ms',
        100:  '100ms',
        150:  '150ms',
        180:  '180ms',
        200:  '200ms',
        250:  '250ms',
        300:  '300ms',
        400:  '400ms',
        500:  '500ms',
        600:  '600ms',
        700:  '700ms',
        1000: '1000ms',
      },

      transitionTimingFunction: {
        DEFAULT:   'cubic-bezier(0.4, 0, 0.2, 1)',
        linear:    'linear',
        in:        'cubic-bezier(0.4, 0, 1, 1)',
        out:       'cubic-bezier(0, 0, 0.2, 1)',
        'in-out':  'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
        snappy:    'cubic-bezier(0.2, 0, 0, 1)',
      },

      animation: {
        'fade-in':        'fadeIn 0.5s ease-out forwards',
        'fade-in-up':     'fadeInUp 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'fade-in-down':   'fadeInDown 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'slide-in-left':  'slideInLeft 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'scale-in':       'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',

        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 10s ease-in-out infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'glow':         'glow 3s ease-in-out infinite alternate',
        'shimmer':      'shimmer 2.5s linear infinite',

        'bounce-sm':    'bounceSm 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'shake':        'shake 0.5s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 8px rgba(208,160,64,0.2)' },
          '100%': { boxShadow: '0 0 32px rgba(208,160,64,0.5)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        bounceSm: {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-6px)' },
          '40%':      { transform: 'translateX(6px)' },
          '60%':      { transform: 'translateX(-4px)' },
          '80%':      { transform: 'translateX(4px)' },
        },
      },

      // ════════════════════════════════════════════════════════════════════
      // MISCELÂNEA
      // ════════════════════════════════════════════════════════════════════
      maxWidth: {
        'container': '1200px',
        'content':   '720px',
        'narrow':    '480px',
      },

      zIndex: {
        '-1': '-1',
        0:   '0',
        10:  '10',
        20:  '20',
        30:  '30',
        40:  '40',
        50:  '50',
        60:  '60',
        70:  '70',
        80:  '80',
        90:  '90',
        100: '100',
      },

      aspectRatio: {
        'video':    '16 / 9',
        'portrait': '3 / 4',
        'square':   '1 / 1',
        'hero':     '21 / 9',
        'card':     '4 / 3',
      },

      backdropBlur: {
        xs:  '2px',
        sm:  '4px',
        md:  '8px',
        DEFAULT: '12px',
        lg:  '16px',
        xl:  '24px',
        '2xl':'40px',
      },

      opacity: {
        2:   '0.02',
        4:   '0.04',
        6:   '0.06',
        8:   '0.08',
        12:  '0.12',
        15:  '0.15',
        20:  '0.20',
        25:  '0.25',
        30:  '0.30',
        35:  '0.35',
        40:  '0.40',
        45:  '0.45',
        50:  '0.50',
        60:  '0.60',
        70:  '0.70',
        75:  '0.75',
        80:  '0.80',
        90:  '0.90',
        95:  '0.95',
        100: '1',
      },
    },
  },

  plugins: [],
};
