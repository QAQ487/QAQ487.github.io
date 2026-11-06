# ACT-02 · Jump Buffering / Input Buffer

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

Press jump shortly before landing and the character jumps again on touching down; the version described for Celeste requires holding the button.

## Not to be confused with

Coyote time works in the opposite direction: buffering tolerates an early press, while ledge grace tolerates a late one. Buffering does not add network or display latency, nor does it guarantee that every input will be retained.

## Use it for

Temporarily store the intention to jump and execute it when the action becomes valid. Combat can use the same concept to buffer the next move.  Part of the movement-forgiveness family with ACT-02, ACT-04 and ACT-06; also compare ACT-39 variable jump height (Celeste & Forgiveness).

## Tunable parameters

buffer duration · input timestamp · held requirement · validity check · consume rule

## Request prompt

Add a 120 ms jump buffer: if jump is held shortly before landing, jump on the first valid update after contact; cancel on release or timeout.

## Implementation hint

Timestamp a jump press and retain it only for a bounded buffer period. When jumping becomes legal, execute and consume the stored intent; optionally require the button to remain held.

## Related

- [ACT-01](ACT-01.md) — Coyote Time / Ledge Grace Period
- [ACT-04](ACT-04.md) — Corner Correction / Jump Corner Correction
- [ACT-06](ACT-06.md) — Lift Momentum Storage / Momentum Retention
- [ACT-39](ACT-39.md) — Variable jump height / Jump cut

## References

- [Maddy Thorson — Celeste & Forgiveness，§2](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
- [Eric Williams — Combat Canceled](https://www.gamedeveloper.com/game-platforms/combat-canceled-i-god-of-war-i-action-game-design)
