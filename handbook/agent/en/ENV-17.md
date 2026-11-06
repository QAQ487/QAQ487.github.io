# ENV-17 · Heat haze

**Aliases:** Heat shimmer; Heat distortion; Mirage shimmer

**Group:** Environment, weather & time
**Subcategory:** Weather

## What you see

Above hot ground or near fire and lava, background objects show small wavy shimmering distortion, like looking through flowing transparent air.

## Not to be confused with

Not a shockwave (VFX-06, a single expanding ring); heat haze is continuous, subtle and flows upward. Not a water surface (ENV-12).

## Use it for

Deserts, forges, campfires, lava zones, lingering fire-magic areas.

## Tunable parameters

region size · amplitude · vertical frequency · scroll speed · falloff · nearest vs linear sampling

## Request prompt

Add heat haze above the blacksmith’s forge and campfires in the game: within a 32×24 px region offset the background in x by sin(y×0.6 − time×6) × 0.8 px, fading toward the top; sample with nearest-neighbour after the offset to keep pixels crisp.

## Implementation hint

Distortion pass: render the scene to a texture, then draw distortion quads that sample it with uv + offset (offset from a scrolling noise/normal texture or analytic sin). Same pipeline as VFX-06.

## Related

- [VFX-06](VFX-06.md) — Shockwave
- [VFX-12](VFX-12.md) — Fire and smoke
- [VFX-03](VFX-03.md) — Flowmap

## References

- [Wikipedia — Heat haze](https://en.wikipedia.org/wiki/Heat_haze)
- [Catlike Coding — Texture distortion (flowmaps)](https://catlikecoding.com/unity/tutorials/flow/texture-distortion/)
