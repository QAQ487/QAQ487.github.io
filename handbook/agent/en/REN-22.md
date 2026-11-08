# REN-22 · Screen-Space Ambient Occlusion/SSAO

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

corner/contact darkening may appear or disappear with camera movement or occlusion, with dark halos or noise near boundaries.

## Not to be confused with

AO is the goal; SSAO is one family of methods. Usually sampling depth and normals, it cannot infer all off-screen/hidden geometry from current depth alone. Radius, bias, and denoising affect missing occlusion, halos, and blur. HBAO/GTAO and others use their own estimators; do not treat every AO label as the same algorithm.

## Use it for

adding local AO around dynamic objects in real time.

## Tunable parameters

sample radius · sample count · depth bias · normal weight · intensity · denoise radius

## Request prompt

In your game, add SSAO: use a 0.6 m radius, 16 samples, 0.02 m depth bias, intensity 0.7, and a 5 px depth-aware filter; do not leave a fixed dark mark after the character exits the frame.

## Implementation hint

Estimate local visibility from screen depth and normals with a bounded sampling radius, then edge-aware filter the result. Reject depth discontinuities and accept that off-screen or hidden geometry is unavailable.

## Related

- [NPR-24](NPR-24.md) — Cavity and ridge shading

## References

- [LearnOpenGL — SSAO（含噪點、取樣、範圍檢查比較）](https://learnopengl.com/Advanced-Lighting/SSAO)
