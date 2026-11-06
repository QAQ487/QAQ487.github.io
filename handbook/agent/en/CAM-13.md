# CAM-13 · Group framing／Multi-target framing

**Group:** Camera & composition
**Subcategory:** 3D Following and Readability

## What you see

As two characters separate, the camera pulls back or widens the view; as they approach, it moves or frames closer, trying to keep every target visible. (A general concept; Cinemachine Group Framing is a tool-specific name.)

## Not to be confused with

This is not split-screen. Averaging positions alone may not fit everyone in view. Moving backward (dolly) and changing FOV (zoom) are different methods.

## Use it for

Local co-op, versus play, or framing a boss with the player, so important targets are not lost by focusing only on the protagonist.

## Tunable parameters

target weights · edge margin · min/max distance · min/max FOV · framing axis · expand/contract smoothing · target exclusion

## Request prompt

In your game, frame two players and the boss together: compute their bounds every frame with a 10% screen margin on all sides, clamp camera distance to 6–18 m and vertical FOV to 45–68°. Widen over 0.25 s when targets separate, tighten over 0.7 s when they regroup, and remove defeated targets after 1 s.

## Implementation hint

Build a weighted bounding volume around all active targets, centre the camera on it, and derive either distance or FOV needed to fit it with margins. Use asymmetric smoothing so widening happens faster than tightening, preventing a target from briefly leaving frame.

## References

- [Unity Group Framing](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineGroupFraming.html)
