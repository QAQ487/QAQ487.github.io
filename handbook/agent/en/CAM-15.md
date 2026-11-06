# CAM-15 · Occlusion avoidance／Deocclusion

**Group:** Camera & composition
**Subcategory:** 3D Following and Readability

## What you see

When a pillar or wall hides the character, the camera moves closer or around to another angle to reveal them again. (General names for the problem; Cinemachine Deoccluder is a tool-specific name.)

## Not to be confused with

This is not renderer occlusion culling, nor does it mean making the obstruction transparent. Wall avoidance and line-of-sight preservation can operate together, but their tests serve different purposes.

## Use it for

Preserves the line of sight from camera to target in complex environments.

## Tunable parameters

line-of-sight probes · obstruction grace time · candidate angles · camera radius · solution hold time · return smoothing · target visibility ratio

## Request prompt

In your game, preserve line of sight with rays to the character's head, chest, and feet. If more than 50% are blocked for 0.12 s, test candidate positions at ±15°, ±30°, and ±45° around the current view, choosing the smallest change that reveals at least two points. Hold it for 0.4 s minimum and return over 0.5 s.

## Implementation hint

Test line of sight from several camera samples to important target points, then score collision-free candidate positions around the target by visibility and deviation from the desired view. Hold a chosen solution briefly and add hysteresis so thin pillars do not make the camera alternate sides every frame.

## References

- [Unity Deoccluder：preserve the line of sight](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.0/manual/CinemachineDeoccluder.html)
