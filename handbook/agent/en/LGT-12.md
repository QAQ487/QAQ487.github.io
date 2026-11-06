# LGT-12 · Height fog

**Aliases:** Exponential height fog; Ground fog; Altitude fog; Valley fog

**Group:** Lighting & shadows
**Subcategory:** Atmosphere & volume

## What you see

Fog density changes with altitude: thickest down low (valleys, rivers, the ground) and thinner higher up, so mountaintops and towers stand clear above the fog layer; from above you see a sea of fog, from the valley floor everything is hazy.

## Not to be confused with

Not plain distance fog (REN-26 Fog, which thickens only with distance from the camera, regardless of height) and not volumetric lighting (REN-27 Volumetric lighting, visible light shafts in the air). Nothing to do with fog of war (ENV-15, hiding game information).

## Use it for

Morning valleys, swamps, creepy ground fog, emphasising terrain height, hiding the edge of distant terrain.

## Tunable parameters

base density · height falloff · fog base height · start distance · colour & sun-direction inscatter colour · max opacity

## Request prompt

Add exponential height fog to the game: density = 0.06 × e^(−(height − 0 m) × 0.35); integrate along the view ray analytically in the pixel shader (no ray marching); fog colour #b8c4d0, warmer #f0d8b0 towards the sun; allow the fog height to rise smoothly from 0 m to 4 m over 5 s for story moments. The sky is not affected by height fog.

## Implementation hint

Closed-form integral of density ρ(h)=a·e^(−b·h) along the ray from camera to the pixel: fog = a·e^(−b·h_cam)·(1 − e^(−b·Δh))/(b·Δh)·dist (guard Δh≈0); opacity = 1 − e^(−fog). Apply in the forward pixel shader or a fullscreen pass that reconstructs world position from depth.

## Related

- [REN-26](REN-26.md) — Fog/Distance fog/Depth fog
- [REN-27](REN-27.md) — Volumetric lighting/Volumetric fog/Light shafts/God rays
- [LGT-13](LGT-13.md) — Atmospheric scattering
- [ENV-15](ENV-15.md) — Fog of war

## References

- [Unreal Engine docs — Exponential Height Fog](https://dev.epicgames.com/documentation/en-us/unreal-engine/exponential-height-fog-in-unreal-engine)
- [Godot docs — Environment and post-processing (fog)](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
