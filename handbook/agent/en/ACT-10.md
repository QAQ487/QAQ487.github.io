# ACT-10 · Squash and Stretch

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

A character compresses slightly on landing or stretches during a jump or fast dash.

## Not to be confused with

Changing hurtboxes. Preserving apparent volume is a common artistic principle, not a physical requirement that every character must always maintain constant volume.

## Use it for

Emphasize contact, elasticity, and motion, making small actions more visible.

## Tunable parameters

squash scale · stretch scale · apparent volume · recovery duration · collider policy

## Request prompt

On landing, squash the visual to 85% height and 108% width, recovering over 120 ms; for the first 80 ms of takeoff, stretch to 112% height and 94% width, without changing the collider.

## Implementation hint

Apply brief nonuniform visual scaling around impacts and launches, compensating other axes to preserve apparent volume. Keep gameplay collision unchanged unless the design explicitly calls for a separate rule.

## References

- [Wikipedia — Twelve basic principles of animation，Squash and Stretch](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
