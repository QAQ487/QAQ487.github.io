# ACT-36 · Inverse Kinematics / IK; Forward Kinematics / FK

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

IK commonly keeps feet aligned to slopes or a hand on handles at different heights. FK instead determines the hand's position through successive rotations of joints such as the shoulder and elbow.

## Not to be confused with

IK being automatic full-body physics or guaranteeing that a target is reachable and clipping-free. Feet planted on the ground alone do not reveal which solver is used.

## Use it for

IK solves joint poses from end-effector targets such as hands or feet. FK controls joints directly and is useful for shaping primary motion arcs. Both can be used together.

## Tunable parameters

end-effector target · chain length · joint limits · solver weight · FK base pose

## Request prompt

Keep the FK walk pose, then use two-bone leg IK to align feet to slopes up to ±25°; blend each solver from 0 to 1 over 120 ms and clamp targets beyond 95% of leg reach.

## Implementation hint

Author the main motion with direct joint rotations, then solve selected bone chains toward hand or foot targets. Clamp unreachable targets and joint limits, and blend solver weight to avoid snapping.

## References

- [Epic Games — IK Setups，IK vs. FK](https://dev.epicgames.com/documentation/en-us/unreal-engine/ik-setups?application_version=4.27)
