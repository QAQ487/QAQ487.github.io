# LGT-07 · Light probes

**Aliases:** Irradiance probes; Probe grid; Light probe group; Spherical harmonics lighting

**Group:** Lighting & shadows
**Subcategory:** Indirect light & shadows

## What you see

Many invisible sample points (probes) are placed in the scene ahead of time, each storing "light arriving from every direction"; moving characters interpolate their ambient light from nearby probes, so they pick up a red tint near a red light and darken in shadowed areas, matching the baked background.

## Not to be confused with

Not reflection probes (REN-23 Reflections / IBL, which capture a sharp environment image for reflections); light probes store only low-frequency diffuse light. Not lightmaps (REN-25, applied to static surfaces); probes are for dynamic objects.

## Use it for

Making moving characters, props and particles sit inside baked lighting; indirect light in open worlds and large interiors.

## Tunable parameters

probe spacing · placement density near light changes · SH order · interpolation (trilinear / tetrahedral) · update (baked / real-time)

## Request prompt

Add light probes to the game's baked scenes: lay a probe grid at 2 m spacing, densified to 0.5 m where light changes quickly (doorways, near lights, shadow edges); store diffuse light per probe as order-2 spherical harmonics (9 coefficients). Each frame, moving characters trilinearly blend the nearest 8 probes and add the result as ambient on top of real-time direct light; a debug mode draws each probe as a small sphere in its colour.

## Implementation hint

Bake irradiance per probe as L2 spherical harmonics (9 RGB coefficients). At run time find the containing cell (grid) or tetrahedron, blend coefficients, then evaluate SH with the surface normal in the vertex or pixel shader. Upload per-object blended SH in a constant buffer.

## Related

- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra
- [REN-23](REN-23.md) — Reflections/Image-Based Lighting (IBL)/Reflection probes
- [REN-20](REN-20.md) — Global illumination/GI/Indirect lighting/Color bleeding
- [LGT-01](LGT-01.md) — Directional, point and spot lights

## References

- [Unity Manual — Light Probes](https://docs.unity3d.com/Manual/LightProbes.html)
- [Unity Manual — Light Probes technical information](https://docs.unity3d.com/Manual/LightProbes-TechnicalInformation.html)
- [Godot docs — Introduction to global illumination](https://docs.godotengine.org/en/stable/tutorials/3d/global_illumination/introduction_to_global_illumination.html)
