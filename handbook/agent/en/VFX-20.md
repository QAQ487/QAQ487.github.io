# VFX-20 · Flipbook frame blending / motion-vector flipbook

**Aliases:** 序列幀跳格; 爆炸動畫一格格跳; 煙霧播放卡頓; Choppy flipbook; Stepping sprite-sheet animation; Flipbook stutter; Blended flipbook; Motion vectors flipbook; Sub-UV blending; Flip-Book Mode: Blended; フリップブック

**Group:** VFX & particles
**Subcategory:** Carriers & techniques

## What you see

An 8×8 explosion or smoke sheet plays on a particle and, especially when slowed down or on long-lived particles, visibly steps frame by frame. Blending the current and next frame (a crossfade) stops the stepping but causes ghosting — two semi-transparent copies on top of each other. A motion-vector flipbook stores an extra map of where each pixel moves; at playback the current frame is pushed forward and the next pulled back along those vectors before blending, so the smoke rolls smoothly without ghosting.

## Not to be confused with

Not basic flipbook playback (FX-04 only defines playing an animation from a sprite sheet), not atlas bleeding (PIX-26), and not mip/filtering shimmer (DIAG-03). This entry is about too few frames and choppy playback.

## Use it for

Explosions, smoke, flames, splashes and magic impacts made from sprite sheets; slow-motion or long-lived particles; platforms where texture memory rules out more frames.

## Tunable parameters

sheet layout (columns × rows) · frame rate / lifetime mapping · blend mode (none / linear / motion vectors) · motion-vector strength and encoding · random start frame · mip bias for sheets

## Request prompt

Add frame blending to the game's flipbook effects: sample the next frame as well as the current one and blend by frac(frame); if a motion-vector map is available (per-frame RG offsets), offset the current frame's UV forward by frac × strength and the next frame's UV back by (1 − frac) × strength along the vectors before blending; take strength from the baking tool. At 0.25× playback the explosion smoke must roll smoothly with no stepping or ghosting.

## Implementation hint

Engine-agnostic shader: f = age × fps; i = floor(f); a = frac(f); uv0 = cellUV(i), uv1 = cellUV(i+1). Linear: lerp(tex(uv0), tex(uv1), a). Motion vectors: mv0 = decode(texMV(uv0)), mv1 = decode(texMV(uv1)); colour = lerp(tex(uv0 − mv0 × a × s), tex(uv1 + mv1 × (1 − a) × s), a), keeping offsets inside each cell. Pass i and a from the particle system as a custom vertex stream to avoid per-pixel recomputation. Engines expose 'blended flip-book' / sub-UV blend options in particle shaders.

## Related

- [VFX-02](VFX-02.md) — GPU particles
- [VFX-12](VFX-12.md) — Fire and smoke
- [DIAG-03](DIAG-03.md) — Mipmapping and anisotropic filtering
- [PIX-26](PIX-26.md) — Texture bleeding and atlas padding
- [FX-04](FX-04.md) — Flipbook / Sprite-sheet Animation

## References

- [Unity Manual — Standard Particle Shaders (Flip-Book Mode: Blended)](https://docs.unity3d.com/6000.0/Documentation/Manual/shader-StandardParticleShaders.html)
- [Unity マニュアル — スタンダードパーティクルシェーダー（Flip-Book Mode）](https://docs.unity3d.com/ja/current/Manual/shader-StandardParticleShaders.html)
- [Unity Manual — Texture Sheet Animation module](https://docs.unity3d.com/6000.0/Documentation/Manual/PartSysTexSheetAnimModule.html)
