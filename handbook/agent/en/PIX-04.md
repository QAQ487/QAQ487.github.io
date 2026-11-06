# PIX-04 · Pixel-art upscaling filters

**Aliases:** Scale2x / EPX; hqx; xBR; Smoothing filters for pixel art

**Group:** 2D & pixel-art techniques
**Subcategory:** Display & scaling

## What you see

While enlarging, the algorithm looks at the shape of neighbouring pixels and "guesses" diagonals and curves, turning stair-step edges into smoother slopes: Scale2x turns each pixel into a 2×2 block and rounds corners; hqx and xBR go further and output near-vector contours — colours stay crisp, it is not a blur.

## Not to be confused with

Not integer scaling (PIX-01, where each pixel becomes a big square and jaggies are kept), and not a bilinear blur. These filters change the artwork, so most pixel games should keep "off" as the default.

## Use it for

"Smooth" display options in emulators and retro remasters; also the intermediate step inside RotSprite (PIX-05).

## Tunable parameters

algorithm (Scale2x/3x, hq2x–hq4x, xBR/xBRZ levels) · equality threshold for colours · applied before or after integer scale · default off

## Request prompt

Add an optional "smooth pixels" display filter to the game: the default stays nearest-neighbour integer scaling; when enabled, run Scale2x on the 320×180 frame before the integer upscale. The filter only affects the final image, not the game's logical resolution.

## Implementation hint

Implement as a full-screen pixel shader on the base-res RT: for Scale2x each output texel reads its source pixel P and neighbours A(up),B(right),C(left),D(down) and applies the EPX rules (e.g. E0 = (C==A && C!=D && A!=B) ? A : P). Output to a 2× RT, then integer-upscale with point sampling. Compare colours exactly (or with a small tolerance) — never sample with linear filtering.

## Related

- [PIX-01](PIX-01.md) — Integer scaling
- [PIX-05](PIX-05.md) — RotSprite

## References

- [Wikipedia — Pixel-art scaling algorithms (xBR, hqx, Scale2x, RotSprite)](https://en.wikipedia.org/wiki/Pixel-art_scaling_algorithms)
- [Scale2x — algorithm description](https://www.scale2x.it/algorithm)
- [libretro glsl-shaders — xBR shader sources (GitHub)](https://github.com/libretro/glsl-shaders/tree/master/xbr)
