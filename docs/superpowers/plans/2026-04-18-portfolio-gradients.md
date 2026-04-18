# Portfolio Gradients Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle, editorial sage-extension gradients across the portfolio site (hero glow, section fades, card hovers, accent moments, CTA glow) without changing the existing minimalist aesthetic.

**Architecture:** CSS-first — gradient stops as `@theme` tokens in `globals.css`, utility classes for static surfaces, one tiny server component (`<HeroGlow />`) for the animated radial orb. Pure CSS animation, no new JS. Dark mode dialed back to ~50% intensity.

**Tech Stack:** Next.js 14+ App Router, Tailwind v4, framer-motion (already in use), no new deps.

**Spec:** `docs/superpowers/specs/2026-04-18-portfolio-gradients-design.md`

**Note on testing:** This is purely visual/CSS work. There are no unit-testable behaviors. Each task ends with lint/build sanity checks plus a manual visual confirmation step. Do not invent unit tests for gradient appearance.

---

## File Structure

**Modify:**
- `app/globals.css` — add gradient tokens (light + dark) and 5 utility classes; extend reduced-motion block
- `components/sections/Hero.tsx` — render `<HeroGlow />`, apply `.gradient-text-accent` and bottom `.gradient-section-fade`
- `components/sections/CaseStudiesPreview.tsx` — apply `.gradient-card-hover` to card div
- `components/sections/CTA.tsx` — apply `.cta-glow` to both buttons

**Create:**
- `components/sections/HeroGlow.tsx` — server component, ~30 lines

**Out of scope:** `Fundamentals.tsx`, `Works.tsx`, `Quote.tsx`, case-study detail pages, theme picker, gradient borders, mesh backgrounds.

---

## Task 1: Add gradient tokens, utility classes, and keyframes to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add light-mode gradient tokens to the `@theme` block**

In `app/globals.css`, locate the `@theme {` block (starts at line 3). Inside it, after the existing `--shadow-glow` line and before the closing `}`, insert:

```css
  /* Gradients (sage-extension) */
  --color-gradient-glow-from: rgba(201, 210, 197, 0.55);
  --color-gradient-glow-via:  rgba(212, 221, 208, 0.25);
  --color-gradient-glow-to:   rgba(248, 249, 252, 0);

  --color-gradient-fade-from: rgba(248, 249, 252, 0);
  --color-gradient-fade-to:   rgba(201, 210, 197, 0.35);

  --color-gradient-accent-from: #5A6B55;
  --color-gradient-accent-to:   #1A1A1A;

  --color-gradient-card-from: rgba(201, 210, 197, 0.18);
  --color-gradient-card-to:   rgba(201, 210, 197, 0);
```

- [ ] **Step 2: Add dark-mode gradient tokens to the `.dark` block**

In `app/globals.css`, locate the `.dark {` block (starts at line 40). Inside it, after the existing `--shadow-glow` line and before the closing `}`, insert:

```css
  /* Gradients (~50% intensity vs light) */
  --color-gradient-glow-from: rgba(42, 51, 40, 0.45);
  --color-gradient-glow-via:  rgba(35, 42, 34, 0.20);
  --color-gradient-glow-to:   rgba(10, 10, 10, 0);

  --color-gradient-fade-from: rgba(10, 10, 10, 0);
  --color-gradient-fade-to:   rgba(42, 51, 40, 0.20);

  --color-gradient-accent-from: #A8B5A2;
  --color-gradient-accent-to:   #E5E5E5;

  --color-gradient-card-from: rgba(168, 181, 162, 0.10);
  --color-gradient-card-to:   rgba(168, 181, 162, 0);
```

- [ ] **Step 3: Add hero-orb keyframes and class**

In `app/globals.css`, append at the end of the file:

