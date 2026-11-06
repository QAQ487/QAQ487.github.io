# CAMX-08 · Three-quarter view

**Aliases:** 3/4 view; 3/4 top-down; Top-down RPG view; Oblique top-down

**Group:** Camera & composition
**Subcategory:** Projection & lens

## What you see

The camera looks down at an angle: you see the top and the front of things together — roof plus front wall, table top plus legs, the character’s whole body; ground tiles are still rectangles and higher on screen means farther away.

## Not to be confused with

Not a straight-down top-down view (CAMX-07, no fronts visible); not isometric (CAMX-09, diamond tiles with two sides visible). Close to oblique projection (CAMX-10), but 3/4 usually squashes depth and shows a single front face.

## Use it for

Classic 2D RPGs, farming sims, action-adventure — whenever objects must be recognisable at a glance.

## Tunable parameters

implied camera tilt · front-face height ratio · direction count for sprites · sort key (foot Y)

## Request prompt

In your game, use a three-quarter top-down view: 16×16 px tiles; draw every object with both its top and front face, front height ≈ 0.7 × real height; draw characters in 3 directions (up, down, side, flip for the other side); sort objects by foot Y so the character is hidden by a front wall when walking behind a house.

## Implementation hint

Pure 2D: art is drawn in the projection; the engine only needs Y-sorting by the sprite pivot at the feet. In 3D, approximate with a pitched orthographic camera (≈ 45–60°) and scale world Z so tiles stay square on screen.

## Related

- [CAMX-07](CAMX-07.md) — Top-down view
- [CAMX-10](CAMX-10.md) — Oblique projection
- [PIX-16](PIX-16.md) — Y-sorting
- [PIX-24](PIX-24.md) — Sprite pivot at the feet

## References

- [Missroot — Camera views in 2D games (top-down, three-quarter, isometric…)](https://missroot.com/learn/camera-views/)
- [Goonstation dev docs — Sprite guidelines (three-quarter perspective)](https://docs.goonhub.com/guidelines/sprites.html)
- [Wikipedia — Video game graphics (top-down perspective)](https://en.wikipedia.org/wiki/Top-down_perspective)
