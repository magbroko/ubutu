# DESAC Energy Nigeria Limited — Design System

Institutional-grade design system for the DESAC Energy website. Emphasises premium restraint, trust through visual hierarchy, and refined typography.

---

## Color Palette

### Primary
| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-dark` | `#0f172a` | Navbar, footer, dark surfaces |
| `--text-primary` | `#0f172a` | Headings, body text |
| `--text-secondary` | `#475569` | Supporting text |
| `--text-muted` | `#64748b` | Captions, metadata |

### Accent
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-gold` | `#c9a227` | CTAs, highlights, icons |
| `--accent-gold-dim` | `#b8860b` | Hover states |
| `--accent-gold-subtle` | `rgba(201, 162, 39, 0.12)` | Backgrounds, focus rings |

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#f8fafc` | Page background |
| `--bg-secondary` | `#ffffff` | Cards, panels |
| `--bg-tertiary` | `#f1f5f9` | Alternate sections |

### Borders
| Token | Usage |
|-------|-------|
| `--border-subtle` | `rgba(15, 23, 42, 0.08)` | Default borders |
| `--border-accent` | `rgba(201, 162, 39, 0.4)` | Accent borders, hover |

---

## Typography

### Font Families
- **Display**: `DM Serif Display`, Georgia, serif — headings, company name
- **Body**: `Inter`, system-ui, sans-serif — body text, UI

### Scale
| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 0.75rem | Captions, badges |
| `--text-sm` | 0.875rem | Secondary text |
| `--text-base` | 1rem | Body |
| `--text-lg` | 1.125rem | Lead paragraphs |
| `--text-xl` | 1.25rem | H3 |
| `--text-2xl` | 1.5rem | H2 |
| `--text-3xl` | 2rem | H1 (section) |
| `--text-4xl` | 2.5rem | Large display |
| `--text-5xl` | 3rem | Hero sub |
| `--text-display` | 3.5rem | Hero headline |

### Line Height
- `--line-height-tight`: 1.5 — headings
- `--line-height-body`: 1.6 — body text (WCAG-friendly)

---

## Spacing Scale

8px base unit:

| Token | Value |
|-------|-------|
| `--space-1` | 8px |
| `--space-2` | 16px |
| `--space-3` | 24px |
| `--space-4` | 32px |
| `--space-5` | 48px |
| `--space-6` | 64px |
| `--space-7` | 80px |
| `--space-8` | 96px |

---

## Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(0, 0, 0, 0.08)` |
| `--shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.08)` |
| `--shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.08)` |

---

## Transitions

| Token | Value |
|-------|-------|
| `--transition` | `0.35s cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-fast` | `0.25s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## Components

### Navbar
- Background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`
- Text: `rgba(255, 255, 255, 0.9)`
- CTA: Gold background, dark text
- Scrolled: Pill shape, same colors

### Cards
- Background: `linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)`
- Border: 1px `--border-subtle`
- Border radius: 12px
- Hover: `translateY(-4px)`, `--shadow-md`, `--border-accent`

### Buttons
- Primary: `--accent-gold` background
- Hover: `--accent-gold-dim`, `translateY(-1px)`
- Focus: 2px outline `--accent-gold`

### Form Inputs
- Padding: 1rem 24px
- Border radius: 8px
- Focus: 3px `--accent-gold-subtle` ring

---

## Breakpoints

| Name | Min Width |
|------|-----------|
| sm | 576px |
| md | 768px |
| lg | 992px |
| xl | 1200px |

---

## Accessibility

- **Contrast**: Body text meets WCAG AA (4.5:1); large text 3:1
- **Focus**: 2px `--accent-gold` outline, 2px offset
- **Reduced motion**: `prefers-reduced-motion: reduce` disables animations
- **Touch targets**: Minimum 44×44px for interactive elements
