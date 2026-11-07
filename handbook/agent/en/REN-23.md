# REN-23 · Reflections/Image-Based Lighting (IBL)/Reflection probes

**Aliases:** Box projection; Parallax-corrected cubemap; Local cubemap; 反射位置不對; 盒體投影

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

metal spheres, car bodies, and wet ground reflect the sky and surroundings; rough surfaces appear blurrier.

## Not to be confused with

reflection is the effect; environment maps/probes, planar reflections, SSR, and ray tracing are different data sources. Probes often approximate a location or use precaptured imagery, so nearby moving objects' positions and occlusion cannot be assumed correct.

## Use it for

conveying materials, space, and environmental color; IBL can also provide environmental illumination, not just specular reflections. Environmental reflections on indoor floors and metal should keep windows and doors in place as the camera moves, rather than sliding with the view. (Former entry DIAG-08, “Box-projected reflections”, is merged here.)

## Tunable parameters

probe spacing · capture resolution · influence volume · roughness mip · blend distance · intensity

## Request prompt

In your game, add environment reflections: place one 256 px reflection probe per room, blend both probes across 2 meters at each doorway, and make a metal sphere reflect sharply at roughness 0.1 and diffusely at 0.8.

## Implementation hint

Sample environmental radiance from reflection captures or an image-based-lighting source, selecting and blending data by position. Prefilter the source by roughness and provide parallax correction where nearby geometry makes the approximation obvious.

## References

- [Godot — Environment and post-processing，Reflected light](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
- [Unreal — Post Process Effects，Reflections](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
