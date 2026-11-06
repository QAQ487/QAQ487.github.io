# ACT-08 · Air Control / Air Steering

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

Left/right input after takeoff can still adjust the horizontal landing position; another design may largely commit the character to the launch direction.

## Not to be confused with

An airborne turning animation does not necessarily redirect velocity. Air control also does not mean gaining another jump's worth of height.

## Use it for

Determine how much midair correction is available and how much planning before takeoff matters.

## Tunable parameters

air acceleration · air max speed · steering multiplier · reversal control · vertical independence

## Request prompt

Use 9 m/s² horizontal air acceleration with a 5 m/s cap and a 1.4 reversal multiplier; steering must not alter vertical speed or grant extra height.

## Implementation hint

Apply horizontal acceleration from directional input while airborne, capped independently from vertical motion. Tune same-direction steering and reversal separately so air control changes landing position without adding jump height.

## References

- [Epic Games — UCharacterMovementComponent，AirControl](https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/UCharacterMovementComponent?lang=en-US)
