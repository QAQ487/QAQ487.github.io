# ACT-03 · Apex Hang Time / Reduced Gravity at Jump Peak

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

Near the top of a jump, a brief “floatier” interval makes it easier to adjust the landing position.

## Not to be confused with

Not every game halves gravity. This is not constant low gravity, a double jump, or an actual time stop; it is designed movement rather than a law of real-world physics.

## Use it for

Shape airborne pacing and landing control. In the specific Celeste example, gravity is halved near the apex while jump is held.

## Tunable parameters

apex speed threshold · gravity scale · hang duration · jump hold · fall gravity

## Request prompt

While vertical speed is within ±0.8 m/s and jump remains held, reduce gravity to 55% for at most 90 ms, then restore normal gravity outside the apex band.

## Implementation hint

Detect when vertical speed is near zero and temporarily apply a lower downward acceleration, optionally only while jump is held. Restore normal falling behavior outside the apex band.

## Related

- [ACT-39](ACT-39.md) — Variable jump height / Jump cut
- [ACT-01](ACT-01.md) — Coyote Time / Ledge Grace Period
- [ACT-45](ACT-45.md) — Pogo bounce / Downward strike bounce
- [ACT-47](ACT-47.md) — Air juggle / Launcher

## References

- [Maddy Thorson — Celeste & Forgiveness，§3](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
