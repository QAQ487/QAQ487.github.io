# ACT-14 · Overlapping Action / Drag

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

The torso turns first, with shoulders, hands, and hair following slightly later; different parts do not start and stop on the same beat.

## Not to be confused with

Follow through emphasizes residual movement after the main action stops; overlap emphasizes parts moving out of sync. They often occur together and are not mutually exclusive categories.

## Use it for

Establish sequencing between body parts and reduce mechanical-looking motion.

## Tunable parameters

part hierarchy · start offsets · stop offsets · drag amount · overlap duration

## Request prompt

For a 180° turn, start the torso first, delay the shoulders by 35 ms, hands by 65 ms, and hair by 90 ms, with each region's stop offset by another 40 ms.

## Implementation hint

Offset the start and stop times of connected body regions so motion propagates through the hierarchy. Use small delays for drag during the main action, distinct from the settling motion that follows it.

## Related

- [ANI-19](ANI-19.md) — Turn-in-place / Pivot step
- [ANI-11](ANI-11.md) — Look-at / Head tracking

## References

- [Wikipedia — Twelve basic principles of animation，Follow Through and Overlapping Action](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
