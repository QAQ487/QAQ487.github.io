# ACT-10 · Squash and Stretch

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

A character compresses slightly on landing or stretches during a jump or fast dash.

## Not to be confused with

Changing hurtboxes. Preserving apparent volume is a common artistic principle, not a physical requirement that every character must always maintain constant volume.

## Use it for

Emphasize contact, elasticity, and motion, making small actions more visible. Scale compression depth and settle duration from pre-contact downward speed: short hop barely dips; long fall deep crouch; very high fall may roll or briefly stun as recovery presentation. Foot pivot stays at contact; an accepted jump can blend out of compression. Cross-link CAM-34.

## Tunable parameters

squash scale · stretch scale · apparent volume · recovery duration · collider policy · impact-scaled landing compression · recovery tiers (hop / deep crouch / roll-stun presentation)

## Request prompt

Scale landing compression depth and settle duration from pre-contact downward speed: short hop barely dips the knees; long fall deep crouch; very high fall may roll or briefly stun as recovery presentation. Foot pivot stays at contact. An accepted jump can blend out of compression. Do not force a movement lock unless the variant says so. Cross-link CAM-34 and FB-13.

## Implementation hint

Scale landing compression depth and settle duration from pre-contact downward speed: a short hop barely dips the knees; a long fall is a deep crouch; a very high fall may present a roll or brief stun as recovery presentation (not a design-rule article). Foot pivot stays at contact. An accepted jump can blend out of current compression. Do not force a movement lock unless the variant says so. Cross-link CAM-34 landing dip and FB-13 squash-on-hit.

## Related

- [CAM-34](CAM-34.md) — Landing camera dip
- [FB-13](FB-13.md) — Squash on hit

## References

- [Wikipedia — Twelve basic principles of animation，Squash and Stretch](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
