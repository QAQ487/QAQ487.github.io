# REN-07 · Base color/Albedo/Diffuse color

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

surface colors such as wood grain, clothing prints, and variations between stone tiles.

## Not to be confused with

these names are not fully synonymous across workflows; in a metallic workflow, base color also contributes to the metal's reflection color. Baking shadows and highlights into base color can double up with dynamic lighting, though hand-painted styles may do this intentionally.

## Use it for

defining surface patterns and basic color.

## Tunable parameters

base color · texture scale · tint · saturation · value range · vertex color

## Request prompt

In your game, add a base-color map to the stone wall: tile it every 2 meters, keep values between 0.25 and 0.65, and remove highlights or black shadows tied to a fixed light direction.

## Implementation hint

Store the surface's underlying color in a lighting-neutral texture appropriate to the chosen material workflow. Avoid accidental baked highlights and shadows unless they are an intentional part of a hand-painted style.

## References

- [Godot — Albedo](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#albedo)
- [LearnOpenGL — PBR Theory](https://learnopengl.com/PBR/Theory)
