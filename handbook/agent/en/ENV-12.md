# ENV-12 · Water surface

**Aliases:** Shoreline foam; Animated water; Water tiles

**Group:** Environment, weather & time
**Subcategory:** Water

## What you see

The surface has slowly moving bright ripple lines and glints; near the shore a white foam line pushes back and forth with the waves; deep water is darker, shallows lighter.

## Not to be confused with

Not ripples (ENV-13, rings triggered by objects) nor caustics (ENV-14, the light net on the bottom). The water surface is the continuous surface animation.

## Use it for

Rivers, lakes, coasts — one of the most common animated elements on top-down maps.

## Tunable parameters

scroll speeds · ripple texture · foam width & cycle · depth gradient · glint density · palette

## Request prompt

Add a water surface to the river in the game: water tiles combine two ripple textures scrolling in opposite directions (4 px/s and -3 px/s); along the shore draw a 1 px white foam line from a distance-to-land field, advancing and retreating 2 px on a 2 s cycle; shallows (<6 px from shore) +15% brightness.

## Implementation hint

Water pixel shader: two UV-scrolled samples of a ripple texture combined; foam = step(abs(sdfShore - (0.5+0.5*sin(t*π))*w), 0.5px); depth tint from the same shore SDF baked into a texture alongside the tilemap.

## Related

- [ENV-13](ENV-13.md) — Ripples
- [ENV-14](ENV-14.md) — Caustics
- [VFX-03](VFX-03.md) — Flowmap
- [ENV-21](ENV-21.md) — Sun glitter / glittering water specular

## References

- [GPU Gems ch.1 — Effective water simulation from physical models](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models)
- [Catlike Coding — Texture distortion (flowmaps)](https://catlikecoding.com/unity/tutorials/flow/texture-distortion/)
- [Alex Vlachos — Water flow in Portal 2 (SIGGRAPH 2010, PDF)](https://alex.vlachos.com/graphics/Vlachos-SIGGRAPH10-WaterFlow.pdf)
