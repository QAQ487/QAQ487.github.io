# ACT-37 · Motion Warping / Root Motion Warping

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

The same vault adapts to slightly different obstacle positions, or a lunging attack adjusts its travel and facing to align with a target.

## Not to be confused with

IK alone: warping can alter the character's overall path, while IK primarily solves poses along bone chains. Nor does warping imply unconditional homing hits or automatic correct handling of every collision.

## Use it for

Adjust root motion within a specified window so an authored action fits a scene target.

## Tunable parameters

warp window · target transform · translation scale · rotation scale · collision validation

## Request prompt

Warp root motion from 220 to 680 ms to align a vault with the obstacle top, limiting correction to 0.6 m forward/back, 0.25 m sideways, and 20° facing; abort if the adjusted path fails collision validation.

## Implementation hint

During a marked interval, redistribute authored root translation and rotation so the action reaches a nearby target transform. Limit correction magnitude and validate the adjusted path against collision; warping should not guarantee a hit.

## References

- [Epic Games — Motion Warping，Overview／Animation Montage](https://dev.epicgames.com/documentation/en-us/unreal-engine/motion-warping-in-unreal-engine)
