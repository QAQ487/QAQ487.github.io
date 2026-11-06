# TRN-13 · Match cut

**Aliases:** Graphic match; Match on action

**Group:** Transitions
**Subcategory:** Cuts & spatial transitions

## What you see

The shots before and after the cut share a shape, composition or action — the round sun cuts straight to a round moon, or a character’s wave continues in the next scene.

## Not to be confused with

Not a crossfade (TRN-03, which has a blend); a match cut is instant and relies on matching shapes to feel smooth.

## Use it for

Cutscenes, time jumps, linking two scenes; common in game intros and chapter interludes.

## Tunable parameters

matching element & screen position · scale match · hold before/after · optional sound bridge

## Request prompt

In a prologue, do a match cut: frame the sun in the daytime sky, centre it at a fixed size, then cut instantly to a full moon at the same position and size, and pull back to reveal the night town.

## Implementation hint

No shader needed: a cutscene camera keyframe on each side of a hard cut, authored so the matching element lands on the same screen rect.

## Related

- [TRN-03](TRN-03.md) — Crossfade
- [TRN-14](TRN-14.md) — Whip pan
- [ENV-01](ENV-01.md) — Day-night cycle

## References

- [Wikipedia — Match cut](https://en.wikipedia.org/wiki/Match_cut)
