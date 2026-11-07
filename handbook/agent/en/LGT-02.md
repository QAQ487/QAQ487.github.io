# LGT-02 · Light attenuation

**Aliases:** Falloff; Distance falloff; Inverse-square falloff; Light range

**Group:** Lighting & shadows
**Subcategory:** Light sources

## What you see

How a light gets darker with distance: linear falloff gives an evenly fading pool that ends abruptly; inverse-square falloff is very bright near the source, drops quickly and leaves a long tail; adding a radius window makes the light reach zero smoothly at a chosen radius.

## Not to be confused with

Not a light type (LGT-01); attenuation only describes brightness versus distance. Not fog (REN-26 Fog, which shifts distant things towards the fog colour); attenuation changes only the light's intensity, not the object's colour.

## Use it for

Shaping how far a light seems to reach (torch pool size, dark gaps between street lamps), performance (skip work beyond the radius), the look of 2D light pools.

## Tunable parameters

curve (linear / inverse-square / smoothstep / custom LUT) · radius · windowing exponent · intensity

## Request prompt

Switch the game's point lights to inverse-square with a radius window: intensity = 1 / (d² + 1) × (1 − (d / r)⁴)² (clamped 0–1), where r is the light radius; torches r = 6 m, street lamps r = 10 m. In debug mode draw iso-lines at 0.25 steps to confirm the light reaches zero smoothly at the radius with no visible hard edge.

## Implementation hint

Evaluate per pixel from the distance to the light. Common windowed form: falloff = saturate(1 − (d/r)^4)^2 / (d² + 1). The radius also bounds the light for culling (LGT-01). For stylised 2D, sample a 1D falloff texture/LUT instead of a formula.

## Related

- [LGT-01](LGT-01.md) — Directional, point and spot lights
- [PIX-21](PIX-21.md) — Normal-mapped sprites
- [REN-26](REN-26.md) — Fog/Distance fog/Depth fog

## References

- [LearnOpenGL — Light casters (directional, point, spot; attenuation)](https://learnopengl.com/Lighting/Light-casters)
- [Wikipedia — Inverse-square law](https://en.wikipedia.org/wiki/Inverse-square_law)
- [Godot docs — 3D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/3d/lights_and_shadows.html)
