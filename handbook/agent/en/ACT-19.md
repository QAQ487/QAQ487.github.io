# ACT-19 · Active Frames / Hit Window

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

Only part of a sword swing can register a contact hit; the sword being visible does not mean attack detection is active throughout.

## Not to be confused with

A cancel window. Active attack detection does not guarantee a hit: collision, range, and target-protection rules must still allow it. A multi-hit move may have several separate active intervals.

## Use it for

Define when an attack is effective, shaping its rhythm and coverage.

## Tunable parameters

active intervals · hit volume · target filters · repeat-hit rule · contact state

## Request prompt

Activate the sword hit volume from 240 to 330 ms for a 90 ms window; allow one hit per target and reject contacts that are out of range, invulnerable, or already recorded.

## Implementation hint

Enable attack detection only during explicit active intervals and test it against valid targets and protection rules. Track prior contacts when a move should hit each target only once.

## Related

- [ACT-44](ACT-44.md) — Weapon clash / Hitbox clash
- [FB-32](FB-32.md) — Projectile reflect / Batting
- [ACT-47](ACT-47.md) — Air juggle / Launcher

## References

- [Capcom — Street Fighter 6 A.K.I. Frame Data，active 區間說明](https://www.streetfighter.com/6/en-us/character/aki/frame)
- [Eric Williams — Combat Canceled，hit frame window](https://www.gamedeveloper.com/game-platforms/combat-canceled-i-god-of-war-i-action-game-design)
