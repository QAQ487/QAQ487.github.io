# LGT-09 · Contact shadows

**Aliases:** Screen-space shadows; Micro shadows; Contact hardening

**Group:** Lighting & shadows
**Subcategory:** Indirect light & shadows

## What you see

A short, crisp shadow is added where objects touch the ground or walls: a character's feet, the bottom of a cup and the gaps between fingers no longer look like they float. When the main shadow map is too low-res or detached by bias, the clearest improvement is a solid dark line under the feet.

## Not to be confused with

Not ambient occlusion (REN-21 Ambient occlusion, which darkens crevices regardless of direction); contact shadows are cast along the light direction and move when the light moves. Not a blob shadow (LGT-10, a fixed disc on the ground).

## Use it for

Grounding characters, small details (grass, pebbles, props), distant or fine detail where shadow-map resolution is insufficient.

## Tunable parameters

ray length · step count · thickness · fade with distance · which lights · jitter + temporal filter

## Request prompt

Add contact shadows to the game's key light: in screen space, march the depth buffer from each pixel towards the light in 16 steps over 0.3 m; if a sample is closer to the camera than the ray and within 0.05 m thickness, mark it shadowed; multiply the result with the shadow map. Enable only for the main directional light and the nearest 4 point lights.

## Implementation hint

Fullscreen or per-light pass: reconstruct view position from depth, ray-march towards the light in view space, project each step to screen, compare against the depth buffer with a thickness threshold. Jitter the start per pixel and denoise/TAA to hide banding. Multiply into the light's shadow term.

## Related

- [LGT-08](LGT-08.md) — Shadow mapping and cascaded shadow maps
- [REN-21](REN-21.md) — Ambient occlusion/AO/Occlusion map
- [LGT-10](LGT-10.md) — Blob shadow
- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra

## References

- [Unreal Engine docs — Contact Shadows](https://dev.epicgames.com/documentation/en-us/unreal-engine/contact-shadows-in-unreal-engine)
- [Unity HDRP docs — Contact Shadows](https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@17.0/manual/Override-Contact-Shadows.html)
