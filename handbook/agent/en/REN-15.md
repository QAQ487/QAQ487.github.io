# REN-15 · Displacement/Vertex displacement

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

waves, flags, or raised ground change the silhouette, not just surface shading.

## Not to be confused with

unlike normal/parallax mapping, common vertex displacement needs a sufficiently dense mesh. Changing rendered positions does not mean colliders, shadow passes, and bounding boxes are synchronized. Tessellation is one possible way to supply subdivision, not a synonym for displacement.

## Use it for

water, wind-driven vegetation, uneven terrain, and geometric effects.

## Tunable parameters

displacement scale · mesh density · frequency · direction · bounds padding · shadow sync

## Request prompt

In your game, add vertex displacement to water: use at least 16 grid divisions per meter and normal-direction waves with 0.25 m amplitude, 4 m wavelength, and 1.2 m/s speed, updating both silhouette and cast shadow.

## Implementation hint

Move actual vertices along a chosen direction using a height or procedural signal, and provide enough geometry for the target detail scale. Update culling bounds and all required shadow or collision representations deliberately.

## References

- [Unity — Feature Examples，Vertex Animation](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Shader-Graph-Sample-Feature-Examples.html)
