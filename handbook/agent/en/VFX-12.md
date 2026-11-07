# VFX-12 · Fire and smoke

**Aliases:** Flames; Campfire; Torch fire; Smoke plume

**Group:** VFX & particles
**Subcategory:** Elements

## What you see

Flames are particles that start bright yellow at the base, turn orange-red as they rise and shrink away, flickering; at the top they become grey smoke puffs that slowly rise, grow, fade and lean with the wind, with the odd ember popping out.

## Not to be confused with

Not an explosion (VFX-09, one-shot and expanding); fire and smoke loop continuously. Not an aura (VFX-14, light hugging a character outline).

## Use it for

Campfires, torches, burning houses, burning status, chimneys — everyday and wartime atmosphere in a top-down town.

## Tunable parameters

emit rate · lifetime · colour gradient over life · size over life · rise speed · wobble/noise · wind · smoke alpha & growth · ember rate

## Request prompt

Build fire for a house set alight by enemies in the game: emit 30 flame particles/s, lifetime 0.6 s, colour #fff2a0→#f08a3a→#b6483a, size 3 px→1 px, rising 18 px/s with a slight side-to-side wobble, additive blend. Plus 6 smoke puffs/s, lifetime 2 s, dark grey fading out, size 3→8 px, drifting right with the wind at 10 px/s; pop 2 random embers per second.

## Implementation hint

Two emitters: flames additive (BLEND_ONE/ONE) with colour-over-life in a 1D gradient texture; smoke alpha-blended (SRC_ALPHA/INV_SRC_ALPHA) drawn before flames, sorted by age. Pixel-art variant: quantise particle positions to the pixel grid and pick colours from the palette by life bucket instead of lerping.

## Related

- [VFX-09](VFX-09.md) — Explosion
- [FX-01](FX-01.md) — Sprite / Billboard Particles
- [FB-05](FB-05.md) — Status effect tint
- [FX-04](FX-04.md) — Flipbook / Sprite-sheet Animation

## References

- [GPU Gems ch.6 — Fire in the "Vulcan" demo](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-6-fire-vulcan-demo)
- [Unity Manual — Color over Lifetime module](https://docs.unity3d.com/Manual/PartSysColorOverLifeModule.html)
- [Godot docs — 2D particle systems](https://docs.godotengine.org/en/stable/tutorials/2d/particle_systems_2d.html)
- [Wikipedia — Particle system](https://en.wikipedia.org/wiki/Particle_system)
