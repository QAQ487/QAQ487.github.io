# ENV-05 · Snow

**Aliases:** Snowfall; Snow accumulation; Snow cover

**Group:** Environment, weather & time
**Subcategory:** Weather

## What you see

White flakes fall slowly, drifting side to side in varied sizes; over time the ground and roofs whiten (accumulation) and characters leave tracks.

## Not to be confused with

Not rain (ENV-04, fast and straight) nor ambient particles (ENV-11, sparse floating that never accumulates). Snow cover is state that builds up.

## Use it for

Winter, cold regions, part of seasonal change.

## Tunable parameters

flake count · size range · fall speed · sway amplitude/frequency · accumulation rate · coverage noise

## Request prompt

Add snow to the game: ~120 white 1–2 px flakes falling at 20–40 px/s, swaying sinusoidally (3–6 px amplitude); an accumulation value 0–1 grows 0.1 per minute, driving white ground coverage (an expanding noise threshold) and roof-snow strip height.

## Implementation hint

Flakes: instanced quads with per-instance phase for sway. Accumulation: a ground shader samples a noise texture; covered = noise < snowAmount, mixed toward white; roofs get a sprite strip whose height ∝ snowAmount.

## Related

- [ENV-04](ENV-04.md) — Rain
- [ENV-10](ENV-10.md) — Footprints
- [ENV-03](ENV-03.md) — Seasonal change

## References

- [Wikipedia — Particle system](https://en.wikipedia.org/wiki/Particle_system)
- [Unity Manual — Particle System](https://docs.unity3d.com/Manual/class-ParticleSystem.html)
- [The Book of Shaders — Noise](https://thebookofshaders.com/11/)
