# PIX-08 · Dithering

**Aliases:** Ordered dithering; Bayer dithering; Checkerboard dither; Dither pattern

**Group:** 2D & pixel-art techniques
**Subcategory:** Colour

## What you see

When there are not enough colours, two colours are interleaved in a checkerboard or Bayer-matrix pattern so that from a distance they read as an in-between tone; gradient skies, soft shadow edges and translucency are built from patterns instead of new colours. Without dithering a gradient breaks into visible bands.

## Not to be confused with

Not a dither transition (TRN-09, using pattern thresholds to switch between two images over time) and not noise grain (random and flickering). Ordered dithering uses a fixed pattern aligned to the pixel grid, so it does not shimmer when still.

## Use it for

Gradients and translucency inside a limited palette; also pixel-style "transparency": drawing every other pixel to fake 50% opacity without blending.

## Tunable parameters

matrix (2×2 checker, 4×4 / 8×8 Bayer, hand-made patterns) · anchored to world vs screen · number of levels · avoid on tiny moving sprites

## Request prompt

Use ordered dithering for the game's night light halos and cloud shadows: inside a halo choose between the dark colour and the lamp colour with a 4×4 Bayer matrix instead of alpha blending. Anchor the pattern to world coordinates (it scrolls with the camera) — it must not slide in screen space.

## Implementation hint

Pixel shader: float th = (BAYER4[(px.y&3)*4 + (px.x&3)] + 0.5) / 16; col = (value > th) ? colA : colB; where px is the base-res pixel coordinate (+ floor(cam) for world anchoring). Put the 16 thresholds in a constant buffer or a 4×4 R8 texture with wrap + point sampler.

## Related

- [TRN-09](TRN-09.md) — Dither transition
- [PIX-10](PIX-10.md) — Limited palette
- [PIX-22](PIX-22.md) — 2D shadow casting
- [NPR-18](NPR-18.md) — Risograph / misregistered spot-colour print

## References

- [Wikipedia — Dither](https://en.wikipedia.org/wiki/Dither)
- [Wikipedia — Ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering)
- [Lucas Pope — Obra Dinn devlog (dithering, TIGSource post)](https://dukope.com/devlogs/obra-dinn/tig-32/)
- [Lospec — Dithering tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/dithering)
