# ACT-31 · In-place Animation / Code-driven Locomotion

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

The character steps in place in the animation asset, while the in-game controller moves the character forward.

## Not to be confused with

In-place does not mean every bone remains stationary. It means the cycle's overall forward travel is not directly used to drive world-space displacement. One character can use in-place animation for ordinary walking and root motion for specific attacks.

## Use it for

Let gameplay systems lead movement speed, turning, and immediate control, then supply an appropriate gait.

## Tunable parameters

controller speed · animation rate · stride length · turn rate · foot phase

## Request prompt

Move the character by code at 4.5 m/s while playing a run cycle with no net root travel; scale playback for a 3.6 m stride and cap turning at 540° per second.

## Implementation hint

Drive world-space translation and rotation from movement rules while the locomotion clip has no net root travel. Match playback rate and gait selection to controller speed to limit visible foot sliding.

## References

- [MoCap Online（動作捕捉資產供應商）— Root Motion vs In-Place Animation](https://mocaponline.com/blogs/mocap-news/root-motion-vs-in-place-animation)
- [Epic Games — Root Motion](https://dev.epicgames.com/documentation/unreal-engine/root-motion-in-unreal-engine?lang=en-US)
