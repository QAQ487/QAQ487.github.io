# VFX-06 · Shockwave

**Aliases:** Ring wave; Shock ring; Distortion ring; Impact ring

**Group:** VFX & particles
**Subcategory:** Combat VFX

## What you see

On a heavy hit, landing or explosion, a ring expands from the centre: the image is pushed and distorted around the ring, which has a bright edge that fades and thins as it grows.

## Not to be confused with

Not water ripples (ENV-13, several small continuous rings); a shockwave is usually one fast ring. Not screen shake (FB-07, moving the whole camera).

## Use it for

Sells the force and radius of heavy hits, boss landings, explosions and skill casts; also hints at the area of effect.

## Tunable parameters

max radius · duration · ring width · displacement strength · ring colour · easing (ease-out)

## Request prompt

In your game, when the battering ram hits the gate or a boss lands, emit a shockwave from the impact point: radius 0→60 px over 0.4 s, ring width 6 px thinning out, pixels inside the ring displaced outward by up to 3 px, plus a 1-px white ring that fades; add a few dust particles.

## Implementation hint

Render the scene to an offscreen RT, then a full-screen (or bounding-quad) PS: d = length(uv - c); k = ring profile (smoothstep band around r(t)); uv2 = uv + normalize(uv - c) * k * strength; sample scene at uv2. Draw the bright rim as a separate additive ring sprite. Support several simultaneous waves via a small constant-buffer array.

## Related

- [FB-07](FB-07.md) — Trauma-based screen shake
- [ENV-13](ENV-13.md) — Ripples
- [VFX-09](VFX-09.md) — Explosion
- [FX-07](FX-07.md) — Distortion / Refraction
- [NAV-17](NAV-17.md) — Scan pulse / Sonar ping
- [ACT-55](ACT-55.md) — Ground pound & dive cancel

## References

- [Harry Alisavakis — My take on shaders: shockwave effect](https://halisavakis.com/my-take-on-shaders-shockwave-effect/)
- [Wikipedia — Shock wave (physical background)](https://en.wikipedia.org/wiki/Shock_wave)
- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
