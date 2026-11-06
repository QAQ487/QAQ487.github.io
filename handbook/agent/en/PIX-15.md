# PIX-15 · Parallax scrolling

**Aliases:** Multi-layer parallax; Parallax layers; Depth scrolling

**Group:** 2D & pixel-art techniques
**Subcategory:** Scene construction

## What you see

The background is split into layers — distant mountains, clouds, far trees, near trees, ground. As the camera moves, farther layers move slower and nearer ones faster (foreground can even outrun the ground), giving a flat 2D image a sense of depth.

## Not to be confused with

Not Mode 7 (PIX-20, which warps each scanline into a perspective floor) and not camera zoom. Parallax only translates each layer at a different fraction of the camera; layers themselves are not distorted.

## Use it for

Side-scrollers, title screens, cut-scenes; in top-down games it can be used for cloud shadows or distant map edges.

## Tunable parameters

layer count · speed factor per layer (0–1.2) · vertical parallax yes/no · loop width per layer · per-layer rounding

## Request prompt

Add 4-layer parallax to the game's title screen and world map: sky moves at 0.1× the camera, far hills 0.3×, forest 0.6×, ground 1.0×. Round each layer's position to whole pixels before drawing (round per layer so no layer ever renders at a blurry fractional offset).

## Implementation hint

One draw (or one instanced batch) per layer with its own view offset: offset_i = floor(cam * factor_i + 0.5). Use WRAP address mode on a point sampler for horizontally tiling layers and shift UVs instead of moving geometry.

## Related

- [PIX-20](PIX-20.md) — Mode 7 and raster effects
- [PIX-02](PIX-02.md) — Pixel snapping
- [CAM-04](CAM-04.md) — Camera damping／Follow smoothing／Camera lag

## References

- [Wikipedia — Parallax scrolling](https://en.wikipedia.org/wiki/Parallax_scrolling)
- [Godot docs — 2D parallax](https://docs.godotengine.org/en/stable/tutorials/2d/2d_parallax.html)
