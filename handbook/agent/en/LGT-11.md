# LGT-11 · Forward+, clustered and deferred shading

**Aliases:** Tiled forward; Forward+; Clustered shading; Deferred rendering; Light culling

**Group:** Lighting & shadows
**Subcategory:** Rendering pipeline

## What you see

The screen can hold tens to hundreds of dynamic lights at once (bullets, spells, street lamps, explosions) without an obvious frame drop. This is a pipeline technique: the screen is split into tiles (tiled / Forward+), optionally also into depth slices (clustered), and each pixel only evaluates lights that touch its tile; deferred instead writes surface data to a G-buffer first, then lights it. The grid is invisible in game; only a debug heat map shows it.

## Not to be confused with

Not the look of a single light (LGT-01 / LGT-02); this is the rendering architecture that decides how many lights you can have and which material features work. Deferred is less friendly to transparency and MSAA; Forward+ supports them more easily.

## Use it for

Scenes with many dynamic lights (bullet hell, night battles, neon cities), games where every light must light surfaces in real time.

## Tunable parameters

tile size · depth slice count & distribution · max lights per cluster · light bounds (sphere / cone) · forward vs deferred · G-buffer layout

## Request prompt

Use clustered (Forward+) light culling in the game: split the screen into 16×9 tiles and 24 logarithmic depth slices; each frame a compute shader assigns light bounding spheres to the clusters they intersect (up to 64 light indices per cluster), and the pixel shader loops only over its cluster's lights. Add a debug heat map showing lights per tile from blue to red.

## Implementation hint

Compute pass: build cluster AABBs in view space, test each light's bounding sphere, write a compact light-index list + per-cluster offset/count (structured buffers). Shading pass reads the cluster from (screen xy, log depth). Deferred alternative: G-buffer (albedo, normal, roughness, depth), then per-light or tiled lighting pass.

## Related

- [LGT-01](LGT-01.md) — Directional, point and spot lights
- [LGT-02](LGT-02.md) — Light attenuation
- [VFX-02](VFX-02.md) — GPU particles

## References

- [Ángel Ortiz — A primer on efficient rendering algorithms & clustered shading](https://www.aortiz.me/2018/12/21/CG.html)
- [Wikipedia — Deferred shading](https://en.wikipedia.org/wiki/Deferred_shading)
- [LearnOpenGL — Deferred shading](https://learnopengl.com/Advanced-Lighting/Deferred-Shading)
- [Godot docs — Overview of renderers (Forward+ is clustered)](https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html)
