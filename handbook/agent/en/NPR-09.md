# NPR-09 · Sketch / Pencil shader

**Aliases:** Pencil rendering; Pencil sketch effect; Graphite shading; Sketchy outlines; Charcoal; Pastel; 炭筆; 木炭; 粉彩; パステル

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

The image looks like a pencil sketch on paper: outlines are built from several slightly offset, sometimes broken strokes; shading is loose diagonal hatching with graphite grain; the paper tooth is clearly visible; colour is grey-black only, sometimes with lines that boil slightly. Related dry-media cousins — charcoal and pastel — stay under this card, not separate entries.

## Not to be confused with

Not hatching (NPR-05, clean, regular pen-ink lines) nor edge-detection outlines (NPR-03, a single stable line). Pencil reads as repeated loose contours, graphite grain and paper texture; charcoal and pastel are related dry media, not separate cards.

## Use it for

Design drafts, notebook or diary themes, tutorials or memories, an unfinished “blueprint” state of a level, photo-mode filters.

## Tunable parameters

contour passes & offset · stroke breakup · hatch thresholds & spacing · graphite grain · paper texture · boil rate

## Request prompt

Add a pencil-sketch post-process to the game: (1) paper: base #f0ece2 plus vertically stretched noise (x scale 1 px, y scale 3 px, ±2%); (2) outlines: sample the edge-detection result 3 times, each offset ±2.5 px by a different low-frequency noise, masking out about 30% of the stroke with noise for broken lines; (3) shading: tone<0.75 adds loose 45° hatching (spacing 5 px), tone<0.42 adds the opposite direction, tone<0.2 darkens 25% overall; multiply stroke strength by (0.5+0.5×paper tooth) for graphite grain; (4) graphite colour #3a3a42; (5) switch between 2 offset seeds 4 times per second for a slight boil.

## Implementation hint

Edge buffer from depth/normals; sketch = sum over passes i of edge(uv + noise_i(uv)*amp) * mask_i(uv); shading via screen-space or TAM strokes thresholded by tone; multiply by paper-grain texture; col = lerp(paper, graphite, clamp(sketch + hatch)). Swap noise seeds at 4–8 fps for boil (see NPR-04).

## Related

- [NPR-05](NPR-05.md) — Hatching / Cross-hatching
- [NPR-03](NPR-03.md) — Edge-detection outline
- [NPR-04](NPR-04.md) — Line boil
- [NPR-07](NPR-07.md) — Watercolor rendering
- [NPR-15](NPR-15.md) — Sumi-e / ink-wash

## References

- [Kyle Halladay — A pencil sketch effect (tonal art maps)](https://kylehalladay.com/blog/tutorial/2017/02/21/Pencil-Sketch-Effect.html)
- [Lee, Kwon, Lee — Real-Time Pencil Rendering (NPAR 2006, PDF)](https://cg.postech.ac.kr/papers/47_Real-Time-Pencil-Rendering.pdf)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
