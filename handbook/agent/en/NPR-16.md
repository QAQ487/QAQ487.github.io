# NPR-16 · Ukiyo-e / woodblock print

**Aliases:** Ukiyo-e; Woodblock print; Nishiki-e; 浮世繪; 木刻版畫; 浮世絵; 木版画; 錦絵

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

Flat colour fields bounded by a key-block ink line, with bokashi gradients in skies or water, and optional slight plate misregistration. Lighting does not read as cel ramp bands on a 3D form.

## Not to be confused with

Not cel/ramp shading (REN-03). Not halftone (NPR-08). Not line boil (NPR-04). A faint misregister is print flavour, not a glitch (PP-12).

## Use it for

Japanese title cards, print-style cutaways, Edo aesthetics.

## Tunable parameters

key-line weight · flat palette · bokashi regions · plate offset px · (authoring defaults)

## Request prompt

Enable woodblock presentation → scene → flatten into bounded colour fields plus a key line, allow bokashi in sky/water, and optionally offset one plate by 1 px → restore ordinary shading on disable.

## Implementation hint

Quantize colours into flat regions, draw a dark key line on silhouettes, soft-gradient (bokashi) sky/water bands, optionally shift one colour plate by 1 px. Avoid Lambertian band ramps.

## Related

- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [NPR-08](NPR-08.md) — Halftone / Ben-Day dots
- [REN-04](REN-04.md) — Outline/Contour/Inverted-hull outline
- [NPR-04](NPR-04.md) — Line boil
- [NPR-18](NPR-18.md) — Risograph / misregistered spot-colour print

## References

- [Wikipedia — Ukiyo-e](https://en.wikipedia.org/wiki/Ukiyo-e)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
