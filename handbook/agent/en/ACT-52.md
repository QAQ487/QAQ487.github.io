# ACT-52 · Launch star / Launch cannon

**Aliases:** Launch star; Launch cannon; Barrel cannon; Blast barrel; Launcher; Sling star; Booster bubble; 發射星; 發射砲; 炮桶; 發射氣泡; 発射スター; タル大砲; 発射台

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

The character enters a launcher (a star-shaped pad, a barrel cannon or a bubble) and is drawn into its centre and held there; the launcher starts to spin or pulse and a dotted arc to the destination appears. On a button press (or on the launcher's own timer) it suddenly contracts and springs open, and the character shoots out along the arc at high speed, trailing light or sparkles; the camera pulls back so the start, the destination and everything in between are in view. Nearing the destination it slows, the character flips into a landing pose and touches down on another platform or planet, and control returns. Variant — aimable barrels: the launcher swings left and right and the player waits until it points at the next target before pressing; or bubble launch: inside a bubble, pick a direction and shoot off in a straight line.

## Not to be confused with

Not a thrown-object springboard or a spring (ACT-54, a single upward boost after which the player steers in the air); during a launch the launcher decides the path and the player does not steer. Not a camera move on its own (the character stays put while only the camera travels). Not a teleport (VFX-15, no flight in between).

## Use it for

Long hops between planets or islands, transitions between parts of a level, rhythm sections of chained barrel cannons, showing off the whole level on the way.

## Tunable parameters

capture range & pull-in · charge squash & spin · path: authored spline or arc to a target · flight speed profile (fast out, slow in) · input locked in flight · trail & camera pull-back · landing pose & control handback · aimable variant: swing range, fire on press (authoring defaults)

## Request prompt

Add launchers to the level. When the character enters a launcher's range, ease it into the centre and hold it there, start the launcher spinning and show a dotted arc to the destination. On the button, play a short charge squash, then send the character out fast along the authored arc with movement input disabled, a light trail behind it and the camera pulled back to frame both ends. Slow it near the end, switch it to a landing pose, land it on the target platform and hand control back. Optional aimable type: the launcher swings back and forth and fires along its current facing on the press. Accept: every launch lands exactly on the target platform, and an obstacle on the way is handled safely (passed through or routed round) so the character never gets stuck.

## Implementation hint

Author each launcher with a target and either a spline or an arc solved from start, target and apex height. On capture, ease the character to the launcher centre and lock input. On fire, move the character along the path by an arc-length parameter with a fast-out, slow-in speed curve (not physics), orient it along the tangent and switch to the landing pose near the end. Pull the camera back to frame the path bounds, then restore it. For aimable cannons, rotate the launcher over time and, on fire, launch along its current facing.

## Related

- [ACT-51](ACT-51.md) — Planetoid gravity / Spherical gravity
- [ACT-54](ACT-54.md) — Thrown-object springboard / Cap jump
- [VFX-15](VFX-15.md) — Spawn / teleport effect
- [VFX-08](VFX-08.md) — Projectile trail

## References

- [Super Mario Wiki — Launch Star (shoots Mario along a set path to another planet)](https://www.mariowiki.com/Launch_Star)
- [Wikipedia — Super Mario Galaxy (planetoids with their own gravity; Launch Stars)](https://en.wikipedia.org/wiki/Super_Mario_Galaxy)
- [Super Mario Wiki — Barrel Cannon (aims and blasts the player out)](https://www.mariowiki.com/Barrel_Cannon)
- [Wikipedia — Celeste (video game) (dream blocks carry Madeline through when dashed into)](https://en.wikipedia.org/wiki/Celeste_(video_game))
