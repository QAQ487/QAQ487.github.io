# ENV-13 · Ripples

**Aliases:** Interactive water; Water ripples; Wake

**Group:** Environment, weather & time
**Subcategory:** Water

## What you see

When something drops in, a character wades or rain hits, rings spread from the contact point, growing and fading; moving characters trail a V-shaped wake.

## Not to be confused with

Not a shockwave (VFX-06, a combat effect distorting the screen); ripples are softer and live only on the water. Not the general water animation (ENV-12, independent of objects).

## Use it for

Wading characters, fishing floats, rainy water, stones thrown in.

## Tunable parameters

spawn interval · max radius · lifetime · ellipse ratio · ring thickness · wake angle

## Request prompt

In your game, when a character moves through shallow water spawn a ripple under its feet every 0.25 s: a 2:1 ellipse ring (to suit the top-down view) growing from 2 px to 14 px radius and fading over 0.8 s in the water highlight colour; spawn small random ripples while raining.

## Implementation hint

Simple: ring sprites in the water layer with a stencil/mask so they clip to water tiles. Advanced: a low-res height-field simulation (2-buffer wave equation in a compute shader, ms_cs) sampled for normal-based refraction.

## Related

- [ENV-12](ENV-12.md) — Water surface
- [VFX-06](VFX-06.md) — Shockwave
- [ENV-04](ENV-04.md) — Rain

## References

- [GPU Gems ch.1 — Effective water simulation from physical models](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models)
- [Microsoft Learn — Direct3D 11 compute shader](https://learn.microsoft.com/en-us/windows/win32/direct3d11/direct3d-11-advanced-stages-compute-shader)
