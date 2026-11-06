# TRN-08 · Push transition

**Aliases:** Slide; Push; Slide-in

**Group:** Transitions
**Subcategory:** Cuts & spatial transitions

## What you see

The new image slides in from one side while pushing the old image out the other (push), or slides in over the old image (slide).

## Not to be confused with

Not a room-scroll transition (TRN-16, the camera moving through one world); a push is two flat images sliding. Not a wipe (the edge moves but images stay still).

## Use it for

Menu tabs, map switches, UI pages; the direction can imply forward/back.

## Tunable parameters

direction · duration · easing · push vs overlap slide · parallax between layers

## Request prompt

In your game, use a push between the bag, skills and map UI pages: 0.25 s ease-in-out; pressing right slides the new page in from the right and pushes the old one left, and vice versa.

## Implementation hint

Draw snapshot A at offset -k*W and B at (1-k)*W (two textured quads). For pixel-perfect output round the offset to integer pixels.

## Related

- [TRN-16](TRN-16.md) — Room transition scroll
- [TRN-07](TRN-07.md) — Blinds transition
- [TRN-14](TRN-14.md) — Whip pan

## References

- [Wikipedia — Wipe (transition)](https://en.wikipedia.org/wiki/Wipe_(transition))
- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
