# REN-11 · Anisotropy/Anisotropic reflection

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

highlights on brushed metal, records, or hair stretch or turn along a particular direction.

## Not to be confused with

this is neither ordinary motion blur nor anisotropic texture filtering. Appropriate tangent/direction data is needed; changing roughness alone may not produce the same directionality.

## Use it for

representing directional microstructure.

## Tunable parameters

anisotropy · tangent direction · roughness · rotation · highlight stretch · map strength

## Request prompt

In your game, add anisotropic reflection to brushed aluminum: set anisotropy to 0.75 and roughness to 0.3, align brushing with the horizontal tangent, and rotate the stretched highlight when the object turns 90 degrees.

## Implementation hint

Use tangent-oriented micro-surface response so highlights stretch along a controlled direction. Ensure meshes and direction maps have stable tangent data, especially across UV seams.

## References

- [Godot — Standard Material 3D，Anisotropy](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#anisotropy)
