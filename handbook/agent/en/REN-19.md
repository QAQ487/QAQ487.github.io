# REN-19 · Subsurface scattering/SSS

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

skin, wax, and jade have a soft, translucent quality; thin backlit ears may glow red.

## Not to be confused with

this is not ordinary surface diffuse shading or clear glass-like transmission. Thin-sheet transmission is related to SSS, but not every implementation models full volumetric transport. Approximate screen-space diffusion can bleed across boundaries; material thickness and model scale also matter.

## Use it for

skin, candles, and organic or translucent materials.

## Tunable parameters

scatter color · scatter radius · thickness · transmission · scale · profile strength

## Request prompt

In your game, add subsurface scattering to skin: use a 1.2 mm scatter radius with red strength 2.5 times blue, make ears thinner than 3 mm glow softly under backlight, and prevent the blur from bleeding into the eyes.

## Implementation hint

Diffuse lighting beneath the surface with a material-specific scattering profile and scale-aware radius. Use thickness or transmission data for backlit thin regions and prevent cross-object bleeding.

## References

- [Godot — Standard Material 3D，Subsurface scattering](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#subsurface-scattering)
