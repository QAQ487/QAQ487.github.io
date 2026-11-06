# DIAG-04 · HDR scene buffer and tone-mapping order

**Aliases:** 高光一片死白; 高光爆白; Blown-out highlights; Clipped highlights; Bloom looks flat; UI dims with exposure; Banding after tone mapping; HDRレンダリング; トーンマッピング

**Group:** Image quality & render diagnostics
**Subcategory:** Colour space & dynamic range

## What you see

Strong lights — fireballs, the sun, magic glows — clip into flat white with no gradation; bloom looks flat, just white smeared outward; changing exposure also darkens or brightens the UI and subtitles; dark areas show visible banding rings. Most of these are pipeline-order problems: the scene should be drawn into a float buffer that can hold brightness above 1.0, bloom and exposure applied there, then tone-mapped to display range, then converted to sRGB, with the UI drawn on top last.

## Not to be confused with

This does not redefine HDR, exposure or tone mapping (see REN-28 HDR, REN-30 Exposure and REN-31 Tone mapping); it is an order-of-operations checklist for when the picture goes wrong. It is also not a linear-space mismatch (DIAG-02, where the problem is in midtones rather than highlights).

## Use it for

Scenes with strong light sources, bloom or large day/night brightness differences; whenever adding bloom or adjusting exposure produces odd results.

## Tunable parameters

scene buffer format (R16G16B16A16 float / R11G11B10 float) · exposure (manual / auto, adaptation speed) · tone-mapping curve · bloom threshold in HDR units · where UI is composited · dithering before 8-bit output

## Request prompt

Check the game's HDR order: render the scene in linear space into a 16-bit float render target; compute bloom and auto-exposure on that HDR buffer; then apply one tone-mapping curve (ACES- or Reinhard-style) to compress brightness into 0–1; then convert to sRGB for output (DIAG-02); draw the UI and subtitles last, unaffected by exposure and tone mapping. The core of a fireball should keep its white-to-orange gradation, and HUD brightness must not change when exposure changes.

## Implementation hint

Pass order: scene (linear, float RT) → transparent/VFX → bloom + exposure on HDR → tone map (single curve, e.g. ACES fit or Reinhard) → linear→sRGB (DIAG-02) → optional film grain/dither → UI in display space. Engine examples: a post-process volume's exposure + tonemapper settings, or a full-screen tone-map pass such as DirectXTK ToneMapPostProcess in D3D11; the same order applies on OpenGL, Vulkan or Metal. If highlights still clip, check for a saturate()/clamp in material shaders before the tone-map pass.

## Related

- [DIAG-02](DIAG-02.md) — Linear workflow / sRGB
- [LGT-06](LGT-06.md) — Baked lighting
- [PP-04](PP-04.md) — Posterization
- [PP-06](PP-06.md) — Desaturation
- [REN-28](REN-28.md) — High Dynamic Range/HDR rendering
- [REN-30](REN-30.md) — Exposure/Auto exposure/Eye adaptation
- [REN-31](REN-31.md) — Tone mapping/Tonemapper/Filmic curve

## References

- [DirectX Tool Kit wiki — ToneMapPostProcess](https://github.com/microsoft/DirectXTK/wiki/ToneMapPostProcess)
- [DirectX Tool Kit wiki — Using HDR rendering](https://github.com/microsoft/DirectXTK/wiki/Using-HDR-rendering)
- [Wikipedia — Tone mapping](https://en.wikipedia.org/wiki/Tone_mapping)
- [Godot docs — Environment and post-processing (tonemap, exposure)](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
