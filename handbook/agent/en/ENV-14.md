# ENV-14 · Caustics

**Aliases:** Water caustics; Light caustics; Pool-floor light pattern

**Group:** Environment, weather & time
**Subcategory:** Water

## What you see

On the floor of shallow water, on adjacent walls or pool sides, a constantly deforming bright net of light — sunlight focused by refraction through the waves; the net moves with the waves.

## Not to be confused with

Not surface ripples (ENV-12, on the surface); not sun glitter / surface sparkles (ENV-21); not coloured window-light pools (LGT-16). Caustics appear on the bottom, adjacent walls or lit objects as a wave-driven net of bright lines.

## Use it for

Clear shallows, pools, sea caves, magic springs — makes water feel transparent.

## Tunable parameters

texture scale · two-layer scroll speeds/directions · intensity · depth falloff · colour

## Request prompt

Add caustics to the clear spring in the game: additively blend a tileable caustics texture over the bottom tiles and nearby walls, sampling two layers scrolled in different directions and scales and taking min() to form a shifting net of bright lines; strength 0.35, shallows only.

## Implementation hint

Pixel shader: c = min(tex(uv*s1 + t*v1), tex(uv*s2 + t*v2)); out += c * intensity * shallowMask. A procedural alternative is Voronoi/cellular noise edges (bos_cell).

## Related

- [ENV-12](ENV-12.md) — Water surface
- [ENV-13](ENV-13.md) — Ripples
- [ENV-21](ENV-21.md) — Sun glitter / glittering water specular
- [LGT-16](LGT-16.md) — Stained-glass colored light pool

## References

- [Wikipedia — Caustic (optics)](https://en.wikipedia.org/wiki/Caustic_(optics))
- [GPU Gems ch.2 — Rendering water caustics](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-2-rendering-water-caustics)
- [The Book of Shaders — Cellular noise](https://thebookofshaders.com/12/)
