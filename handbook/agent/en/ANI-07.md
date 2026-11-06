# ANI-07 · 4-way / 8-way directional sprites

**Aliases:** Directional sprites; 8-direction sprite sheet; Facing directions

**Group:** Animation, movement & physics
**Subcategory:** Character states

## What you see

In top-down or isometric games the character switches to a separately drawn view for each movement direction: 4-way covers up/down/left/right, 8-way adds the four diagonals; turning swaps the image rather than rotating it. Left is usually a mirrored right, so only 3 or 5 directions are drawn.

## Not to be confused with

Not sprite flipping (PIX-25, only flipping between left and right facing); directional sprites include genuinely different front and back drawings. Not RotSprite (PIX-05, rotating one image).

## Use it for

Top-down RPGs, action RPGs, twin-stick shooters, isometric games.

## Tunable parameters

direction count (4 / 8 / 16) · mirrored vs unique views · angle slices · update facing only while moving · same baseline per view

## Request prompt

In your game, make 8-way sprites for the hero: draw 5 directions (down, down-right, right, up-right, up) and mirror them for the three left-facing ones; pick the direction by splitting the movement angle into 8 slices of 45°, update facing only while moving and keep the last one when stopped; keep the same feet baseline and cell size in every direction.

## Implementation hint

Store one row per direction in the sheet; dir = round(atan2(vy, vx) / (TAU/8)) mod 8, then map left-facing indices to their right-facing row with a horizontal flip. Hysteresis on the angle avoids flicker when moving along a slice boundary.

## Related

- [PIX-25](PIX-25.md) — Sprite flipping for facing
- [PIX-05](PIX-05.md) — RotSprite
- [PIX-24](PIX-24.md) — Sprite pivot at the feet
- [PIX-16](PIX-16.md) — Y-sorting

## References

- [Pixeli pixel-art rules — Views and directions](https://pixeli.pebbly.space/knowledge/rules/37-views-and-directions)
- [Spritefy — 8-directional sprites: views, sheets & code](https://spritefy.com/blog/eight-direction-character-sprite)
- [Spritesheets.ai — 4-direction vs 8-direction sprites](https://www.spritesheets.ai/blog/4-direction-vs-8-direction-sprites)
