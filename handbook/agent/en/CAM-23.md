# CAM-23 · Negative space

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

A large area with relatively little visual distraction sits beside the character, creating a clear proportion between the person and the space. (General composition terminology; the space need not be literally white or completely empty.)

## Not to be confused with

This is not merely forgetting to fill the scene, nor a HUD safe area. Space ahead can result from composition without a look-ahead system.

## Use it for

Focuses attention on the subject and can express loneliness, vulnerability, or waiting. Games can further reserve this cleaner space for an important direction.

## Tunable parameters

subject screen share · open-space side · clutter density · tonal contrast · safe margin · transition time

## Request prompt

In your game, compose the lonely scene with negative space: place the character at 28% of screen width and only 18% of screen height, reserving at least 55% on the right for low-contrast sky and distant scenery. Transition from normal follow over 0.8 s; keep HUD out of that space and do not drive it from velocity look-ahead.

## Implementation hint

Choose an off-centre subject anchor that reserves a controlled portion of the frame for low-detail space, then bias the camera toward that composition. Validate the intended region using scene tags or density/contrast metadata rather than assuming empty geometry automatically reads as negative space.

## References

- [Wikipedia — Shot (filmmaking)：Shot composition 與 negative space](https://en.wikipedia.org/wiki/Shot_(filmmaking))
