# ANI-21 · Hand IK contact

**Aliases:** Hand placement IK; Wall brace; Environmental hand contact; Cover hand; Rail hand; 手部接觸 IK; 手の接触 IK

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

Walking close to a wall, door frame, or cover, the character reaches out and touches or braces, then releases when past.

## Not to be confused with

Not foot IK (ANI-12, feet/pelvis only) and not cloth (PHY-01). This is arm contact with the environment.

## Use it for

Cover shooters, realistic traversal, tight corridors.

## Tunable parameters

reach radius · blend in ~0.2 s · palm align · release distance · left/right preference (authoring defaults)

## Request prompt

When a surface is within reach in travel or side direction, trace a hand point, blend arm IK in over ~0.2 s with the palm aligned to the surface normal, and release when out of range or moving away.

## Implementation hint

Sphere/capsule probes beside the torso along velocity and side vectors. On hit, set two-bone IK target + rotation from normal; fade weight 0→1 in 0.2 s. Disable while airborne or during attacks that own the arms.

## Related

- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [PHY-01](PHY-01.md) — Position-based cloth (PBD / XPBD)
- [ANI-22](ANI-22.md) — Contextual vault / Traversal snapping

## References

- [Wikipedia — Inverse kinematics](https://en.wikipedia.org/wiki/Inverse_kinematics)
- [Unity Manual — Inverse Kinematics (foot / hand IK)](https://docs.unity3d.com/Manual/InverseKinematics.html)
