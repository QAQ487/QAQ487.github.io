# TRN-04 · Shape wipe

**Aliases:** Iris wipe (shaped); Star wipe; Cookie-cutter transition

**Group:** Transitions
**Subcategory:** Shape & mask wipes

## What you see

The boundary between old and new scenes is a specific shape (star, heart, character head, logo) that grows or shrinks from a point to change scenes.

## Not to be confused with

Not the circular iris (already in your 圖鑑 starter); a shape wipe uses an arbitrary outline. Not a luma wipe (TRN-06, whose edge comes from a greyscale map).

## Use it for

Characterful, branded transitions: level complete, character intros, comedic endings.

## Tunable parameters

shape (mask texture or SDF) · centre point · duration · curve · edge softness · rotation during wipe

## Request prompt

In your game, on level complete use a monster-head shape wipe centred on the hero: the outline shrinks from off-screen to zero over 0.6 s with black outside it; hold 0.2 s, then grow from zero into the new scene.

## Implementation hint

Render the shape as a mask: either a signed-distance-field texture sampled with scale (mask = sdf(uv/scale) < 0) or draw the shape into the stencil buffer and draw black where stencil == 0.

## Related

- [TRN-05](TRN-05.md) — Clock wipe
- [TRN-06](TRN-06.md) — Luma wipe
- [TRN-07](TRN-07.md) — Blinds transition

## References

- [Wikipedia — Iris shot](https://en.wikipedia.org/wiki/Iris_shot)
- [Wikipedia — Wipe (transition)](https://en.wikipedia.org/wiki/Wipe_(transition))
- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
