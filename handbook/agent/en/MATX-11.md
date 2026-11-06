# MATX-11 · Frosted refractive glass

**Aliases:** 毛玻璃; 磨砂玻璃; 玻璃後面模糊; Frosted glass; Refractive blur; Rough refraction; Screen-space refraction blur; すりガラス

**Group:** Materials & surfaces
**Subcategory:** Transparency & refraction

## What you see

The background seen through the glass is blurred and slightly displaced — rougher glass blurs more — while the glass surface keeps sharp highlights and edges, and the background's light and colour remain faintly readable. A common method samples the already-rendered frame (the screen texture), offsets the lookup by the glass normal, and picks a blurrier mip level based on roughness.

## Not to be confused with

Not plain transparency (colour blending only, no blur or displacement), not pause-menu background blur (UI-07, the whole screen blurred) and not screen-space distortion (PP-09, full-screen waves). Here the blur appears only inside the glass and is controlled by material roughness.

## Use it for

Bathroom and office partitions, ice and crystal, sci-fi interface panels, translucent UI card backgrounds, rainy windows.

## Tunable parameters

refraction offset 0.01–0.05 · roughness→mip 0–5 · tint 5–15% · fresnel power 3–5 · requires opaque-pass screen texture (starting points)

## Request prompt

Build a frosted-glass material: read the screen texture after opaque objects have rendered, offset the lookup coordinates by the glass normal's xy × 0.02 (starting value), and map roughness 0–1 to mip levels 0–5 when sampling; add a 10% cool tint and a Fresnel edge highlight. Objects behind the glass must render first, and layering between multiple glass surfaces needs separate handling.

## Implementation hint

Render opaques → copy colour to a mip-chained screen texture → glass pass: uv = screenUV + N.xy*offset*(1-depthFade); col = textureLod(screenTex, uv, roughness*maxMip); out = mix(col, tint, tintAmt) + fresnel*spec. Multiple glass layers: sort back-to-front and recapture, or accept a single refraction layer.

## Related

- [REN-18](REN-18.md) — Refraction/Screen-space refraction
- [UI-07](UI-07.md) — Background blur on pause
- [PP-09](PP-09.md) — Screen-space distortion
- [PP-08](PP-08.md) — Gaussian blur

## References

- [Wikipedia — Frosted glass](https://en.wikipedia.org/wiki/Frosted_glass)
- [Godot docs — Screen-reading shaders (screen texture, blurred mip sampling)](https://docs.godotengine.org/en/stable/tutorials/shaders/screen-reading_shaders.html)
- [NVIDIA GPU Gems 2, Ch. 19 — Generic Refraction Simulation](https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-19-generic-refraction-simulation)
