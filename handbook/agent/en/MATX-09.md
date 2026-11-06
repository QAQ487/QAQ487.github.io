# MATX-09 · Vertex animation texture (VAT)

**Aliases:** VAT; Vertex animation; Baked vertex animation; Morph texture

**Group:** Materials & surfaces
**Subcategory:** Special materials

## What you see

A complex animation (cloth flapping, a building collapsing, fluid, a school of fish or a crowd) is baked into a texture: each row is a frame, each column a vertex, and the colour stores that vertex’s offset. At runtime the shader reads the row for the current time and moves the vertices, so huge numbers of objects play animation that originally needed physics simulation, at a cost close to a static mesh.

## Not to be confused with

Not skeletal animation (vertices follow bones and can blend at runtime) or live physics (ragdolls, real-time cloth that react to collisions); a VAT is pre-recorded and non-interactive. Not displacement (REN-15 Displacement, usually computed live from a formula or height map).

## Use it for

Crowds and schools of fish, pre-simulated destruction and collapses, cloth and flags, fluid and smoke meshes, repeated animated props in the distance.

## Tunable parameters

frame count & fps · vertex count (texture width) · offset range / encoding (16F vs 8-bit normalised + bounds) · normals texture · interpolation · loop vs one-shot · per-instance time offset

## Request prompt

Add a VAT player to the game: in the DCC tool bake a 60-frame animation of up to 2048 vertices into two textures (RGBA16F position offsets and normals; width = vertex count, height = frame count); the vertex shader reads them with u from SV_VertexID and v = (time × 30 fps) / frameCount, lerping between the two neighbouring frames; give each instance its own time offset and draw 500 of them in one instanced call.

## Implementation hint

Vertex shader: u = (vertexID + 0.5)/vertCount; v0 = (floor(f) + 0.5)/frames, v1 = next row; pos = basePos + lerp(tex.SampleLevel(pointClamp, (u,v0)), tex.SampleLevel(pointClamp, (u,v1)), frac(f)). Needs vertex texture fetch (all modern GPUs). Rigid-piece variants store per-piece position + rotation (quaternion) instead of per-vertex offsets.

## Related

- [REN-15](REN-15.md) — Displacement/Vertex displacement
- [ENV-08](ENV-08.md) — Foliage sway
- [VFX-19](VFX-19.md) — Shatter
- [MATX-03](MATX-03.md) — Triplanar mapping

## References

- [SideFX Labs — Vertex Animation Textures (Houdini docs)](https://www.sidefx.com/docs/houdini/nodes/out/labs--vertex_animation_textures-3.0.html)
- [Unreal Engine docs — Vertex Animation Tool](https://dev.epicgames.com/documentation/en-us/unreal-engine/vertex-animation-tool-in-unreal-engine)
- [GPU Gems 3, ch. 2 — Animated crowd rendering (animation stored in textures)](https://developer.nvidia.com/gpugems/gpugems3/part-i-geometry/chapter-2-animated-crowd-rendering)
