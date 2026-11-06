# PIX-18 · Fake height with ground shadow

**Aliases:** Z-offset; Jump arc with shadow; Height axis in 2D; Drop shadow anchor

**Group:** 2D & pixel-art techniques
**Subcategory:** Scene construction

## What you see

In top-down 2D, jumps, lobbed arrows and knocked-up objects draw the sprite z pixels higher while the shadow stays at the original ground spot and shrinks/fades with height. The shadow tells the player where the object really is on the ground, and collision and sorting use the shadow position.

## Not to be confused with

Not simply changing Y (that reads as walking north and breaks sorting and collision), and not 3D. This is a descriptive label: there is no single industry name; people say z-offset or jump shadow.

## Use it for

Jumps, throws, lobbed attacks, knock-ups, bouncing drops — a height axis in top-down 2D.

## Tunable parameters

max height · gravity · shadow scale/alpha vs z · shadow shape (ellipse, pixel blob) · whether z affects collision (hit only when z < threshold)

## Request prompt

Give the game's thrown rocks, arrows and knocked-up enemies a separate height axis: each object has a ground position (x, y) and height z; draw the sprite at (x, y − z) and the shadow at (x, y); shrink the shadow width from 100% to 60% and its opacity from 40% to 20% as z rises. Y-sorting and collision use (x, y), never y − z.

## Implementation hint

Store z in the entity; vertex position = (x, y − round(z)); shadow drawn as a separate sprite (pre-drawn pixel ellipse at 2–3 sizes rather than scaling, to stay crisp). Sort key = ground y (PIX-16).

## Related

- [PIX-16](PIX-16.md) — Y-sorting
- [PIX-24](PIX-24.md) — Sprite pivot at the feet
- [FB-04](FB-04.md) — Death effect

## References

- [sgeos — Y-sort article](https://sgeos.github.io/games/graphics/projection/2026/04/30/draw_order_y_sort_z_sort_and_painters_algorithm.html)
