# ENV-04 · Rain

**Aliases:** Rainfall; Rain particles; Rain splash

**Group:** Environment, weather & time
**Subcategory:** Weather

## What you see

Many thin slanted streaks fall fast, with small splashes or ring ripples where they land; the whole image darkens toward blue-grey, possibly with wet reflections.

## Not to be confused with

Not snow (ENV-05, slow, drifting, accumulating) nor wind (ENV-08). Rain reads as fast slanted streaks plus ground splashes.

## Use it for

Mood, weather systems, story (sad scenes), gameplay (fire weakened).

## Tunable parameters

drop count · angle · speed · streak length · splash rate · scene tint · intensity ramp

## Request prompt

Add rain to the game: ~200 light-blue 1×4 px streaks falling at 15° and 240 px/s; spawn 3-frame splashes (cross → ring) at random ground spots; multiply the scene by #8a9ab8; expose intensity 0–1 with smooth transitions.

## Implementation hint

Screen-space particle system: drops are instanced quads (or a single scrolling rain texture with several UV-scrolled layers). Splashes spawn at random world points in view. Tint via the ambient constant from ENV-01.

## Related

- [ENV-05](ENV-05.md) — Snow
- [ENV-06](ENV-06.md) — Lightning flash
- [ENV-13](ENV-13.md) — Ripples
- [ENV-08](ENV-08.md) — Foliage sway

## References

- [Wikipedia — Particle system](https://en.wikipedia.org/wiki/Particle_system)
- [Unity Manual — Particle System](https://docs.unity3d.com/Manual/class-ParticleSystem.html)
- [Godot docs — 2D particle systems](https://docs.godotengine.org/en/stable/tutorials/2d/particle_systems_2d.html)
