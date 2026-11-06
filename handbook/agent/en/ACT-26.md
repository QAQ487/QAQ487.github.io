# ACT-26 · Frame Advantage / Plus and Minus

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

After an attack connects, the two sides regain freedom to act at different times. Acting sooner gives you a relative advantage.

## Not to be confused with

Positive frames guaranteeing the next move wins, or negative frames guaranteeing a punish. Distance, the next move's startup, invulnerability, cancels, and special rules all affect the result. The fighting-game model of “whose turn it is” does not apply unchanged to every multiplayer melee.

## Use it for

Analyze who gets the next opportunity to act. Fighting games commonly distinguish advantage on hit from advantage on block.

## Tunable parameters

attacker unlock · defender unlock · on-hit value · on-block value · distance context

## Request prompt

If the attacker unlocks at 420 ms after a block and the defender at 460 ms, report +40 ms; also report +90 ms on hit and test whether a 180 ms follow-up actually reaches at the resulting distance.

## Implementation hint

Measure advantage as the difference between when the attacker and defender can next act after contact. Report hit and block outcomes separately, and evaluate follow-ups with startup, distance, and special defenses rather than the sign alone.

## References

- [Celia Wagar — Stunning Detail，Advantage time](https://critpoints.net/2016/08/14/stunning-detail/)
- [Capcom — Street Fighter 6 A.K.I. Frame Data，Hit／Block 數據](https://www.streetfighter.com/6/en-us/character/aki/frame)
