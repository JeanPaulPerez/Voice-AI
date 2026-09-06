# MMLR landing page — strategy and design record

Date: 6 September 2026. Market: New York. Deliverable: `landing/index.html` (static, no build step).

This document records the decisions behind the page so a reviewer can see _why_ each
element exists. Sections 11–13 (critiques and refinement) are appended after the first build.

---

## 0. Working assumptions (flagged for the client)

| Brief field                             | Value given   | Assumption used                                                                                                                                                                                                                                  |
| --------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Website / brand                         | none          | No existing identity. Wordmark and palette designed here.                                                                                                                                                                                        |
| Technology                              | placeholder   | Static HTML + CSS + vanilla JS. One page does not need a framework; zero dependencies keeps Core Web Vitals trivially green and the page can be dropped onto any host.                                                                           |
| Conversion goal                         | "750,000 usd" | Read as the entry price of the residences MMLR represents. The page's conversion is a **qualified private-viewing request** from a buyer with a budget from $750,000. The budget selector in the form starts at that floor so it self-qualifies. |
| Listings, team, license, address, phone | none          | Marked as placeholders in the HTML with `data-placeholder` and listed in `landing/README.md`. No testimonials, counts, awards or stats were invented.                                                                                            |

---

## 1. Research

### 1.1 Who the buyer is and what they care about

Sources: Bloomberg (Jan 2026) on privacy as the leading luxury theme; Olshan Realty weekly
$4M+ contract reports via The Real Deal / CNBC (2026); Purllow NYC luxury guide (2026);
OwnLuxuryHomes on off-market deals (2026); wpresidence critique of ten luxury brokerage sites (2026).

- **Discretion is the primary status signal in 2026.** Buyers and sellers at the top of the
  market increasingly transact without a public listing. Sellers go private for privacy,
  price testing and speed. Buyers therefore value an advisor who _sees_ inventory they cannot.
- **They are time-poor and crowd-averse.** Open houses, portal browsing and agent chasing are
  the friction. They want a short brief, a short list, and viewings on their schedule.
- **NYC-specific friction they already know about:** co-op boards (full financial disclosure,
  60–90 days), condo vs co-op choice, mansion tax from $1M with scaling brackets, closing
  costs of roughly 2–4%, and the 2026 pied-à-terre tax debate for non-primary residences.
  A page that speaks to these fluently earns credibility that stock imagery cannot.
- **Fears:** being sold to; overpaying without comparables on a private deal; their search
  becoming known; wasting a trip; a broker who "represents everyone".
- **Purchase motivations:** a specific home type (townhouse with garden, full-floor, terrace,
  park view), a specific neighborhood, and a process that respects them.
- **What builds trust:** specificity (real addresses, real details), fluency with process,
  a named human, a licensing footprint (NY brokers must display Fair Housing notice and
  Standard Operating Procedures), and restraint in tone.
- **What creates skepticism:** "elevated lifestyle", "white-glove", "unparalleled",
  fake review widgets, gold-and-black maximalism, and search bars that pretend to be portals.

### 1.2 Competitor positioning (Serhant, Corcoran, Compass, Sotheby's, Douglas Elliman)

- Large brokerages open with a **search bar**; they are portals, not advisors. For a boutique
  with a small book, a search bar would expose thinness and invite bounce.
- Copy relies on the same vocabulary: _transformative, elevated, luxury living, distinctive lifestyles_.
- Design has shifted from black/gold to **warm restraint** (cream, olive, charcoal) with
  editorial typography. Restraint is the new norm, so restraint alone no longer differentiates.
- Best-performing pattern from the critique: **gating private inventory behind a conversation**
  turns a click into an intent-qualified lead.
- What competitors do poorly: mobile weight (video-heavy heroes), dense navigation, no
  explanation of what actually happens after you enquire, and no honest NYC process content.

### 1.3 Differentiation opportunities

1. Position MMLR as a **private brief, not a portal**: you tell us, we show you.
2. Use **dossier / ledger language** (index numbers, hairlines, specifications) borrowed from
   architecture monographs and private banking rather than lifestyle advertising.
