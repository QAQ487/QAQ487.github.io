# ACT-23 · Blockstun / Guard Stun

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

An attack is successfully blocked, but the character remains locked in the guard reaction and cannot immediately retaliate freely.

## Not to be confused with

Guard break or guaranteed health loss. Whether a defender can cancel guard, jump away, or counterattack depends on the game. Fighting-game pressure rules are not universal rules for every game with shields.

## Use it for

Give defense a cost rather than making it entirely free, creating defensive rhythm and pressure.

## Tunable parameters

blockstun duration · guard pushback · chip policy · counter options · guard state

## Request prompt

After blocking a light attack, apply 160 ms of blockstun and 0.35 m of pushback with no health loss; permit one guard cancel during the final 40 ms without treating it as a guard break.

## Implementation hint

On a successful block, apply a distinct timed restriction and any configured pushback without treating it as a guard break. Define permitted guard cancels and health effects explicitly per attack.

## Related

- [ACT-42](ACT-42.md) — Guard counter
- [ACT-41](ACT-41.md) — Stance break / Poise break

## References

- [Celia Wagar — Stunning Detail，Blockstun 段落](https://critpoints.net/2016/08/14/stunning-detail/)
