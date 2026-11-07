# ENV-10 · Footprints

**Aliases:** Trail deformation; Snow trails; Ground deformation; Wet transfer trail; 濕足跡轉移; 濡れ移り跡

**Group:** Environment, weather & time
**Subcategory:** Ground & foliage

## What you see

Characters leave a line of footprints or drag marks in snow, sand or mud; the marks slowly fade or get covered by fresh snow. Variant: wet transfer trail — leaving a pool stamps several darker/glossier footprints on dry stone; each successive step carries less water; older marks dry with material-dependent timing; re-entering water replenishes the reservoir. Transfer, not deformation.

## Not to be confused with

Not interactive grass (ENV-09, which springs back), permanence (FB-12, combat leftovers), or short-lived footfall dust (FX-40). Footprints are ground deformation or wetness transfer from movement.

## Use it for

Reinforces ground material and tracking; wet marks from puddles onto dry stone.

## Tunable parameters

stamp spacing · decal size · fade time per material · max decals · snow refill rate · wetness reservoir · per-step wetness decay · dry time on stone

## Request prompt

Add footprints to snow and mud in the game: every 6 px of movement stamp a 2×1 dark footprint decal at alternating left/right foot positions; fade linearly over 20 s on snow and 40 s on mud, twice as fast while snowing. Also add wet transfer: leaving a pool sets wetness=1; each step stamps a wet mark and multiplies wetness by ~0.7; dry on stone in 8–12 s; re-enter water to refill.

## Implementation hint

Decal ring buffer (like FB-12) or a persistent "trail" render target in world space: draw stamps into it, and each frame draw a full-screen quad that slightly fades it toward empty; the ground shader darkens/indents by sampling it. Wet-transfer stamps write a separate wetness channel that the material shader reads for darker/glossier marks (cross-link MATX-05, FX-06).

## Related

- [ENV-05](ENV-05.md) — Snow
- [ENV-09](ENV-09.md) — Interactive grass
- [FB-12](FB-12.md) — Permanence
- [MATX-05](MATX-05.md) — Wet surface
- [FX-06](FX-06.md) — Decals / Surface Marks
- [FX-40](FX-40.md) — Material-dependent footfall dust

## References

- [Real Time VFX community (realtimevfx.com)](https://realtimevfx.com/)
