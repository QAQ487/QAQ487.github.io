# ACT-21 · Hitstop / Hit Pause / Hitfreeze

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

At the instant a punch connects, the attacker, target, or part of the scene briefly pauses before motion resumes.

## Not to be confused with

Hitstun or a guaranteed world-wide pause; only the involved characters may stop. Whether the environment, effects, or input processing continue depends on implementation. It cannot universally be described as dropped frames or global slow motion.

## Use it for

Emphasize contact, weight, and rhythm, making a hit easier to perceive. Optional contact creep (a capped fraction of the attacker visual swing advances during paused clocks) or hurt-pose acquisition (clocks frozen while the victim blends into a directional extreme, then holds). Tune separately from FB-24 local vibration; do not treat one title’s “about four frames” as a universal constant.

## Tunable parameters

pause duration · affected actors · timer domains · input policy · effect policy · contact creep (opt-in) · hurt-pose acquisition during hitstop · link to FB-24 vibration

## Request prompt

On a heavy hit pause the attacker 55 ms and target 75 ms. Optionally enable contact creep (a capped fraction of the attacker visual swing advances during hitstop) or hurt-pose acquisition (clocks frozen while the victim blends into a directional extreme, then holds). Background and sparks may continue. FB-24 local vibration is a separate knob from pose change and clock pause.

## Implementation hint

On a confirmed hit, pause selected attacker/target simulation clocks. Optional variants (not separate IDs): (1) Moving inside hitstop / contact creep — advance a tightly capped fraction of the attacker's visual swing so the blade seems to push through resistance, then reconcile without a backward pose pop; opt in per move. (2) Hurt-pose acquisition — freeze selected clocks but blend the victim into a directional hurt extreme over a short visual interval, then hold; a new hit recomputes from current output. Distinguish FB-24 damage vibration (offset buzz) from pose change and from the clock pause. Sakurai discusses both; do not treat Smash's ~4 frames as a universal constant.

## Related

- [FB-24](FB-24.md) — Damage vibration
- [ANI-05](ANI-05.md) — Hit reaction
- [FB-26](FB-26.md) — Perfect parry flash / Just guard
- [ACT-44](ACT-44.md) — Weapon clash / Hitbox clash
- [FB-31](FB-31.md) — Stasis with stored impact
- [ACT-45](ACT-45.md) — Pogo bounce / Downward strike bounce
- [ACT-47](ACT-47.md) — Air juggle / Launcher
- [FB-36](FB-36.md) — Percentage knockback & trajectory influence

## References

- [Source Gaming — Thoughts on Hitstop: Sakurai’s Famitsu Column Vol. 490](https://sourcegaming.info/2015/11/11/thoughts-on-hitstop-sakurais-famitsu-column-vol-490-1/)
