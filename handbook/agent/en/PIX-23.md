# PIX-23 · Mixels

**Aliases:** Mixed pixel sizes; Inconsistent pixel density; Pixel scale mismatch

**Group:** 2D & pixel-art techniques
**Subcategory:** Display & scaling

## What you see

Different "pixel" sizes appear in the same frame: the hero is 1× art, a boss is drawn scaled 2×, a prop is rotated or scaled 1.5×, the UI font uses another resolution. Some squares are big, some small, some tilted, and the image looks inconsistent, like a collage.

## Not to be confused with

Not integer scaling itself (PIX-01 — scaling the whole frame uniformly is fine); the problem is individual objects scaled by different or non-integer factors. Also not a deliberate mixed style (like HD-2D, which is designed on purpose).

## Use it for

A checklist item: decide that all sprites, VFX and UI share one pixel density so character sizes stay consistent and comparable.

## Tunable parameters

one art-pixel size per project · allowed exceptions (screen-space UI at native res, deliberate HD effects) · squash done by frames not scale

## Request prompt

Audit the game for pixel-density consistency: all sprites, tiles, VFX and UI fonts are drawn at the same 1× art pixel on the 320×180 canvas; when a boss needs to be bigger, draw a bigger sprite rather than scaling it; squash-and-stretch on hit is done with whole-pixel deformation or pre-drawn frames; no real-time rotation except multiples of 90° (use PIX-05 pre-baked angles instead).

## Implementation hint

Enforce in the sprite batch: assert scale ∈ {1, −1} (flip only) for world sprites in debug builds; draw everything to the base-res RT so any accidental scale still lands on the same pixel grid. Particles: integer sizes (1×1, 2×2 px) at rounded positions.

## Related

- [PIX-01](PIX-01.md) — Integer scaling
- [PIX-05](PIX-05.md) — RotSprite
- [FB-13](FB-13.md) — Squash on hit
- [PIX-24](PIX-24.md) — Sprite pivot at the feet

## References

- [Lospec — Mixels tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/mixels)
- [Wikipedia — Pixel art](https://en.wikipedia.org/wiki/Pixel_art)