3. Put **process fluency** on the page (co-op vs condo, boards, tax, timing). Nobody else does.
4. Use **one chromatic accent** on a stone-and-ink page, drawn from the city's own materials
   rather than from gold (the sector default) or terracotta (the generated-page default).

---

## 2. Reference analysis (principles, not visuals)

References examined: Serhant, the wpresidence set (Carolwood, Village Properties, Sotheby's,
Jade Mills, Kumara Wilcoxon), plus non-industry references from memory of editorial and
architecture sites (Aesop, Apparatus Studio, Kinfolk, Frieze, private-bank annual reports).

| Learn from                                                                                               | Do not copy                                                                |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Carolwood: private inventory as the conversion point                                                     | Third-party network logos as trust badges (MMLR has none to show honestly) |
| Village Properties: "window frame" image treatment, the browser as an opening                            | Full-bleed video hero (mobile weight, and every luxury site has one)       |
| Kumara Wilcoxon: warm restrained palette, explains the process                                           | Cream + gold pairing                                                       |
| Sotheby's: specification density on listings                                                             | Portal search bar, multi-currency chrome                                   |
| Editorial/monograph design: index numbers, hairlines, asymmetric grids, generous but _uneven_ whitespace | Centered everything, identical section spacing                             |
| Private-bank reports: tabular data, small caps labels, restraint                                         | Generic "our values" blocks                                                |

Synthesis: an **editorial dossier** — a page that reads like a privately circulated brief on
a handful of homes, with one clear ask at the top and bottom.

---

## 3. CRO strategy

1. **Who arrives:** a buyer (or their family office / assistant / attorney) with a budget of
   $750K–$20M+, arriving from a referral, a paid search on "private real estate broker New York",
   a social profile, or a business card. Some are international.
2. **What just happened:** a conversation ("you should talk to MMLR"), a listing seen elsewhere,
   or an Instagram tap. They are checking whether MMLR is real, serious, and worth ten minutes.
3. **They already know:** they want to buy in New York, roughly what and roughly where.
4. **They do not know:** what MMLR has, whether MMLR handles their price band, what enquiring
   commits them to, who they will talk to, whether it is confidential.
5. **Primary intent:** evaluate, then make contact if the fit is plausible.
6. **Biggest objection:** "Another broker who will spam me and show me everything on StreetEasy."
7. **Must believe before converting:** MMLR has real, relevant homes; enquiring is low-commitment
   and private; the people know New York's mechanics.
8. **Proof that reduces uncertainty:** specific residences with specifications; a written
   process; NYC-specific answers; a named principal; a licensing footprint.
9. **Friction:** long forms, mandatory phone, vague CTAs, no visible price band, no reply timing.
10. **First five seconds must say:** exclusive New York homes, shown privately, start with a brief.

### Conversion hierarchy

- **Primary CTA:** "Request a private viewing" → the brief form (anchor `#brief`). Appears in
  the nav, the hero, after the residences, and in the mobile sticky bar.
- **Secondary CTA:** "See current residences" (in-page scroll). On each residence: "Request details"
  which pre-fills the brief with that residence.
- **Primary value proposition:** exclusive New York residences, shown privately, starting from a brief.
- **Supporting propositions:** a small, curated book; viewings on your schedule; fluency with
  co-ops, boards, tax and closing; confidentiality by default.
- **Trust mechanisms:** specificity, process, named human, license/Fair Housing/SOP footer,
  a stated reply time (a promise the client must be able to keep — placeholder: one business day).
- **Objection handling:** the "Before you ask" section (five real questions).
- **Proof strategy:** no fabricated social proof. Real residences and real process content only.
  Slots are marked for the client to add references _if_ they can be verified.
- **Form strategy:** three required fields (name, email, what you are looking for), budget as a
  select starting at $750K, phone optional, timing optional. Success state confirms reply timing.
- **CTA repetition:** four placements, same verb each time, never more than one per viewport.

---

## 4. Information architecture

