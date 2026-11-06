# CAM-28 · Depth of field／DOF

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

The character is sharp while the distant background or very close foreground is blurred; sharpness varies with depth. (General optics and rendering terminology.)

## Not to be confused with

This is neither motion blur caused by movement nor blur applied to the entire image. Bokeh describes the shape / character of out-of-focus highlights and similar features, not every aspect of DOF.

## Use it for

Creates visual layers and concentrates attention on a subject at a chosen distance.

## Tunable parameters

focus distance · focus range · blur strength · near transition · far transition · maximum blur radius · quality tier

## Request prompt

In your game, add depth of field during dialogue: focus on the character's eyes with a ±0.5 m sharp range. Ramp background blur to a maximum 8 px beyond 4 m from focus, and near-foreground blur to 5 px within 0.8 m of the camera. Smooth focus distance over 0.2 s and keep the HUD perfectly sharp.

## Implementation hint

Use the depth buffer to estimate each pixel's distance from the focus plane, derive a signed circle-of-confusion value, and blur near and far samples separately before compositing. Keep HUD and other screen-space overlays outside the depth-of-field pass.

## References

- [Epic Cinematic Depth of Field](https://dev.epicgames.com/documentation/unreal-engine/cinematic-depth-of-field-in-unreal-engine?lang=en-US)
