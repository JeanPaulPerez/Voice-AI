# MMLR — landing page

A single static page: `index.html`, `styles.css`, `main.js`, `assets/`. No build step and no
dependencies. Copy the `landing/` folder to any static host (Vercel, Netlify, Cloudflare Pages,
S3, nginx) and it works as-is.

The reasoning behind every decision is in [`STRATEGY.md`](STRATEGY.md).

## Preview locally

```bash
cd landing && python3 -m http.server 8765
# open http://localhost:8765/
```

Serve over HTTP rather than opening the file directly: font preloads are blocked on `file://`.

## Before going live: placeholders to replace

Search the HTML for `data-placeholder`. Each one is content only MMLR can supply.

| Placeholder           | Where                          | Replace with                                                    |
| --------------------- | ------------------------------ | --------------------------------------------------------------- |
| `phone`               | header, brief, success, footer | The real number (also update `tel:` hrefs and the JSON-LD)      |
| `email`               | brief, footer                  | The real inbox (also `mailto:` hrefs and the JSON-LD)           |
| `listing` × 4         | Residences section             | Real residences, photographs and specifications                 |
| `principal`           | The people                     | The principal's name and license type                           |
| `address`             | footer                         | Office address                                                  |
| `license`             | footer                         | NY Department of State broker license number                    |
| `fair-housing`, `sop` | footer                         | Links to the NY Fair Housing Notice and the firm's written SOPs |
| `privacy`             | footer                         | Privacy policy                                                  |

Two written promises also need confirming before launch, because the page repeats them:
"Replies within one business day" and "Residences from $750,000".

The photographs in `assets/` were generated for layout and art direction. Replace them with
photography of the actual residences; keep the same file names and sizes (900 / 1200 / 1600
widths, WebP + JPEG) or update the `srcset` attributes.

## Wiring the form

`#brief-form` posts `name, email, phone, brief, budget, timing, contact, residence` as form data.
Set the form's `action` attribute to your endpoint. Any service that accepts a POST and returns a
2xx works (Formspree, Basin, a Netlify/Vercel function, your CRM's inbound endpoint). Until an
`action` is set, the page shows the success state locally so the flow can be reviewed.

## Analytics

Events are pushed to `window.dataLayer` (Google Tag Manager) and to `gtag` if present. See
`STRATEGY.md` section 10 for the event list. Add your GTM container snippet to `<head>` and map
the events to GA4 in GTM; nothing else is needed.

## Verifying changes

The page was checked in Chromium at 1440×900 and 390×844 (iPhone-class) for layout, keyboard
order, form validation, the residence-to-brief prefill, the mobile sticky CTA and horizontal
overflow. Run the same checks after replacing content, especially headline wrapping on mobile
once real residence names are in.
