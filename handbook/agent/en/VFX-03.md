# VFX-03 · Flowmap

**Aliases:** Flow map; Vector-field distortion; Flow field texture

**Group:** VFX & particles
**Subcategory:** Carriers & techniques

## What you see

The texture of water, lava, mist or energy moves along authored directions — a river bends around a rock and turns at a corner — instead of the whole surface scrolling one way. You can often faintly see two layers of the pattern cross-fading.

## Not to be confused with

Not UV scrolling (VFX-05, the whole texture moving uniformly in one direction); a flowmap gives every pixel its own direction and speed. Not screen distortion (FX-07, refracting the background).

## Use it for

Rivers, waterfall pools, lava, magic energy pools and whirlpools — anything that must flow around things; great for rivers in top-down pixel games.

## Tunable parameters

flow strength · cycle period · pattern tiling · flow texture resolution · noise offset per pixel (hides pulsing)

## Request prompt

Add a flowmap to the game river: an RG texture (R = x, G = y flow, 0.5 = still) describing water flowing around rocks and bridge posts. The shader offsets the water-pattern UV with two phases half a cycle apart and cross-fades them, period 1.5 s; then quantise the result to the palette to stay pixel-art.

## Implementation hint

PS: float2 f = flowTex.Sample(s, uv).rg*2-1; float p0 = frac(t/period), p1 = frac(t/period+0.5); float w = abs(1-2*p0); col = lerp(tex(uv - f*p0*k), tex(uv - f*p1*k), 1-w). Add a noise value to t per pixel to break up the synchronous pulse. Author the flow texture in a paint tool or bake from a path spline.

## Related

- [VFX-05](VFX-05.md) — UV scrolling
- [ENV-12](ENV-12.md) — Water surface
- [ENV-13](ENV-13.md) — Ripples
- [FX-07](FX-07.md) — Distortion / Refraction
- [ENV-20](ENV-20.md) — Surface runoff and edge dripping

## References

- [Catlike Coding — Texture distortion (flowmaps)](https://catlikecoding.com/unity/tutorials/flow/texture-distortion/)
- [Alex Vlachos — Water flow in Portal 2 (SIGGRAPH 2010, PDF)](https://alex.vlachos.com/graphics/Vlachos-SIGGRAPH10-WaterFlow.pdf)
