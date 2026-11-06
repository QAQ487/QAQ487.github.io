# CAM-04 · Camera damping／Follow smoothing／Camera lag

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

After the character stops, the camera continues easing into place. A change of direction no longer instantly reverses the entire background. (A general concept; parameter direction and numerical meaning can differ between engines.)

## Not to be confused with

This is not motion blur, nor necessarily input delay. Smooth-looking movement does not prove that lerp or a spring algorithm is being used.

## Use it for

Softens abrupt changes in speed and direction and gives movement a greater sense of weight.

## Tunable parameters

position smooth time · rotation smooth time · max speed · damping model · per-axis damping · teleport threshold

## Request prompt

In your game, add smooth following with a critically damped spring: use a 0.18 s horizontal smooth time, 0.28 s vertical smooth time, and a 900 px/s speed cap. Let the camera continue settling after the character stops, but reset directly when displacement suddenly exceeds 128 px.

## Implementation hint

Filter the desired position and orientation with a critically damped spring or another frame-rate-independent smoothing function. Store velocity as part of the camera state, cap extreme speeds, and bypass the filter for teleports or scene resets.

## References

- [Unity Position Composer：Damping](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachinePositionComposer.html)
