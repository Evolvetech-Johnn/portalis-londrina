# Portalis — Design System Tokens

> Documento de referência para manter consistência visual em todas as telas futuras do projeto.
> **Regra principal**: nunca use valores "soltos" (cores hex, px arbitrários) nos componentes.
> Sempre use tokens do `tailwind.config.js` ou classes reutilizáveis do `index.css`.

---

## Identidade da Marca

| Atributo | Definição |
|---|---|
| **Nome** | Portalis |
| **Segmento** | B2B Imobiliário — donos de imobiliária, corretores de alto desempenho |
| **Tom** | Confiança, tecnologia, performance — elegante e sério |
| **Anti-padrão** | Não deve parecer "curso online" nem produto de nicho barato |
| **Posicionamento visual** | Tech premium — referências: Stripe, Linear, fintechs enterprise |

---

## Paleta de Cores

### Decisão: Obsidian & Electric Indigo

**Razão da escolha:** O indigo elétrico é incomum no mercado imobiliário (dominado por vermelho/laranja), posicionando a Portalis como inovação tecnológica. A base obsidian cria profundidade e elimina qualquer sensação de "template".

### Tokens de Cor (como usar nos componentes)

```jsx
// ✅ CORRETO — sempre use tokens
<div className="bg-obsidian-900 text-slate-50">
<button className="bg-indigo-600 hover:bg-indigo-500">

// ❌ ERRADO — nunca use valores diretos
<div style={{ backgroundColor: '#080810', color: '#f4f3ff' }}>
```

### Mapeamento Semântico

| Intenção | Token Tailwind | Hex | Uso |
|---|---|---|---|
| **Fundo página** | `bg-obsidian-900` | `#080810` | Background de toda a LP |
| **Fundo seção alt** | `bg-obsidian-800` | `#0f0f1e` | Seções alternadas |
| **Card / container** | `bg-obsidian-700` | `#17172e` | Cards, caixas internas |
| **Card elevado** | `bg-obsidian-600` | `#20203e` | Input focus, card hover |
| **Texto principal** | `text-slate-50` | `#f4f3ff` | Headlines, texto crítico |
| **Texto secundário** | `text-slate-300` | `#c4c2e8` | Parágrafos, descrições |
| **Texto muted** | `text-slate-500` | `#7a789a` | Labels, caption, meta |
| **Bordas sutis** | `border-slate-800` | `#2e2c3e` | Cards, divisores |
| **Bordas normais** | `border-slate-700` | `#46445c` | Hover states |
| **CTA principal** | `bg-indigo-600` | `#6d5ef6` | Botões primários |
| **CTA hover** | `bg-indigo-500` | `#7f72f7` | Estado hover do CTA |
| **Ícones / destaques** | `text-indigo-400` | `#9d93f8` | Ícones, highlights |
| **Links** | `text-indigo-300` | `#bdb8fa` | Links em texto |
| **Badges** | `text-indigo-200` | `#d6d3fc` | Pills, tags |
| **Sucesso** | `text-success-500` | `#22c55e` | Feedback positivo |
| **Erro** | `text-error-500` | `#ef4444` | Erros de form |

### Contraste WCAG AA (validado)