| #   | Section             | Purpose                             | User question                             | CRO function                       | Content                                                                            | Visual idea                                                                     |
| --- | ------------------- | ----------------------------------- | ----------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 0   | Header              | Orientation                         | Where am I?                               | Persistent CTA                     | Wordmark, phone, "Request a viewing"                                               | Hairline bar, no menu (one page)                                                |
| 1   | Hero                | Relevance and value in five seconds | Am I in the right place?                  | Reduce bounce, set intent          | Headline, one paragraph, primary + secondary CTA, one photograph                   | Asymmetric 7/5 split, tall image offset below the baseline, index label         |
| 2   | Residences          | The product itself                  | Do they have what I want?                 | Proof by specificity, per-item CTA | 4 residences: type, neighborhood, spec table, status, "Request details"            | Irregular editorial grid: one large, two medium, one wide; hairline spec tables |
| 3   | The brief (process) | Remove fear of what happens next    | What am I committing to?                  | Friction removal                   | Four numbered steps in MMLR's words                                                | Dark ink band, large numerals, two-column rhythm                                |
| 4   | Before you ask      | Handle objections                   | Confidential? Price floor? Remote? Co-op? | Objection handling                 | Five Q&A pairs with true NYC content                                               | Editorial Q&A list with hairlines, no accordion                                 |
| 5   | The people          | Human accountability                | Who will I talk to?                       | Trust                              | Principal name/role placeholder, short statement of what MMLR does and does not do | Portrait slot + statement, off-grid                                             |
| 6   | Brief form          | Convert                             | How do I start?                           | Conversion                         | 3 required + 3 optional fields, phone/email alternatives, reply-time promise       | Ledger-style form, full-width underlined inputs                                 |
| 7   | Footer              | Legal credibility                   | Are they licensed?                        | Trust                              | Address, license, Fair Housing notice, SOP link, privacy                           | Small type, hairlines                                                           |

Removed on purpose: testimonials (none verifiable), stats (none), neighborhood guide (no
inventory depth to support it yet), "why choose us" grid, blog, search bar, map.

---

## 5. Creative direction

Three directions were developed and compared:

|                 | A. Private dossier                                                                 | B. Dusk Manhattan                                                      | C. Gallery hang                                                          |
| --------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Concept         | A privately circulated brief on a few homes. Paper, ink, hairlines, index numbers. | Cinematic dark page, full-bleed dusk video, amber light, gold accents. | White cube. Tiny type, huge whitespace, images as artworks with plaques. |
| Brand fit       | High: premium, modern, discreet                                                    | Medium: premium but dated                                              | Medium: premium, cold                                                    |
| Differentiation | High in this market                                                                | Low: the sector default                                                | Medium                                                                   |
| Readability     | High                                                                               | Medium (light on dark at length)                                       | Low (too sparse)                                                         |
| Credibility     | High: specification-led                                                            | Medium: mood-led                                                       | Medium                                                                   |
| Conversion      | High: content supports the ask                                                     | Medium                                                                 | Low: little information                                                  |

**Selected: A, Private dossier**, with C's image discipline (images framed, never bleeding into chaos).

