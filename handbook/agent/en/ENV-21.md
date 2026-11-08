# ENV-21 · Sun glitter / glittering water specular

**Aliases:** Sun glitter; Glittering highlights; Sparkling water specular; Sun path on water; 水面金光; 波光粼粼; 太陽のきらめき; 水面のきらきら; サングリッター

**Group:** Environment, weather & time
**Subcategory:** Water

## What you see

A field of dancing bright sparkles on a wavy water surface, densest along the sun’s reflection path, appearing and vanishing as wave facets turn.

## Not to be confused with

Not the water surface itself (ENV-12). Not focused bright nets on the floor or nearby walls under water (ENV-14). Not a single material highlight (REN-10). Not heat haze (ENV-17).

## Use it for

Seaside, lake sunsets, distant water that must glitter.

## Tunable parameters

glint density · sun path width · lifetime · calm-water falloff · intensity (authoring defaults)

## Request prompt

Look across sunlit water → water surface facets → many short-lived glints cluster toward the solar reflection and twinkle as waves move → glints fade if the sun leaves the reflecting cone or the water calms to glass.

## Implementation hint

On the water surface shader, spawn thresholded specular glints where microfacet normals align with the half-vector toward the sun; densest near the solar glitter cone. Fade when roughness→0 (glass calm) or sun leaves the cone.

## Related

- [ENV-12](ENV-12.md) — Water surface
- [ENV-14](ENV-14.md) — Caustics
- [REN-10](REN-10.md) — Specular highlight

## References

- [Wikipedia — Sunglint](https://en.wikipedia.org/wiki/Sunglint)
- [Wikipedia — Caustic (optics)](https://en.wikipedia.org/wiki/Caustic_(optics))
