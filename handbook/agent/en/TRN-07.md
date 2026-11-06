# TRN-07 · Blinds transition

**Aliases:** Venetian blinds; Shutter; Curtain wipe; Barn door

**Group:** Transitions
**Subcategory:** Shape & mask wipes

## What you see

The screen is cut into horizontal or vertical strips that narrow or open like venetian-blind slats; a shutter pulls one panel down, a barn door closes two panels from the sides.

## Not to be confused with

Not pixelate (TRN-10, changing block size) nor push (TRN-08, the whole image slides). Blinds are defined by repeated stripes.

## Use it for

Retro or presentation-style transitions; shutters and barn doors suit shops, stages and chapter openings.

## Tunable parameters

strip count · orientation · per-strip stagger · duration · panel style (blinds / shutter / barn door)

## Request prompt

In your game, when opening the shop UI use a 12-strip horizontal blinds transition: each strip opens from zero to full height, each delayed 0.02 s from top to bottom, 0.4 s total.

## Implementation hint

Pixel shader: s = frac(uv.y * N); per-strip delay d = floor(uv.y*N)/N * stagger; local k = saturate((k - d)/(1 - stagger)); out = s < local ? B : A.

## Related

- [TRN-04](TRN-04.md) — Shape wipe
- [TRN-08](TRN-08.md) — Push transition
- [TRN-10](TRN-10.md) — Pixelate transition

## References

- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
- [Wikipedia — Wipe (transition)](https://en.wikipedia.org/wiki/Wipe_(transition))
