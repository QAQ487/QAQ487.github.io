# ACT-37 · Motion Warping / Root Motion Warping

**Aliases:** Melee magnetism; Attack latch; Attack latching; 近戰吸附; 攻擊鎖附; 近接の吸い付き

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

The same vault adapts to slightly different obstacle positions, or a lunging attack adjusts its travel and facing to align with a target. Melee magnetism / attack latching: when an attack starts with an enemy inside a forward cone and range, the character slides over the first few frames to exactly hitting distance and turns to face it; obstacles stop the slide in front of them, and it never lunges from too far away.

## Not to be confused with

IK alone: warping can alter the character's overall path, while IK primarily solves poses along bone chains. Nor does warping imply unconditional homing hits or automatic correct handling of every collision. Melee magnetism is also not aim assist (FB-20, which bends the reticle and aim direction, not the character body).

## Use it for

Adjust root motion within a specified window so an authored action fits a scene target. In melee, it keeps combo strings latched onto the target and reduces whiffs.

## Tunable parameters

warp window · target transform · translation scale · rotation scale · collision validation · melee latch: forward cone angle · max latch distance · stop distance (hit range) · latch frames · obstacle stop

## Request prompt

Warp root motion from 220 to 680 ms to align a vault with the obstacle top, limiting correction to 0.6 m forward/back, 0.25 m sideways, and 20° facing; abort if the adjusted path fails collision validation. Melee latch: when an attack starts with an enemy inside a 60° forward cone within 4 m, slide the character to exact hitting distance and face it over the first 4–8 frames; stop at any wall on the way; outside the range, do not latch.

## Implementation hint

During a marked interval, redistribute authored root translation and rotation so the action reaches a nearby target transform. Limit correction magnitude and validate the adjusted path against collision; warping should not guarantee a hit. Melee latch: at attack start pick the best target inside a forward cone and max distance; compute a destination at the attack’s hit distance in front of the target, trace the path and clamp it at the first obstacle; warp root translation and facing toward that destination over the startup frames only. If no target qualifies, play the move unwarped.

## Related

- [ANI-22](ANI-22.md) — Contextual vault / Traversal snapping
- [CAM-36](CAM-36.md) — Contextual finisher / Environmental takedown
- [FB-20](FB-20.md) — Aim-assist friction and magnetism
- [ACT-05](ACT-05.md) — Wall-Jump Forgiveness / Wall-Jump Window

## References

- [Epic Games — Motion Warping，Overview／Animation Montage](https://dev.epicgames.com/documentation/en-us/unreal-engine/motion-warping-in-unreal-engine)
