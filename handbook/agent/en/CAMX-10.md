# CAMX-10 · Oblique projection

**Aliases:** Cabinet projection; Cavalier projection; Oblique top-down; 2.5D buildings

**Group:** Camera & composition
**Subcategory:** Projection & lens

## What you see

The front of an object is drawn true to shape with no distortion, while depth recedes at a fixed angle (often 45°) and is often shortened to half; all depth lines stay parallel with no vanishing point.

## Not to be confused with

Not isometric (CAMX-09, where the front is slanted too); not a three-quarter view (CAMX-08, where depth goes straight up the screen rather than diagonally). The tell: the front is an upright rectangle and the side goes off at a slant.

## Use it for

Buildings and props in side-view or top-down 2D games, 2.5D scenes, art where front details (signs, doors, windows) must stay undistorted.

## Tunable parameters

receding angle (30–60°) · depth ratio (1 cavalier, 0.5 cabinet) · face shading · sort key

## Request prompt

In your game, draw buildings in oblique projection: the front face is a true-size rectangle, depth recedes at 45° to the upper right at 0.5 × real depth (cabinet projection); keep all depth edges parallel; shade roof and side walls 15% darker than the front; still sort characters by foot Y.

## Implementation hint

In 2D the projection is baked into the art. In 3D use an orthographic camera with a shear matrix: x′ = x + z·k·cos θ, y′ = y + z·k·sin θ (k = depth ratio) applied before the ortho projection.

## Related

- [CAMX-08](CAMX-08.md) — Three-quarter view
- [CAMX-09](CAMX-09.md) — Isometric / dimetric projection
- [PIX-19](PIX-19.md) — Sprite stacking
- [CAM-17](CAM-17.md) — Orthographic projection

## References

- [Wikipedia — Oblique projection](https://en.wikipedia.org/wiki/Oblique_projection)
- [Wikipedia — Cavalier perspective](https://en.wikipedia.org/wiki/Cavalier_perspective)
- [Wikipedia — 2.5D](https://en.wikipedia.org/wiki/2.5D)
