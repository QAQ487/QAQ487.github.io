# VFX-18 · Debris

**Aliases:** Gibs; Chunks; Rubble; Splinters; One-way collapse; Backward gate; Point of no return; 身後塌方; 單向入口; 落石封路

**Group:** VFX & particles
**Subcategory:** Destruction

## What you see

When something breaks it throws out several pieces (wood splinters, stones, pixel chunks) that spin along ballistic arcs, bounce once or twice on landing, slide to a stop, then stay on the ground or fade; shadows show their height.

## Not to be confused with

Not a shatter (VFX-19, cutting the object itself into geometric pieces); debris is usually separate small pieces spawned for the effect. Not explosion sparks (a layer of VFX-09, glowing and short-lived).

## Use it for

Breaking fences, crates, walls and rocks; gives destruction tangible weight and, with permanence (FB-12), leaves marks on the battlefield. After a landing, pieces can also fall behind the player and stay on the path so the way back is blocked. The confirmation before leaving a zone is UX-08. (The collapse from former entry UX-35, “One-way entrance”, is merged here.)

## Tunable parameters

piece count & size · launch speed & height · spin · gravity · restitution & friction · ground lifetime · shadow

## Request prompt

In your game, when enemies break a wooden fence: throw 8 wood chips of 2×1 to 3×2 px at 40–80 px/s, launched 10–20 px high, each spinning at a random rate (snapped to 90° steps to keep it pixel-art); bounce once on landing (restitution 0.4), then lie on the ground for 4 s before blinking out. Draw small shadows so height reads.

## Implementation hint

CPU particles with a separate height (z) channel for top-down: screen y = ground y − z, shadow drawn at ground y. Integrate z with gravity, bounce when z < 0. Draw pieces as atlas sub-rects; rotate in 90° steps for pixel art. Cap the count and recycle oldest pieces first.

## Related

- [VFX-19](VFX-19.md) — Shatter
- [FB-12](FB-12.md) — Permanence
- [FB-04](FB-04.md) — Death effect
- [VFX-09](VFX-09.md) — Explosion
- [UX-08](UX-08.md) — Modal dialog
- [ENV-19](ENV-19.md) — Contact-driven leaf litter

## References

- [Wikipedia — Gibs](https://en.wikipedia.org/wiki/Gibs)
- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
- [Unity Manual — Particle System](https://docs.unity3d.com/Manual/class-ParticleSystem.html)
