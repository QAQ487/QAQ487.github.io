# NPR-15 · Sumi-e / ink-wash

**Aliases:** Sumi-e; Ink-wash; Japanese ink painting; 水墨渲染; 水墨畫風; 水墨画; 墨絵; すみえ

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

A monochrome (or near-monochrome) world built from ink values: bold and hair-thin strokes, controlled wash, reserved paper-white, and distant forms that dissolve into the paper colour. Dry-brush texture may appear on edges.

## Not to be confused with

Not watercolor (NPR-07). Not hatching (NPR-05). Not graphite pencil (NPR-09). Not 1-bit dither (NPR-10).

## Use it for

Ink title cards, memory beats, East-Asian stylized cutaways.

## Tunable parameters

ink levels · stroke weight range · wash softness · paper colour · reserved white amount (authoring defaults)

## Request prompt

Enable ink-wash presentation → scene forms → render with ink-step values, varied stroke weight, reserved paper-white, and receding washes that fade into paper; colour remaining in the scene should be minimal or ink-tinted → restore the ordinary rendering on disable.

## Implementation hint

Posterize to a few ink values on warm paper, emphasize silhouettes with variable-width strokes, fade distant layers toward paper, keep large empty regions. Avoid polychrome wet bleed (that is NPR-07).

## Related

- [NPR-07](NPR-07.md) — Watercolor rendering
- [NPR-05](NPR-05.md) — Hatching / Cross-hatching
- [NPR-09](NPR-09.md) — Sketch / Pencil shader
- [NPR-10](NPR-10.md) — 1-bit dithering (Obra Dinn style)

## References

- [Wikipedia — Ink wash painting](https://en.wikipedia.org/wiki/Ink_wash_painting)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
