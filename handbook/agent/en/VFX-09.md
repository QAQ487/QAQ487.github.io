# VFX-09 · Explosion

**Aliases:** Layered explosion; Fireball; Blast; Burst

**Group:** VFX & particles
**Subcategory:** Combat VFX

## What you see

An explosion is a stack of layers in sequence: a 1–2 frame white flash → a rapidly expanding fireball → debris and sparks flying out → smoke that rises, spreads and darkens slowly → a scorch mark left on the ground. Each layer has its own duration.

## Not to be confused with

Not a death effect (FB-04, the closing beat of a defeated enemy) nor a shockwave (VFX-06, a single ring). An explosion is a composite; a shockwave is often just one of its layers.

## Use it for

Bombs, powder kegs, spell impacts, destroyed buildings; layering gives weight and lets you scale small→large.

## Tunable parameters

flash frames · fireball size & duration · colour over life · debris count & gravity · smoke lifetime & rise · scorch decal lifetime · scale factor

## Request prompt

Build a powder-keg explosion in the game: frame 0 a 24 px white flash circle (2 frames); fireball grows 6→22 px over 0.25 s, colour yellow→orange→red; at the same time 12 wood splinters fly out under gravity; smoke puffs rise 20 px over 1.2 s while growing and fading from dark grey; finally leave a black scorch decal that fades after 3 s, and trigger one screen shake.

## Implementation hint

Author as a parent effect with sub-emitters (flash sprite, fireball flipbook or scaled additive circle, debris CPU particles, alpha-blended smoke sorted back-to-front, decal). Draw order: decal → smoke (alpha) → fireball/flash (additive blend, One/One). Drive all layers from one normalized time so the whole effect scales.

## Related

- [VFX-06](VFX-06.md) — Shockwave
- [VFX-18](VFX-18.md) — Debris
- [VFX-12](VFX-12.md) — Fire and smoke
- [FB-07](FB-07.md) — Trauma-based screen shake
- [FB-15](FB-15.md) — Muzzle flash

## References

- [Unity Manual — Particle System Sub Emitters module](https://docs.unity3d.com/Manual/PartSysSubEmitModule.html)
- [Unity Manual — Color over Lifetime module](https://docs.unity3d.com/Manual/PartSysColorOverLifeModule.html)
- [Wikipedia — Explosion (physical background)](https://en.wikipedia.org/wiki/Explosion)
- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
