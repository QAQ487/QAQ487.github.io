# ANI-12 · Foot IK / Foot placement

**Aliases:** Foot locking; Ground alignment; Leg IK

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

When a character stands on stairs, slopes or rocks, each foot lands at the actual ground height: one foot steps higher, the other reaches lower, the knees bend automatically and the pelvis drops to match, instead of one foot floating and the other sinking into the floor.

## Not to be confused with

Not the whole procedural walk system (ANI-08); foot placement corrects foot positions on top of an existing walk or stand animation. Not the general IK concept itself — this is its specific use on feet.

## Use it for

3D characters standing and walking on uneven terrain: stairs, slopes, rocky ground.

## Tunable parameters

ray length · max foot rotation · pelvis offset · blend speed · foot lock during plant · disable in air / on fast movement

## Request prompt

In your game, add foot placement: cast a ray down from 0.5 m above each ankle to find the ground, move the foot to the hit point and align the sole to the surface normal (up to 30°); lower the pelvis by the lower of the two foot offsets; smooth over 0.1 s to avoid jitter; disable while airborne.

## Implementation hint

After the animation pass, raycast per foot, solve a two-bone IK chain (hip–knee–ankle) to the corrected target with a pole vector for the knee, rotate the foot to the ground normal, and offset the pelvis; drive weights by animation curves so only planted feet are corrected.

## Related

- [ANI-08](ANI-08.md) — Procedural animation
- [ANI-11](ANI-11.md) — Look-at / Head tracking
- [PIX-24](PIX-24.md) — Sprite pivot at the feet
- [ANI-14](ANI-14.md) — Sync groups / Marker-based syncing
- [ANI-16](ANI-16.md) — Stride warping
- [ANI-17](ANI-17.md) — Orientation warping

## References

- [Unity Manual — Inverse Kinematics (foot / hand IK)](https://docs.unity3d.com/Manual/InverseKinematics.html)
- [Unreal Engine docs — Leg IK (Animation Blueprint)](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-blueprint-leg-ik-in-unreal-engine)
- [Unity Animation Rigging — Two Bone IK constraint](https://docs.unity3d.com/Packages/com.unity.animation.rigging@1.3/manual/constraints/TwoBoneIKConstraint.html)
- [Wikipedia — Inverse kinematics](https://en.wikipedia.org/wiki/Inverse_kinematics)
