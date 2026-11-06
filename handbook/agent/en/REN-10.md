# REN-10 · Specular highlight

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

bright spots or patches on spheres, leather, or eyes change with viewing and lighting angles.

## Not to be confused with

a highlight is not emission. It is related to reflection, but “some specular” does not mean the renderer provides complete scene reflections. Roughness, light shape, and the lighting model all change the highlight.

## Use it for

conveying curvature, wetness, and material character; highlights can also be stylized into stars or hard-edged patches.

## Tunable parameters

specular intensity · roughness · light size · highlight tint · shape · view response

## Request prompt

In your game, add specular highlights: show one white spot about 6 px wide on each eye at roughness 0.12, and make the spots move across the curved surface when the camera rotates 45 degrees.

## Implementation hint

Compute highlights from the light, view, surface normal, and micro-surface parameters. For stylized art, quantize or reshape the highlight after preserving its angle-dependent movement.

## References

- [Godot — Specular Mode](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#specular-mode)
