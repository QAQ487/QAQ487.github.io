# REN-13 · Normal mapping/Bump mapping

**Aliases:** Detail normal; Reoriented normal mapping; RNM; 細節法線; 法線疊加

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

a flat brick wall appears to have lit relief, with detail shading changing as the light moves.

## Not to be confused with

bump is a broader term; normal maps are a common method that stores normals directly. They usually do not change actual geometry or silhouettes, and do not create genuine geometric occlusion out of nothing. Mismatched normal-map Y directions or tangent-space conventions can invert apparent relief; the graphics API (e.g., D3D11) itself does not choose your asset convention.

## Use it for

wrinkles, scratches, and mortar joints without adding large amounts of geometry. A weave or pore normal layered over a larger shape should stay readable on slopes instead of flattening or pointing the wrong way. (Former entry DIAG-07, “Detail normal blending”, is merged here.)

## Tunable parameters

normal strength · tangent convention · texture scale · mip bias · detail blend · channel orientation

## Request prompt

In your game, add normal mapping to a flat brick wall: use 20 cm bricks with apparent 8 mm mortar depth at strength 0.8, changing relief shading as the light moves while leaving the wall silhouette unchanged.

## Implementation hint

Perturb shading normals with a correctly decoded normal or height map while leaving mesh positions unchanged. Match tangent basis and channel orientation across asset creation and rendering.

## Related

- [NPR-23](NPR-23.md) — Art-directed face shadows

## References

- [Godot — Normal map](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#normal-map)
