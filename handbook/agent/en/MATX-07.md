# MATX-07 · Hologram shader

**Aliases:** Hologram effect; Holographic material; Holo shader

**Group:** Materials & surfaces
**Subcategory:** Special materials

## What you see

The object looks made of light: usually one cool colour (cyan, blue or green), translucent and additive; horizontal scanlines scroll slowly upward, silhouette edges are brighter than the faces pointing at you; occasionally it flickers and whole horizontal bands jump sideways like signal interference, often with a projector light cone at the base.

## Not to be confused with

Not a dissolve (VFX-04, an object gradually disappearing) or a teleport effect (VFX-15, a one-off appear/leave); a hologram is an ongoing material state. Not an X-ray silhouette (MATX-10, which appears only when occluded) or a CRT filter (PP-03, applied to the whole screen).

## Use it for

Sci-fi interfaces and comms screens, projected maps, remote characters, build previews, tutorial demonstration ghosts.

## Tunable parameters

tint · Fresnel power · scanline spacing & speed · base opacity · glitch frequency/duration/band count · vertex jitter · additive vs alpha

## Request prompt

Add a hologram material to the game: colour #6ff0ff, drawn with additive blending; opacity = 0.25 + 0.75 × Fresnel (power 2); scanlines every 4 px of world-space y, scrolling upward at 20 px/s; every 0.8–2 s trigger a 0.1 s glitch in which 3 random horizontal bands shift ±6 px and overall brightness flickers to 60%.

## Implementation hint

Unlit, additive (or premultiplied alpha), ZWrite off. a = base + fresnel(pow(1 - saturate(dot(N,V)), p)); a *= 0.6 + 0.4*step(0.5, frac(worldPos.y/spacing + time*speed)); glitch: offset vertex x by (hash(floor(worldPos.y/bandH) + floor(time*rate)) - 0.5)*amp while glitchActive. Add bloom (REN-29) for the glow.

## Related

- [VFX-04](VFX-04.md) — Dissolve
- [VFX-15](VFX-15.md) — Spawn / teleport effect
- [MATX-10](MATX-10.md) — X-ray silhouette
- [PP-03](PP-03.md) — CRT filter
- [REN-06](REN-06.md) — Fresnel effect/Fresnel reflectance
- [NAV-05](NAV-05.md) — Placement ghost
- [REN-16](REN-16.md) — Alpha blending/Translucency

## References

- [Cyanilux — Hologram shader breakdown](https://www.cyanilux.com/tutorials/hologram-shader-breakdown/)
- [Unity Shader Graph — Fresnel Effect node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Fresnel-Effect-Node.html)
