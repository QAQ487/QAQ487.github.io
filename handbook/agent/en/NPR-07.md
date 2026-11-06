# NPR-07 · Watercolor rendering

**Aliases:** Watercolour shader; Painterly wash; Wet-edge darkening; Pigment granulation

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

The image looks like watercolour on rough paper: colours are translucent with paper texture showing through, patch edges darken where pigment pools, flat areas carry fine granulation speckle, outlines wobble and bleed past the shapes, the brightest spots are left as bare paper, and the frame edge is an irregular deckle.

## Not to be confused with

Not a Kuwahara filter (NPR-06, whose patches are opaque and flat), nor simply desaturating or adding a paper texture. Watercolour reads as transparent glazes, darkened edges, granulation and paper-white highlights.

## Use it for

Picture books and fairy tales, gentle adventure or travel games, memory and diary segments, cutscene illustrations.

## Tunable parameters

wobble scale & amplitude · glaze levels · granulation strength & scale · edge-darkening width & amount · paper texture · deckle width

## Request prompt

Add a watercolour post-process to the game: (1) warp the sampling coordinates with low-frequency noise (scale 1/28 px, amplitude ±3.5 px) so outlines wobble; (2) split pigment density into 3 glazes by shading (0.42/0.64/0.86) and multiply density by 0.15 at highlights to leave paper white; (3) granulation: density ×(0.82+0.36×noise) with noise around 2 px; (4) edge darkening: +0.25 density where the warped region changes within 3 px; (5) subtractive mix color = paper × (1 − density × (1 − pigment)); (6) paper brightness ±3%, an irregular 10–16 px deckle on all four sides. For transitions, reveal colour with a noise mask that “blooms” in over 0.6 s.

## Implementation hint

Post-process on colour + depth/ID: uvW = uv + (noise(uv*f)-0.5)*amp; region = ID(uvW); density from luminance bands; density *= mix(1-g, 1+g, noise(uv*fg)); edge = any(ID(uvW+offset_i) != region); density += edge*k; col = paper * (1 - density*(1-pigment)). Curtis et al. simulate shallow-water flow and Kubelka–Munk glazing for higher fidelity; real-time games approximate with the steps above.

## Related

- [NPR-06](NPR-06.md) — Kuwahara / Painterly filter
- [NPR-09](NPR-09.md) — Sketch / Pencil shader
- [PP-06](PP-06.md) — Desaturation
- [PP-02](PP-02.md) — Film grain

## References

- [Curtis et al. — Computer-Generated Watercolor (SIGGRAPH 97)](https://grail.cs.washington.edu/projects/watercolor/)
- [Wikipedia — Kubelka–Munk theory](https://en.wikipedia.org/wiki/Kubelka%E2%80%93Munk_theory)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
