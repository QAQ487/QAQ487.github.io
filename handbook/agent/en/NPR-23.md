# NPR-23 · Art-directed face shadows

**Aliases:** Authored face shadow; Painted cheek shadow; Design-shadow face; 作畫式臉影; 指定臉部陰影; 作画的な顔影; 影の設計

**Group:** Stylized rendering (NPR)
**Subcategory:** Toon shading

## What you see

Face shading follows drawn graphic shapes (cheek plane, under-nose, jaw scoop) chosen by a character artist, not a hard cast of anatomical cavities.

## Not to be confused with

Not REN-21 cavity shading of eye sockets / nostrils. Not a photoreal normal-mapped head. Do not split SDF shadows, edited normals, or shade maps into separate cards — those are methods for the same picture. For Japanese density aliases prefer 影の濃さ / 陰になりやすさ / シェーディンググレード; do not use 「屠り濃さ」.

## Use it for

Anime faces, stylized characters that need stable graphic shade.

## Tunable parameters

shadow mask / SDF · density · light range before crawl · cavity compare lane (authoring defaults)

## Request prompt

Light a stylized face → cheek / nose / jaw → graphic shadow shapes hold their designed silhouette as the head turns within a reasonable light range, rather than crawling through every crease → restore default shading on disable.

## Implementation hint

Blend a painted shade mask / edited normals / SDF shadow into the face ramp so graphic shapes persist across a light range. Demo CAVITY vs AUTHORED lanes. Methods stay on this card.

## Related

- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [NPR-21](NPR-21.md) — Authored shadow colours
- [NPR-22](NPR-22.md) — Core-shadow band
- [REN-13](REN-13.md) — Normal mapping/Bump mapping

## References

- [Wikipedia — Chiaroscuro](https://en.wikipedia.org/wiki/Chiaroscuro)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
