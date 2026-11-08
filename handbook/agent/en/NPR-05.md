# NPR-05 · Hatching / Cross-hatching

**Aliases:** Cross-hatching; Pen-and-ink shading; Tonal art map (TAM); Stroke shading

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

Shading is not grey but parallel ink lines: lit areas are bare paper, slightly darker areas get one set of diagonal lines, darker still adds a second set in the opposite direction, and the darkest areas are dense crossing lines, like a pen illustration or engraving.

## Not to be confused with

Not halftone (NPR-08, dots of varying size) nor dithering (PIX-08, pixel-level patterns). Hatching reads as directional lines stacking in more layers as it gets darker. Not a pencil sketch (NPR-09, looser strokes, graphite grain, repeated contours).

## Use it for

Notebooks, maps, old-book or detective styles, engraving or comic textures, flashbacks and storybook sequences.

## Tunable parameters

layer thresholds · stroke spacing & width · stroke angles · wobble · screen-space vs object-space (TAM) · paper & ink colours

## Request prompt

Add hatching to the game: tone = (0.08+0.92×max(0,N·L))×AO, ground ×1.15; 4 layers — tone<0.78 draws 45° lines (spacing 7 px, width 1.25 px), tone<0.52 adds −45° lines, tone<0.3 adds horizontal lines (spacing 5 px), tone<0.14 adds dense 45° lines (spacing 3.5 px); wobble each line about 1 px with a sine. Paper #f3ecd8, ink #2a2238, plus black edge-detection outlines. Lines either stay fixed in screen space or are applied as tonal-art-map textures on the objects (which do not slide when objects rotate).

## Implementation hint

Screen-space: for each layer i, if tone < t_i and frac(dot(pixel, dir_i)/spacing_i) < width_i/spacing_i → ink. Object-space (Praun et al.): a tonal art map — a mip-mapped set of 6 stroke textures of increasing density — blended by tone per pixel in UV space, so strokes stick to the surface. Combine with an outline pass; avoid aliasing by keeping spacing ≥ 3 px.

## Related

- [NPR-08](NPR-08.md) — Halftone / Ben-Day dots
- [NPR-09](NPR-09.md) — Sketch / Pencil shader
- [PIX-08](PIX-08.md) — Dithering
- [NPR-03](NPR-03.md) — Edge-detection outline
- [NPR-15](NPR-15.md) — Sumi-e / ink-wash
- [NPR-17](NPR-17.md) — Stroke-based impasto

## References

- [Wikipedia — Hatching](https://en.wikipedia.org/wiki/Hatching)
- [Praun, Hoppe, Webb, Finkelstein — Real-Time Hatching (SIGGRAPH 2001, PDF)](https://hhoppe.com/hatching.pdf)
- [Kyle Halladay — A pencil sketch effect (tonal art maps)](https://kylehalladay.com/blog/tutorial/2017/02/21/Pencil-Sketch-Effect.html)
