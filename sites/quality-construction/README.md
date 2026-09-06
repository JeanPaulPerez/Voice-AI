# Quality Construction — roofing landing page

A single self-contained `index.html` plus `assets/`. No build step. Open it over any static
server (it fetches 112 WebP frames, so `file://` is not enough in Chrome):

```bash
cd sites/quality-construction
npx http-server -p 8080 .    # or: python3 -m http.server 8080
```

## Concept

One house, one camera, never moves. A craftsman home seen from across the street goes from
storm-torn to finished as you scroll, and the final frame is you standing on the porch under
the new roof at golden hour. Every other section reuses that same house so the whole page
feels like one place you already own.

Scroll beats (pinned 450 vh desktop / 250 vh mobile, 112 / 63 frames):

| % | Beat | Day |
|---|---|---|
| 0 | This is your roof today (tarp, torn shingles, storm sky) | 0 |
| 13.5 | Inspector on the roof within 24 hours | 1 |
| 28 | Tear-off, dumpster on the driveway, tarps on the beds | 3 |
| 42.5 | Bare deck, soft spots replaced | 3 |
| 57 | Underlayment, ice-and-water, drip edge | 3 |
| 71 | Shingles going on, row by row | 3 |
| 85.6 | Finished roof, magnetic sweep of the lawn | 4 |
| 100 | Golden hour, lights on, you're on the porch | 4 |

## Reference patterns used

- **Refero (roofing)** — the pattern that works in production roofing UIs is a phone number and
  a "free inspection" CTA that never leave the screen, plus a before/after slider as the main
  proof block. Kept both; pushed the slider further by shooting before and after from a locked
  camera so the reveal is pixel-aligned, and made the CTA a sticky bar on mobile.
- **motion.dev** — spring physics for the magnetic buttons and the slider's first "come drag
  me" wobble (`Motion.animate` with `type: 'spring'`), instead of eased tweens.
- **animejs.com** — SVG line drawing (`svg.createDrawable`) for the process rail and the
  staggered step numerals; the line draws itself on entry, the way the docs' path demos do.
- **Apple-style canvas sequences** — scroll-scrubbed frames on `<canvas>`, DPR-aware, cover
  fit, redraw only on frame change, nearest-loaded-frame fallback while the sequence streams
  in, so the curtain lifts after the first 14 frames rather than after 12 MB.

## Design system

| Token | Value | Pulled from |
|---|---|---|
| `--bg` / `--bg-2` / `--surface` | `#121110` / `#1a1917` / `#221f1c` | charcoal shingle granules |
| `--ink` / `--ink-2` / `--ink-3` | `#f3ebdd` / 68 % / 42 % | cream siding |
| `--amber` / `--amber-2` | `#e2a45b` / `#f0c285` | golden-hour light on the roof |
| `--sky` | `#7fa6c9` | evening sky (used sparingly) |
| Display | Fraunces (variable: opsz 9–144, SOFT 0–100), italics in amber for the one word that matters | |
| Body | Instrument Sans 400 / 500 / 600 | |
| Type scale | `clamp()` fluid: eyebrow 11–13 px, body 16–18, lead 18–22, h2 36–80, h1 44–124, numerals 64–148 | |
| Spacing | `--s1…--s5` = 8–12 / 16–24 / 28–48 / 56–112 / 96–200 px, `--gutter` 20–64 px | |
| Motion | `expo.out` entrances 0.8–1.25 s, linear scrub for the sequence, springs for interactions, `prefers-reduced-motion` → static payoff + stacked beats | |

## Stack

GSAP 3.13 (ScrollTrigger, SplitText, Flip, DrawSVG) · Lenis · Anime.js 4 · Motion 12 — all
from CDN, pinned. Three.js was not needed: the depth comes from real photography.

## Before launch

See `ASSETS.md` → "Placeholders to confirm": reviews, stats, certifications, phone, license,
form endpoint, absolute `og:image` URL.
