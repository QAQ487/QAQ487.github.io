# ACT-07 · Acceleration / Braking / Deceleration

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

Holding a direction gradually builds running speed; releasing it produces a short slide or an almost immediate stop.

## Not to be confused with

Maximum speed and acceleration rate are different. A model slowly straightening up may only be an animation transition, not continued movement of the character's collision body. Engine braking and friction are controller-model parameters, not necessarily real material friction.

## Use it for

Shape how starting, turning, and stopping feel: responsive, weighty, or slippery.

## Tunable parameters

max speed · ground acceleration · braking rate · reversal rate · stop threshold

## Request prompt

Set ground movement to 7 m/s maximum speed, 24 m/s² acceleration, 36 m/s² release braking, and 48 m/s² reversal, snapping below 0.05 m/s to zero.

## Implementation hint

Move horizontal speed toward a target at separate acceleration, braking, and reversal rates. Keep maximum speed independent from how quickly it is reached or shed.

## Related

- [ANI-20](ANI-20.md) — Locomotion lean / Body banking

## References

- [Epic Games — UCharacterMovementComponent，Velocity、Acceleration、BrakingDecelerationWalking、BrakingFriction](https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/UCharacterMovementComponent?lang=en-US)
