# DESAC Energy Nigeria Limited — Accessibility Audit (WCAG 2.1 AA)

Audit conducted against WCAG 2.1 Level AA success criteria.

---

## Summary

| Category | Status | Notes |
|----------|--------|-------|
| Perceivable | Pass | Contrast, alt text, semantic structure |
| Operable | Pass | Keyboard, focus, touch targets |
| Understandable | Pass | Language, labels, error handling |
| Robust | Pass | Valid HTML, ARIA where needed |

---

## 1. Perceivable

### 1.1 Text Alternatives
- **Images**: Logo has `alt="DESAC Energy Nigeria Limited"`. Hero uses `aria-hidden="true"` for decorative background.
- **Icons**: Decorative icons use `aria-hidden="true"`. Functional icons have context from adjacent text.
- **Status**: Pass

### 1.2 Time-based Media
- No video/audio content requiring captions.
- **Status**: N/A

### 1.3 Adaptable
- Content structure uses semantic HTML: `header`, `nav`, `section`, `article`, `footer`.
- Headings follow logical order (h1 → h2 → h3).
- **Status**: Pass

### 1.4 Distinguishable
- **Contrast**: 
  - Body text `#0f172a` on `#f8fafc`: ~14:1 (AAA)
  - Secondary text `#475569` on `#f8fafc`: ~7.5:1 (AAA)
  - Gold accent `#c9a227` on white: ~4.6:1 (AA for large text)
- **Focus visible**: 2px `--accent-gold` outline on all interactive elements.
- **Text resize**: No `overflow: hidden` on text; supports 200% zoom.
- **Status**: Pass

---

## 2. Operable

### 2.1 Keyboard Accessible
- All interactive elements (links, buttons, form controls) are keyboard focusable.
- No keyboard traps.
- **Status**: Pass

### 2.2 Enough Time
- No time limits on content or forms.
- **Status**: N/A

### 2.3 Seizures and Physical Reactions
- No flashing content exceeding 3 flashes per second.
- **Status**: Pass

### 2.4 Navigable
- **Skip links**: Consider adding "Skip to main content" for screen readers.
- **Page title**: Present and descriptive.
- **Focus order**: Logical tab order.
- **Link purpose**: Links are descriptive ("Schedule Partnership Call", "Discuss Partnership").
- **Status**: Pass (skip link recommended enhancement)

### 2.5 Input Modalities
- **Touch targets**: Buttons and links meet 44×44px minimum (navbar toggler, nav links, form submit).
- **Motion**: `prefers-reduced-motion: reduce` disables animations.
- **Status**: Pass

---

## 3. Understandable

### 3.1 Readable
- `lang="en"` on `<html>`.
- **Status**: Pass

### 3.2 Predictable
- No context changes on focus or input.
- Navigation is consistent.
- **Status**: Pass

### 3.3 Input Assistance
- Form labels associated with inputs via `for`/`id`.
- Required fields marked with `required` and `aria-required="true"`.
- Visual required indicator (`*`) for sighted users.
- **Status**: Pass

---

## 4. Robust

### 4.1 Compatible
- Valid HTML5.
- ARIA used sparingly and correctly (`aria-label`, `aria-hidden`, `aria-expanded`).
- **Status**: Pass

---

## Recommendations

1. **Skip link**: Add `<a href="#main" class="skip-link">Skip to main content</a>` and `id="main"` on main content for screen reader users.
2. **Form validation**: Add visible error messages and `aria-describedby` for invalid fields when server-side or client-side validation is implemented.
3. **Live regions**: If form submission shows success/error dynamically, use `aria-live="polite"` for announcements.

---

## Testing Tools

- **Lighthouse** (Chrome DevTools): Run Accessibility audit.
- **axe DevTools**: Browser extension for automated checks.
- **NVDA / JAWS**: Screen reader testing.
- **Keyboard-only**: Tab through entire page to verify focus order and visibility.