```css
/* ─── Gradient utilities ────────────────────────────────────────────────────── */

/* Hero animated orb — slow ambient drift */
@keyframes hero-orb-drift {
  0%   { transform: translate(-3%, -2%); }
  100% { transform: translate(3%, 2%); }
}

.hero-orb {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    ellipse 60% 55% at 50% 40%,
    var(--color-gradient-glow-from) 0%,
    var(--color-gradient-glow-via) 35%,
    var(--color-gradient-glow-to) 75%
  );
  animation: hero-orb-drift 25s ease-in-out infinite alternate;
  will-change: transform;
}
```

- [ ] **Step 4: Add the static gradient utility classes**

Append to `app/globals.css`:

```css
/* Section fade — softens the hard color seam between adjacent sections */
.gradient-section-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 96px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    var(--color-gradient-fade-from) 0%,
    var(--color-gradient-fade-to) 100%
  );
}

/* Card hover wash — appears on hover, pure CSS, no JS */
.gradient-card-hover {
  position: relative;
  isolation: isolate;
}

.gradient-card-hover::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    to bottom,
    var(--color-gradient-card-from) 0%,
    var(--color-gradient-card-to) 100%
  );
  opacity: 0;
  transition: opacity 150ms ease-out;
  pointer-events: none;
  z-index: -1;
}

.gradient-card-hover:hover::before {
  opacity: 1;
}

/* Text accent — single-word gradient via background-clip */
.gradient-text-accent {
  background: linear-gradient(
    180deg,
    var(--color-gradient-accent-from) 0%,
    var(--color-gradient-accent-to) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

/* CTA glow — subtle outer glow on hover */
.cta-glow {
  transition: box-shadow 250ms ease-out, opacity 200ms ease, border-color 300ms ease, background-color 300ms ease, color 300ms ease;
}

.cta-glow:hover {
  box-shadow: 0 0 24px var(--color-gradient-glow-from);
}
```

- [ ] **Step 5: Extend the reduced-motion block to pause the hero orb**

In `app/globals.css`, find the `@media (prefers-reduced-motion: reduce)` block (starts at line 265). Inside the block, after the existing `* { ... }` rule and before the closing `}`, add:

```css

  .hero-orb {
    animation: none !important;
  }
```

- [ ] **Step 6: Verify lint and build still pass**

Run:
```bash
npm run lint
npm run build
```
Expected: both succeed with no new errors. Existing lint baseline (zero) preserved.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css
git commit -m "Add gradient tokens, keyframes, and utility classes (sage extension)"
```

---

## Task 2: Create the HeroGlow server component

**Files:**
- Create: `components/sections/HeroGlow.tsx`

- [ ] **Step 1: Create the file**

Create `components/sections/HeroGlow.tsx` with exactly this content:

```tsx
/**
 * Animated radial-gradient orb that sits behind the hero content.
 * Server component — animation is pure CSS (`.hero-orb` in globals.css).
 * `prefers-reduced-motion` pauses the drift via the global media query.
 */
export function HeroGlow() {
  return <div className="hero-orb" aria-hidden="true" />;
}
```

- [ ] **Step 2: Verify lint and typecheck pass**

Run:
```bash
npm run lint
```
Expected: passes. (No need to run build yet — Hero doesn't import HeroGlow until Task 3.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroGlow.tsx
git commit -m "Add HeroGlow server component for animated hero orb"
```

---

## Task 3: Render HeroGlow inside Hero and apply text accent + section fade

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Add the import for HeroGlow**

In `components/sections/Hero.tsx`, after the existing `import { CountUp } from '@/components/ui/CountUp';` line (line 6), add:

```tsx
import { HeroGlow } from '@/components/sections/HeroGlow';
```

- [ ] **Step 2: Render HeroGlow inside the section**

In the same file, locate the opening `<section ...>` tag (starts line 18). Immediately after it (before the existing `<motion.div ...>` at line 22), insert:

```tsx
      <HeroGlow />
```

The result should look like:

```tsx
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-20 overflow-hidden bg-bg-primary"
    >
      <HeroGlow />
      <motion.div
        style={{ y, opacity }}
        className="max-w-2xl text-center z-10 flex flex-col items-center"
      >
```

The existing content's `z-10` already keeps it above the orb's `z-0`.

- [ ] **Step 3: Apply gradient-text-accent to the "zero to live." span**

