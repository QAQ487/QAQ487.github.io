# DIAG-05 · Z-fighting / depth precision / reversed-Z

**Aliases:** 閃面; 兩層貼圖互相閃; 遠處模型互相穿插閃爍; 貼花閃爍; Flickering overlapping surfaces; Stitching; Shimmering coplanar faces; Decal flicker; Depth fighting; Reversed-Z; Infinite far plane; 深度バイアス

**Group:** Image quality & render diagnostics
**Subcategory:** Depth precision

## What you see

Two nearly coincident surfaces (a decal on the ground, a poster on a wall, distant hills against water) fight over which one shows as the camera moves, producing flickering stripes or shards that get worse with distance. Depth-buffer precision is limited: a standard perspective depth puts most of its precision near the near plane, so two far surfaces a few centimetres apart get the same stored value. Pushing the near plane out, using a float depth buffer with reversed-Z (near stores 1, far stores 0), or adding depth bias to intentionally overlapping surfaces makes the flicker go away.

## Not to be confused with

Not TAA or aliasing edge shimmer (REN-37, REN-40: flicker on edges, not across whole faces), not distant texture shimmer (DIAG-03: the texture pattern itself sparkles), and not shadow acne (self-shadowing stripes from the shadow map). Z-fighting is recognisable because the colours of two surfaces alternate.

## Use it for

Large open worlds, very distant far planes, decals and overlapping geometry, planet-scale or flight games, first-person weapons that need a very close near plane.

## Tunable parameters

near/far plane distances · depth format (D24 / D32F) · reversed-Z on/off · infinite far plane · depth bias (constant, slope-scaled, clamp) per material · decal technique (projected vs mesh)

## Request prompt

Fix Z-fighting in the game: move the near plane from 0.01 m to at least 0.1 m; switch the depth buffer to 32-bit float with reversed-Z (clear to 0, depth test 'greater', projection maps near to 1), optionally with an infinite far plane; give decals and intentionally coplanar surfaces a depth bias (constant plus slope-scaled) instead of nudging the meshes apart; tune shadow-map bias separately. When the camera moves 2 km away, the water and shoreline must no longer flicker.

## Implementation hint

Precision is roughly proportional to z²/near for a standard [0,1] perspective mapping, so near matters far more than far. Reversed-Z: swap near/far in the projection so z_ndc = near/z, clear depth to 0, use GREATER/GREATER_EQUAL depth test, and use a 32-bit float depth format — float's exponent then cancels the 1/z distribution. In practice this means a depth-func and clear-value change in any API (e.g. D3D11/12 comparison func, glClipControl(GL_ZERO_TO_ONE) + glDepthFunc(GL_GREATER) in OpenGL, VK_COMPARE_OP_GREATER in Vulkan, or an engine's reversed-Z project setting). Depth bias for decals: rasterizer/pipeline depth-bias + slope-scaled bias, or offset in the vertex shader toward the camera.

## Related

- [DIAG-03](DIAG-03.md) — Mipmapping and anisotropic filtering
- [DIAG-06](DIAG-06.md) — Alpha-to-coverage
- [LGT-08](LGT-08.md) — Shadow mapping and cascaded shadow maps
- [REN-37](REN-37.md) — Aliasing/Jaggies/Shimmering/Specular aliasing
- [REN-40](REN-40.md) — Temporal Anti-Aliasing/TAA
- [CAM-16](CAM-16.md) — Perspective projection

## References

- [Wikipedia — Z-fighting](https://en.wikipedia.org/wiki/Z-fighting)
- [Nathan Reed — Depth precision visualized](https://www.reedbeta.com/blog/depth-precision-visualized/)
- [NVIDIA Developer — Depth precision visualized](https://developer.nvidia.com/content/depth-precision-visualized)
- [Microsoft Learn — Depth bias (example of a graphics-API depth-bias setting)](https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d10-graphics-programming-guide-output-merger-stage-depth-bias)
