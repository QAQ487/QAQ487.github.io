# ACT-28 · Super Armor / Armor / Hyper Armor

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

A character keeps performing a heavy attack despite being hit. Health may still decrease, but an ordinary hit reaction does not interrupt the move.

## Not to be confused with

Invulnerability or guaranteed damage reduction. Hit limits, damage thresholds, and whether throws defeat armor depend on the game. The distinction between “super” and “hyper” armor is not standardized. Do not equate them directly with every RPG's poise system.

## Use it for

Let selected attacks withstand pressure and complete, creating options for damage trading or challenging another attack.

## Tunable parameters

armor interval · hit capacity · damage threshold · interrupt exceptions · damage policy

## Request prompt

Give the heavy attack two-hit armor from 180 to 520 ms: damage still applies, the third hit or any single hit above 40 interrupts, and throws bypass armor.

## Implementation hint

While armor is active, process damage normally unless configured otherwise but suppress ordinary interruption within its capacity. Break or bypass armor on explicit hit counts, thresholds, throws, or other exception categories.

## Related

- [ACT-41](ACT-41.md) — Stance break / Poise break
- [ACT-22](ACT-22.md) — Hitstun / Hit Reaction Stun

## References

- [Capcom — Street Fighter 6 A.K.I. Frame Data，Drive Impact 的兩次攻擊 armor 及指定有效幀](https://www.streetfighter.com/6/en-us/character/aki/frame)
- [Celia Wagar — Stunning Detail，super armor](https://critpoints.net/2016/08/14/stunning-detail/)