In the same file, locate line 44:

```tsx
          from <span className="font-display font-bold uppercase not-italic tracking-tight">zero to live.</span>
```

Replace it with:

```tsx
          from <span className="font-display font-bold uppercase not-italic tracking-tight gradient-text-accent">zero to live.</span>
```

- [ ] **Step 4: Add the bottom section-fade**

In the same file, locate the closing `</section>` tag (line 138). Immediately before it (after the closing `</motion.div>` of the scroll indicator at line 137), insert:

```tsx
      <div className="gradient-section-fade" aria-hidden="true" />
```

- [ ] **Step 5: Verify build passes**

Run:
```bash
npm run build
```
Expected: build succeeds with no new errors.

- [ ] **Step 6: Visual check — hero**

Run `npm run dev` (if not already running). Open `http://localhost:3000`. Confirm:
- A soft sage glow is visible behind the headline (not bright, not dominating).
- The orb drifts slowly — watch for ~10 seconds, you should see subtle movement.
- The words "zero to live." have a sage-to-black vertical gradient (light mode) or sage-to-white (dark mode).
- The bottom edge of the hero fades softly into the next section's sage background instead of cutting hard.
- Toggle to dark mode (theme switcher in header) — confirm the same effects appear with dialed-back intensity.

- [ ] **Step 7: Reduced-motion check**

In Chrome DevTools, open Rendering tab → set "Emulate CSS media feature prefers-reduced-motion" to `reduce`. Reload the page. The orb should be visible but frozen (not drifting).

- [ ] **Step 8: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "Hero: add animated glow, gradient accent on 'zero to live', bottom fade"
```

---

## Task 4: Apply gradient-card-hover to case study preview cards

**Files:**
- Modify: `components/sections/CaseStudiesPreview.tsx`

- [ ] **Step 1: Add the class to the card div**

In `components/sections/CaseStudiesPreview.tsx`, locate the inner card div at line 91:

```tsx
                <div className="bg-bg-primary border border-border-default rounded-lg p-6 md:p-7 hover:border-border-hover transition-colors h-full flex flex-col">
```

Replace it with:

```tsx
                <div className="gradient-card-hover bg-bg-primary border border-border-default rounded-lg p-6 md:p-7 hover:border-border-hover transition-colors h-full flex flex-col">
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Visual check — cards**

In the browser at `http://localhost:3000`, scroll down to the "Case studies" section. Hover over each of the three cards. Confirm:
- A soft warm sage wash appears inside the card on hover (top-down gradient).
- The wash fades in over ~150ms (smooth, not jarring).
- The wash fades out when the mouse leaves.
- Card border still changes color on hover (existing behavior preserved).
- In dark mode, the wash is dimmer but still perceptible.

- [ ] **Step 4: Commit**

```bash
git add components/sections/CaseStudiesPreview.tsx
git commit -m "CaseStudiesPreview: gradient hover wash on preview cards"
```

---

## Task 5: Make section markers use the gradient

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update the .section-marker CSS rule to use background-clip gradient**

In `app/globals.css`, locate the `.section-marker` rule (starts at line 166):

```css
.section-marker {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
```

Replace it with:

```css
.section-marker {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: linear-gradient(
    180deg,
    var(--color-gradient-accent-from) 0%,
    var(--color-text-muted) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

The plain `color:` line stays as a fallback for browsers that don't support `background-clip: text` (rare; all modern browsers do).

- [ ] **Step 2: Verify build passes**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Visual check — markers**

In the browser at `http://localhost:3000`, look at the section labels: `[ PRODUCT MANAGER ]` in the hero, `[ 02 ] [ APPROACH ]` in Fundamentals, `[ 05 ] [ RESEARCH ]` above Case Studies. Confirm:
- They appear slightly darker/sage at the top, fading to the existing muted gray at the bottom — barely perceptible but adds depth.
- Same effect in dark mode (lighter sage at top, fading to dark muted).
- Layout is unchanged.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "section-marker: vertical sage→muted gradient on text"
```

---

## Task 6: Apply CTA glow to home CTA buttons

**Files:**
- Modify: `components/sections/CTA.tsx`

- [ ] **Step 1: Add `.cta-glow` to the primary button**

In `components/sections/CTA.tsx`, locate the `<Link href="/contact" ...>` (line 41-46). Replace its `className` attribute:

```tsx
              <Link
                href="/contact"
                className="cta-glow inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-bg-primary rounded-full text-xs uppercase tracking-widest font-medium hover:opacity-80"
              >
