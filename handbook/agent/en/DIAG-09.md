# DIAG-09 · Planar reflections

**Aliases:** 鏡子沒有倒影; 水面反射在畫面邊緣消失; 倒影缺一塊; Mirror shows nothing; Reflections vanish at screen edges; Missing reflection of off-screen objects; Mirror reflection; Reflection camera; 平面反射

**Group:** Image quality & render diagnostics
**Subcategory:** Reflection alignment

## What you see

A character stands in front of a mirror, polished marble floor or calm lake. With screen-space reflections, anything off-screen or hidden behind the character can't be reflected and the reflection breaks off at the screen edge; with a reflection probe, the reflection doesn't follow the moving character. Planar reflections mirror the camera across the reflecting plane, render the scene again from there (usually at lower resolution), and map the result back onto the surface, so the reflection is complete and accurate, character included.

## Not to be confused with

Not screen-space reflections (REN-24, limited to pixels already on screen), not box-projected cubemaps (REN-23, static and approximate), and not ordinary reflection probes (REN-23). Planar reflections are accurate but cost an extra scene render per reflecting plane, so they suit only a few genuinely flat surfaces.

## Use it for

Mirrors, calm water, glossy stage floors, puzzles or cinematic shots that need a clear reflection.

## Tunable parameters

reflection plane (height/normal) · render-target resolution scale · layers/objects included · oblique clip plane · shadows/post in the reflection pass · update rate · distortion strength · fade at grazing angles (Fresnel)

## Request prompt

Add a planar reflection to the game's lake: build a reflection matrix from the water height and mirror the main camera below the surface; render the scene once at half resolution into a reflection texture, using an oblique near plane to clip everything below the water; draw only opaque objects and the sky, with shadows and post-processing off to save cost; in the water shader sample the reflection texture in screen space and offset it by 2–4 pixels from the normal map for ripples; update only while the water is visible. When the character walks to the water's edge the reflection must be complete and in sync.

## Implementation hint

Reflection matrix for plane (n, d): M = I − 2·n·nᵀ (with translation −2·d·n); viewReflect = view × M; flip winding (cull front instead of back). Use an oblique near plane (Lengyel's method) so geometry below the plane is clipped by the projection itself. Render to an RT, then in the surface shader sample with screen UV (or projective UV from the reflection camera), add normal-based offset, and lerp with the probe/SSR result by Fresnel. Engines expose this as a planar-reflection actor/component or a reflection-camera script.

## Related

- [REN-24](REN-24.md) — Screen-Space Reflections/SSR
- [REN-23](REN-23.md) — Reflections/Image-Based Lighting (IBL)/Reflection probes

## References

- [Unreal Engine docs — Planar reflections](https://dev.epicgames.com/documentation/en-us/unreal-engine/planar-reflections-in-unreal-engine)
- [Unreal Engine ドキュメント — 平面反射](https://dev.epicgames.com/documentation/ja-jp/unreal-engine/planar-reflections-in-unreal-engine)
