# PIX-14 · Sub-pixel animation

**Aliases:** Subpixel animation; Sub-pixel movement (art); Anti-aliased motion

**Group:** 2D & pixel-art techniques
**Subcategory:** Animation

## What you see

Part of a sprite moves by less than one pixel: the artist changes the shade of edge pixels (e.g. 100% → 50% → 0%) so the eye reads the edge as "moving half a pixel". Common for breathing, eye movement and flag sway — it makes small sprites animate finely without raising the resolution.

## Not to be confused with

Not sub-pixel camera smoothing (PIX-03, offsetting the whole frame at screen resolution) and not the engine drawing sprites at fractional positions (which blurs or jitters). Sub-pixel animation is hand-drawn in-between colours; every pixel is still on the integer grid.

## Use it for

Idle breathing, slow motions and subtle sways on small characters; especially effective at 12–16 px tall.

## Tunable parameters

frames per cycle · in-between shades (1–2 per edge) · frame duration · which parts move (head, shoulders, eyes)

## Request prompt

Give the game's NPC idle a sub-pixel breathing cycle: 4 frames; the shoulders and top of the head do not move a whole pixel — instead the top row of pixels shifts between solid colour → mid tone → background to fake a half-pixel rise; 0.2 s per frame. The engine still draws the sprite at whole-pixel positions.

## Implementation hint

Pure art technique; engine must not break it: no bilinear filtering, no fractional sprite positions (PIX-02), no palette quantisation that removes the in-between colours.

## Related

- [PIX-02](PIX-02.md) — Pixel snapping
- [PIX-03](PIX-03.md) — Sub-pixel camera smoothing
- [PIX-11](PIX-11.md) — Manual anti-aliasing

## References

- [pixelart.school — Sub-pixel animation](https://pixelart.school/learn/pixel-art-sub-pixel)
- [Lospec — Sub-pixel tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/subpixel)
- [Slynyrd — Pixelblog 8: Intro to animation](https://www.slynyrd.com/blog/2018/8/19/pixelblog-8-intro-to-animation)
