# PIX-12 · Selective outlining

**Aliases:** Sel-out; Selout; Coloured outline; Lit outline

**Group:** 2D & pixel-art techniques
**Subcategory:** Line & form

## What you see

The outline is not a solid black ring: each segment takes a darker shade of the fill next to it, the lit side gets a lighter outline (or none), and the shadow side stays dark. The silhouette still reads, but softer and more volumetric than a thick black line.

## Not to be confused with

Not a full black outline (one colour all the way round, very cartoony) nor an inner-glow or post-process outline shader (automatic, same line everywhere). Sel-out is chosen segment by segment from the light direction and material.

## Use it for

Balances readability and texture on mid-sized characters (16–48 px); a black outline vanishes on dark backgrounds, which sel-out avoids.

## Tunable parameters

outline colour rule (darkest ramp step / near-black) · light direction · drop outline on lit side yes/no · minimum contrast vs background

## Request prompt

Switch the game's NPCs and enemies to selective outlines: each outline pixel uses the darkest step of the adjacent fill's ramp; on the lit (top-left) side use a mid tone or drop the outline; on the shadow (bottom-right) side keep the darkest shade; keep a near-black outline only where contrast with the background is weak (e.g. hair against the night).

## Implementation hint

Art-side; bake into sprites. If you need a runtime outline (selection highlight), do it as a separate 1-px dilation pass in base-res pixels (sample 4 neighbours of alpha with point sampling) so it stays crisp — never a blurred glow.

## Related

- [PIX-09](PIX-09.md) — Hue shifting
- [PIX-11](PIX-11.md) — Manual anti-aliasing
- [PIX-13](PIX-13.md) — Silhouette readability

## References

- [Lospec — Selout tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/selout)
- [Lospec — Outline tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/outline)
- [Pedro Medeiros (saint11) — Pixel art tutorials](https://saint11.org/blog/pixel-art-tutorials/)
