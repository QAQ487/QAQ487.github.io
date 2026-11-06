# ACT-01 · Coyote Time / Ledge Grace Period

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

The character has stepped a little beyond a platform's edge, yet pressing jump still works.

## Not to be confused with

An aerial double jump. This grace period briefly extends eligibility for the original ground jump; it does not allow indefinite suspension in midair.

## Use it for

Allow a small discrepancy between the player's visual judgment and the actual moment of leaving the ground, reducing the frustration of “I should have made that.”.  Part of the movement-forgiveness family with ACT-02, ACT-04 and ACT-06; also compare ACT-39 variable jump height (Celeste & Forgiveness).

## Tunable parameters

grace duration · grounded timestamp · jump eligibility · vertical velocity · edge state

## Request prompt

Add a 100 ms ledge grace period: allow one jump after walking off a platform, then consume it so it cannot become a double jump.

## Implementation hint

Record the last time the character was grounded and accept a ground jump for a short interval after that time. Consume the eligibility on use so the grace period cannot become an extra aerial jump.

## Related

- [ACT-02](ACT-02.md) — Jump Buffering / Input Buffer
- [ACT-04](ACT-04.md) — Corner Correction / Jump Corner Correction
- [ACT-06](ACT-06.md) — Lift Momentum Storage / Momentum Retention
- [ACT-39](ACT-39.md) — Variable jump height / Jump cut

## References

- [Maddy Thorson — Celeste & Forgiveness，§1](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
