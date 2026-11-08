# NPR-08 · Halftone / Ben-Day dots

**Aliases:** Halftone shader; Comic dots; Screen tone; Ben-Day dots

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

Shading uses regularly spaced dots of varying size: small dots in light areas, large ones that almost merge in dark areas, usually on a 45° grid; pale flat areas use evenly sized small coloured dots (Ben-Day dots), like American comics or old newspaper print. Print flavour: per-channel screen angles (e.g. CMYK 15°/75°/0°/45°) and slight plate misregistration so colour dots sit a little off — still halftone, not a separate riso card.

## Not to be confused with

Not dithering (PIX-08, pixel-level on/off patterns with fixed dot size) nor hatching (NPR-05, lines instead of dots). Halftone reads as a fixed grid whose dot size changes with tone; screen angles and light misregistration are print flavour, not a new card.

## Use it for

American comic or pop-art styles, newspaper/magazine textures, comic-panel cutscenes, superhero or retro-advertising themes.

## Tunable parameters

cell size · grid angle · dot shape (round, square, line) · radius curve · colour mode (mono, duotone, CMYK) · Ben-Day tint · plate misregistration

## Request prompt

Add a halftone post-process to the game: grid rotated 45°, cell size 7 px (about 14 px at 1080p); per cell take the centre luminance tone, dot radius = 0.56 × cell × sqrt(1 − tone) (ink coverage ≈ 1 − tone), dot colour #1a1424; inside objects overlay Ben-Day colour dots (cell 4 px, radius 0.33 cell) in the object’s base colour on a 50/50 mix of base colour and white; add 1 px black edge-detection outlines. For a CMYK version rotate the C/M/Y/K grids 15°/75°/0°/45°, optionally with ±0.5–1 px per-channel misregistration.

## Implementation hint

Rotate pixel coords: p = R(angle)*pixel; cell = floor(p/s); c = (cell+0.5)*s; tone = luminance(sample(R^-1 c)); ink = length(p - c) < s*k*sqrt(1 - tone). Antialias with smoothstep over 1 px using fwidth. Per-channel CMYK: convert to CMYK, run one grid per channel at its own angle, multiply the inks; optional per-channel UV offset for slight misregistration.

## Related

- [NPR-05](NPR-05.md) — Hatching / Cross-hatching
- [PIX-08](PIX-08.md) — Dithering
- [PP-04](PP-04.md) — Posterization
- [NPR-10](NPR-10.md) — 1-bit dithering (Obra Dinn style)
- [NPR-18](NPR-18.md) — Risograph / misregistered spot-colour print
- [NPR-16](NPR-16.md) — Ukiyo-e / woodblock print

## References

- [Wikipedia — Halftone](https://en.wikipedia.org/wiki/Halftone)
- [Wikipedia — Ben-Day dots](https://en.wikipedia.org/wiki/Ben-Day_dots)