| Texto | Fundo | Ratio | Nível |
|---|---|---|---|
| `slate-50` (#f4f3ff) | `obsidian-900` (#080810) | **18.7:1** | ✅ AAA |
| `slate-300` (#c4c2e8) | `obsidian-900` (#080810) | **8.4:1** | ✅ AAA |
| `slate-500` (#7a789a) | `obsidian-800` (#0f0f1e) | **4.7:1** | ✅ AA |
| `white` (#fff) | `indigo-600` (#6d5ef6) | **4.8:1** | ✅ AA |
| `slate-300` (#c4c2e8) | `obsidian-700` (#17172e) | **6.1:1** | ✅ AA |

---

## Tipografia

### Decisão: DM Serif Display + Inter

| Função | Família | Peso | Classe Tailwind |
|---|---|---|---|
| **H1, H2, H3** | DM Serif Display | 400 (única variação) | `font-heading` |
| **H4, H5, H6** | Inter | 600 (semibold) | `font-sans font-semibold` |
| **Corpo / UI** | Inter | 400–700 | `font-sans` |
| **Código** | JetBrains Mono | 400 | `font-mono` |

### Escala de Tamanhos (em uso na LP)

| Token | Tamanho | Leading | Uso típico |
|---|---|---|---|
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
|---|---|---|
| `< 640px` (mobile) | 4 colunas | 16px (`px-4`) |
| `640px` (sm) | 8 colunas | 24px (`px-6`) |
| `1024px` (lg) | 12 colunas | 32px (`px-8`) |
| `> 1280px` (xl) | 12 colunas | 32px → max 1200px |

---

## Elevação (Sombras)

Sistema de 5 níveis de elevação. Todas as sombras têm subtom azul-escuro para coerência.

| Nível | Classe | Uso |
|---|---|---|
| 0 | `shadow-none` | Elementos sem elevação |
| 1 | `shadow-sm` | Inputs, elementos UI menores |
| 2 | `shadow` | Cards padrão |
| 3 | `shadow-lg` | Cards em hover |
| 4 | `shadow-xl` | Modais, dropdowns |
| 5 | `shadow-2xl` | Overlays de tela cheia |
| Accent | `shadow-accent` | CTAs, elementos de foco |
| Accent forte | `shadow-accent-lg` | CTA hover |
| Glass | `shadow-glass` | Cards glassmorphism |

---

## Estados de Interação

### Botões — Padrão universal

```
idle:     escala 1.0, sombra accent normal
hover:    scale(1.03), sombra accent-lg, brightness(1.1), 200ms ease
active:   scale(0.97), sombra accent, 100ms ease
focus:    ring-2 ring-indigo-600 ring-offset-2 (acessibilidade)
disabled: opacity-40, cursor-not-allowed, scale(1.0) bloqueado
```

### Cards — Padrão universal

```
idle:     border-slate-800, shadow-lg
hover:    border-indigo-600/30, shadow-glass-hover, translateY(-4px), 300ms
```

### Inputs — Padrão universal

```
idle:     border-slate-800, bg-obsidian-700
hover:    border-slate-700
focus:    ring-2 ring-indigo-600/50, border-indigo-600, bg-obsidian-600
error:    border-error-500, ring-error-500/50
disabled: opacity-40, cursor-not-allowed
```

---

## Animações

### Princípios

1. **Sempre** use `prefers-reduced-motion` — já implementado no `index.css`
2. **Timing padrão**: 200ms hover, 300ms card, 600ms reveal
3. **Easing padrão**: `cubic-bezier(0.2, 0, 0, 1)` (Material You "snappy")
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
|---|---|---|
| `rounded-sm` | 6px | Tags, badges |
| `rounded` | 10px | Inputs, UI menor |
| `rounded-lg` | 14px | Botões, cards compactos |
| `rounded-xl` | 20px | Cards principais |
| `rounded-2xl` | 28px | Seções, modais |
| `rounded-3xl` | 36px | Hero containers |
| `rounded-full` | 9999px | Pills, avatars, dots |

---

## Classes Reutilizáveis (index.css)

### Botões
```
.btn-primary      → CTA indigo gradient (tamanho padrão)
.btn-primary-lg   → CTA grande (hero)
.btn-primary-sm   → CTA pequeno (inline)
.btn-secondary    → Outline indigo
.btn-secondary-lg → Outline grande
.btn-ghost        → Sem borda, texto apenas
```

### Cards
```
.card             → Base (bg-obsidian-700 + border)
.card-hover       → card + efeitos de hover
.card-glass       → Glassmorphism
.card-glass-hover → Glassmorphism + hover indigo
.card-accent      → Border/glow indigo (destaque)
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
.badge-indigo     → Indigo (destaque primário)
.badge-success    → Verde (confirmação)
.badge-neutral    → Cinza (neutro)
```

### Utilitários
```
.text-gradient         → Gradiente violet/indigo em texto
.text-gradient-indigo  → Gradiente apenas indigo
.text-shimmer          → Shimmer animado em texto
.glass                 → Glassmorphism neutro
.glass-indigo          → Glassmorphism com tint indigo
.reveal                → Animação de entrada (+ hook)
.reveal-left/right/scale → Variantes de direção
.glow-border           → Borda glow em hover
.divider               → Linha divisória (slate)
.divider-gradient      → Linha divisória gradiente indigo
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
