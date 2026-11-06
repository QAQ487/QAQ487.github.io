# DIAG-06 · Alpha-to-coverage

**Aliases:** 樹葉邊緣鋸齒; 鐵絲網邊緣閃爍; 頭髮邊緣很硬; Jagged foliage edges; Cutout shimmer; Alpha-test aliasing under MSAA; A2C; AlphaToMask

**Group:** Image quality & render diagnostics
**Subcategory:** Transparency & compositing

## What you see

Leaves, grass, chain-link fences and hair are drawn with alpha test, and even with MSAA on, the outlines stay hard and jagged and shimmer as the camera moves; distant trees also go bald as mip averaging lowers their alpha. With alpha-to-coverage, the pixel's alpha is converted into the fraction of MSAA sub-samples it covers (alpha 0.5 covers half of them), so edges get several grey levels and look smooth, while still writing depth and needing no sorting.

## Not to be confused with

Not ordinary alpha blending (REN-16: needs sorting, no depth write), not alpha clipping itself (REN-17: defines hard-edged cutouts), and not premultiplied-alpha dark fringes (DIAG-01). REN-38 notes that MSAA only smooths geometric edges; this entry adds how to make MSAA work on texture-cut edges too.

## Use it for

Foliage, hair, chain-link, fences and torn cloth in a forward renderer with MSAA enabled; VR and other cases that need stable edges without post-process AA.

## Tunable parameters

MSAA sample count · alpha-to-coverage on/off per material · alpha sharpening (fwidth) · cutoff value · mip coverage preservation · fallback when MSAA is off (alpha test / dithering)

## Request prompt

Add alpha-to-coverage to the game's foliage materials: on a 4× MSAA render target, enable alpha-to-coverage in the leaf material's blend state and remove clip/discard from the shader; sharpen the output alpha with (alpha − cutoff) ÷ fwidth(alpha) + 0.5 so the coverage ramp is about one pixel wide; when generating mips, preserve each level's alpha coverage to match level 0 so distant trees don't go bald. Leaf edges must no longer shimmer when the camera pans.

## Implementation hint

Requires a multisampled target. Enable the per-blend-state flag (e.g. AlphaToCoverageEnable in D3D11/12, glEnable(GL_SAMPLE_ALPHA_TO_COVERAGE) in OpenGL, alphaToCoverageEnable in Vulkan's multisample state, AlphaToMask On in Unity ShaderLab, or an engine's 'alpha to coverage' material flag). Output a = saturate((a − cutoff) / max(fwidth(a), 1e-4) + 0.5). Mip coverage preservation: for each mip, scale alpha so the fraction of texels above cutoff equals level 0's. Without MSAA, fall back to alpha test + TAA or dithered alpha.

## Related

- [DIAG-01](DIAG-01.md) — Premultiplied alpha
- [DIAG-03](DIAG-03.md) — Mipmapping and anisotropic filtering
- [MATX-06](MATX-06.md) — Dithered transparency
- [REN-17](REN-17.md) — Alpha clipping/Alpha test/Cutout/Alpha scissor
- [REN-16](REN-16.md) — Alpha blending/Translucency
- [REN-38](REN-38.md) — Multisample Anti-Aliasing/MSAA

## References

- [Microsoft Learn — Configuring blending functionality (Alpha-To-Coverage section)](https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d10-graphics-programming-guide-blend-state)
- [Microsoft Learn — ブレンド機能の構成（Alpha-To-Coverage）](https://learn.microsoft.com/ja-jp/windows/win32/direct3d11/d3d10-graphics-programming-guide-blend-state)
- [Unity Manual — ShaderLab command: AlphaToMask (alpha-to-coverage)](https://docs.unity3d.com/Manual/SL-AlphaToMask.html)
- [Wikipedia — Spatial anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing)
