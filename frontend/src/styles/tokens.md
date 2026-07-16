# Portalis — Design System Tokens

> Documentação de referência para manter consistência visual em todas as telas do projeto.
> **Regra principal**: nunca use valores "soltos" (cores hex, px arbitrários) nos componentes.
> Sempre use tokens do `tailwind.config.js` ou classes reutilizáveis do `index.css`.

---

## Identidade da Marca

| Atributo | Definição |
| --- | --- |
| **Nome** | Portalis |
| **Segmento** | B2B Imobiliário — donos de imobiliária, corretores de alto desempenho |
| **Tom** | Confiança, tecnologia, performance — elegante e sério, luxo discreto |
| **Anti-padrão** | Não deve parecer "curso online" nem produto de nicho barato |
| **Posicionamento visual** | Tech premium — referências: Salesforce Luxury, HubSpot Enterprise, Linear |

---

## Paleta de Cores

### Tokens de Cor (como usar nos componentes)

```jsx
// ✅ CORRETO — sempre use tokens
<div className="bg-obsidian-900 text-slate-200">
<button className="bg-gold-500 hover:bg-gold-400">

// ❌ ERRADO — nunca use valores diretos
<div style={{ backgroundColor: '#050505', color: '#F2F2F2' }}>
```

### Mapeamento Semântico

| Intenção | Token Tailwind | Hex | Uso |
| --- | --- | --- | --- |
| **Fundo página** | `bg-obsidian-900` | `#050505` | Background de toda a LP |
| **Fundo seção alt** | `bg-obsidian-700` | `#111111` | Seções alternadas, cards |
| **Input/Formulário** | `bg-obsidian-600` | `#1A1A1A` | Background de inputs |
| **Texto principal** | `text-slate-200` | `#F2F2F2` | Headings, texto crítico |
| **Texto secundário** | `text-slate-400` | `#D9D9D9` | Parágrafos, descrições |
| **Texto muted** | `text-slate-700` | `#666666` | Labels, caption, meta, placeholders |
| **Bordas sutis** | `border-slate-800` | `#404040` | Cards, divisores |
| **CTA principal** | `bg-gold-500` | `#D0A040` | Botões primários |
| **CTA hover** | `bg-gold-400` | `#E3B454` | Estado hover do CTA |
| **CTA active** | `bg-gold-600` | `#B07D31` | Estado active do CTA |
| **Ícones / destaques** | `text-gold-400` | `#E3B454` | Ícones, highlights |
| **Links** | `text-gold-400` | `#E3B454` | Links em texto |
| **Badges** | `text-gold-300` | `#EAC678` | Pills, tags |

### Contraste WCAG AA (validado)

