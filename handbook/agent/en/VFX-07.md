# VFX-07 · Slash VFX

**Aliases:** Sword arc; Swoosh; Slash trail; Weapon trail

**Group:** VFX & particles
**Subcategory:** Combat VFX

## What you see

When a sword or claw swings, the path it sweeps leaves a crescent of light: brightest and thickest at the leading edge, thinning and fading toward the tail, usually a white core with a coloured rim.

## Not to be confused with

Not afterimages (FX-03, copies of the whole character pose); not a generic trail (FX-02, a ribbon following a moving object). A slash is a fixed-shape arc tied to a single swing.

## Use it for

Makes the reach and direction of melee attacks readable — essential for small pixel characters whose weapon swing is otherwise too tiny to see.

## Tunable parameters

arc angle range · radius · thickness profile · core/rim colours · lifetime of tail · sweep easing · hit sparks

## Request prompt

Add a slash arc to the hero’s sword attack in the game: during the 0.12 s swing, sweep a crescent of radius 14 px from −60° to +80°, 2 px white leading edge and pale-blue outer band, with the tail narrowing and fading over 0.1 s; on hit, add 3–4 sparks at the end of the arc.

## Implementation hint

Build a triangle-strip mesh each frame: N segments along the arc from angleStart to angleNow; per-vertex alpha/width from segment age (age = now - segmentTime). Or author a crescent flipbook (cheap for pixel art: 3–4 frames). Draw additive, after characters, with the strip in world space attached to the character pivot.

## Related

- [FX-02](FX-02.md) — Trails / Ribbons
- [FX-03](FX-03.md) — Afterimages / Ghost Trails
- [VFX-08](VFX-08.md) — Projectile trail
- [FB-06](FB-06.md) — Critical hit emphasis

## References

- [Real Time VFX community (realtimevfx.com)](https://realtimevfx.com/)
- [Unity Manual — Trail Renderer](https://docs.unity3d.com/Manual/class-TrailRenderer.html)
- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
