# VFX-07 · Slash VFX

**Aliases:** Sword arc; Swoosh; Slash trail; Weapon trail; Sword beam; Slash wave; Projected slash; 劍氣; 飛ぶ斬撃

**Group:** VFX & particles
**Subcategory:** Combat VFX

## What you see

When a sword or claw swings, the path it sweeps leaves a crescent of light: brightest and thickest at the leading edge, thinning and fading toward the tail, usually a white core with a coloured rim. Sword beam (projected slash): at the end of the swing the arc detaches from the weapon and flies forward as a crescent with a short trail, fainter and thinner the farther it goes; it bursts into sparks where it hits an enemy and breaks apart flat against a wall.

## Not to be confused with

Not afterimages (FX-03, copies of the whole character pose); not a generic trail (FX-02, a ribbon following a moving object). A slash is a fixed-shape arc tied to a single swing. Once a sword beam leaves the weapon it is a projectile; for its trail see VFX-08.

## Use it for

Makes the reach and direction of melee attacks readable — essential for small pixel characters whose weapon swing is otherwise too tiny to see. A sword beam extends a melee swing to range.

## Tunable parameters

arc angle range · radius · thickness profile · core/rim colours · lifetime of tail · sweep easing · hit sparks · sword beam: detach frame, travel time 0.4–0.6 s, width / alpha falloff with distance, hit and wall dissipation

## Request prompt

Add a slash arc to the hero’s sword attack in the game: during the 0.12 s swing, sweep a crescent of radius 14 px from −60° to +80°, 2 px white leading edge and pale-blue outer band, with the tail narrowing and fading over 0.1 s; on hit, add 3–4 sparks at the end of the arc. Optional sword beam: at the end of the swing copy the arc into a separate crescent projectile that flies forward for 0.4–0.6 s, shrinking in width and brightness with distance; burst into sparks at the hit point and break apart on walls.

## Implementation hint

Build a triangle-strip mesh each frame: N segments along the arc from angleStart to angleNow; per-vertex alpha/width from segment age (age = now - segmentTime). Or author a crescent flipbook (cheap for pixel art: 3–4 frames). Draw additive, after characters, with the strip in world space attached to the character pivot. Sword beam: at the end of the swing spawn a crescent sprite or mesh with the slash material as a projectile; move it along the facing, shrink width and alpha with travel, collide with a thin box and spawn sparks at the contact.

## Related

- [FX-02](FX-02.md) — Trails / Ribbons
- [FX-03](FX-03.md) — Afterimages / Ghost Trails
- [VFX-08](VFX-08.md) — Projectile trail
- [FB-06](FB-06.md) — Critical hit emphasis
- [FB-32](FB-32.md) — Projectile reflect / Batting
- [VFX-22](VFX-22.md) — Weapon infusion / Surface coating
- [FB-29](FB-29.md) — Delayed slash detonation / Lingering rift

## References

- [Real Time VFX community (realtimevfx.com)](https://realtimevfx.com/)
- [Unity Manual — Trail Renderer](https://docs.unity3d.com/Manual/class-TrailRenderer.html)
- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
- [Wikipedia — The Legend of Zelda (1986 video game)](https://en.wikipedia.org/wiki/The_Legend_of_Zelda_(video_game))
