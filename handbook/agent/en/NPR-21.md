# NPR-21 · Authored shadow colours

**Aliases:** Authored shadow colour; Painted shadow hue; Material-specific shade colour; 手繪影色; 指定陰影色; 指定影色; 影色の塗り分け

**Group:** Stylized rendering (NPR)
**Subcategory:** Toon shading

## What you see

Each material (skin, cloth, foliage, metal) receives its own designed shadow colour — a chosen hue and value — rather than a global multiply-toward-black.

## Not to be confused with

Not physical colour bleeding (REN-20). Not pixel-art ramp hue shift (PIX-09, though related). Not a single fullscreen grade (REN-32). Not the *shape* of a face core shadow (NPR-22).

## Use it for

Anime paint, stylized characters with readable materials.

## Tunable parameters

per-material shadow colour · shadow value · blend vs N·L · compare multiply-black (authoring defaults)

## Request prompt

Light a scene with two or three materials → each material’s shaded side → use that material’s authored shadow colour (e.g. skin → warm rust, cloth → deep indigo, leaves → cool green) instead of darkened albedo alone → restore neutral darkening on disable.

## Implementation hint

In the shade lobe, lerp toward material.shadowColour instead of albedo*lightColour*N·L alone. Expose a swatch vs multiply-black compare. Cross-link NPR-22/23 for shape authorship.

## Related

- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [PIX-09](PIX-09.md) — Hue shifting
- [REN-20](REN-20.md) — Global illumination/GI/Indirect lighting/Color bleeding
- [REN-32](REN-32.md) — Color grading/LUT/White balance
- [NPR-22](NPR-22.md) — Core-shadow band
- [NPR-23](NPR-23.md) — Art-directed face shadows

## References

- [Wikipedia — Cel shading](https://en.wikipedia.org/wiki/Cel_shading)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
