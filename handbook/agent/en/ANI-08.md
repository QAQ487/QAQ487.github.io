# ANI-08 · Procedural animation

**Aliases:** Runtime animation; Code-driven animation; Procedural locomotion

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

Motion is not drawn or recorded in advance but computed by code at runtime: a many-legged creature’s feet find footholds on their own, tentacles or tails follow the body, the body leans with speed; when terrain or speed changes, the motion changes with it and never repeats exactly.

## Not to be confused with

Not authored keyframe animation; procedural motion differs slightly every time. Not a ragdoll (ANI-09, handed fully to physics with the character out of control); procedural animation is still rule-driven. Foot IK (ANI-12) is one specific use of it.

## Use it for

Many-legged creatures, snakes, tentacles, robot arms; locomotion that must fit any terrain; lots of variation from few art assets.

## Tunable parameters

step distance threshold · step time · lift height · leg pairing / gait · body lean & bob · smoothing

## Request prompt

In your game, give a four-legged spider-like enemy a procedural walk: each leg has a ground target; when a foot is more than 10 px from its ideal spot under the body, move it there over 0.15 s along an arc (lifting up to 5 px); diagonal legs alternate, and body height is the average of the four feet plus a 2 px bob.

## Implementation hint

Per-limb state machines (planted / stepping) with targets found by raycasting the ground ahead of the body; limbs solved with simple two-bone IK; chains such as tails use follow-the-leader constraints or damped springs. Everything is driven from velocity and terrain each frame.

## Related

- [ANI-12](ANI-12.md) — Foot IK / Foot placement
- [ANI-10](ANI-10.md) — Spring bones / Jiggle physics
- [ANI-09](ANI-09.md) — Ragdoll
- [ANI-11](ANI-11.md) — Look-at / Head tracking

## References

- [Wikipedia — Procedural animation](https://en.wikipedia.org/wiki/Procedural_animation)
- [GDC Vault — Animation Bootcamp: An Indie Approach to Procedural Animation (David Rosen)](https://www.gdcvault.com/play/1020583/Animation-Bootcamp-An-Indie-Approach)
- [t3ssel8r — Giving personality to procedural animations using math (YouTube)](https://www.youtube.com/watch?v=KPoeNZZ6H4s)
