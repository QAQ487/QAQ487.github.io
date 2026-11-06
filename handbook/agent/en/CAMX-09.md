# CAMX-09 · Isometric / dimetric projection

**Aliases:** Isometric view; 2:1 dimetric; Pixel isometric; Axonometric view

**Group:** Camera & composition
**Subcategory:** Projection & lens

## What you see

Ground tiles become diamonds and objects show their top plus both left and right sides; parallel lines stay parallel with no vanishing point, so distant objects never shrink. The "isometric" of pixel games is usually 2:1 dimetric (about 26.57°).

## Not to be confused with

Not a three-quarter view (CAMX-08, one front face, rectangular tiles); not perspective projection (CAM-16 Perspective projection, which has vanishing points).

## Use it for

Strategy, city builders, tactics RPGs, management sims — games that need terrain and buildings readable together.

## Tunable parameters

tile size & ratio (2:1 vs true 30°) · height step · sort key · picking inverse · shading per face

## Request prompt

In your game, use a 2:1 dimetric projection: 32×16 px diamond tiles; tile (i, j) maps to screen ((i − j) × 16, (i + j) × 8), each height level up 16 px; sort objects by (i + j) then height; for mouse picking invert the mapping back to the tile; light from the upper left: top face brightest, left face mid, right face darkest.

## Implementation hint

2D: map grid→screen with a 2×2 matrix and invert it for picking; sort by depth = i + j (+ height). 3D: orthographic camera, yaw 45°, pitch ≈ 30° (2:1 look) or 35.264° (true isometric).

## Related

- [CAMX-08](CAMX-08.md) — Three-quarter view
- [CAMX-10](CAMX-10.md) — Oblique projection
- [PIX-16](PIX-16.md) — Y-sorting
- [PIX-17](PIX-17.md) — Autotiling
- [PIX-19](PIX-19.md) — Sprite stacking

## References

- [Wikipedia — Isometric video game graphics](https://en.wikipedia.org/wiki/Isometric_video_game_graphics)
- [Wikipedia — Isometric projection](https://en.wikipedia.org/wiki/Isometric_projection)
- [Wikipedia — Axonometric projection (isometric, dimetric, trimetric)](https://en.wikipedia.org/wiki/Axonometric_projection)
