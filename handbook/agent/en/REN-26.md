# REN-26 · Fog/Distance fog/Depth fog

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

distant mountains and buildings lose contrast and gradually approach the fog color.

## Not to be confused with

simplified distance/height fog does not imply actual local volumes or interaction with lights. Treatment of transparency and the sky in depth-based full-screen methods depends on implementation.

## Use it for

atmosphere, depth layering, directing attention, and hiding distant scene cutoffs.

## Tunable parameters

fog color · start distance · end distance · density · height falloff · sky blend

## Request prompt

In your game, add distance fog: begin at 40 meters, reach 90% fog by 120 meters, and use #A9BCC8; apply the same fog color to sky and transparent particles while leaving characters within 10 meters unaffected.

## Implementation hint

Blend scene radiance toward an atmospheric color as a function of view distance and optionally world height. Define how sky, transparent surfaces, and post-processing participate so layers remain consistent.

## References

- [Godot — Environment and post-processing，Fog](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
- [Godot — Volumetric fog，比較圖](https://docs.godotengine.org/en/stable/tutorials/3d/volumetric_fog.html)
