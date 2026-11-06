# DIAG-08 · Box-projected (parallax-corrected) cubemaps

**Aliases:** 反射位置不對; 室內反射跟着鏡頭走; 地板反射漂浮; Reflections slide with the camera; Reflections don't line up with the room; Floating reflections; Parallax-corrected cubemap; Box projection; Local cubemap; ボックス投影; キューブマップ

**Group:** Image quality & render diagnostics
**Subcategory:** Reflection alignment

## What you see

Indoor floors, metal and glossy walls reflect the room, but as the camera moves the reflected windows and doors slide along and are the wrong size, as if the room were infinitely far away. A reflection probe's cubemap is, by default, looked up as an environment at infinity. With box projection the reflection ray is first intersected with a box matching the room, and the cubemap is sampled in the direction from the probe to that hit point, so reflected windows stay put and grow correctly as you approach a wall.

## Not to be confused with

Not screen-space reflections (REN-24, which can only reflect what is on screen), not planar reflections (DIAG-09, which render a mirrored view), not the basic definition of reflection probes / IBL (REN-23), and not light probes (LGT-07, which handle diffuse indirect light).

## Use it for

Boxy interiors, corridors, garages, subway stations; glossy floors and metal walls; platforms where per-frame reflection rendering indoors is too expensive.

## Tunable parameters

probe capture position · box extents (inner/outer) · box projection on/off · roughness fade of the correction · probe blend distance · capture resolution and update mode (baked / on change)

## Request prompt

Enable box projection on the game's interior reflection probes: give each probe a box aligned to the room's walls (slightly inside them to avoid leaks); in the shader, cast the reflection direction from the surface position against the box, take the nearest exit point, and use (hit − probe centre) as the cubemap lookup direction; blend towards the uncorrected direction as roughness rises so blurry reflections don't show hard wrong seams; blend between probes over 1 m. Walking through the room, the reflected windows must no longer slide with the camera.

## Implementation hint

Per pixel: R = reflect(−V, N); compute ray-box exit t from P along R with the slab method (t = min over axes of max((boxMax − P)/R, (boxMin − P)/R)); hit = P + R·t; lookupDir = hit − probeCentre; sample cube(lookupDir, mip from roughness). Optionally lerp(lookupDir, R, roughness²) to soften. Engines expose it as a 'box projection' checkbox on reflection probes; a hand-rolled renderer adds the box min/max and probe centre to the probe constant buffer.

## Related

- [DIAG-09](DIAG-09.md) — Planar reflections
- [LGT-07](LGT-07.md) — Light probes
- [MATX-05](MATX-05.md) — Wet surface
- [REN-23](REN-23.md) — Reflections/Image-Based Lighting (IBL)/Reflection probes
- [REN-24](REN-24.md) — Screen-Space Reflections/SSR

## References

- [Unity Manual — Reflection probe troubleshooting (Box Projection)](https://docs.unity3d.com/6000.0/Documentation/Manual/AdvancedRefProbe.html)
- [Unity マニュアル — リフレクションのトラブルシューティング（ボックス投影）](https://docs.unity3d.com/ja/current/Manual/AdvancedRefProbe.html)
- [Sébastien Lagarde — Image-based lighting approaches and parallax-corrected cubemap](https://seblagarde.wordpress.com/2012/09/29/image-based-lighting-approaches-and-parallax-corrected-cubemap/)
- [Godot docs — Reflection probes (box projection)](https://docs.godotengine.org/en/stable/tutorials/3d/global_illumination/reflection_probes.html)
- [Wikipedia — Cube mapping](https://en.wikipedia.org/wiki/Cube_mapping)
