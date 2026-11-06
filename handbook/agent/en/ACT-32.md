# ACT-32 · Animation Blending / Crossfade

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

Standing gradually transitions into walking instead of the pose changing abruptly in one frame.

## Not to be confused with

Longer blending always being better. Excessive blending can look mushy or cause foot sliding. Pose blending does not automatically grant gameplay cancel permissions.

## Use it for

Combine poses using weights to reduce visual discontinuity between animations. Crossfade specifically means transitioning from one animation to another over time.

## Tunable parameters

source weight · target weight · blend duration · curve · interruption policy

## Request prompt

Crossfade idle to walk over 180 ms, lowering source weight from 1 to 0 and raising target weight from 0 to 1 on a smooth curve; attack-to-dodge transitions must still pass separate cancel rules.

## Implementation hint

Interpolate pose weights from the source animation to the target over a bounded transition using an appropriate curve. Keep transition smoothness separate from gameplay permission to interrupt an action.

## References

- [Epic Games — Blend Spaces，權重混合與 Smoothing Time](https://dev.epicgames.com/documentation/unreal-engine/blend-spaces-in-unreal-engine?lang=en-US)
- [Unity — Animation Layers](https://docs.unity3d.com/6000.1/Documentation/Manual/AnimationLayers.html)
