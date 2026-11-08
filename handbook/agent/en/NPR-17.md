# NPR-17 · Stroke-based impasto

**Aliases:** Impasto; Brush-stroke shading; Painted relief strokes; 厚塗筆觸; 浮雕筆觸; インパスト; 厚塗り筆触

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

Visible paint strokes that follow the form, with a slight relief / catch-light as if thick paint sits on the surface.

## Not to be confused with

Not a Kuwahara / painterly *filter* (NPR-06) that clusters screen colours without authored stroke direction. Not wash (NPR-07). Not hatched lines (NPR-05).

## Use it for

Oil close-ups, gallery looks, storybook strokes with direction.

## Tunable parameters

stroke length/width · direction from normals · relief highlight · blend (authoring defaults)

## Request prompt

Enable impasto presentation → solid forms → replace smooth shading with discrete, form-following strokes that catch a little highlight on their ridges → restore smooth shading on disable.

## Implementation hint

Generate oriented stroke quads/decals from surface normals or flow maps; shade each stroke with a slight specular ridge. Distinct from neighbourhood-averaging painterly filters.

## Related

- [NPR-06](NPR-06.md) — Kuwahara / Painterly filter
- [NPR-07](NPR-07.md) — Watercolor rendering
- [NPR-05](NPR-05.md) — Hatching / Cross-hatching

## References

- [Wikipedia — Impasto](https://en.wikipedia.org/wiki/Impasto)
- [Wikipedia — Kuwahara filter](https://en.wikipedia.org/wiki/Kuwahara_filter)
