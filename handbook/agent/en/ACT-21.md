# ACT-21 · Hitstop / Hit Pause / Hitfreeze

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

At the instant a punch connects, the attacker, target, or part of the scene briefly pauses before motion resumes.

## Not to be confused with

Hitstun or a guaranteed world-wide pause; only the involved characters may stop. Whether the environment, effects, or input processing continue depends on implementation. It cannot universally be described as dropped frames or global slow motion.

## Use it for

Emphasize contact, weight, and rhythm, making a hit easier to perceive.

## Tunable parameters

pause duration · affected actors · timer domains · input policy · effect policy

## Request prompt

On a heavy hit, pause the attacker for 55 ms and the target for 75 ms while background motion, input sampling, and sparks continue; begin the 260 ms hitstun only after the pause.

## Implementation hint

On a confirmed hit, pause the selected attacker and target simulation clocks for a short interval while deciding independently whether input, effects, camera, and environment continue. Resume from the held contact poses without converting the pause into hitstun.

## References

- [Shane Sicienski — Hitstop in Capcom Beat ’Em Ups，Introduction／Important Distinctions](https://shane-sicienski.com/blog/blog-post-title-one-55pmn)
