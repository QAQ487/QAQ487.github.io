# TRN-02 · Fade to white

**Aliases:** Flash cut; White-out; Dip to white

**Group:** Transitions
**Subcategory:** Fades & dissolves

## What you see

The image quickly turns fully white, like a burst of light, then the new scene fades out of the white; fast versions read as a flash cut.

## Not to be confused with

Not a fade to black (TRN-01, which reads as rest/ending); white signals impact, memory, teleport or awakening. Not a hit flash (FB-01, which affects only a character).

## Use it for

Teleports, flashbacks, mystical power, cutting away after an explosion.

## Tunable parameters

attack time (fast) · hold · release (slow) · tint · additive vs alpha blend

## Request prompt

In your game, when using a waystone, fade to white: whiten quickly in 0.15 s (ease-out), hold full white 0.15 s, then fade into the new location over 0.6 s; tint the white slightly warm (#fff6e0).

## Implementation hint

Same fullscreen quad as TRN-01 with white; an additive pre-pass (rgb += k) before alpha gives a more "blown-out" bloom-like ramp.

## Related

- [TRN-01](TRN-01.md) — Fade to black
- [TRN-03](TRN-03.md) — Crossfade
- [ENV-06](ENV-06.md) — Lightning flash

## References

- [Wikipedia — Fade (filmmaking)](https://en.wikipedia.org/wiki/Fade_(filmmaking))
