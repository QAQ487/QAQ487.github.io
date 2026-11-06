# MATX-03 · Triplanar mapping

**Aliases:** Triplanar projection; World-space texturing; Box mapping; Tri-planar

**Group:** Materials & surfaces
**Subcategory:** Surface detail

## What you see

The texture no longer depends on the model’s UVs: it is projected once along each world axis X, Y and Z and blended by surface orientation — tops get the top-down projection, steep cliffs get a side projection. Cliffs show no stretched streaks and texel density is uniform everywhere; when an object moves, the texture stays fixed in the world rather than travelling with it.

## Not to be confused with

Not parallax mapping (REN-14 Parallax mapping, faking depth) or normal mapping (REN-13 Normal mapping); triplanar solves how the texture is laid onto the surface. Not height-blend splatting (MATX-04, which decides the border between two ground layers).

## Use it for

Procedural or sculpted terrain, rocks, caves, voxel or SDF meshes without UVs, freely scaled level-building blocks.

## Tunable parameters

texture scale (world units per tile) · blend sharpness (weight exponent) · per-axis textures (top vs sides) · object vs world space · normal-map reorientation

## Request prompt

Switch the game’s terrain and rocks to triplanar mapping: sample the rock texture once on each of the world-space YZ, XZ and XY planes (repeating every 4 m), weight with w = |normal|^4 then normalise so the transition is concentrated around 45°; on upward faces (normal.y > 0) use a grass texture instead. Reorient normal maps per plane as well (whiteout blend).

## Implementation hint

w = pow(abs(N), k); w /= (w.x+w.y+w.z); col = texX.Sample(P.zy*s)*w.x + texY.Sample(P.xz*s)*w.y + texZ.Sample(P.xy*s)*w.z. Three fetches per texture (cost ×3); skip fetches whose weight < 0.01. Use object-space P instead of world-space if the texture must move with the object.

## Related

- [REN-14](REN-14.md) — Parallax mapping/Parallax Occlusion Mapping (POM)
- [REN-13](REN-13.md) — Normal mapping/Bump mapping
- [MATX-04](MATX-04.md) — Height-blend texture splatting
- [PIX-17](PIX-17.md) — Autotiling
- [DIAG-07](DIAG-07.md) — Detail normal blending (reoriented normal mapping)

## References

- [Unity Shader Graph — Triplanar node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Triplanar-Node.html)
- [GPU Gems 3, ch. 1 — Generating complex procedural terrains (triplanar texturing)](https://developer.nvidia.com/gpugems/gpugems3/part-i-geometry/chapter-1-generating-complex-procedural-terrains-using-gpu)
- [Godot docs — Standard Material 3D (triplanar, distance fade dither)](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html)
