# ACT-04 · Corner Correction / Jump Corner Correction

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

The character's head grazes a platform corner during a jump; a slight sideways adjustment lets the character rise past it instead of being stopped by the collision.

## Not to be confused with

Passing through walls or disabling all collisions. Dash corner correction can nudge a grazing dash up onto a platform; it is related, but addresses a different situation.

## Use it for

Prevent small positioning errors from blocking an otherwise reasonable jump intention.  Part of the movement-forgiveness family with ACT-02, ACT-04 and ACT-06; also compare ACT-39 variable jump height (Celeste & Forgiveness).

## Tunable parameters

corner probe · lateral nudge · clearance test · ascent only · collision mask

## Request prompt

When the character's head grazes a platform corner while rising, test lateral corrections up to 6 cm and apply the smallest clear offset; full walls must still block movement.

## Implementation hint

When an ascending character grazes a platform corner, test a few small horizontal offsets toward clearance. Apply the smallest collision-free offset without disabling solid collision.

## Related

- [ACT-01](ACT-01.md) — Coyote Time / Ledge Grace Period
- [ACT-02](ACT-02.md) — Jump Buffering / Input Buffer
- [ACT-06](ACT-06.md) — Lift Momentum Storage / Momentum Retention
- [ACT-39](ACT-39.md) — Variable jump height / Jump cut

## References

- [Maddy Thorson — Celeste & Forgiveness，§4–5](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
