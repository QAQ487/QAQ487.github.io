# CAMX-07 · Top-down view

**Aliases:** Bird's-eye view; Overhead view; Straight-down view

**Group:** Camera & composition
**Subcategory:** Projection & lens

## What you see

The camera looks straight down: houses show only roofs, trees only their crowns, characters mostly the top of the head and shoulders; the ground has no front-to-back perspective and no object has a "front".

## Not to be confused with

Not a three-quarter view (CAMX-08 Three-quarter view, which shows tops and fronts together); a straight-down view never shows walls. Not isometric (CAMX-09, diamond grid).

## Use it for

Top-down shooters, racing, strategy, games that need precise reading of position and direction.

## Tunable parameters

camera pitch 90° · ortho size · sprite rotation vs 8-direction frames · drop-shadow offset for height

## Request prompt

In your game, use a straight-down top-down camera: orthographic, looking vertically down; draw characters as head-and-shoulder circles and rotate the sprite to face the movement direction; draw buildings as roofs only, with a 3 px drop shadow to the south-east to suggest height; compute all collision as 2D ground shapes.

## Implementation hint

Orthographic camera looking down −Y (3D) or plain 2D with rotated sprites. Height cues come from drop shadows and slight scale, not from drawing walls. Sort by layer, not by Y.

## Related

- [CAMX-08](CAMX-08.md) — Three-quarter view
- [CAMX-09](CAMX-09.md) — Isometric / dimetric projection
- [CAM-17](CAM-17.md) — Orthographic projection
- [PIX-18](PIX-18.md) — Fake height with ground shadow

## References

- [Wikipedia — Video game graphics (top-down perspective)](https://en.wikipedia.org/wiki/Top-down_perspective)
- [Wikipedia — Bird's-eye view](https://en.wikipedia.org/wiki/Bird's-eye_view)
- [Missroot — Camera views in 2D games (top-down, three-quarter, isometric…)](https://missroot.com/learn/camera-views/)
