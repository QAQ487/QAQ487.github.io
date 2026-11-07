# ACT-30 · Root Motion

**Aliases:** In-place animation; Code-driven locomotion; 原地動畫; 原地踏步

**Group:** Animation, movement & physics
**Subcategory:** Skeletal Animation, Movement, and Pose Composition

## What you see

During a stepping thrust, vault, or execution, the character's overall travel closely matches the animation's stride.

## Not to be confused with

A model drifting forward inside an animation does not mean its gameplay collision body has followed. Root motion does not mean direction can never be adjusted; it can be combined with control and warping. Matching stride and travel in ordinary footage alone does not prove root motion is in use.

## Use it for

Extract translation and rotation from the animation's root node and use them to help drive the character's movement through the world. A run cycle can play in place while movement rules carry the actor. On screen the stride still matches the travel, and a viewer cannot tell whether the asset itself contained root travel. (Former entry ACT-31, “In-place animation”, is merged here as the code-driven variant.)

## Tunable parameters

root translation · root rotation · extraction scale · collision sweep · control blend

## Request prompt

For a thrust animation whose root travels 2.4 m and rotates 15° over 700 ms, apply that motion to the character collider with swept collision and allow up to ±8° of player steering.

## Implementation hint

Extract authored root translation and rotation each update and apply them to world movement through normal collision checks. Blend or constrain player steering explicitly rather than assuming root-driven actions forbid correction.

## References

- [Epic Games — Root Motion，Overview／Root Motion Behavior](https://dev.epicgames.com/documentation/unreal-engine/root-motion-in-unreal-engine?lang=en-US)
