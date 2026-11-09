# TRN-03 · Crossfade

**Aliases:** Dissolve; Cross-dissolve; Mix

**Group:** Transitions
**Subcategory:** Fades & dissolves

## What you see

The old image becomes transparent while the new image appears, the two overlapping and mixing for a while.

## Not to be confused with

Not a fade to black (TRN-01, black in between) nor a game "dissolve/burn" effect (VFX-04, disappearing along a noisy edge). In film terms a dissolve is exactly this crossfade.

## Use it for

Passage of time (same place day → night), soft scene changes, menu-to-game swaps.

## Tunable parameters

duration · curve · whether both scenes keep updating · colour space (linear vs sRGB mix)

## Request prompt

In your game, when cutting from day town to night town (same framing) use a 1.2 s crossfade: render both scenes to two render targets and blend linearly by alpha, keeping both visible through the middle.

## Implementation hint

Two render targets A/B; fullscreen pixel shader out = lerp(A, B, k). Requires rendering both scenes (or freezing A as a snapshot texture captured at transition start).

## Related

- [TRN-01](TRN-01.md) — Fade to black
- [TRN-09](TRN-09.md) — Dither transition
- [VFX-04](VFX-04.md) — Dissolve
- [ENV-01](ENV-01.md) — Day-night cycle
- [REN-32](REN-32.md) — Color grading/LUT/White balance
- [FX-41](FX-41.md) — Diegetic-to-score music transition

## References

- [Wikipedia — Dissolve (filmmaking)](https://en.wikipedia.org/wiki/Dissolve_(filmmaking))
