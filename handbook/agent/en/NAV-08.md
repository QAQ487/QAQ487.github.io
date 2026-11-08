# NAV-08 · Detective-vision trail (investigation highlight mode)

**Aliases:** 偵探模式; 追蹤腳印; 調查視覺; Detective vision; Investigation mode; Tracking trail; Forensic highlight; 調査モード

**Group:** Visual guidance & wayfinding
**Subcategory:** Path guidance

## What you see

When the player toggles investigation mode, the whole image darkens, cools and desaturates, and only clue-related things are highlighted: footprints, blood or scent link into a glowing trail leading somewhere, investigable objects get outlines, and enemies show as silhouettes through walls. Leaving the mode returns to the normal picture, so players do not spend long stretches looking only at the highlight view.

## Not to be confused with

Not an X-ray silhouette (MATX-10, which only handles occluded characters), not a breadcrumb trail (UX-29, permanent route dots) and not the high-contrast mode (A11Y-06, a full accessibility recolour). This is a toggled investigation gameplay mode that links clues with a trail.

## Use it for

Tracking and deduction gameplay, observing enemies during stealth, hunters following prey, finding hidden objects.

## Tunable parameters

desaturate 60–90% · brightness 30–50% · tint cool · transition 0.2–0.5 s · trail step 0.1–0.2 s · outline 1–3 px · no full-screen flash (starting points)

## Request prompt

Add an investigation vision mode: while the button is held, transition over 0.3 s to desaturate the scene by 80%, drop brightness to 40% and add a blue tint; show clue footprints as glowing decals that light up in sequence along the path (one every 0.15 s); give investigable objects a 2 px cyan outline and show enemies behind walls as silhouettes (all starting values). Restore the normal picture on release, and never use a full-screen flash in the mode.

## Implementation hint

Mode blend m eased 0→1; post: col = mix(col, luma(col)*tint*bright, m*desat). Clue decals use an emissive channel excluded from the desaturate pass (or drawn after it); reveal index = floor((t-t0)/step). Outlines: stencil + edge pass (NPR-03); through-wall enemies as MATX-10.

## Related

- [MATX-10](MATX-10.md) — X-ray silhouette
- [UX-29](UX-29.md) — Breadcrumbing / Breadcrumb trail
- [A11Y-06](A11Y-06.md) — High-contrast solid silhouette mode
- [FX-06](FX-06.md) — Decals / Surface Marks
- [PP-15](PP-15.md) — Selective colour / Colour splash
- [PP-18](PP-18.md) — Image-intensifier night vision / NVG look
- [PP-19](PP-19.md) — Thermal vision / Thermographic imaging

## References

- [Wikipedia — Batman: Arkham Asylum (Detective Mode, example only)](https://en.wikipedia.org/wiki/Batman:_Arkham_Asylum)