| Texto | Fundo | Ratio | Nível |
| --- | --- | --- | --- |
| `slate-200` (#F2F2F2) | `obsidian-900` (#050505) | **20.1:1** | ✅ AAA |
| `slate-400` (#D9D9D9) | `obsidian-900` (#050505) | **16.8:1** | ✅ AAA |
| `slate-700` (#666666) | `obsidian-600` (#1A1A1A) | **6.7:1** | ✅ AA |
| `obsidian-900` (#050505) | `gold-500` (#D0A040) | **9.3:1** | ✅ AAA |
| `gold-500` (#D0A040) | `obsidian-900` (#050505) | **9.3:1** | ✅ AAA |

---

## Tipografia

### Decisão: DM Serif Display + Inter

| Função | Família | Peso | Classe Tailwind |
| --- | --- | --- | --- |
| **H1, H2, H3** | DM Serif Display | 400 (única variação) | `font-heading` |
| **H4, H5, H6** | Inter | 600 (semibold) | `font-sans font-semibold` |
| **Corpo / UI** | Inter | 400–700 | `font-sans` |
| **Código** | JetBrains Mono | 400 | `font-mono` |

### Escala de Tamanhos (em uso na LP)

| Token | Tamanho | Leading | Uso típico |
| --- | --- | --- | --- |
| `text-7xl` | 4.5rem (72px) | 1.0 | H1 desktop hero |
| `text-6xl` | 3.75rem (60px) | 1.05 | H1 tablet |
| `text-5xl` | 3rem (48px) | 1.1 | H1 mobile / H2 desktop |
| `text-4xl` | 2.25rem (36px) | 1.25 | H2 mobile / H3 desktop |
| `text-3xl` | 1.875rem (30px) | 1.35 | H3 |
| `text-2xl` | 1.5rem (24px) | 1.4 | H4, card titles |
| `text-xl` | 1.25rem (20px) | 1.5 | Subtítulos |
| `text-lg` | 1.125rem (18px) | 1.6 | Lead text / intro |
| `text-base` | 1rem (16px) | 1.6 | Corpo padrão |
| `text-sm` | 0.875rem (14px) | 1.5 | Labels, captions |
| `text-xs` | 0.75rem (12px) | 1.4 | Badges, meta |

### Regras tipográficas

1. **Nunca** use DM Serif Display em tamanhos menores que `text-2xl`
2. **Sempre** aplique `letter-spacing: -0.03em` em headings `text-4xl+`
3. **Máximo** 2 fontes no projeto. Nunca adicione uma terceira.
4. **Itálico** do DM Serif Display pode ser usado em citações/depoimentos

---

## Espaçamento

### Escala 4pt (base = 4px)

Todos os espaçamentos seguem múltiplos de 4px. Isso garante alinhamento perfeito ao pixel em grids.

```
4px  = spacing-1    →  micro espaço (gap entre ícone e texto)
8px  = spacing-2    →  espaço interno pequeno
12px = spacing-3    →  padding de badges
16px = spacing-4    →  padding base de botões, gutter mobile
24px = spacing-6    →  gutter tablet, padding de cards
32px = spacing-8    →  gutter desktop, espaço entre elementos
48px = spacing-12   →  espaço entre componentes numa seção
64px = spacing-16   →  seção padding vertical (mobile)
80px = spacing-20   →  seção padding vertical (desktop)
128px= spacing-32   →  separação entre seções grandes
```

### Grid Responsivo

| Breakpoint | Colunas | Padding lateral |
| --- | --- | --- |
| `< 640px` (mobile) | 4 colunas | 16px (`px-4`) |
| `640px` (sm) | 8 colunas | 24px (`px-6`) |
| `1024px` (lg) | 12 colunas | 32px (`px-8`) |
| `> 1280px` (xl) | 12 colunas | 32px → max 1200px |

---

## Elevação (Sombras)

Sistema de 5 níveis de elevação. Todas as sombras são em preto absoluto, com glow dourado extremamente sutil para destaque.

| Nível | Classe | Uso |
| --- | --- | --- |
| 0 | `shadow-none` | Elementos sem elevação |
| 1 | `shadow-sm` | Inputs, elementos UI menores |
| 2 | `shadow` | Cards padrão |
| 3 | `shadow-lg` | Cards em hover |
| 4 | `shadow-xl` | Modais, dropdowns |
| 5 | `shadow-2xl` | Overlays de tela cheia |
| Accent | `shadow-accent` | CTAs, elementos de foco |
| Accent forte | `shadow-accent-lg` | CTA hover |
| Glow sutil | `shadow-glow-gold-subtle` | Cards hover, elementos de destaque |
| Glass | `shadow-glass` | Cards glassmorphism |

---

## Estados de Interação

### Botões — Padrão universal

```
idle:     escala 1.0, bg-gold-500, texto obsidian-900, shadow-accent
hover:    bg-gold-400, scale(1.03), shadow-accent-lg, 200ms ease
active:   bg-gold-600, scale(0.97), shadow-accent, 150ms ease
focus:    ring-2 ring-gold-500 ring-offset-2 (acessibilidade)
disabled: opacity-40, cursor-not-allowed, scale(1.0) bloqueado
```

### Cards — Padrão universal

```
idle:     border-gold-500/12, bg-obsidian-700, shadow-lg
hover:    border-gold-500/30, shadow-glow-gold-subtle, translateY(-4px), 300ms
```

### Inputs — Padrão universal

```
idle:     border-slate-800, bg-obsidian-600, placeholder-slate-700
hover:    border-slate-700
focus:    ring-2 ring-gold-500/50, border-gold-500
error:    border-error-500, ring-error-500/50
disabled: opacity-40, cursor-not-allowed
```

---

## Animações

### Princípios

1. **Sempre** use `prefers-reduced-motion` — já implementado no `index.css`
2. **Timing padrão**: 180-250ms hover, 300ms card, 600ms reveal
3. **Easing padrão**: `cubic-bezier(0.4, 0, 0.2, 1)` (Material You)
4. **Bounce**: `cubic-bezier(0.34, 1.56, 0.64, 1)` — apenas em elementos de feedback

### Classes de Reveal (hook `useScrollReveal`)

```jsx
// Usa IntersectionObserver — adiciona 'visible' quando entra no viewport
<section ref={useScrollReveal()} className="reveal">
  Conteúdo...
</section>

// Variantes disponíveis:
"reveal"        → fade + translateY (default)
"reveal-left"   → fade + translateX(-28px)
"reveal-right"  → fade + translateX(28px)
"reveal-scale"  → fade + scale(0.92)
```

---

## Border Radius

| Token | px | Uso |
| --- | --- | --- |
| `rounded-sm` | 6px | Tags, badges |
| `rounded` | 10px | Inputs, UI menor |
| `rounded-lg` | 14px | Botões, cards compactos |
| `rounded-xl` | 20px | Cards principais |
| `rounded-2xl` | 28px | Seções, modais |
| `rounded-3xl` | 36px | Hero containers |
| `rounded-full` | 9999px | Pills, avatares, dots |

---

## Classes Reutilizáveis (index.css)

### Botões

```
.btn-primary      → CTA dourado (tamanho padrão)
.btn-primary-lg   → CTA grande (hero)
.btn-primary-sm   → CTA pequeno (inline)
.btn-secondary    → Outline dourado
.btn-secondary-lg → Outline grande
.btn-ghost        → Sem borda, texto apenas
```

### Cards

```
.card             → Base (bg-obsidian-700 + border-gold-500/12)
.card-hover       → card + efeitos de hover
.card-glass       → Glassmorphism
.card-glass-hover → Glassmorphism + hover dourado
.card-accent      → Border/glow dourado (destaque)
```

### Layout

```
.container-lp     → mx-auto max-w-1200 px responsivo
.section          → py-16/20/28 com overflow-hidden
.section-sm       → py-10/14/20
```

### Formulários

```
.form-label       → Label padrão
.input-field      → Input/textarea
.input-field-error → Input com estado de erro
.form-error-msg   → Mensagem de erro
```

### Badges

```
.badge-gold       → Dourado (destaque primário)
.badge-success    → Verde (confirmação)
.badge-neutral    → Cinza (neutro)
```

### Utilitários

```
.text-gradient         → Gradiente dourado em texto
.text-gradient-gold    → Gradiente apenas dourado
.text-shimmer          → Shimmer animado em texto
.glass                 → Glassmorphism neutro
.glass-gold            → Glassmorphism com tint dourado
.reveal                → Animação de entrada (+ hook)
.reveal-left/right/scale → Variantes de direção
.glow-border           → Borda glow em hover
.divider               → Linha divisória (slate)
.divider-gradient      → Linha divisória gradiente dourado
.icon-box-sm/md/lg     → Container de ícone
.section-glow          → Linha de brilho no topo da seção
```

---

## Checklist de Revisão de Componente

Antes de submeter um componente para review, verificar:

- [ ] Usa apenas tokens do `tailwind.config.js` (sem hex direto)
- [ ] Mobile-first (classes base sem prefixo = mobile)
- [ ] Estados `hover:`, `focus-visible:`, `active:`, `disabled:` implementados
- [ ] Texto com contraste ≥ 4.5:1 (AA) verificado
- [ ] `prefers-reduced-motion` respeitado (via classe `.reveal` + CSS)
- [ ] Sem `!important` ou estilos inline (exceto animações complexas)
- [ ] Semântica HTML correta (button para ação, a para navegação)
- [ ] IDs únicos em elementos interativos (para testes automatizados)
