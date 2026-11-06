# PIX-19 · Sprite stacking

**Aliases:** Stacked sprites; Slice stacking; Pseudo-3D voxel sprites

**Group:** 2D & pixel-art techniques
**Subcategory:** Scene construction

## What you see

An object is cut into many horizontal slices (like a CT scan), each a small pixel image; when drawing, every slice is rotated by the same angle and stacked one pixel higher than the last, so it looks like a 3D pixel model that can spin 360°.

## Not to be confused with

Not real 3D models rendered as pixels (NPR 3D pixel art) and not RotSprite (PIX-05, which rotates one flat image). Stacking has no perspective and only rotates around the vertical axis.

## Use it for

Rotatable cars, boats, crates, buildings and towers; keeps a pixel look when a top-down camera rotates.

## Tunable parameters

slice count · slice spacing (1 px, or 2 px for chunkier look) · rotation snapping (free vs 16 steps) · camera pitch fake (spacing scale)

## Request prompt

Prototype sprite stacking for the game's catapult and arrow tower: each object has 12–16 slices of 16×16; when drawing, rotate each slice by the object's heading with nearest sampling and offset it 1 px up; draw bottom to top, and use the bottom slice's position for Y-sorting.

## Implementation hint

Pack slices in an atlas row; render as N instanced quads sharing a rotation matrix, instance i offset by (0, −i). Use point sampling and rotate in base-res pixel space (draw into the base-res RT) so edges stay crisp. Optionally pre-bake 16–32 headings to a regular sprite sheet for cost.

## Related

- [PIX-05](PIX-05.md) — RotSprite
- [PIX-16](PIX-16.md) — Y-sorting

## References

- [Chequered Ink — 2.5D in GameMaker using sprite stacking](https://chequered.ink/2-5d-in-gamemaker-using-sprite-stacking/)
- [James Poole — Using sprite stacking for pseudo-3D in Wee Boats (devlog)](https://jamespoole.itch.io/wee-boats/devlog/685630/using-sprite-stacking-for-pseudo-3d-in-wee-boats)
