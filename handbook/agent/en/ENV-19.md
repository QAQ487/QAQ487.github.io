# ENV-19 · Contact-driven leaf litter

**Aliases:** Interactive leaf litter; Footstep debris scattering; Ground interaction FX; 落葉掀動; 落葉のかき分け

**Group:** Environment, weather & time
**Subcategory:** Ground & foliage

## What you see

Walking through fallen leaves opens a small moving gap; leaves tumble outward, skid, and settle. Standing still must not keep emitting. An unchanged leaf carpet reads as a texture.

## Not to be confused with

Not ambient motes (ENV-11) and not destruction debris (VFX-18). This is traversal-driven rearrangement of loose ground material.

## Use it for

Realistic forests, autumn stages, ground that should remember footsteps.

## Tunable parameters

impulse scale · lift fraction · tumble · skid friction · settle · no idle emit (authoring defaults)

## Request prompt

When a foot/low-body sweep crosses a loose-material patch, displace nearby leaves with direction/speed-scaled impulse, lift a minority, tumble and skid, then settle. Later contact can move them again. Do not continuously emit while standing still.

## Implementation hint

Maintain a small pool of leaf instances with positions. On overlap with a moving capsule near ground, apply impulse = k * velocity to nearby leaves; integrate simple rigid/particle motion with friction until speed < epsilon. Disable emission when speed ≈ 0.

## Related

- [ENV-11](ENV-11.md) — Ambient particles
- [ENV-09](ENV-09.md) — Interactive grass
- [FX-01](FX-01.md) — Sprite / Billboard Particles
- [VFX-18](VFX-18.md) — Debris

## References

- [GDC Vault — Ghost of Tsushima: Wind, Leaves, and Fog (talk id 1027350)](https://www.gdcvault.com/play/1027350/Ghost-of-Tsushima-Wind-Leaves)
- [GPU Gems ch.7 — Rendering countless blades of waving grass](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-7-rendering-countless-blades-waving-grass)
