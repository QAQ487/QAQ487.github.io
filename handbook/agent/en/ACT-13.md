# ACT-13 · Follow Through

**Group:** Animation, movement & physics
**Subcategory:** Animation Principles and Action Readability

## What you see

After the body stops, a cape, hair, or arm continues swinging briefly before settling.

## Not to be confused with

Combat recovery. A moving cape does not mean the character is still unresponsive to input. Follow through need not come from physics simulation; it can be hand-animated.

## Use it for

Avoid having the entire body “switch off” simultaneously, emphasizing flexible parts and residual motion.

## Tunable parameters

primary stop time · trailing delay · damping · settle duration · control independence

## Request prompt

After the character stops abruptly, let the cape swing twice at 18° then 7° and settle within 420 ms; return player control as soon as the body stops.

## Implementation hint

Let flexible parts continue after the main body reaches its stop, then damp them toward rest. Treat this residual visual motion independently from whether gameplay control has returned.

## References

- [Wikipedia — Twelve basic principles of animation，Follow Through and Overlapping Action](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
