# REN-18 · Refraction/Screen-space refraction

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

water, glass, or hot air bends or shifts the apparent background position.

## Not to be confused with

physical refraction changes light direction between media; screen distortion is only an approximation and does not guarantee correct thickness, layered refraction, or off-screen information. Refraction is not reflection, nor merely transparency.

## Use it for

water, glass, invisibility, shockwaves, and heat haze.

## Tunable parameters

index of refraction · distortion scale · thickness · normal strength · chromatic split · edge fade

## Request prompt

In your game, add glass refraction: use 8 mm thickness, index of refraction 1.5, and at most 12 px distortion, fading back to the undistorted background within 20 px of the screen edge.

## Implementation hint

Distort transmitted scene color from surface orientation, thickness, and material refraction parameters. For screen-space implementations, fade invalid or off-screen samples and provide a stable fallback.

## References

- [Godot — Standard Material 3D，Refraction](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#refraction)
