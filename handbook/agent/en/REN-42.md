# REN-42 · Upscaling/Temporal upscaling/Super resolution

**Group:** Image quality & render diagnostics
**Subcategory:** Clarity, Shimmering, and Residual Images

## What you see

output dimensions stay the same and performance may improve, but thin lines, moving boundaries, and transparent detail may soften or become unstable.

## Not to be confused with

not all upscaling uses AI or previous frames. Different generations such as FSR1 and FSR2 cannot be treated alike. Temporal upscaling often overlaps with AA, but is not merely enlarging an image and sharpening it. Reconstruction has a cost; GPU/CPU bottlenecks and input quality determine actual gains.

## Use it for

trading lower internal rendering resolution for performance; some temporal reconstruction methods also provide native-resolution AA modes.

## Tunable parameters

internal scale · output resolution · jitter · history weight · reactive mask · sharpening · mip bias

## Request prompt

In your game, add upscaling: render internally at 67% linear resolution and output 2560x1440, using correct motion vectors, a 0.8 transparency reactive mask, and 0.2 sharpening for temporal reconstruction; test thin lines and fast-moving boundaries.

## Implementation hint

Reconstruct output pixels from lower-resolution spatial samples and, for temporal methods, reprojected history plus motion data. Adjust texture level-of-detail and reactive masks for transparency, and measure gains only when rendering resolution is the actual bottleneck.

## References

- [Godot — 3D antialiasing，FSR2 與原生解析度比較](https://docs.godotengine.org/en/stable/tutorials/3d/3d_antialiasing.html#amd-fidelityfx-super-resolution-2-2-fsr2)
