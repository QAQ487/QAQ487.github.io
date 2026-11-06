# ACT-15 · Arcs / Motion Arcs

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

A sword-swinging hand or walking foot follows a flowing arc rather than an awkward, angular path.

## Not to be confused with

A requirement that every path be a parabola. Mechanical or deliberately rigid movement can use straight lines. A weapon's visible arc also does not guarantee that its damage detection follows exactly the same path.

## Use it for

Give limb trajectories coherent direction and help detect sudden positional jumps.

## Tunable parameters

arc control points · path curvature · travel duration · orientation along path · hit path separation

## Request prompt

Move the sword tip through a smooth 140° arc of roughly 1.1 m radius over 320 ms, removing angular kinks; define damage detection separately in three timed segments.

## Implementation hint

Guide important limb or prop positions through a smooth curved path using a small set of control points. Evaluate gameplay hit detection separately instead of assuming the visible trail defines it.

## References

- [Wikipedia — Twelve basic principles of animation，Arcs](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
