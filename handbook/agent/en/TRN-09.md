# TRN-09 · Dither transition

**Aliases:** Dissolve dither; Bayer dither fade; Pixel dissolve

**Group:** Transitions
**Subcategory:** Pixel & stylised

## What you see

Instead of a smooth fade, the old image is replaced point by point following a dot pattern (a Bayer matrix or random noise), so the midpoint looks like an interleaved screen of dots.

## Not to be confused with

Not a smooth crossfade (TRN-03, which has translucency); in a dither transition each pixel is either A or B, never in-between, which suits limited-palette pixel art.

## Use it for

Keeps pixel art hard-edged and on-palette; retro-console flavour.

## Tunable parameters

matrix (2×2 / 4×4 / 8×8 / blue noise) · cell size in game pixels · duration · direction bias (add gradient)

## Request prompt

In your game, switch scene transitions to a 4×4 Bayer dither: over 0.5 s the threshold k goes 0→1 and pixel (x,y) shows the new scene when bayer[x%4][y%4]/16 < k; compute it at the game’s native pixel resolution, not screen resolution.

## Implementation hint

Pixel shader: compute integer game-pixel coords p = floor(uv * nativeRes); t = bayer4[p.x&3][p.y&3]/16; out = t < k ? B : A. Optionally add a gradient (uv.x) to the threshold for a dithered wipe.

## Related

- [TRN-03](TRN-03.md) — Crossfade
- [TRN-10](TRN-10.md) — Pixelate transition
- [PIX-08](PIX-08.md) — Dithering

## References

- [Wikipedia — Ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering)
- [Wikipedia — Dither](https://en.wikipedia.org/wiki/Dither)
- [Lucas Pope — Obra Dinn devlog (dithering, TIGSource post)](https://dukope.com/devlogs/obra-dinn/tig-32/)
