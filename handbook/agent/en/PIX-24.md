# PIX-24 · Sprite pivot at the feet

**Aliases:** Foot anchor; Bottom-centre origin; Sprite origin / pivot point; Baseline alignment

**Group:** 2D & pixel-art techniques
**Subcategory:** Scene construction

## What you see

Every sprite frame's pivot/origin is the one pixel at the centre of the feet: however tall or wide the character and however much the frames differ in size (a sword-swing frame is wider than idle), drawing at the same coordinate keeps the feet on one ground line and the body centre on one pixel column — no hop or float when the animation changes.

## Not to be confused with

Not Y-sorting (PIX-16, which decides draw order — but needs this anchor as its sort key) nor sprite flipping (PIX-25). Typical bugs are anchoring at the image's top-left or image centre, or frames with different padding.

## Use it for

Character size, horizontal centring, foot baseline and stable animation changes; also lines up shadows, hitboxes and selection rings.

## Tunable parameters

pivot per frame (x = centre column, y = foot row) · odd vs even sprite width · padding trimmed per frame · debug overlay (baseline + centre column)

## Request prompt

Standardise every character sprite in the game on a bottom-centre pivot: each atlas frame stores pivot = (centre column, bottom row of the feet); when drawing, subtract the pivot from the entity's ground position to get the top-left and round it. Use odd sprite widths (e.g. 15 px) so the centre is exactly one column; frames must never shift left/right or up/down because of different padding. Shadows and hitboxes are centred on the same pivot.

## Implementation hint

Atlas metadata per frame: {u,v,w,h,pivotX,pivotY}. Vertex positions: topLeft = round(groundPos) − (pivotX, pivotY) in base-res pixels. Add a debug draw that plots a 1-px red baseline and a cyan centre column per entity so misaligned frames are obvious.

## Related

- [PIX-16](PIX-16.md) — Y-sorting
- [PIX-25](PIX-25.md) — Sprite flipping for facing
- [PIX-18](PIX-18.md) — Fake height with ground shadow
- [PIX-13](PIX-13.md) — Silhouette readability

## References

- [Godot docs — Sprite2D (offset, centered, flip_h)](https://docs.godotengine.org/en/stable/classes/class_sprite2d.html)
- [Slynyrd — Pixelblog 22: Top-down character sprites](https://www.slynyrd.com/blog/2019/10/21/pixelblog-22-top-down-character-sprites)
- [Wikipedia — Sprite (computer graphics)](https://en.wikipedia.org/wiki/Sprite_(computer_graphics))
