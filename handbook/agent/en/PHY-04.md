# PHY-04 · Damped rigid-prop settling

**Aliases:** Prop wobble and settle; Damped oscillation; Hinged prop secondary motion; Physical follow-through; 道具回擺; 剛体の収束

**Group:** Animation, movement & physics
**Subcategory:** Rigid bodies & constraints

## What you see

A bumped sign swings twice before resting; a door reaches its stop, rebounds slightly, then settles. Instant stops remove apparent mass.

## Not to be confused with

Not rope/chain (PHY-02) and not animation follow-through (ACT-13). This is hinged/pivoting rigid props.

## Use it for

Interactive sets, physical props, doors and signs that need mass.

## Tunable parameters

pivot · angle limits · angular impulse · damping · rest threshold · additive re-hit (authoring defaults)

## Request prompt

Contact, release, slam, or gust → constrained rigid prop gets an angular impulse respecting pivot and limits, then decreasing oscillation/rebound → rest below a threshold without a visible snap. A second hit adds to current motion rather than restarting a canned loop.

## Implementation hint

Use a hinge/spring joint or 1-DOF angular spring: ω += impulse; integrate with damping until |ω| and |angle-rest| < eps, then sleep. On new hit add to ω. Avoid replaying a fixed swing clip from t=0.

## Related

- [PHY-02](PHY-02.md) — Verlet rope and chain
- [ACT-13](ACT-13.md) — Follow Through
- [ENV-08](ENV-08.md) — Foliage sway

## References

- [Thomas Jakobsen — Advanced Character Physics (Verlet + constraint relaxation, PDF)](https://www.cs.cmu.edu/afs/cs/academic/class/15462-s13/www/lec_slides/Jakobsen.pdf)
