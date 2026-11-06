# LGT-08 · Shadow mapping and cascaded shadow maps

**Aliases:** Shadow maps; CSM; PSSM; Cascades; Parallel-split shadow maps

**Group:** Lighting & shadows
**Subcategory:** Indirect light & shadows

## What you see

The mainstream real-time shadow method: render a depth image from the light's point of view, then test whether each pixel is occluded. Large outdoor scenes split the distance in front of the camera into several slices (cascades), high resolution near and low far; the tell-tale signs are crisp nearby shadows, coarse or jagged distant shadows, and sometimes visible seams between cascades.

## Not to be confused with

The shadow is the effect (REN-25 Cast shadows); shadow mapping is the method. Not contact shadows (LGT-09, which add only small shadows at contact points) and not baked lighting (LGT-06, which does not follow moving objects).

## Use it for

Large outdoor scenes, a moving sun in a day-night cycle, dynamic objects that need real-time shadows.

## Tunable parameters

cascade count · split distances / lambda · resolution per cascade · depth bias & normal bias · PCF kernel · blend band · texel snapping

## Request prompt

Use 3 shadow cascades for the game's sun: 2048×2048 each, split at 0–12 m, 12–40 m and 40–120 m (log/linear blend ≈ 0.7); snap each cascade's light projection to its texel size so shadow edges do not shimmer as the camera moves; blend cascades over a 2 m transition band; soften edges with 3×3 PCF; add a debug mode that tints cascades red, green and blue.

## Implementation hint

Per cascade: fit an orthographic light frustum around the camera sub-frustum, render depth to a slice of a Texture2DArray. In the pixel shader pick the cascade by view depth, project into light space and compare with SampleCmp (comparison sampler) for hardware PCF. Tune depth/slope bias against acne vs peter-panning.

## Related

- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra
- [LGT-09](LGT-09.md) — Contact shadows
- [LGT-06](LGT-06.md) — Baked lighting
- [ENV-01](ENV-01.md) — Day-night cycle
- [DIAG-05](DIAG-05.md) — Z-fighting / depth precision / reversed-Z

## References

- [Wikipedia — Shadow mapping](https://en.wikipedia.org/wiki/Shadow_mapping)
- [LearnOpenGL — Cascaded shadow mapping](https://learnopengl.com/Guest-Articles/2021/CSM)
- [Unity Manual — Shadow cascades](https://docs.unity3d.com/Manual/shadow-cascades.html)
- [Godot docs — 3D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/3d/lights_and_shadows.html)
