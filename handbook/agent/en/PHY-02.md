# PHY-02 · Verlet rope and chain

**Aliases:** 繩子像鐵棒; 吊橋晃動; 鎖鏈; Verlet rope; Chain physics; Rope constraint; Grappling rope; ロープ物理

**Group:** Animation, movement & physics
**Subcategory:** Cloth & ropes

## What you see

A rope is a chain of points; each point stores only its current and previous position, and velocity comes from their difference (Verlet integration). Neighbouring points are then repeatedly pulled back to a fixed length. The rope sags into a curve, goes taut when pulled and swings back and forth when released; a chain can draw one link per segment.

## Not to be confused with

Not a pre-made swing animation, and not cloth (PHY-01, a 2D grid) — a rope is a single strand with no surface bending or occlusion.

## Use it for

Rope bridges, hanging lamps, grappling lines, dragged chains, cables, simplified tails and tentacles.

## Tunable parameters

nodes 12–30 · damping 0.98–0.995 · iterations 6–10 · segment length · pin A/B · gravity (all starting points)

## Request prompt

Build a Verlet rope: 20 nodes with either end pinned or attached to an object; each frame update position as position + (position − previous position) × 0.99 (0.99 is a starting damping value), then run 6–10 length-constraint iterations. When the player pulls one end the rope should straighten, then swing and settle after release.

## Implementation hint

x_new = x + (x - x_prev)*damping + g*dt²; x_prev = x; x = x_new; then for k iterations: for each segment, d = |b-a|, diff=(d-L)/d, move a and b by ±0.5*diff*(b-a) (pinned nodes do not move). Draw as polyline or one link sprite per segment rotated to the segment angle.

## Related

- [PHY-01](PHY-01.md) — Position-based cloth (PBD / XPBD)
- [ACT-29](ACT-29.md) — Knockback / Pushback
- [PHY-04](PHY-04.md) — Damped rigid-prop settling
- [LGT-14](LGT-14.md) — Moving light pool from a swinging fixture

## References

- [Thomas Jakobsen — Advanced Character Physics (Verlet + constraint relaxation, PDF)](https://www.cs.cmu.edu/afs/cs/academic/class/15462-s13/www/lec_slides/Jakobsen.pdf)
- [Wikipedia — Verlet integration](https://en.wikipedia.org/wiki/Verlet_integration)
