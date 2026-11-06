# NPR-03 · Edge-detection outline

**Aliases:** Sobel outline; Screen-space outline; Depth/normal edge detection; Post-process outline

**Group:** Stylized rendering (NPR)
**Subcategory:** Outlines & lines

## What you see

Every object’s silhouette and its internal creases (a box’s corners, the inner ring of a torus) all get even-width lines at once; the lines are “found” in screen space, so overlaps between objects and contact with the ground get lines too.

## Not to be confused with

Not inverted-hull outlines (REN-04, where each mesh grows its own back-facing shell, usually only the outer silhouette, no inner creases). Edge detection is a fullscreen post-process: depth jumps find silhouettes, normal changes find creases.

## Use it for

Cartoon/comic looks across the whole frame, crisp structural lines on architecture or machines, technical previews, or uniform outlines on many objects without per-mesh setup.

## Tunable parameters

depth threshold (relative) · normal threshold · line width / kernel radius · line colour · distance fade · which buffers (depth, normal, object id)

## Request prompt

Add a fullscreen edge-detection outline to the game: read the depth and normal buffers and run a 3×3 Sobel on each; divide the depth gradient by that pixel’s depth (relative threshold 0.35, stable with distance), normal-gradient threshold 1.2, soften both with smoothstep(0.6×threshold, threshold); take the max and multiply lines onto the image in #1d1b26, width 1 px (2 px at 1080p). Sky pixels are excluded from the depth test, and lines fade with distance inside fog.

## Implementation hint

Fullscreen pass after opaque geometry: gD = sobel(depth)/depth, gN = sqrt(sum over xyz of sobel(normal.c)²); edge = max(smoothstep(a,b,gD), smoothstep(c,d,gN)); col *= 1 - edge*lineAlpha. Wider lines: sample at ±k pixels or dilate. An object-ID buffer adds lines between touching objects of similar depth. Needs a normal prepass (or reconstruct from depth).

## Related

- [REN-04](REN-04.md) — Outline/Contour/Inverted-hull outline
- [NPR-01](NPR-01.md) — Gooch shading
- [NPR-05](NPR-05.md) — Hatching / Cross-hatching
- [PIX-13](PIX-13.md) — Silhouette readability

## References

- [Wikipedia — Sobel operator](https://en.wikipedia.org/wiki/Sobel_operator)
- [Wikipedia — Edge detection](https://en.wikipedia.org/wiki/Edge_detection)
- [Roystan — Outline shader (depth + normal edge detection)](https://roystan.net/articles/outline-shader/)
- [Alexander Ameye — 5 ways to draw an outline](https://ameye.dev/notes/rendering-outlines/)
