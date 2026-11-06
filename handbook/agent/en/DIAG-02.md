# DIAG-02 · Linear workflow / sRGB

**Aliases:** Gamma-correct rendering; Linear vs gamma blending; sRGB render target; 光暈疊加變髒; 漸層中間發暗; Muddy light falloff; Dark midtones in blends; Double gamma; Washed-out colours; リニアワークフロー; ガンマ補正

**Group:** Image quality & render diagnostics
**Subcategory:** Colour space & dynamic range

## What you see

Where two lights overlap the area turns grey and muddy instead of brighter; the middle of gradients, crossfades and blurs is noticeably too dark; light falloff from bright to dark is too fast and hard. Or the opposite: the whole picture looks washed out, as if behind fog. These are usually colour-space mismatches: lighting and blending should be computed in linear space, colour textures converted from sRGB to linear on read, and the result converted back to sRGB once, and only once, at output.

## Not to be confused with

Not tone mapping (DIAG-04, which handles brightness above 1.0) and not a deliberate colour grade (the PP category). Linear-space bugs appear even with no post-processing at all, and the symptoms concentrate in the middle of blends and gradients.

## Use it for

Any scene with lighting, alpha blending, crossfades (TRN-03), blur or bloom — especially when adding a second dynamic light suddenly makes the image look dirty.

## Tunable parameters

which textures are sRGB vs linear (colour vs data) · where the single linear→sRGB conversion happens (hardware sRGB target or final shader) · UI blending space · vertex-colour space

## Request prompt

Set up a linear workflow for the game: tag colour textures (albedo, UI images) as sRGB so sampling converts them to linear; keep data textures (normals, roughness, masks) linear with no conversion; do lighting, blending and blur in linear space; finally write to an sRGB-format swap chain or render target, or convert manually once in the final pass — never twice. Overlapping lights must get brighter, not greyer.

## Implementation hint

Use sRGB texture/view formats for colour assets (e.g. *_UNORM_SRGB in D3D11/12, GL_SRGB8_ALPHA8 in OpenGL, VK_FORMAT_*_SRGB in Vulkan, the sRGB/colour-texture import flag in most engines) and plain UNORM for data maps. Render lighting into a linear target (ideally float, DIAG-04), then write the final image through an sRGB view or apply pow(x, 1/2.2)/the exact sRGB curve in the last pass. Debug by viewing a 50% grey ramp and two overlapping lights: if overlap is darker than either light alone, conversion is missing or doubled.

## Related

- [DIAG-04](DIAG-04.md) — HDR scene buffer and tone-mapping order
- [TRN-03](TRN-03.md) — Crossfade
- [LGT-06](LGT-06.md) — Baked lighting
- [PP-04](PP-04.md) — Posterization
- [DIAG-01](DIAG-01.md) — Premultiplied alpha

## References

- [GPU Gems 3, ch. 24 — The importance of being linear](https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-24-importance-being-linear)
- [DirectX Tool Kit wiki — DeviceResources (sRGB back buffer)](https://github.com/microsoft/DirectXTK/wiki/DeviceResources)
- [Wikipedia — sRGB](https://en.wikipedia.org/wiki/SRGB)
- [Unity Manual — Linear color space](https://docs.unity3d.com/6000.0/Documentation/Manual/linear-color-space.html)