- **Visual personality:** quiet, precise, editorial. Nothing shines.
- **Typography:** Bodoni Moda for display, the high-contrast Didone that has set New York's
  magazines for a century (Harper's Bazaar, Vogue): a reason specific to this city, not a
  luxury-template default. Hanken Grotesk for everything else, a quiet grotesk that does not
  compete. Both are self-hosted WOFF2 with `font-display: swap`.
- **Type scale (desktop):** 12 / 14 / 16 / 20 / 28 / 44 / 72 / 104 px, fluid via `clamp()`.
  Labels are 12px uppercase tracked +0.12em.
- **Grid:** 12 columns, 24px gutters, max content width 1440px, outer margin 5vw (min 20px).
- **Spacing system:** 8px base; section paddings vary on purpose (96 / 128 / 160 / 64) to
  give rhythm rather than a metronome.
- **Color hierarchy:** limestone `#ECEBE5` (the ground; the stone of Park Avenue and the
  Upper East Side, not a warm cream), ink `#141410`, stone `#6F716A` for secondary text,
  hairline `#CDCDC4`, and verdigris `#3D7360` as the single accent, the patina of the city's
  copper cornices and roofs. On the ink band the accent lightens to `#8FBBA6` so it reads.
  Used only for: the availability marker, the primary CTA hover, the process numerals. One
  dark band (ink) for section 3, one stone band (`#DFDDD4`) for section 5.
- **Border philosophy:** 1px hairlines are the structural device (ledger rules). No boxes, no cards.
- **Radius:** 0. Architecture does not have rounded corners.
- **Image treatment:** photographs sit in fixed-ratio frames, slightly desaturated with a
  warm tint, revealed on scroll with a clip-path wipe. Captions in label style.
- **Iconography:** none. Arrows are typographic (→, ↓).
- **Buttons:** primary = solid ink rectangle, paper text, 14px tracked; secondary = text with
  1px underline that thickens on hover. No pills, no shadows.
- **Navigation:** single page; header is a hairline bar that stays fixed on scroll and turns
  paper-opaque after the hero. Anchor links only.
- **Motion language:** slow (600–900ms), eased (`cubic-bezier(.2,.7,.2,1)`), one-time reveals.
  Hero headline lines rise in sequence. Images wipe. Hover on residences scales the image 2%.
  Everything respects `prefers-reduced-motion`.
- **Interaction philosophy:** feedback only where it helps: hover states, form validation
  inline, success state in place. No cursors, no parallax, no marquee.
- **Mobile behavior:** hero image moves below the headline at 4:5; residences stack; process
  numerals shrink; sticky bottom CTA appears after the hero leaves the viewport and hides when
  the form is on screen.

### Anti-AI checklist applied

No cards, no pills, no gradient text, no glassmorphism, no floating badges, no 3-column
feature grid, no alternating image/text rows, no fake logos, no fake numbers, no urgency, no
icons, no centered stacks. Sections have different densities. The grid is broken on purpose in
the hero and in "The people".

---

## 6. Resource discovery

- **Higgsfield (nano_banana_pro, 2 credits/image):** used for photography of residences and
  the hero. Prompts specify real New York typologies (Federal townhouse, cast-iron loft, prewar
  library, terrace at blue hour) and an architectural-photography look so the images sit
  inside the dossier rather than looking like renders. Outputs are downscaled and served as
  WebP with JPEG fallback, sized with `srcset`.
- **anime.js / motion.dev:** evaluated. The page needs staggered reveals and a clip-path wipe;
  both are 20 lines of CSS + IntersectionObserver. Adding a 15–40KB library for that would
  fail the "every dependency justified" test, so neither is used.
- **refero.design:** requires an account; the wpresidence critique and direct site fetches
  served as the reference set instead.

---

## 7. Copy principles

- Verbs, not adjectives. "Shown privately" not "unparalleled experiences".
- Say what the client can stand behind. Reply-time promises and price floors are
  placeholders the client must confirm.
- Speak New York: boards, co-ops, mansion tax, parlor floors, full-floor, prewar.
- Never: elevate, unlock, transform, tailored solutions, next level, dream home, white-glove.

---

## 10. Instrumentation

Events are emitted with a tiny `track(name, params)` helper that pushes to `window.dataLayer`
(GTM) and no-ops if it is absent. Each interactive element carries `data-track`.

| Event                        | Params                                                    | Why                                               |
| ---------------------------- | --------------------------------------------------------- | ------------------------------------------------- |
| `cta_click`                  | `location` (header / hero / residences / sticky), `label` | Which placement earns the click                   |
| `residence_details_click`    | `residence`                                               | Which inventory drives intent                     |
| `form_start`                 | —                                                         | First focus on any field; abandonment denominator |
| `form_submit`                | `budget`, `timing`                                        | Conversion, with the two qualifiers               |
| `form_abandon`               | `fields_filled`                                           | Fired on `pagehide` if started but not submitted  |
| `phone_click`, `email_click` | `location`                                                | Off-form conversions                              |
| `scroll_depth`               | `percent` (50, 90)                                        | Did they reach the residences and the form        |

Not tracked: hovers, time on section, every scroll tick.

---

## 11. Critiques of the first complete build

Rendered in Chromium at 1440×900 and 390×844 and reviewed section by section.

### Creative director

- **Looked templated:** the four process steps sat in a 2×2 grid with numerals. That is the
  one layout on the page a template would produce. Replaced with four full-width ledger rows,
  numeral in the margin column, title and text on the same column rule the questions use.
- **Predictable:** the process image sat under the intro on the left. Moved to the heading
  column (3–13) so the dark band has one strong diagonal: label left, heading centre, image right.
- **Holding:** the hero split, the staggered residence grid, hairline spec tables, the
  sand-toned people band. Nothing decorative without a job. No icons anywhere.

### CRO

- **Promise mismatch:** every CTA says "Request a private viewing" but the form was headed
  "Tell us what you are looking for". The headline now repeats the promise; the instruction
  moves into the paragraph. Same verb from first click to submit.
- **Qualification:** budget select starts at the $750,000 floor; residence clicks pre-fill the
  brief and focus the textarea so the intent is captured in one step. Both verified.
- **Reply time** appears in the hero foot and the brief intro, and is confirmed on success.
  It is a placeholder promise the client must be able to keep.

### UX

- **Radios stacked vertically** because of a stray wrapper selector; fixed to an inline row.
- **Timing select** read "Select"; now "Select a window".
- **Keyboard:** first tab stop is the skip link; validation focuses the first invalid field;
  success state receives focus and is announced via `aria-live`. Verified.
- **Mobile:** headline wraps to three lines at 390px; sticky CTA appears once the hero scrolls
  out and hides while the form or footer is on screen; no horizontal overflow. Verified.

### Engineering

- Fonts self-hosted (73 KB total, variable sans + serif roman/italic) with `preload`;
  no third-party requests at all.
- Images: WebP with JPEG fallback, 900/1200/1600 widths, explicit `width`/`height` for zero
  layout shift, hero `fetchpriority="high"`, the rest lazy. Typical desktop payload ≈ 700 KB.
- One 404 (favicon) fixed with an inline SVG icon. Console clean on both viewports.
- A duplicated CSS block created during the process-band refactor was found and removed.
- Bodoni Moda's hyphen is a hairline that disappears at heading sizes in Chromium. Rather than
  patch the glyph, the two headings that used one were rewritten ("Cast iron loft",
  "Condo, cooperative or townhouse"), which also matches the vocabulary of the spec tables.

## 12. AI-smell audit

| Pattern found                                   | Why it reads as generated            | Resolution                                                                                             |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 2×2 numbered step grid                          | The default "how it works" component | Ledger rows on the shared column rule (see above)                                                      |
| Three-item claims bar under the hero            | Resembles a trust strip              | Kept: the three items are specific commitments, not badges, and it doubles as the hero's baseline rule |
| Uppercase tracked labels everywhere             | Common in luxury templates           | Labels only; buttons and links are sentence case so the two never compete                              |
| "Prefer to talk?" + phone/email under the intro | Standard                             | Kept: it is the off-form conversion path and is tracked separately                                     |
| Testimonials, logos, stats, awards              | Fabrication risk                     | Never added; slots documented in README for verified proof only                                        |

Nothing was found that needed removing outright. Sections earn their place by answering a
distinct buyer question.

## 13. Refinement and final consistency check

Applied all of the above. Final check on the current build:

- **Hierarchy:** h1 → h2 (per section, all on column 3) → h3 (residences, steps, success) with
  labels as a fourth, non-heading tier.
- **Alignment:** one 12-column grid; headings and process image share column 3; hairlines run
  full width; spec tables cap at 420px.
- **Spacing:** section paddings vary (hero 56–120 / residences 120–176 / band 96–152 / people
  72–120 / brief 112–176) and the residence grid is deliberately staggered.
- **Typography:** two families, three faces. Display serif at 46–112px fluid, body 17px,
  labels 12px.
- **Responsive:** verified at 1440 and 390; tablet rules at ≤1100px re-flow the question and
  brief columns.
- **Interactions:** reveals are one-shot and respect reduced motion; hover states are the only
  continuous ones; no scroll-jacking, no parallax.
- **Conversion path:** header CTA → hero CTA → per-residence "Request details" (pre-filled) →
  "Send a brief" after the grid → sticky CTA on mobile → form. Every path lands on `#brief`.
- **Accessibility:** semantic landmarks, skip link, labelled fields, `aria-live` errors and
  status, focus management on success, 2px focus rings, colour contrast of body text on paper
  ≈ 15:1 and stone labels ≈ 4.6:1.
- **Brand:** limestone, ink, one verdigris accent, zero radius, hairlines. No gradients, no shadows, no cards.
