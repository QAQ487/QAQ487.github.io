# TRN-12 · Shatter transition

**Aliases:** Glass-break transition; Screen shatter; Broken-glass wipe

**Group:** Transitions
**Subcategory:** Pixel & stylised

## What you see

The old image breaks like glass into irregular shards that spin, fall or fly away, revealing the new image behind.

## Not to be confused with

Not an object fracture effect (VFX-19, breaking something in the world); here the whole screen snapshot breaks. Not pixelate (TRN-10).

## Use it for

Boss-fight starts, story shocks, "reality breaking", battle entry.

## Tunable parameters

shard count · pattern (Voronoi / radial cracks) · origin · gravity · spin · stagger by distance

## Request prompt

For the boss entrance in the game use a shatter transition: cut the current frame into ~20 Voronoi shards, starting with those near the impact point; give each a random initial velocity, spin and gravity so they fall off-screen within 0.9 s, revealing the boss scene.

## Implementation hint

Pre-build a shard mesh (triangulated Voronoi cells with UVs into the snapshot texture of A). Animate per-shard transforms on the CPU or in the vertex shader from per-instance velocity/spin; draw B underneath.

## Related

- [VFX-19](VFX-19.md) — Shatter
- [TRN-11](TRN-11.md) — Battle transition

## References

- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
- [Wikipedia — Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram)
