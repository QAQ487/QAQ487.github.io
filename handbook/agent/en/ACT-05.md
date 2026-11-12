# ACT-05 · Wall-Jump Forgiveness / Wall-Jump Window

**Aliases:** Wall-kick attack; Wall-kick dive; Wall rebound attack; 蹬牆反彈突襲; 蹬牆突襲; 壁蹴り急襲

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

A wall jump works even when the character is not quite flush against the wall, or is slightly away from it.Variant — wall-kick dive attack: pressing attack while clinging to a wall in mid-air kicks off the wall and dives diagonally at high speed onto a nearby enemy, trailing an afterimage line, with a short hit pause on contact; with no target nearby the character simply shoots off along the kick-off direction.

## Not to be confused with

A “window” need not be temporal; here it mainly refers to an acceptable distance. Celeste's pixel values should not be transplanted directly into another resolution or a 3D world.The homing of the wall-kick dive onto a target is attack latching (ACT-37); this card only covers distance and direction forgiveness for the wall jump.

## Use it for

Relax the spatial requirements for wall jumping so that intent is easier to express during fast movement.In fights next to walls, it turns the wall into a launch point for an attack.

## Tunable parameters

wall probe distance · surface normal · jump impulse · approach side · use limit · wall-kick dive attack: dive angle & speed, target search cone, afterimage line, hitstop on hit

## Request prompt

Allow wall jumps from up to 12 cm away: use the nearest valid wall normal to launch outward, and permit only one trigger per wall departure. Also add a wall-kick dive attack: pressing attack during a wall cling launches the character off the wall on a 30–45° downward diagonal toward the nearest enemy in a forward cone, trailing an afterimage line, with 3–5 frames of hitstop on hit; with no target, dive along the default angle.

## Implementation hint

Probe for a valid wall within a small spatial tolerance rather than requiring direct contact. Launch away from the detected surface and consume the wall-jump opportunity according to the movement rules. Wall-kick dive variant: when attack is pressed during a wall cling, launch away from the wall along a downward-tilted direction toward the best target in a cone (latching per ACT-37), draw an afterimage line, apply hitstop on contact; with no target, dive along the default angle.

## Related

- [ACT-45](ACT-45.md) — Pogo bounce / Downward strike bounce
- [ACT-37](ACT-37.md) — Motion Warping / Root Motion Warping
- [ACT-57](ACT-57.md) — Magnetic surface crawl

## References

- [Maddy Thorson — Celeste & Forgiveness，§8–9](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
- [Wikipedia — Ninja Gaiden (2004 video game)](https://en.wikipedia.org/wiki/Ninja_Gaiden_(2004_video_game))
