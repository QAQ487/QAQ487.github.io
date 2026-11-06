# ACT-24 · Cancel / Animation Cancel / Move Cancel

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

The character transitions into another move, a block, or a dodge before the previous move has fully played out.

## Not to be confused with

An automatic exploit, or every rapid sequence of moves. Starting the next move after the previous one ends normally does not cut the first move short. A visual crossfade does not itself mean gameplay permits early action.

## Use it for

Control responsiveness, action routes, and attack commitment. Which cancels are available is a design decision.

## Tunable parameters

source state · destination action · cancel permission · transition cost · hit condition

## Request prompt

After a light attack hits, allow cancellation into heavy attack for 20 energy or dodge for 30 before the animation ends; permit neither early transition on whiff.

## Implementation hint

Define explicit transitions that may interrupt a source action before its normal completion. Validate destination, timing, hit state, and resource cost in gameplay rules rather than inferring permission from visual blending.

## References

- [Eric Williams（前 God of War 戰鬥／系統設計師）— Combat Canceled](https://www.gamedeveloper.com/game-platforms/combat-canceled-i-god-of-war-i-action-game-design)
