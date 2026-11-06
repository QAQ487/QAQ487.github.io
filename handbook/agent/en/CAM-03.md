# CAM-03 · Soft zone

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

Once the character leaves the stable central area, the camera gradually catches up rather than pulling abruptly at the boundary. A hard limit may exist farther out. (A Cinemachine composition-region term; include Cinemachine when searching.)

## Not to be confused with

Target movement does not cause reframing inside the dead zone, but does inside the soft zone. Damping controls the speed of catching up, not the region itself.

## Use it for

Provides adjustment room between “do not move at all” and “the character must stay in view.”

## Tunable parameters

dead-zone size · soft-zone size · response curve · damping time · hard-limit margin · per-axis weighting

## Request prompt

In your game, add a soft catch-up zone: use a 48×28 px central dead zone and a 128×72 px outer soft zone. As the character enters the soft zone, raise follow strength smoothly from 0% to 100% with 0.25 s damping, and prevent any further screen-space drift at the outer boundary.

## Implementation hint

Use nested screen-space regions: zero correction in the inner dead zone, a correction weight that rises with distance through the soft zone, and full correction at the outer limit. Keep region dimensions separate from damping so designers can tune when following begins independently from how quickly it responds.

## References

- [Unity Position Composer：Shot composition](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachinePositionComposer.html)
