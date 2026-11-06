# REN-08 · Roughness/Smoothness/Glossiness

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

smooth surfaces have concentrated highlights and clear reflections; rough surfaces spread reflections and look matte.

## Not to be confused with

rougher does not simply mean darker, and roughness is not metallic. Smoothness often runs in the opposite direction to roughness, but do not assume every engine's maps can be converted by simple inversion; check the encoding and model.

## Use it for

distinguishing wet and dry ground, frosted plastic, and polished stone.

## Tunable parameters

roughness · smoothness · map contrast · minimum value · maximum value · mip filtering

## Request prompt

In your game, add roughness variation to one stone floor: set dry areas to 0.78 and wet areas to 0.18, blend them over 0.5 meters, and keep base-color brightness unchanged.

## Implementation hint

Drive reflection spread with a perceptually useful roughness or smoothness signal and document its direction and encoding. Filter high-frequency variation to prevent distant highlights from sparkling.

## References

- [Godot — Roughness](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#roughness)
