# MATX-01 · Matcap

**Aliases:** Material capture; Lit sphere; Sphere-mapped shading

**Group:** Materials & surfaces
**Subcategory:** Shading models & material parameters

## What you see

All of the object’s shading, highlights and reflections come from one picture of a lit sphere: whichever way a surface faces relative to the camera picks the matching spot on the sphere image. However the object rotates, the bright side stays in the same screen direction, as if the light were glued to the camera; changing the scene lights has no effect at all.

## Not to be confused with

Not unlit (REN-02 Unlit, flat colour with no shading); a matcap has full shading and highlights, they are just baked into the sphere image. Not PBR (REN-01 PBR, which responds to real lights and the environment).

## Use it for

Sculpt and modelling previews, stylised or hand-painted characters, very cheap metal, ceramic or candy looks on mobile, 3D icons in UI.

## Tunable parameters

matcap image · view-space normal (with or without perspective correction) · tint · blend with lit shading · normal map on/off

## Request prompt

Add a matcap material to the game: transform the normal to view space and sample a 256×256 sphere image at uv = normalView.xy × 0.5 + 0.5 (switchable clay, chrome and candy images), multiplied by a base colour #ffffff; ignore scene lights entirely. Add a 0–1 “blend to regular lighting” parameter so an object can cross-fade from matcap to normal lighting during a cutscene.

## Implementation hint

uv = mul((float3x3)View, N).xy * 0.5 + 0.5 (flip y as needed); colour = matcapTex.Sample(uv) * tint. For fewer edge distortions use the reflected view vector instead of N. No light loop, so it costs one texture fetch per pixel. Normal maps still work: perturb N before the view transform.

## Related

- [REN-02](REN-02.md) — Unlit/Unshaded
- [REN-01](REN-01.md) — Physically Based Rendering/PBR/PBS
- [MATX-02](MATX-02.md) — Clear coat, sheen and iridescence
- [MATX-07](MATX-07.md) — Hologram shader

## References

- [Blender Manual — Workbench lighting (MatCap)](https://docs.blender.org/manual/en/latest/render/workbench/lighting.html)
- [nidorx/matcaps — MatCap texture library and explanation (GitHub)](https://github.com/nidorx/matcaps)
- [Wikipedia — Reflection mapping (sphere mapping)](https://en.wikipedia.org/wiki/Reflection_mapping)
