# DIAG-03 · Mipmapping and anisotropic filtering

**Aliases:** 遠地閃格; 遠處地面閃爍; 地板摩爾紋; Texture shimmering; Moiré on distant floors; Sparkling textures; Blurry floors at grazing angles; Trilinear filtering; ミップマップ; トリリニアフィルタリング; 異方性フィルタリング

**Group:** Image quality & render diagnostics
**Subcategory:** Texture sampling

## What you see

As the camera moves, distant ground, checker floors, grass or fence textures flicker constantly and show rippling moiré like TV static: one screen pixel covers many texels but samples only one. Enabling mipmaps (a chain of pre-shrunk copies of the texture) stops the shimmer but makes ground seen at a grazing angle very blurry; adding anisotropic filtering makes that oblique ground sharp again without shimmering.

## Not to be confused with

REN-37 defines aliasing and shimmering as a whole; this entry covers the texture-sampling cause and its fix — geometric edge jaggies still need MSAA/TAA. It is also not tile seams (PIX-26). This shimmer comes from detail inside the texture: it looks fine when still and sparkles as soon as the camera moves. Pixel-art games usually turn mipmaps off on purpose (PIX-26), so keep the two cases apart.

## Use it for

Large repeating ground, roads, floors, walls and fences in 3D games; especially visible with top-down 3D and third-person cameras.

## Tunable parameters

mip chain on/off per texture class · min/mag/mip filter (point, bilinear, trilinear) · max anisotropy (1–16) · mip LOD bias · alpha-tested foliage mip handling (coverage-preserving mips)

## Request prompt

Fix the shimmering distant ground in the game: generate a full mip chain for every 3D world texture at import (for premultiplied-alpha textures, after premultiplying — DIAG-01); sample with trilinear filtering (linear between mips), and enable 4×–16× anisotropic filtering on ground and wall materials; keep UI and pixel-art textures without mips and with nearest filtering. While the camera slowly dollies, the distant checker floor must not shimmer, and nearby oblique ground must not smear.

## Implementation hint

Generate mips offline (or with the API's generate-mips call / the engine's import option). Sampler: min/mag/mip linear for trilinear; anisotropic filter with MaxAnisotropy 4–16 for ground and walls (e.g. D3D11_SAMPLER_DESC.Filter = ANISOTROPIC; GL_TEXTURE_MAX_ANISOTROPY; VkSamplerCreateInfo.anisotropyEnable; or the engine texture's aniso level). Keep a separate point/no-mip sampler for UI and pixel art. Avoid a negative LOD bias except to counter TAA blur. Debug with a mip-level colour visualisation.

## Related

- [PIX-26](PIX-26.md) — Texture bleeding and atlas padding
- [DIAG-01](DIAG-01.md) — Premultiplied alpha
- [NPR-11](NPR-11.md) — PS1-style rendering
- [REN-37](REN-37.md) — Aliasing/Jaggies/Shimmering/Specular aliasing
- [DIAG-10](DIAG-10.md) — Specular anti-aliasing (Toksvig / geometric roughness)
- [DIAG-05](DIAG-05.md) — Z-fighting / depth precision / reversed-Z

## References

- [Microsoft Learn — D3D11_SAMPLER_DESC (filter, MaxAnisotropy)](https://learn.microsoft.com/en-us/windows/win32/api/d3d11/ns-d3d11-d3d11_sampler_desc)
- [Wikipedia — Mipmap](https://en.wikipedia.org/wiki/Mipmap)
- [Wikipedia — Anisotropic filtering](https://en.wikipedia.org/wiki/Anisotropic_filtering)
- [Wikipedia (日本語) — 異方性フィルタリング](https://ja.wikipedia.org/wiki/%E7%95%B0%E6%96%B9%E6%80%A7%E3%83%95%E3%82%A3%E3%83%AB%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0)