```

(Removed the original `transition-opacity` because `.cta-glow` already provides a transition that covers `opacity`.)

- [ ] **Step 2: Add `.cta-glow` to the secondary button**

In the same file, locate the `<button onClick={() => setResumeOpen(true)} ...>` (line 47-53). Replace its `className`:

```tsx
              <button
                onClick={() => setResumeOpen(true)}
                className="cta-glow inline-flex items-center gap-2 px-6 py-3 border border-border-default rounded-full text-xs uppercase tracking-widest font-medium hover:border-text-primary cursor-pointer"
              >
```

(Removed `transition-colors` for the same reason.)

- [ ] **Step 3: Verify build passes**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Visual check — CTAs**

In the browser at `http://localhost:3000`, scroll to the bottom CTA section. Hover over both "Get in touch" and "View resume" buttons. Confirm:
- A soft sage glow appears around each button on hover.
- The existing hover behaviors (opacity dim on primary, border darken on secondary) still work.
- Glow fades in over ~250ms (smooth).
- Same effect in dark mode (slightly dimmer per the dialed-back tokens).

- [ ] **Step 5: Commit**

```bash
git add components/sections/CTA.tsx
git commit -m "CTA: subtle sage glow on hover for primary + secondary buttons"
```

---

## Task 7: Final cross-page verification

**Files:** none modified — verification only.

- [ ] **Step 1: Lint + build sanity**

Run:
```bash
npm run lint
npm run build
```
Both must pass with no new errors. If either fails, do NOT proceed — investigate and fix.

- [ ] **Step 2: Walk through every page in light mode**

Run `npm run dev`. In the browser at `http://localhost:3000`, visit each page and scroll through:
- `/` — confirm hero glow, drifting orb, accent words, section fade, card hovers, CTA glow.
- `/work` — confirm the page renders (no gradient changes here, but tokens shouldn't break anything).
- `/casestudies` — confirm renders.
- `/about` — confirm renders.
- `/contact` — confirm renders.
- `/projects` — confirm renders.
- `/resume` — confirm renders.

For each: no console errors, no layout shifts, no broken images.

- [ ] **Step 3: Walk through every page in dark mode**

Toggle to dark mode via the header switcher. Repeat the page walkthrough. Confirm gradients are present but visibly dialed back compared to light mode.

- [ ] **Step 4: Header / ResumeModal regression check**

On `/`, click "View resume" — modal should open over everything. Header should remain readable. No gradients should sit *above* content.

- [ ] **Step 5: Reduced-motion check**

In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" set to `reduce`. Reload `/`. Hero orb should be frozen in place but still visible. All other gradients still appear.

- [ ] **Step 6: Performance sanity**

Open DevTools → Performance → record 5 seconds on the home page (scrolling slowly). Confirm:
- No long tasks introduced by gradients.
- Hero orb animation only triggers `transform` (not layout/paint). You can verify this by enabling DevTools → Rendering → "Layer borders" and confirming the orb is on its own composited layer.

- [ ] **Step 7: Final commit (if any cleanup happened) and report**

If everything passes with no further changes needed, no final commit is required. Report completion. If any tweaks were needed during verification, commit them with a message describing the fix.

---

## Done criteria

- All 7 tasks committed.
- `npm run lint` and `npm run build` both pass.
- Visual walkthrough in both light and dark mode confirms all 5 surface treatments are present and feel "subtle & editorial" (not loud).
- Reduced-motion freezes the hero orb without removing its visual presence.
- No console errors, no layout regressions, no impact on existing Header/ResumeModal behavior.
