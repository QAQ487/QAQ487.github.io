# ACT-20 · Recovery / Endlag

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

After missing an attack, the character is retracting the arm and cannot immediately dodge or attack again.

## Not to be confused with

Cooldown. Once recovery ends, other actions may be available while the same skill remains on cooldown. The animation's tail may also be cancelable, so footage duration alone cannot establish the period of action lockout.

## Use it for

Establish commitment, the risk of mistakes, and opportunities for an opponent to retaliate.

## Tunable parameters

recovery duration · action lockout · allowed cancels · cooldown separation · whiff modifier

## Request prompt

After the heavy attack's active window, add 420 ms of recovery: disallow attacks and dodges for 300 ms, allow only guard during the final 120 ms, and track a separate 2.0 s skill cooldown.

## Implementation hint

After active detection ends, keep selected actions unavailable for a defined recovery interval. Track recovery separately from visual animation tails and skill cooldowns, and expose only intentional cancel routes.

## References

- [Capcom — Street Fighter 6 A.K.I. Frame Data，Recovery](https://www.streetfighter.com/6/en-us/character/aki/frame)
- [Eric Williams — Combat Canceled](https://www.gamedeveloper.com/game-platforms/combat-canceled-i-god-of-war-i-action-game-design)
