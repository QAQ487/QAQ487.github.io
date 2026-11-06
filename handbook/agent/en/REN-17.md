# REN-17 · Alpha clipping/Alpha test/Cutout/Alpha scissor

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

leaves and wire fences have clearly cut holes; an individual sample is usually either kept or discarded.

## Not to be confused with

this differs from gradual alpha blending. Hard edges can alias or shimmer; alpha-to-coverage, dithering, or temporal methods can help, each with sampling/stability trade-offs. Dissolve is a visual effect, not a unique underlying API.

## Use it for

foliage, fences, and hard-edged holes; a noise mask with a moving threshold can create a dissolve disappearance.

## Tunable parameters

alpha threshold · edge softness · dither scale · alpha-to-coverage · mip level · shadow cutoff

## Request prompt

In your game, add alpha-clipped foliage: use a 0.5 threshold, enable alpha-to-coverage with 4x MSAA, switch to a 4 px blue-noise fade beyond 20 meters, and keep leaf holes consistent in the shadow.

## Implementation hint

Discard samples below a mask threshold for hard cutouts, using filtered masks and coverage or dithering when needed. Keep cutout behavior consistent in depth and shadow passes.

## References

- [Godot — Transparency／Alpha Antialiasing](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#transparency)
