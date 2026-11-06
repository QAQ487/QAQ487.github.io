# PIX-26 · Texture bleeding and atlas padding

**Aliases:** Tile seams; Atlas bleeding; Edge extrusion; Half-texel seams

**Group:** 2D & pixel-art techniques
**Subcategory:** Display & scaling

## What you see

As the camera moves or zooms, thin lines flicker between tiles of a tile map or between sprite parts: sampling is reading the neighbouring image in the atlas (a magenta key colour or another terrain). The fix is to extrude each atlas cell's edge pixels by 1–2 px and use nearest sampling at whole-pixel positions.

## Not to be confused with

Not tiles that do not join in the art itself (an art problem, visible even when still) and not autotiling picking the wrong tile (PIX-17). Bleeding only flashes at certain camera positions, zooms or under bilinear filtering.

## Use it for

Any atlas-based tile map or sprite set; especially common in tile-heavy top-down tile-heavy top-down games.

## Tunable parameters

extrusion width (1–2 px) · sampler filter (point) · vertex snapping · mip-maps off · texel-centre conventions (D3D9 half-texel vs D3D10+)

## Request prompt

Fix tile seams in the game's map: when packing the atlas, extrude every 16×16 tile by 1 px on each side (duplicate edge pixels) with UVs pointing at the inner 16×16; use point samplers with CLAMP; align tile vertices to whole base-res pixels, draw into the 320×180 render target and integer-upscale. No lines may appear at any camera position.

## Implementation hint

Atlas packer: copy border texels outward (extrude). Sampler: point/nearest filtering, mip-maps off. Do not add a −0.5 texel UV offset on modern APIs (that was a legacy D3D9 rule). If the camera ever zooms by a non-integer factor, render tiles to the base-res RT first so the seam problem cannot reappear in the upscale.

## Related

- [PIX-01](PIX-01.md) — Integer scaling
- [PIX-17](PIX-17.md) — Autotiling
- [PIX-02](PIX-02.md) — Pixel snapping
- [DIAG-01](DIAG-01.md) — Premultiplied alpha
- [DIAG-03](DIAG-03.md) — Mipmapping and anisotropic filtering
- [VFX-20](VFX-20.md) — Flipbook frame blending / motion-vector flipbook

## References

- [Wikipedia — Texture atlas](https://en.wikipedia.org/wiki/Texture_atlas)
- [Microsoft Learn — D3D11_SAMPLER_DESC (point vs linear filtering)](https://learn.microsoft.com/en-us/windows/win32/api/d3d11/ns-d3d11-d3d11_sampler_desc)
- [Microsoft Learn — Directly mapping texels to pixels (D3D9 half-texel note; D3D10+ differs)](https://learn.microsoft.com/en-us/windows/win32/direct3d9/directly-mapping-texels-to-pixels)
- [Unity — 2D Pixel Perfect package manual](https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html)
