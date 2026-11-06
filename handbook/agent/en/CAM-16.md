# CAM-16 · Perspective projection

**Group:** Camera & composition
**Subcategory:** Projection and Apparent Distance

## What you see

Equally sized objects appear larger nearby and smaller farther away. Approaching an object makes it larger on screen. (General computer-graphics terminology.)

## Not to be confused with

This is not synonymous with “3D models.” A 3D scene can use orthographic projection, and 2.5D gameplay can use perspective.

## Use it for

Communicates depth, distance, and a familiar sense of 3D space.

## Tunable parameters

vertical FOV · near/far clip · aspect ratio · camera distance · lens shift · depth precision

## Request prompt

In your game, use perspective projection for the exploration camera: 55° vertical FOV, 0.1 m near clip, 500 m far clip, with composition based on 16:9 and horizontal FOV derived from aspect ratio. Place two 2 m pillars at 5 m and 15 m to verify that the farther pillar is visibly smaller on screen.

## Implementation hint

Use a perspective projection matrix so projected size decreases with view-space depth. Choose the field-of-view axis explicitly, derive the other axis from aspect ratio, and keep the near plane as far out as practical to preserve depth-buffer precision.

## References

- [Epic Camera Component Types：Perspective](https://dev.epicgames.com/documentation/fortnite/camera-types-in-unreal-editor-for-fortnite?lang=en-US)
