# PIX-11 · Manual anti-aliasing

**Aliases:** Pixel-art AA; Hand-placed anti-aliasing; Jaggies smoothing

**Group:** 2D & pixel-art techniques
**Subcategory:** Line & form

## What you see

At the "stair-step" corners of curves and diagonals the artist hand-places one or two pixels in a colour between the line and the background, so the enlarged line reads smoother while every pixel is still one clean colour. It is used mostly on interior contours; the outer silhouette usually stays clean.

## Not to be confused with

Not renderer MSAA/FXAA (automatic, invents many colours and blurs the pixels) nor an upscaling filter (PIX-04). Manual AA is designed pixel by pixel and used sparingly; overdone it makes a sprite look soft.

## Use it for

Smoother curves on large sprites, logos and UI icons; sprites under ~16 px often use little or none.

## Tunable parameters

AA pixels per step (1–2) · which ramp colour (25% / 50% / 75%) · interior only vs outer edge · minimum sprite size

## Request prompt

Apply manual anti-aliasing to the game's boss sprite and title logo: add 1–2 in-between pixels (chosen from the same colour ramp) only at the corners of long stair-steps in curves; do not anti-alias the outer silhouette against the background so no halo appears on different backgrounds. Keep MSAA/FXAA off in game.

## Implementation hint

Art-side technique. Engine side: keep MSAA off for the sprite RT (SampleDesc.Count = 1) and no FXAA/TAA on the pixel layer, otherwise hand-placed AA is destroyed. If 3D or vector UI is mixed in, render it at native resolution in a separate layer.

## Related

- [PIX-04](PIX-04.md) — Pixel-art upscaling filters
- [PIX-12](PIX-12.md) — Selective outlining
- [PIX-05](PIX-05.md) — RotSprite

## References

- [Lospec — Pixel-art anti-aliasing tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/antialiasing)
- [Pedro Medeiros (saint11) — Pixel art tutorials](https://saint11.org/blog/pixel-art-tutorials/)
- [Wikipedia — Spatial anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing)
