# VFX-04 · Dissolve

**Aliases:** Burn-away; Noise dissolve; Disintegration; Dissolve shader

**Group:** VFX & particles
**Subcategory:** Carriers & techniques

## What you see

An object disappears along an irregular noise edge, usually with a glowing rim (orange like burning paper, blue for magic). Played in reverse it becomes a materialise.

## Not to be confused with

Not a fade (everything turns transparent together); with a dissolve, parts are fully gone and parts fully remain, with only a glowing edge between. Not a death pop (FB-04, bursting into chunks) or a shatter (VFX-19, breaking into geometric shards that fly off).

## Use it for

Enemy deaths, summons vanishing, buildings erased by magic, objects appearing; can also be a transition.

## Tunable parameters

progress 0..1 · noise scale · edge width · edge colour/HDR intensity · direction bias (top-down, from hit point) · pixel snapping

## Request prompt

Add a dissolve to the game: over 0.8 s after an enemy dies, threshold the sprite against noise in 8×8-pixel blocks so it is erased cell by cell, with a 1-pixel orange-yellow glowing rim at the edge. Keep it snapped to the pixel grid, no smooth gradients. Reuse the same shader in reverse for enemies emerging from a portal.

## Implementation hint

PS: float n = noiseTex.Sample(pointSampler, uv*scale).r (+ optional gradient for direction); clip(n - progress); edge = 1 - smoothstep(0, edgeW, n - progress); col.rgb = lerp(col.rgb, edgeColor*intensity, edge). For pixel art sample the noise at sprite-texel resolution (floor(uv*texSize)) with point filtering.

## Related

- [FB-04](FB-04.md) — Death effect
- [TRN-03](TRN-03.md) — Crossfade
- [VFX-15](VFX-15.md) — Spawn / teleport effect
- [VFX-19](VFX-19.md) — Shatter

## References

- [Cyanilux — Dissolve shader breakdown](https://www.cyanilux.com/tutorials/dissolve-shader-breakdown/)
- [The Book of Shaders — Noise](https://thebookofshaders.com/11/)
- [Godot docs — CanvasItem shaders](https://docs.godotengine.org/en/stable/tutorials/shaders/shader_reference/canvas_item_shader.html)
