# VFX-08 · Projectile trail

**Aliases:** Tracer; Bullet trail; Arrow trail; Missile trail

**Group:** VFX & particles
**Subcategory:** Combat VFX

## What you see

Arrows, bullets, magic bolts and cannonballs leave a thinning, fading trail behind them — a streak of light, a string of particles or a series of smoke puffs.

## Not to be confused with

Not a beam (VFX-11, a line continuously connecting two points); a trail follows a moving projectile and its old part expires over time. Not a slash (VFX-07, a fixed arc for one swing).

## Use it for

Shows where a projectile came from, where it is going and how fast; vital in tower-defence scenes full of arrows.

## Tunable parameters

history length / sample spacing · width taper · fade time · emit-by-distance vs by-time · colour · world vs local space

## Request prompt

Add trails to arrow-tower arrows in the game: keep the last 6 positions and draw a pale-yellow line tapering 2 px→0 px that fades over 0.15 s. Mage-tower bolts drop a purple particle every 0.03 s that shrinks away over 0.3 s; catapult stones leave grey smoke puffs.

## Implementation hint

Ring buffer of past positions per projectile (CPU), expanded into a camera-facing triangle strip each frame in a dynamic vertex buffer (rewritten each frame). For particle trails, emit by distance travelled so speed changes do not leave gaps.

## Related

- [VFX-11](VFX-11.md) — Beam
- [VFX-07](VFX-07.md) — Slash VFX
- [FB-15](FB-15.md) — Muzzle flash
- [FX-02](FX-02.md) — Trails / Ribbons
- [FB-30](FB-30.md) — Weapon recall / Return-path pierce
- [FB-32](FB-32.md) — Projectile reflect / Batting
- [FB-33](FB-33.md) — Telekinetic grab & throw

## References

- [Unity Manual — Trail Renderer](https://docs.unity3d.com/Manual/class-TrailRenderer.html)
- [Unity Manual — Particle System Trails module](https://docs.unity3d.com/Manual/PartSysTrailsModule.html)
- [Wikipedia — Tracer ammunition](https://en.wikipedia.org/wiki/Tracer_ammunition)
- [Godot docs — Line2D class](https://docs.godotengine.org/en/stable/classes/class_line2d.html)
