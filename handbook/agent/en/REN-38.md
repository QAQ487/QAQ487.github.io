# REN-38 · Multisample Anti-Aliasing/MSAA

**Group:** Image quality & render diagnostics
**Subcategory:** Clarity, Shimmering, and Residual Images

## What you see

diagonal mesh edges look smoother, usually without a whole-image post-process smearing look.

## Not to be confused with

MSAA is an antialiasing method, not a visual style. Ordinary coverage MSAA does not fully evaluate the shader at every subsample. Do not expect it alone to resolve all specular shimmer or alpha cutouts; alpha-to-coverage is a separate mechanism to combine with it. Cost depends on render targets, sample count, and pipeline.

## Use it for

images prioritizing clear silhouettes with relatively little high-frequency shader shimmer.

## Tunable parameters

sample count · alpha-to-coverage · resolve filter · target format · depth samples · quality level

## Request prompt

In your game, add 4x MSAA: smooth mesh diagonals at 1080p with four samples in both color and depth targets, pair foliage with alpha-to-coverage, and record the average GPU-time increase before and after enabling it.

## Implementation hint

Store multiple coverage and depth samples at geometric edges, then resolve them into the final pixel. Match sample counts across relevant targets and use separate measures for shader or alpha-cutout aliasing.

## References

- [Godot — 3D antialiasing，MSAA](https://docs.godotengine.org/en/stable/tutorials/3d/3d_antialiasing.html#multisample-antialiasing-msaa)
