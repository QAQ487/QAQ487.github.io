# REN-24 · Screen-Space Reflections/SSR

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

a floor reflects objects in front of the camera, but reflections can disappear/fade when those objects leave the screen, become occluded, or the reflection approaches a screen edge.

## Not to be confused with

not every reflection is SSR. Current screen information alone cannot recover every off-screen surface. Thickness estimation, marching, and temporal stabilization can also produce holes, stretching, or trails.

## Use it for

relatively inexpensive real-time reflections, often blended with other reflection sources.

## Tunable parameters

ray steps · maximum distance · thickness · stride · edge fade · history weight

## Request prompt

In your game, add screen-space reflections to wet ground: use up to 48 steps, a 20 m maximum distance, 0.15 m thickness tolerance, fade within the outer 8% of the screen, and fall back to a reflection probe for missing data.

## Implementation hint

March reflection rays through screen depth, validate intersections with a thickness tolerance, and temporally stabilize accepted samples. Fade near screen boundaries and blend missing rays into probes or another reflection source.

## References

- [Unreal — Post Process Effects，Screen Space Reflections](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
- [Godot — Environment and post-processing，SSR](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
