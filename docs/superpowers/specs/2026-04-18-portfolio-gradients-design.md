# Portfolio Gradients — Design Spec

**Date:** 2026-04-18
**Author:** Chetan + Claude
**Status:** Draft for review

## Goal

Add subtle, editorial gradient treatments across the portfolio site to make it
feel more visually appealing without compromising the existing minimalist /
recruiter-friendly aesthetic.

## Direction (locked decisions)

- **Style:** Subtle & editorial — barely-there washes, accent moments. Not bold.
- **Surfaces:** Balanced across all surfaces — hero, section transitions, cards, accents, CTAs.
- **Palette:** Extend the existing sage palette. No new hues introduced.
- **Motion:** Hero orb drifts ambiently; card hover gradient on interaction. Everything else static.
- **Dark mode:** Dialed back to ~50% intensity vs light mode (gradients read stronger on dark).

## Architecture

- `app/globals.css` — add `@theme` tokens for sage gradient stops (light + dark
  variants) and four utility classes (`.gradient-section-fade`,
  `.gradient-card-hover`, `.gradient-text-accent`, `.gradient-marker`).
- `components/HeroGlow.tsx` *(new, ~40 lines)* — server component that renders
  the animated radial-gradient orb behind the hero. Animation is pure CSS
  `@keyframes`; reduced-motion handled by the existing global media query.
- `components/Hero.tsx` *(existing)* — replace the static `.orb-gradient` div
  with `<HeroGlow />`.
- Page section wrappers (Hero, Fundamentals) — apply `.gradient-section-fade`
  on the bottom edge to soften the hard color jump between sections.
- Case study preview cards (`.card-minimal`) — extend with a hover overlay
  using `.gradient-card-hover`. No markup changes; class addition only.
- Primary CTA buttons — soft outer glow on hover via existing button classes.

No new dependencies. No build step changes. Server-renderable.

## Tokens

Added to `globals.css` under `@theme` (light) and `.dark` (dark):

```css
/* Light mode */
--color-gradient-glow-from: rgba(201, 210, 197, 0.55);  /* sage @ 55% */
--color-gradient-glow-via:  rgba(212, 221, 208, 0.25);  /* tertiary @ 25% */
--color-gradient-glow-to:   rgba(248, 249, 252, 0);     /* bg-primary @ 0 */

--color-gradient-fade-from: rgba(248, 249, 252, 0);
--color-gradient-fade-to:   rgba(201, 210, 197, 0.35);

--color-gradient-accent-from: #5A6B55;                  /* deep sage */
--color-gradient-accent-to:   #1A1A1A;

/* Dark mode (~50% intensity) */
--color-gradient-glow-from: rgba(42, 51, 40, 0.45);
--color-gradient-glow-via:  rgba(35, 42, 34, 0.20);
--color-gradient-glow-to:   rgba(10, 10, 10, 0);

--color-gradient-fade-from: rgba(10, 10, 10, 0);
--color-gradient-fade-to:   rgba(42, 51, 40, 0.20);

--color-gradient-accent-from: #A8B5A2;
--color-gradient-accent-to:   #E5E5E5;
```

All values derived from existing palette colors. Dark-mode alphas roughly
half the light-mode values to keep perceived intensity equal.

## Surface treatments

1. **Hero background**
   `<HeroGlow />` renders a single ~700px radial-gradient orb positioned ~40%
   from the top, behind the headline, using `--color-gradient-glow-*`.
   Replaces the current static `.orb-gradient` div.

2. **Section transitions**
   `.gradient-section-fade` = a 96px-tall pseudo-element on the bottom of
   Hero and Fundamentals sections that fades from `bg-primary` →
   neighboring section bg. Linear, no animation. Smooths the hard seams
   where sections currently butt against each other.

3. **Case-study preview cards**
   Extend `.card-minimal:hover` with a soft top-to-bottom gradient overlay
   (`fade-from` → `fade-to`, low alpha). Currently hover only changes
   border-color; this adds a warm wash on hover. ~150ms ease.

4. **Accent moments** (two tiny touches)
   - `.gradient-text-accent` — `background-clip: text` on the **single most
     important word** in the hero headline (e.g., "Product"), using
     `accent-from → accent-to`. One headline only, not everywhere.
   - `.gradient-marker` — replace the flat `--color-text-muted` on
     `.section-marker` ([01/05] etc.) with a vertical
     `accent-from → text-muted` gradient. Almost imperceptible but adds depth.

5. **CTAs (subtle button glow)**
   Primary CTA buttons get a soft outer glow on hover using
   `--color-gradient-glow-from`. No gradient *fill* on the button itself —
   that would clash with the minimal aesthetic.

**Explicitly NOT doing:** gradient borders on cards, animated mesh
backgrounds, gradient fills on body buttons, gradient on every headline.
Those would push past "subtle & editorial."

## Motion

**Hero orb drift** (only ambient motion):
- 25-second `@keyframes` loop, `ease-in-out`, infinite alternate.
- Translates the orb ~6% on X and ~4% on Y around its center.
- `transform`-only (GPU-cheap, no layout/paint).
- Animation declaration lives inside `<HeroGlow />`.

**Card hover gradient:**
- 150ms `ease-out` opacity fade on the overlay (0 → 1).
- Pure CSS `:hover`. No JS, no state.

**`prefers-reduced-motion: reduce`:**
- Hero orb: animation paused at starting position (still visible, static).
  Handled by the existing global reduce-motion media query in `globals.css`.
- Card hover: existing reduce-motion rule clamps `transition-duration` to
  `0.01ms`. Gradient still appears on hover (it's a state, not a motion),
  it just appears instantly.

No JS for any of this. `<HeroGlow />` is a server component. Zero
hydration cost, SSR-clean.

## Verification

- **Visual check** — `npm run dev`, walk through `/`, `/work`,
  `/casestudies`, `/about`, `/contact` in both light and dark mode.
  Confirm: hero glow visible but doesn't dominate; section fades smooth
  the seams (no hard color jumps); card hover wash reads on hover; accent
  word + section markers carry the gradient; CTA glow appears on hover.
- **Motion check** — confirm orb drifts continuously and smoothly. Toggle
  `prefers-reduced-motion` in DevTools → Rendering → confirm orb freezes
  mid-position.
- **Cross-page consistency** — tokens defined once in `globals.css`;
  spot-check one page per mode confirms the whole site picks them up.
- **No regressions** — `npm run lint` stays at zero. `npm run build`
  succeeds. Header/ResumeModal z-index from the recent fix still works
  (gradients sit *behind* content, never above).
- **Performance sanity** — only animated property is `transform`. No new
  JS bundle weight.

## Out of scope

- Theme picker / user-controllable gradient intensity.
- Gradient treatments on case-study detail pages (this spec covers hub
  pages only — detail pages stay as-is for now).
- Replacing the existing sage secondary palette.
- Any change to the noise overlay, typography, or layout.
