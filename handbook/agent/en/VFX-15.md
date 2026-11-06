# VFX-15 · Spawn / teleport effect

**Aliases:** Warp-in; Materialise; Summon effect; Blink; Beam-in

**Group:** VFX & particles
**Subcategory:** Elements

## What you see

A character vanishes in one place and appears in another: typically a vertical light pillar, the character stretched thin or shrunk to a point and turned white, with particles sucked in or scattered out; arrival plays in reverse and ends with the character landing in a small squash-and-stretch.

## Not to be confused with

Not a dissolve (VFX-04, fading along a noise edge, usable on its own); a teleport is a paired vanish + appear with direction. Not a magic circle (VFX-13, a ground casting pattern that may precede a teleport).

## Use it for

Enemy spawn points, portals, blink skills, summoned units, respawns — tells the player "something appeared, right here".

## Tunable parameters

pillar width & height · stretch curve · white-out amount · particle in/out count · ground ring · landing squash · delay between vanish and appear

## Request prompt

Build an enemy spawn in the game: a green ground ring appears at the spawn point for 0.3 s, then a 6-px vertical light pillar drops, the enemy silhouette stretches from 0 height to 150% and settles to 100% (0.2 s) while 8 green particles scatter outward; the pillar narrows and vanishes over 0.2 s. The hero’s blink is the reverse: stretch, go white and vanish, then appear at the destination.

## Implementation hint

Sprite VS scales the quad around its feet pivot (scaleY curve from a small CB value); PS lerps to white with a flash uniform (reuse the hit-flash path). Pillar = additive quad with vertical gradient; particles from a burst emitter with inward velocity (spawn on a circle, velocity toward centre).

## Related

- [VFX-04](VFX-04.md) — Dissolve
- [VFX-13](VFX-13.md) — Magic circle
- [FB-13](FB-13.md) — Squash on hit
- [FB-01](FB-01.md) — Hit flash

## References

- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
- [Godot docs — 2D particle systems](https://docs.godotengine.org/en/stable/tutorials/2d/particle_systems_2d.html)
