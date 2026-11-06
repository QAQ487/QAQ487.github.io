# REN-09 · Metallic/Metalness

**Group:** Materials & surfaces
**Subcategory:** Material Color, Surface Detail, and Light Transmission

## What you see

metals are represented mainly by reflections tinted by the material; without an environment to reflect, they can look very dark.

## Not to be confused with

this is not an overall brightness or reflection-sharpness slider; smooth plastic can also be highly reflective. Pure materials are often near the metal or nonmetal endpoints, but intermediate values can represent mixtures or coverage boundaries and are not universally forbidden.

## Use it for

distinguishing exposed metal from nonmetals such as paint, wood, and plastic.

## Tunable parameters

metallic · base color · roughness · mask threshold · edge blend · environment intensity

## Request prompt

In your game, add a metallic mask: set the robot's bare steel to 1 and blue paint to 0, reveal metal with a 3 mm wear mask along edges, and keep both regions at roughness 0.35.

## Implementation hint

Use a metallic mask to separate exposed conductive material from dielectric coatings such as paint or dirt. Supply meaningful surroundings to reflect and preserve roughness as an independent property.

## References

- [LearnOpenGL — PBR Theory](https://learnopengl.com/PBR/Theory)
- [Godot — Metallic](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html#metallic)
