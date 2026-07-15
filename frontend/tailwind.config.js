/**
 * ============================================================
 * PORTALIS — Tailwind CSS Design System
 * Paleta: Obsidian & Electric Indigo
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
      // CORES — Paleta Obsidian & Electric Indigo
      // Regra 60-30-10: 60% obsidian | 30% surface | 10% indigo (CTA)
      // ════════════════════════════════════════════════════════════════════
      colors: {
        // ── Obsidian (60% — fundos) ──────────────────────────────────────
        // Black puro ("OLED") para fundo principal, com grafites puros para elevações.
        obsidian: {
          950: '#000000',   // Fundo absolutamente escuro (Main bg, footer)
          900: '#050505',   // Background secudário sutil
          800: '#0a0a0a',   // Background seção alternada
          700: '#121212',   // Cards / containers internos
          600: '#1a1a1a',   // Cards hover, bordas internas
          500: '#262626',   // Elementos de UI elevados
        },

        // ── Gold (10% — accent / CTA) ──────────────────────────────────
        // Dourado fosco premium: sofisticação e conversão. Substitui o antigo indigo.
        // Contraste altíssimo no fundo preto.
        gold: {
          950: '#332800',
          900: '#4D3C00',
          800: '#665000',
          700: '#997800',
          600: '#D4AF37',   // ← CTA Principal (Dourado metálico/premium)
          500: '#DFBF5B',   // ← CTA Hover
          400: '#EACC7F',   // ← Ícones, destaques em texto
          300: '#F5D9A3',   // ← Texto de link em fundo escuro
          200: '#FAE6C7',   // ← Badges, pills
          100: '#FCF3E3',   // ← Tint leve de hover em itens
          50:  '#FFFAF0',   // ← Fundo de tooltip / popover claro
        },

        // ── Amber (apoio — gradientes, glows) ───────────────────────────
        // Complementa o dourado para dar profundidade térmica em glows.
        amber: {
          900: '#78350f',
          800: '#92400e',
          700: '#b45309',
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',   // ← Usado em gradientes gold/amber
          300: '#fcd34d',
          200: '#fde68a',
          100: '#fef3c7',
        },

        // ── Slate/Cinza Puro (30% — texto e superfícies neutras) ───────────
        // Cinzas totalmente dessaturados (sem azul/roxo) para focar na luxuosidade.
        slate: {
          50:  '#FAFAFA',   // Texto principal (Branco neve)
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',   // Texto secundário
          400: '#A3A3A3',
          500: '#737373',   // Texto muted
          600: '#525252',   // Bordas, divisores
          700: '#404040',   // Bordas de card em hover
          800: '#262626',   // Bordas sutis em elementos escuros
          900: '#171717',   // Superfície de input
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
        // DM Serif Display — headings H1–H3
        // Serifas de alto contraste, autoridade editorial sem exagero
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],

        // Inter Variable — todo o resto (corpo, UI, labels, botões)
        // Projetado para interfaces digitais, máxima legibilidade em telas
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],

        // Alias semântico explícito — evita confusão nos componentes
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      // Escala tipográfica — Majoração 1.25 (Major Third) a partir de 16px
      fontSize: {
        '2xs': ['0.625rem',  { lineHeight: '1rem',    letterSpacing: '0.02em' }],   //  10px
        xs:    ['0.75rem',   { lineHeight: '1rem',    letterSpacing: '0.01em' }],   //  12px
        sm:    ['0.875rem',  { lineHeight: '1.25rem', letterSpacing: '0' }],        //  14px
        base:  ['1rem',      { lineHeight: '1.6rem',  letterSpacing: '0' }],        //  16px
        lg:    ['1.125rem',  { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],  //  18px
        xl:    ['1.25rem',   { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],  //  20px
        '2xl': ['1.5rem',    { lineHeight: '2rem',    letterSpacing: '-0.02em' }],  //  24px
        '3xl': ['1.875rem',  { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],  //  30px
        '4xl': ['2.25rem',   { lineHeight: '2.5rem',  letterSpacing: '-0.03em' }],  //  36px
        '5xl': ['3rem',      { lineHeight: '1.1',     letterSpacing: '-0.03em' }],  //  48px
        '6xl': ['3.75rem',   { lineHeight: '1.05',    letterSpacing: '-0.04em' }],  //  60px
        '7xl': ['4.5rem',    { lineHeight: '1',       letterSpacing: '-0.04em' }],  //  72px
        '8xl': ['6rem',      { lineHeight: '1',       letterSpacing: '-0.05em' }],  //  96px
        '9xl': ['8rem',      { lineHeight: '1',       letterSpacing: '-0.05em' }],  // 128px
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
      // ESPAÇAMENTO — Escala 4pt (base 4px)
      // Garante alinhamento ao pixel em grids 4/8/12 colunas
      // Regra: NUNCA use valores fora desta escala (sem [valores arbitrários])
      // ════════════════════════════════════════════════════════════════════
      spacing: {
        px:   '1px',
        0:    '0',
        0.5:  '2px',
        1:    '4px',    // ← Unidade base (4pt)
        1.5:  '6px',
        2:    '8px',    // ← Micro-espaço interno
        2.5:  '10px',
        3:    '12px',
        3.5:  '14px',
        4:    '16px',   // ← Gutter mobile / padding base
        5:    '20px',
        6:    '24px',   // ← Gutter tablet
        7:    '28px',
        8:    '32px',   // ← Gutter desktop / section interno
        9:    '36px',
        10:   '40px',
        11:   '44px',
        12:   '48px',   // ← Espaço entre componentes
        14:   '56px',
        16:   '64px',   // ← Espaço entre seções (mobile)
        18:   '72px',
        20:   '80px',   // ← Espaço entre seções (desktop)
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
        sm:    '6px',    // tags, badges pequenos
        DEFAULT:'10px',  // inputs, elementos de UI
        md:    '10px',
        lg:    '14px',   // botões, cards compactos
        xl:    '20px',   // cards principais
        '2xl': '28px',   // seções, modais
        '3xl': '36px',   // hero containers grandes
        '4xl': '48px',
        full:  '9999px', // pills, avatars
      },

      // ════════════════════════════════════════════════════════════════════
      // SOMBRAS — Modelo de elevação 5 níveis
      // Todas as sombras agora são em preto absoluto (profundidade luxuosa)
      // ════════════════════════════════════════════════════════════════════
      boxShadow: {
        // Elevação 0 → 4 (sombras de profundidade)
        'xs':  '0 1px 2px rgba(0, 0, 0, 0.6)',
        'sm':  '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT:'0 4px 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)',
        'md':  '0 4px 8px rgba(0, 0, 0, 0.7)',
        'lg':  '0 8px 24px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6)',
        'xl':  '0 16px 48px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.6)',
        '2xl': '0 24px 64px rgba(0, 0, 0, 0.95)',

        // Sombras accent — para CTAs dourados
        'accent':    '0 4px 20px rgba(212, 175, 55, 0.25)',
        'accent-lg': '0 8px 40px rgba(212, 175, 55, 0.4)',
        'accent-xl': '0 12px 60px rgba(212, 175, 55, 0.5)',

        // Glow (usado em ícones de seção, logos em hover)
        'glow-gold':  '0 0 20px rgba(212, 175, 55, 0.4)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.3)',

        // Glass — para cards com glassmorphism (linhas brancas muito sutis)
        'glass':        '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
        'glass-hover':  '0 16px 48px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.08)',

        // Inner shadows
        'inner-sm': 'inset 0 1px 3px rgba(0, 0, 0, 0.6)',
        'inner':    'inset 0 2px 6px rgba(0, 0, 0, 0.7)',
        none: 'none',
      },

      // ════════════════════════════════════════════════════════════════════
      // GRADIENTES
      // ════════════════════════════════════════════════════════════════════
      backgroundImage: {
        // Backgrounds de seção (Preto)
        'page':              'linear-gradient(180deg, #000000 0%, #000000 100%)',
        'section-alt':       'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
        'hero':              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%), linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',

        // Accent gradients — Dourados
        'gold-gradient':   'linear-gradient(135deg, #D4AF37 0%, #B89222 100%)',
        'gold-gradient-h': 'linear-gradient(90deg, #D4AF37 0%, #B89222 100%)',
        'amber-gradient':  'linear-gradient(135deg, #F59E0B 0%, #D4AF37 100%)',
        'purple-fade':       'linear-gradient(135deg, #F59E0B 0%, #D4AF37 50%, #997800 100%)', // mantendo o nome da key, mas a cor é dourada

        // Glass gradient — bordas finas claras
        'glass':             'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'glass-border':      'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.02) 100%)',

        // Decorativos — brilhos sutis
        'glow-top':          'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 70%)',
        'glow-center':       'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)',
        'noise':             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",

        // Separadores de seção em preto absoluto
        'fade-bottom':       'linear-gradient(180deg, transparent 0%, #000000 100%)',
        'fade-top':          'linear-gradient(0deg, transparent 0%, #000000 100%)',
      },

      // ════════════════════════════════════════════════════════════════════
      // ANIMAÇÕES & TRANSIÇÕES
      // ════════════════════════════════════════════════════════════════════
      transitionDuration: {
        75:   '75ms',
        100:  '100ms',
        150:  '150ms',
        200:  '200ms',   // ← Padrão hover rápido
        300:  '300ms',   // ← Padrão hover normal
        400:  '400ms',
        500:  '500ms',
        600:  '600ms',   // ← Reveal / entrada de componente
        700:  '700ms',
        1000: '1000ms',
      },

      transitionTimingFunction: {
        DEFAULT:   'cubic-bezier(0.4, 0, 0.2, 1)',
        linear:    'linear',
        in:        'cubic-bezier(0.4, 0, 1, 1)',
        out:       'cubic-bezier(0, 0, 0.2, 1)',
        'in-out':  'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce:    'cubic-bezier(0.34, 1.56, 0.64, 1)',  // Spring suave
        snappy:    'cubic-bezier(0.2, 0, 0, 1)',          // Material You
      },

      animation: {
        // Entrada de elementos
        'fade-in':        'fadeIn 0.5s ease-out forwards',
        'fade-in-up':     'fadeInUp 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'fade-in-down':   'fadeInDown 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'slide-in-left':  'slideInLeft 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.2,0,0,1) forwards',
        'scale-in':       'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',

        // Loop / contínuo
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 10s ease-in-out infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'glow':         'glow 3s ease-in-out infinite alternate',
        'shimmer':      'shimmer 2.5s linear infinite',

        // Feedback de interação
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
          '0%':   { boxShadow: '0 0 8px rgba(212,175,55,0.2)' },
          '100%': { boxShadow: '0 0 32px rgba(212,175,55,0.5)' },
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
        50:  '50',   // Elementos flutuantes
        60:  '60',   // Dropdowns
        70:  '70',   // Modais
        80:  '80',   // Toasts / Overlays
        90:  '90',   // Navigation sticky
        100: '100',  // Elementos críticos
      },

      // Aspect ratios comuns na LP
      aspectRatio: {
        'video':    '16 / 9',
        'portrait': '3 / 4',
        'square':   '1 / 1',
        'hero':     '21 / 9',
        'card':     '4 / 3',
      },

      // Blur para glassmorphism
      backdropBlur: {
        xs:  '2px',
        sm:  '4px',
        md:  '8px',
        DEFAULT: '12px',
        lg:  '16px',
        xl:  '24px',
        '2xl':'40px',
      },

      // Opacidades adicionais
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
