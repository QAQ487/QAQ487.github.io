# NPR-11 · PS1-style rendering

**Aliases:** PS1 style; PSX look; Vertex snapping / jitter; Affine texture mapping; Retro 3D

**Group:** Stylized rendering (NPR)
**Subcategory:** Retro & lo-fi

## What you see

When 3D objects move or the camera turns, polygon vertices jump in steps and edges shimmer; textures on large floor polygons near the camera bend and “swim”; textures are low-res with visible texels; sometimes objects sort wrongly and flicker through each other.

## Not to be confused with

Not low-poly flat shading (NPR-12, just few faces with one colour each; the image itself is stable) nor 3D pixel art (NPR-13, with a deliberately aligned pixel grid and outlines). PS1 style is identified by old-hardware artefacts: jumping vertices and warping textures.

## Use it for

Retro horror, nostalgic 3D action, a low-budget 90s-console mood, trippy or uneasy sequences.

## Tunable parameters

snap grid resolution · affine strength / subdivision size · texture size & filtering · depth sort vs z-buffer · colour depth & dither · fog range

## Request prompt

Add PS1-style rendering to the game: (1) in the vertex shader snap projected screen positions to a 320×240 integer grid (or a 2 px grid); (2) interpolate texture coordinates without perspective correction (affine: linear UVs in screen space; subdivide large triangles to ≤ 32 px to limit warping); (3) textures 64×64 or smaller, nearest sampling, no mipmaps; (4) optional: disable the depth buffer and sort polygons by centre depth; (5) 15-bit colour with 4×4 dithering; (6) fog fading linearly from 8 to 20 units.

## Implementation hint

Vertex shader: clip = MVP*pos; ndc = clip.xy/clip.w; ndc = round(ndc*grid/2)/(grid/2); clip.xy = ndc*clip.w. Affine UVs: pass uv*clip.w and clip.w as varyings with noperspective (or equivalent) interpolation and divide in the fragment shader — or simply mark uv noperspective. Point-sample textures, disable mipmaps.

## Related

- [NPR-12](NPR-12.md) — Low-poly flat shading
- [NPR-13](NPR-13.md) — 3D pixel art (pixelated 3D)
- [PIX-02](PIX-02.md) — Pixel snapping
- [PP-03](PP-03.md) — CRT filter
- [PP-10](PP-10.md) — Sharpening
- [REN-07](REN-07.md) — Base color/Albedo/Diffuse color

## References

- [David Colson — Building a PS1 style retro 3D renderer](https://www.david-colson.com/2021/11/30/ps1-style-renderer.html)
- [Wikipedia — Texture mapping (affine vs perspective-correct)](https://en.wikipedia.org/wiki/Texture_mapping)
- [Wikipedia — PlayStation technical specifications](https://en.wikipedia.org/wiki/PlayStation_technical_specifications)
