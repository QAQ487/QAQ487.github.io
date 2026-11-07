# ANI-20 · Locomotion lean / Body banking

**Aliases:** Lean into turns; Acceleration lean; Procedural lean; Run tilt; 移動側傾; 走行リーン

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

When swerving or speeding up, the runner tilts into the curve or forward, then straightens; on a hard stop they lean back briefly. Without it the character slides like a cardboard cutout.

## Not to be confused with

Not vehicle camera banking (CAMX-13). This is the character body. Prefer acceleration-driven lean over a baked tilt cycle alone.

## Use it for

Parkour, third-person locomotion, cartoon platformers.

## Tunable parameters

max lean 10–15° · accel→angle scale · spring · hard-stop back-lean · keep camera level optional (authoring defaults)

## Request prompt

Drive pelvis/spine roll and pitch (or sprite rotation in 2D) from sideways acceleration (speed × turn rate) or forward acceleration; lean proportional with a ~10–15° cap, spring-smoothed; upright when acceleration ≈ 0. Hard stop: brief backward lean.

## Implementation hint

lean = clamp(k * (velocity × angularVelocity).y or accel, -max, max); critically damp toward lean each tick; apply as additive spine/pelvis or sprite Z rotation. Optionally keep camera unrolled so the lean reads.

## Related

- [CAMX-13](CAMX-13.md) — Camera banking
- [ANI-08](ANI-08.md) — Procedural animation
- [ACT-35](ACT-35.md) — Additive Animation / Additive Pose
- [ACT-07](ACT-07.md) — Acceleration / Braking / Deceleration

## References

- [Wikipedia — Procedural animation](https://en.wikipedia.org/wiki/Procedural_animation)
- [Jonasson & Purho — Juice it or lose it (YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
