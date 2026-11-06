# ACT-06 · Lift Momentum Storage / Momentum Retention

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

A moving platform has just stopped, but jumping off still grants the boost from its movement.

## Not to be confused with

Simply inheriting platform velocity is not the same as retaining a boost after the platform stops. Here “momentum” is the developer's gameplay terminology, not a claim of strict momentum-conservation simulation.

## Use it for

Widen the timing allowance for using moving platforms to launch a jump, preserving the flow of movement.  Part of the movement-forgiveness family with ACT-02, ACT-04 and ACT-06; also compare ACT-39 variable jump height (Celeste & Forgiveness).

## Tunable parameters

platform velocity · storage duration · launch contribution · stop timestamp · consume rule

## Request prompt

Store a lift's last upward velocity for 120 ms after it stops; a jump during that interval receives 80% of the stored boost once, then the value expires.

## Implementation hint

Cache the supporting platform's useful velocity when it stops or contact ends. For a brief period, add that cached contribution to the next jump once, then clear it.

## Related

- [ACT-01](ACT-01.md) — Coyote Time / Ledge Grace Period
- [ACT-02](ACT-02.md) — Jump Buffering / Input Buffer
- [ACT-04](ACT-04.md) — Corner Correction / Jump Corner Correction
- [ACT-39](ACT-39.md) — Variable jump height / Jump cut

## References

- [Maddy Thorson — Celeste & Forgiveness，§7](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
