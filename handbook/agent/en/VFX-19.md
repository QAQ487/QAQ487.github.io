# VFX-19 · Shatter

**Aliases:** Fracture; Voronoi fracture; Glass break; Destruction; Baked collapse; 建築倒塌; Collapse bake

**Group:** VFX & particles
**Subcategory:** Destruction

## What you see

When an object (ice block, crystal, glass, statue) is hit, cracks appear first, then it splits along them into irregular polygon shards that each carry their part of the original image as they scatter, spin, fall and fade.

## Not to be confused with

Not debris (VFX-18, extra small pieces thrown out); with a shatter the object itself is cut apart. Not the glass-break transition (TRN-12, where the whole screen breaks).

## Use it for

Smashing frozen enemies, breaking crystal shields, statues or chests — a dramatic moment of total destruction. A pre-recorded collapse can play as the same break-apart; the data carrier is noted on PHY-01.

## Tunable parameters

piece count · crack preview time · impulse from hit point · spin · gravity · fade/shrink time · interior colour

## Request prompt

Implement object shatter in your engine: pre-fracture the ice-block mesh into 12–20 Voronoi cells (offline or at load), show a crack texture for 0.1 s after the hit, then fling each piece outward from the hit point with random spin under gravity, shrinking and fading within 1 s. Example: a frozen enemy shatters into 8 pale-blue pixel shards.

## Implementation hint

Pre-fracture with Voronoi cells (clip the mesh/quad by bisector half-planes per seed); each shard keeps original UVs. At runtime replace the intact object with shard instances; per-instance transform (pos, rot, scale, alpha) in a structured or instance buffer updated on the CPU. In 2D, shards are polygons with the sprite texture mapped by original position.

## Related

- [VFX-18](VFX-18.md) — Debris
- [TRN-12](TRN-12.md) — Shatter transition
- [VFX-04](VFX-04.md) — Dissolve
- [FB-04](FB-04.md) — Death effect

## References

- [Wikipedia — Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram)
- [The Book of Shaders — Cellular noise](https://thebookofshaders.com/12/)
- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
