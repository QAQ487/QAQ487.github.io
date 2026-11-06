# MATX-05 · Wet surface

**Aliases:** Wetness; Rain-soaked surface; Puddles; Wet shader

**Group:** Materials & surfaces
**Subcategory:** Surface detail

## What you see

When it rains, surfaces gradually get darker and glossier: stone and earth darken, highlights change from a broad blur to small sharp points, lights stretch long reflections across the ground; puddles reflecting the sky form first in low spots, and after the rain they shrink and the surface slowly returns to a dry matte.

## Not to be confused with

Not rain itself (ENV-04, streaks and splashes in the air) or a water surface (ENV-12, an actual body of water); wetness is a solid material’s response. Not just lowering roughness (REN-08 Roughness): wetness also darkens porous materials, while metals barely darken.

## Use it for

Rainy and stormy scenes, dripping caves, riverbanks and beaches, the mood shift after rain.

## Tunable parameters

wetness 0–1 · darkening amount (porosity) · roughness scale · puddle level vs height map · ripple normal on puddles · drying speed

## Request prompt

Add a global wetness parameter to the game (0–1, rising to 1 within 20 s of rain starting and back to 0 within 60 s after it stops): multiply porous materials’ base colour by lerp(1, 0.55, wetness) and roughness by lerp(1, 0.25, wetness); where the terrain height map is below “water level = wetness × 0.4”, form puddles with roughness 0.02 and near-black albedo that show sky and light reflections. Leave metals’ base colour unchanged.

## Implementation hint

In the surface shader: albedo *= lerp(1, darken, wetness*porosity); roughness = lerp(roughness, 0.05, wetness); puddle = saturate((level - height)/0.05) → roughness 0.02, normal flattened (plus animated ripple normals, ENV-13). Reflections come from probes/SSR (REN-23/REN-24). Drive porosity by a mask so metals and paint stay unchanged.

## Related

- [ENV-04](ENV-04.md) — Rain
- [ENV-12](ENV-12.md) — Water surface
- [ENV-13](ENV-13.md) — Ripples
- [REN-08](REN-08.md) — Roughness/Smoothness/Glossiness
- [MATX-04](MATX-04.md) — Height-blend texture splatting
- [DIAG-08](DIAG-08.md) — Box-projected (parallax-corrected) cubemaps
- [DIAG-10](DIAG-10.md) — Specular anti-aliasing (Toksvig / geometric roughness)

## References

- [Sébastien Lagarde — Water drop 3a: Physically based wet surfaces](https://seblagarde.wordpress.com/2013/03/19/water-drop-3a-physically-based-wet-surfaces/)
