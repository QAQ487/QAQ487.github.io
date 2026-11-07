# ACT-35 · Additive Animation / Additive Pose

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

A running cycle remains intact while breathing, recoil, or leaning is added.

## Not to be confused with

Simply playing two full animations at half strength each, or arbitrarily adding bone rotation angles. Ordinary weighted blending and additive animation give their data different meanings; additive work requires suitable reference poses and space settings.

## Use it for

Apply changes relative to a reference pose on top of a base action, reusing details and reactions.

## Tunable parameters

reference pose · additive delta · layer weight · pose space · affected bones

## Request prompt

Relative to the weapon-idle reference pose, add 6° of recoil rotation and 3 cm of shoulder travel over the run at 0.7 weight, returning to zero within 120 ms without affecting the legs.

## Implementation hint

Compute the animation's change relative to a declared reference pose in a consistent pose space, then compose that delta over the base action. Limit bones and weight so the overlay does not replace the underlying gait.

## Related

- [ANI-20](ANI-20.md) — Locomotion lean / Body banking

## References

- [Unity — Animation Layers，Additive](https://docs.unity3d.com/6000.1/Documentation/Manual/AnimationLayers.html)
- [Epic Games — Blend Spaces，mesh-space additive Aim Offset](https://dev.epicgames.com/documentation/unreal-engine/blend-spaces-in-unreal-engine?lang=en-US)
