# ANI-19 · Turn-in-place / Pivot step

**Aliases:** Idle turn; Rotate-in-place threshold; Foot-planted turn; 180 turn; Pivot step; 原地轉向; その場ターン

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

Standing still, a small stick twist turns the upper body with feet planted; past a threshold the character takes a 90°/180° step. Without it the whole body spins like a turntable — a common cheap tell.

## Not to be confused with

Not look-at (ANI-11, head tracks while the body may stay) and not orientation warping while moving (ANI-17). Turn-in-place is idle facing correction.

## Use it for

Third-person action, realistic characters, idle facing that needs planted feet.

## Tunable parameters

twist threshold 60–90° · max spine twist · 90/180 clip set · foot-plant sync · blend out twist (authoring defaults)

## Request prompt

Yaw error under ~60–90°: absorb with additive spine/head twist and locked feet. Over threshold: play a 90° or 180° step and rotate the root with foot plants; then feet face the new direction and twist returns to 0.

## Implementation hint

Compute yawError = deltaAngle(facing, desired). If abs(error) < threshold: set additive aim/twist weights; freeze foot IK targets. Else: select turn clip by signed error quadrant, root-rotate with animation events on plant, clear twist at end. Cross-link gaze-led turn on ANI-11.

## Related

- [ANI-11](ANI-11.md) — Look-at / Head tracking
- [ANI-17](ANI-17.md) — Orientation warping
- [ACT-14](ACT-14.md) — Overlapping Action / Drag

## References

- [Wikipedia — Inverse kinematics](https://en.wikipedia.org/wiki/Inverse_kinematics)
- [Wikipedia — Twelve basic principles of animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
