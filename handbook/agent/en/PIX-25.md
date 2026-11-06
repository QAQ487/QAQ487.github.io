# PIX-25 · Sprite flipping for facing

**Aliases:** Horizontal flip; Mirrored facing; flip_h; Left/right facing

**Group:** 2D & pixel-art techniques
**Subcategory:** Animation

## What you see

The character is only drawn facing right; facing left mirrors the sprite horizontally. The flip must pivot on the anchor pixel column, otherwise the character hops 1 px every time it turns; also watch for weapons switching hands, the light direction flipping and text or emblems becoming mirrored.

## Not to be confused with

Not drawing two full sets of directions (only when needed) and not 4/8-direction sprites (up/down are drawn separately; left/right can share a flip). Turn-around hops usually come from flipping around the image-width centre, which for even widths falls between two columns.

## Use it for

Halves the art for top-down and side-view games; turning should be instant with the character's footing unchanged.

## Tunable parameters

flip axis (pivot column) · odd sprite width · per-frame asymmetry fixes · turn delay (instant vs 1 turn frame)

## Request prompt

Use horizontal flipping for facing in the game: store only right-facing frames; for left, mirror around the pivot's centre column (sprites have odd widths) so the foot position and centre pixel never move when turning. Up and down have their own frames. If a character carries a shield or has an asymmetric emblem, swap in a corrected frame for the held item when flipped.

## Implementation hint

Flip in the vertex stage, not by negative scale around the quad centre: x_left = groundX − (w − 1 − pivotX) when flipped, and swap u0/u1. This keeps the pivot column fixed for any width. Hitboxes/attack boxes mirror around the same pivot.

## Related

- [PIX-24](PIX-24.md) — Sprite pivot at the feet
- [PIX-13](PIX-13.md) — Silhouette readability
- [PIX-16](PIX-16.md) — Y-sorting

## References

- [Godot docs — Sprite2D (offset, centered, flip_h)](https://docs.godotengine.org/en/stable/classes/class_sprite2d.html)
- [Slynyrd — Pixelblog 22: Top-down character sprites](https://www.slynyrd.com/blog/2019/10/21/pixelblog-22-top-down-character-sprites)
