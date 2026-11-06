# REN-33 · Motion blur/Velocity blur

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

fast camera turns or moving objects stretch contours along their direction of motion.

## Not to be confused with

this is not TAA ghosting; if old images remain with motion blur disabled, investigate temporal systems. Real-time methods often depend on velocity and depth. Occlusion boundaries and whether transparent/deforming objects have correct velocities affect the result. Blur cannot restore the input responsiveness lost at low frame rates.

## Use it for

conveying speed, simulating shutter exposure, and reducing strobing.

## Tunable parameters

shutter angle · camera contribution · object velocity · sample count · maximum radius · depth rejection

## Request prompt

In your game, add motion blur: simulate a 180-degree shutter at 60 fps with a 20 px maximum radius; stretch a fast-moving car along its velocity while preserving the edge of a stationary sign one meter in front of it.

## Implementation hint

Blur along per-pixel camera and object motion over a simulated shutter interval, rejecting samples across depth discontinuities. Supply correct velocities for skeletal and vertex-deformed geometry and cap the radius for readability.

## References

- [Unreal — Post Process Effects，Motion Blur](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
