# NPR-20 · Stained-glass cell style

**Aliases:** Stained-glass shading; Leaded-glass cells; Glowing glass panes; 彩繪玻璃格子風格; 鑲嵌玻璃畫面; ステンドグラス風; 鉛枠の彩色セル

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

The image itself is broken into leaded cells of glowing flat (or softly graded) colour, with dark came lines between panes.

## Not to be confused with

Must stay distinct from stained-glass light pools (LGT-16), which are coloured *light falling on other surfaces*. This is a stylization of the picture (or of a window object). Not dots (NPR-08). Not cel bands without came lines (REN-03).

## Use it for

Characters as glass, rose-window props, sacred stylization.

## Tunable parameters

cell size · came width · glow · palette · (authoring defaults)

## Request prompt

Enable stained-glass style → scene or window → shapes become bounded glowing cells separated by dark lead lines → restore ordinary rendering on disable. Do not show coloured floor pools unless clearly labeled as the other effect and linked to LGT-16.

## Implementation hint

Segment the image (or a mesh) into polygonal cells, fill with flat/soft colours, draw dark came lines, add slight emission. Keep lighting of surrounding room separate from LGT-16 pools.

## Related

- [LGT-16](LGT-16.md) — Stained-glass colored light pool
- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [NPR-16](NPR-16.md) — Ukiyo-e / woodblock print

## References

- [Wikipedia — Came glasswork](https://en.wikipedia.org/wiki/Came_glasswork)
- [Wikipedia — Stained glass](https://en.wikipedia.org/wiki/Stained_glass)
