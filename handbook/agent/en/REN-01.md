# REN-01 · Physically Based Rendering/PBR/PBS

**Group:** Stylized rendering (NPR)
**Subcategory:** Overall Style and Outlines

## What you see

metals, plastics, and stone have more consistent relationships between highlights, reflections, and shading in the same environment; materials remain recognizable under different lighting.

## Not to be confused with

PBR is a family of modeling principles and workflows, not a “realism filter,” and it does not guarantee attractive images. Metallic–roughness and specular–glossiness are different parameterizations; textures, environment, and exposure still affect the result.

## Use it for

realistic asset workflows; stylized art can also use PBR while exaggerating colors and shapes.

## Tunable parameters

base color · metallic · roughness · normal strength · environment intensity · exposure

## Request prompt

In your game, add physically based materials: place one metal, plastic, and stone sphere in the same test scene, set metallic to 1, 0, and 0 and roughness to 0.2, 0.35, and 0.8, then keep each material recognizable under daylight and indoor lighting.

## Implementation hint

Use an energy-aware surface model with a documented material workflow, consistent texture ranges, and calibrated lighting. Validate representative metal, dielectric, and stone assets under several environments rather than tuning them for one shot.

## References

- [LearnOpenGL — PBR Theory](https://learnopengl.com/PBR/Theory)
