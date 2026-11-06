# ACT-34 · Animation Layers / Bone Mask / Partial-body Animation

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

The legs keep running while the upper body reloads or fires.

## Not to be confused with

Layering necessarily being additive. The upper body can override the original pose or add an additive offset. A mask selects which parts are affected; it is not a post-processing image mask.

## Use it for

Assign different body regions to different animation sources, reducing the need to author a complete animation for every combination of actions.

## Tunable parameters

base layer · upper-body mask · layer weight · override mode · blend boundary

## Request prompt

Use running as the full-body base and override from spine bone 2 through both hands with a reload layer at 0.85 weight; keep pelvis and legs running and fade the shoulder boundary in over 100 ms.

## Implementation hint

Evaluate a base full-body pose, then apply another animation only to bones selected by a mask. Specify whether the layer overrides or adds offsets and soften weights near the mask boundary when needed.

## References

- [Unity — Animation Layers，mask、Override、Additive](https://docs.unity3d.com/6000.1/Documentation/Manual/AnimationLayers.html)
