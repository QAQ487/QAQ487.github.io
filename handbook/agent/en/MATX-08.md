# MATX-08 · Force field / Shield

**Aliases:** Energy shield; Bubble shield; Intersection highlight; Depth-fade edge; Shield impact ripple

**Group:** Materials & surfaces
**Subcategory:** Special materials

## What you see

A nearly transparent energy sphere or dome surrounds a character or base: invisible face-on, bright at the silhouette edges (Fresnel); wherever it intersects the ground, a wall or anything passing through it, a glowing intersection line appears; the surface often carries a hex grid or flowing pattern, and a hit sends a ripple ring outward from the impact point.

## Not to be confused with

Not an aura (VFX-14, a soft glow hugging the character with no solid boundary) or a shockwave (VFX-06, a one-off expanding ring); a force field has a clear shape and intersection lines. Not screen distortion (PP-09, just one optional ingredient) or a hologram (MATX-07, where the object itself turns to light).

## Use it for

Energy shields and invulnerability, base shields, map boundaries and no-go zones, portal membranes, a boss’s shielded phase.

## Tunable parameters

tint · Fresnel power · intersection width (depth fade distance) · pattern (hex / noise) & scroll speed · hit ripple speed/width/lifetime · distortion amount

## Request prompt

Add a 2 m-radius sphere shield to the game: colour #5cc8ff, additive, opacity = 0.08 + Fresnel (power 3) × 0.8; use the depth buffer to get the distance to the scene behind and brighten where it is under 0.3 m into an intersection line (intensity 1.5); overlay a slowly flowing 0.25 m hex grid; on hit, emit a ripple ring from the impact point growing 0→2.5 m over 0.5 s that lights up the hex cells it passes.

## Implementation hint

Transparent pass after opaques, ZWrite off, both faces drawn. edge = 1 - saturate((sceneDepthLinear - pixelDepthLinear)/width) — needs the depth texture. a = base + fresnel + edge*k + ripple, ripple = smoothstep band of (distance(worldPos, hitPos) - t*speed). Hit positions are passed as a small array of (pos, startTime). Optional screen-space distortion (PP-09) behind it.

## Related

- [VFX-14](VFX-14.md) — Aura
- [VFX-06](VFX-06.md) — Shockwave
- [PP-09](PP-09.md) — Screen-space distortion
- [MATX-07](MATX-07.md) — Hologram shader
- [REN-06](REN-06.md) — Fresnel effect/Fresnel reflectance

## References

- [Cyanilux — Forcefield shader breakdown](https://www.cyanilux.com/tutorials/forcefield-shader-breakdown/)
- [Unity Shader Graph — Scene Depth node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Scene-Depth-Node.html)
- [Unity Shader Graph — Fresnel Effect node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Fresnel-Effect-Node.html)
