# TRN-05 · Clock wipe

**Aliases:** Radial wipe; Angular wipe; Pie wipe

**Group:** Transitions
**Subcategory:** Shape & mask wipes

## What you see

A radius sweeps around the screen centre like a clock hand; the swept pie area reveals the new image.

## Not to be confused with

Not an iris (a scaling circle) nor a straight-line wipe. The edge is a rotating line, which reads as "time passing".

## Use it for

Passage of time, countdowns, a big version of a cooldown icon, turn changes.

## Tunable parameters

start angle · direction · duration · centre · edge line / softness

## Request prompt

In your game, at "end of day" use a clock wipe: start at 12 o’clock and sweep clockwise over 1 s, revealing the night town in the swept area, with a 1 px gold edge line.

## Implementation hint

Pixel shader: a = atan2(uv.x-c.x, c.y-uv.y) normalised to 0..1; out = (a < k) ? B : A. Soft edge with smoothstep over a small angle band.

## Related

- [TRN-04](TRN-04.md) — Shape wipe
- [TRN-06](TRN-06.md) — Luma wipe
- [ENV-01](ENV-01.md) — Day-night cycle

## References

- [Wikipedia — Wipe (transition)](https://en.wikipedia.org/wiki/Wipe_(transition))
- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
