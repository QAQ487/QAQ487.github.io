# ENV-10 · Footprints

**Aliases:** Trail deformation; Snow trails; Ground deformation

**Group:** Environment, weather & time
**Subcategory:** Ground & foliage

## What you see

Characters leave a line of footprints or drag marks in snow, sand or mud; the marks slowly fade or get covered by fresh snow.

## Not to be confused with

Not interactive grass (ENV-09, which springs back) nor permanence (FB-12, combat leftovers). Footprints are ground deformation left by movement.

## Use it for

Reinforces ground material and enables tracking play (follow the enemy’s footprints).

## Tunable parameters

stamp spacing · decal size · fade time per material · max decals · snow refill rate

## Request prompt

Add footprints to snow and mud in the game: every 6 px of movement stamp a 2×1 dark footprint decal at alternating left/right foot positions; fade linearly over 20 s on snow and 40 s on mud, twice as fast while snowing.

## Implementation hint

Decal ring buffer (like FB-12) or a persistent "trail" render target in world space: draw stamps into it, and each frame draw a full-screen quad that slightly fades it toward empty; the ground shader darkens/indents by sampling it.

## Related

- [ENV-05](ENV-05.md) — Snow
- [ENV-09](ENV-09.md) — Interactive grass
- [FB-12](FB-12.md) — Permanence

## References

- [Real Time VFX community (realtimevfx.com)](https://realtimevfx.com/)
