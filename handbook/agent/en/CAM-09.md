# CAM-09 · Camera bounds／Camera confinement

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

At the end of a level, the camera stops following and the character approaches the screen edge, preventing empty space outside the map from appearing. (A general concept. Cinemachine Confiner 2D is a tool-specific name; Keren’s Edge-snapping is a related category.)

## Not to be confused with

Constraining only the camera center does not keep the whole frame within bounds; view size and aspect ratio matter. This is not collision handling that prevents the camera from passing through walls.

## Use it for

Keeps the visible area inside the designed world. Shapes can also define irregular rooms.

## Tunable parameters

boundary shape · viewport padding · aspect ratio · zoom-aware inset · soft edge distance · fallback for small rooms

## Request prompt

In your game, add camera boundary constraints using a room polygon. Inset it by the current viewport half-width and half-height, plus an 8 px safety margin, then constrain the camera centre to the reduced shape. Recompute for 16:9, 21:9, and every zoom change so no space outside the map is revealed.

## Implementation hint

Inset the allowed world shape by the camera's current half-extents, then project the desired camera centre onto that reduced shape. Recompute the inset when zoom or aspect ratio changes, and define a fallback centre when the room is smaller than the viewport.

## References

- [Unity Confiner 2D：screen edges stay within a shape](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineConfiner2D.html)
