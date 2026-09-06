# Quality Construction — asset log

Every visual on the page was generated with HiggsField on 2026‑09‑06 and checked
for consistency against the payoff frame before it was accepted. Nothing is
procedural, illustrated, or stock.

## Master shot (locked for all 8 stages)

> Photorealistic editorial architectural photograph. A two-story craftsman-style family home with a gabled roof, cream-painted wood siding, white trim, a covered front porch with tapered columns, and a mature oak tree at the left edge of the lawn. Camera: 35mm lens, fixed tripod position across the street, slightly elevated (about 4 m), three-quarter front-left angle, whole house and roofline in frame, street curb and a slice of lawn in the foreground. Natural light, subtle film grain, true-to-life colors, no HDR look, no CGI look, no text, no watermark.

Payoff (stage 08) was generated first, text-to-image, with `nano_banana_pro` at 2K 16:9 (2 variants; variant A chosen for the higher camera and fuller roofline). Stages 01–07 were generated as `image_references` edits of stage 08 with the instruction *"Keep EXACTLY the same house, same camera position, same 35mm framing… change only: …"*.

## Stage stills — `assets/stages/stage-0N.webp` (1920×1071) + `assets/stages/mobile/` (1080×1350 crop)

| Beat | File | Scroll % | Model / job | Change from master | Consistency |
|---|---|---|---|---|---|
| 01 Damage | stage-01 | 0 | nano_banana_pro · 9a94838c | Old faded shingles, torn patches, blue tarp weighted with 2x4s, bent gutter, fallen oak branch, heavy storm overcast, wet street, lights off | PASS |
| 02 Inspect | stage-02 | 13.5 | nano_banana_pro · b41f3d27 | Damaged roof, inspector in harness with tablet by the dormer, extension ladder at eave, bright overcast | PASS |
| 03 Tear-off | stage-03 | 28 | nano_banana_pro · f9964b86 | Crew of three stripping shingles, left half bare deck, chute into green dumpster in driveway, tarps on shrubs, clouds breaking | PASS |
| 04 Deck | stage-04 | 42.5 | nano_banana_pro · 35790f1a | Whole roof bare plywood, fresh lighter sheets near dormer, one roofer sweeping ridge, dumpster, clearing sky | PASS |
| 05 Seal | stage-05 | 57 | nano_banana_pro · 9ca4632e | Gray synthetic underlayment with printed grid, black ice‑and‑water at eaves, white drip edge, two roofers at ridge, clear blue sky | PASS |
| 06 Shingle | stage-06 | 71 | nano_banana_pro · 2c8d550d | Charcoal architectural shingles two‑thirds up, underlayment band at ridge, bundles staged, afternoon sun | PASS |
| 07 Sweep | stage-07 | 85.6 | nano_banana_pro · 3074dd08 | Finished roof and ridge cap, dumpster gone, worker with magnetic sweeper on lawn, late‑afternoon raking light | PASS |
| 08 Home | stage-08 | 100 | nano_banana_pro · ae759227 | Golden hour, warm window light, couple on porch looking up (the master) | PASS (bar) |

Rejected: payoff variant B (job 9aff454d) — lower camera, less roof visible. Not used.

## Motion — scroll frame sequence `assets/frames/` (112 × 1440×810 WebP, 11.7 MB) and `assets/frames-mobile/` (63 × 720×900, 3.9 MB)

Each transition was generated with `minimax_h3_max` (768p, 5 s, `start_image` = stage N, `end_image` = stage N+1) with a locked-off-tripod time-lapse prompt, then sampled to 16 evenly spaced frames per clip with ffmpeg + Pillow (`scripts` in the session scratchpad; last frame of each clip = the next stage still).

| Clip | Job | Beats | Result |
|---|---|---|---|
| v1 | 1c00b101 | 01 → 02 | PASS |
| v2 | 7a94c394 | 02 → 03 | PASS after trimming the first 1.0 s (dumpster wiped across the lens on delivery) |
| v3 | 9dd47299 | 03 → 04 | PASS |
| v4 | 5be16585 | 04 → 05 | PASS |
| v5 (first) | da289ae5 | 05 → 06 | **FAIL** — reached the shingled state at ~3 s then regressed to underlayment. Rejected. |
| v5 (used) | 5f0cb2ea | 05 → 06 | PASS — regenerated with a "shingled area only ever grows" prompt |
| v5 alt | d2f5b62d (flux_3_video 720p) | 05 → 06 | PASS, unused (minimax retake was accepted first) |
| v6 | 8b734bbe | 06 → 07 | PASS |
| v7 | e81c85dd | 07 → 08 | PASS |

Hero loop `assets/video/hero-loop.mp4` (1280×720, 8 s, 1.9 MB, muted, H.264) + `hero-poster.webp`: `minimax_h3_max`, job b21fcd5a, start_image = stage 08, prompt "living photograph, leaves sway, window light flickers, couple turns slightly, very subtle motion". PASS.

## Supporting stills (same photographic language, 4:5, 1000×1250)

| File | Job | Prompt summary | Used in | Check |
|---|---|---|---|---|
| services/storm-claims.webp | 90ffe7f3 | Inspector on hail‑damaged roof, chalk circles, tablet, soft overcast | Service 01 | PASS |
| services/replacement.webp | b8bdee57 | Low angle from the lawn at the finished charcoal roof (ref: stage 08) | Service 02 | PASS |
| services/repair.webp | b30d89cf | Gloved hands sliding a new shingle into a patch, nail gun, 50 mm (ref: stage 08) | Service 03 | PASS |
| services/flashing-gutters.webp | 8dbf4c2a | New step flashing at a brick chimney, seamless gutter at the eave | Service 04 | PASS |
| textures/shingle-macro.webp | 6c0a3846 | Macro of charcoal architectural shingle granules, raking light | Process background | PASS |
| og.jpg | (stage 08) | 1200×670 crop of the payoff | Open Graph | — |

Before/after slider uses stage‑01 and stage‑08 directly — same locked camera, so the reveal is pixel-aligned.

## Placeholders to confirm before launch

- **Testimonials** — three example quotes with fictional names and neighborhoods; avatars are initial monograms. Replace with real reviews.
- **Numbers** — 2,400+ roofs, 612 reviews / 4.9 rating, "since 2009", TX license number, phone (214) 555‑0142, email and domain are editable placeholders.
- **Certifications** — GAF Master Elite®, Owens Corning Preferred, BBB A+ are shown as examples; only keep the ones the company actually holds.
- **Form** — the inspection form validates and shows a confirmation state client-side; wire the `submit` handler (see the `TODO` in `index.html`) to Formspree, Netlify Forms, or your CRM.
- **`og:image` / canonical** — set absolute URLs once the domain is live.

Credits spent: ~150 of 1,017 (24 images at 2 credits, 11 video clips).
