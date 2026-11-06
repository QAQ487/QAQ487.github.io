# REN-40 · Temporal Anti-Aliasing/TAA

**Group:** Image quality & render diagnostics
**Subcategory:** Clarity, Shimmering, and Residual Images

## What you see

thin lines, grass, and reflections become more stable; stationary detail converges over time, while movement can look softer.

## Not to be confused with

typically uses jitter to obtain different subpixel samples, then reprojects/blends history; it is not simply averaging several images. Motion and newly revealed regions need handling. Velocity, history rejection, and sharpening strategies affect blur and ghosting. Results vary substantially between TAA implementations.

## Use it for

addressing temporal instability in silhouettes, shaders, and subpixel detail.

## Tunable parameters

jitter sequence · history weight · velocity scale · rejection threshold · clamp radius · sharpening

## Request prompt

In your game, add TAA: use an 8-frame jitter sequence, history weight 0.9 when still and 0.6 in motion, reject history above a 2% depth difference, and apply 0.15 sharpening; moving grass must not leave obvious trails.

## Implementation hint

Jitter subpixel sampling, reproject prior results with motion vectors, reject invalid history, and accumulate only within a stable neighborhood bound. Treat disocclusion, transparency, and animated geometry explicitly before applying restrained sharpening.

## References

- [Godot — 3D antialiasing，TAA](https://docs.godotengine.org/en/stable/tutorials/3d/3d_antialiasing.html#temporal-antialiasing-taa)
