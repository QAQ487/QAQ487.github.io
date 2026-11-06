# CAM-24 · Establishing shot

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

A new scene first shows an entire castle, valley, or neighborhood before moving into character action. (General film-narrative terminology.)

## Not to be confused with

Wide shot describes framing extent; establishing shot describes narrative purpose. Not every wide view establishes a setting.

## Use it for

Establishes location, spatial scale, and atmosphere; suitable for level openings or introducing a boss arena.

## Tunable parameters

shot duration · framing scale · reveal path · hold time · transition out · control lock · skip behaviour

## Request prompt

In your game, add an establishing shot for the boss arena: spend 3.2 s showing the full 60 m-wide space, with boss and player both in frame at roughly 12% of screen height. Hold for 0.6 s, then drift toward the entrance and blend to gameplay over the final 0.5 s. Allow skipping with immediate control restoration.

## Implementation hint

Author an opening camera state or short path that establishes location and scale, then hand control back to the gameplay camera through a cut or blend. Keep the sequence state-driven so it can be skipped cleanly without leaving camera or input state half-applied.

## References

- [Wikipedia — Shot (filmmaking)：Establishing shot](https://en.wikipedia.org/wiki/Shot_(filmmaking))
