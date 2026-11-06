# VFX-01 · Soft particles

**Aliases:** Depth-faded particles; Depth fade; Soft intersection

**Group:** VFX & particles
**Subcategory:** Carriers & techniques

## What you see

When smoke, fog or glow quads cut into the floor or a wall, there is no straight hard seam: the particle becomes more transparent the closer it gets to the surface, so it seems to melt into the scene.

## Not to be confused with

Not ordinary fade-over-lifetime (the whole particle fades together); soft particles fade only where they are close to other geometry. Not a decal (FX-06, which lies on a surface).

## Use it for

Stops smoke, dust, glows and splashes from showing the square edge of their quad where they meet the ground or characters.

## Tunable parameters

fade distance (world units) · per-material override · depth linearisation · near-camera fade

## Request prompt

Add soft particles to the particle pixel shader: sample the scene depth texture, compute fade = saturate((sceneDepth − particleDepth) × 1/0.5 m) and multiply it into particle alpha. Use 0.5 m fade distance for smoke and dust, 0.2 m for fire glows. Expose a toggle so I can compare on/off.

## Implementation hint

Bind the scene depth buffer as an SRV (create it with a typeless R24G8/R32 format so it can be both DSV and SRV; render particles with depth-write off and the DSV read-only). In the PS: linearise both depths and alpha *= saturate((sceneZ − pixelZ) / fadeDist). In a pure 2D top-down renderer, approximate with a per-sprite "ground height" gradient instead.

## Related

- [VFX-12](VFX-12.md) — Fire and smoke
- [FX-01](FX-01.md) — Sprite / Billboard Particles
- [FX-06](FX-06.md) — Decals / Surface Marks

## References

- [NVIDIA — Soft Particles whitepaper (PDF)](https://developer.download.nvidia.com/whitepapers/2007/SDK10/SoftParticles_hi.pdf)
- [Microsoft Learn — Configuring depth-stencil functionality](https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d10-graphics-programming-guide-depth-stencil)
- [Unity Manual — Particle System Renderer module](https://docs.unity3d.com/Manual/PartSysRendererModule.html)
