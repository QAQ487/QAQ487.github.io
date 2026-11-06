# ACT-33 · Blend Space / Blend Tree

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

Walking smoothly becomes running as speed increases; changing direction can also blend in diagonal locomotion poses.

## Not to be confused with

Blend spaces and blend trees are related but different organizational forms, not exact synonyms. Unreal commonly uses one- or two-dimensional sample spaces; Unity's “blend tree” denotes a tree-structured blending arrangement. Nor is every animation-selection system called motion matching.

## Use it for

Select and blend multiple animations using parameters such as speed and direction.

## Tunable parameters

speed parameter · direction parameter · sample positions · weight normalization · playback scaling

## Request prompt

Create a one-dimensional 0–6 m/s locomotion blend with idle at 0, walk at 1.8, jog at 4.0, and run at 6.0; blend linearly between neighboring samples with weights summing to 1.

## Implementation hint

Map movement parameters into a sample space or tree and blend nearby locomotion poses with normalized weights. Treat the chosen organization explicitly; it need not be a motion-matching system.

## References

- [Epic Games — Blend Spaces，Overview／1D](https://dev.epicgames.com/documentation/unreal-engine/blend-spaces-in-unreal-engine?lang=en-US)
- [Unity — Animation Layers，Animator Controller 說明](https://docs.unity3d.com/6000.1/Documentation/Manual/AnimationLayers.html)
