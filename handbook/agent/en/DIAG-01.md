# DIAG-01 · Premultiplied alpha

**Aliases:** 煙邊黑框; 煙霧黑邊; 透明邊緣黑邊; Dark fringe; Dark halo around sprites; Alpha fringe; PMA; Straight vs premultiplied alpha; 乗算済みアルファ

**Group:** Image quality & render diagnostics
**Subcategory:** Transparency & compositing

## What you see

Semi-transparent textures (smoke, fire, glows, soft-edged sprites) show a black or dark-grey rim around their edges, most visible when scaled, rotated or magnified; or when a whole UI group fades out, overlapping parts darken and reveal the widgets beneath. The texture is stored with straight alpha and its fully transparent texels have black RGB, so filtering blends that black into the edge. Switching to premultiplied alpha (RGB already multiplied by A) with the matching blend equation gives clean edges and lets additive glow and normal transparency share one batch.

## Not to be confused with

Not atlas bleeding (PIX-26: a neighbouring tile is sampled, usually a thin line) and not alpha-test jaggies (REN-17: hard edges with no partial transparency). REN-16 defines alpha blending in general; this entry is about the common straight-vs-premultiplied mismatch.

## Use it for

Any translucent particle, soft-edged sprite, text outline, UI group fade, or layer composited off-screen and then overlaid.

## Tunable parameters

texture alpha mode (straight / premultiplied) per asset · blend equation per material · when premultiply happens (import, not shader) · mip generation order · group-opacity path (off-screen layer)

## Request prompt

Fix the dark fringes on translucent edges in the game: convert every texture with alpha to premultiplied alpha (RGB×A) at import, so filtering and mip generation happen after premultiplication; change normal transparency to result = src + dst × (1 − srcA); additive glow can use the same equation with A = 0. To fade a whole UI group, render the group to an off-screen buffer and composite it once with a single opacity instead of lowering each widget's opacity. Smoke must show no dark rim at any scale.

## Implementation hint

Blend state for premultiplied content: colour = src × 1 + dst × (1 − srcA), alpha likewise (e.g. ONE / INV_SRC_ALPHA in D3D11, GL_ONE / GL_ONE_MINUS_SRC_ALPHA in OpenGL, equivalent blend factors in Vulkan, Metal or any engine material). Premultiply in the asset pipeline and generate mips from premultiplied data; if a shader outputs straight colour, multiply rgb by a before writing. Additive = same blend with output alpha 0. Group fade = render children to an RT, then draw the RT once with opacity applied to all four channels.

## Related

- [PIX-26](PIX-26.md) — Texture bleeding and atlas padding
- [MATX-07](MATX-07.md) — Hologram shader
- [DIAG-03](DIAG-03.md) — Mipmapping and anisotropic filtering
- [REN-16](REN-16.md) — Alpha blending/Translucency
- [REN-17](REN-17.md) — Alpha clipping/Alpha test/Cutout/Alpha scissor
- [DIAG-06](DIAG-06.md) — Alpha-to-coverage

## References

- [Shawn Hargreaves — Premultiplied alpha](https://shawnhargreaves.com/blog/premultiplied-alpha.html)
- [Shawn Hargreaves — Premultiplied alpha and image composition](https://shawnhargreaves.com/blog/premultiplied-alpha-and-image-composition.html)
- [Wikipedia — Alpha compositing](https://en.wikipedia.org/wiki/Alpha_compositing)
- [Wikipedia (日本語) — アルファブレンド（乗算済みアルファ）](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AB%E3%83%95%E3%82%A1%E3%83%96%E3%83%AC%E3%83%B3%E3%83%89)
