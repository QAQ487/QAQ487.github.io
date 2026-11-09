# CAM-32 · Camera blend／Interpolated camera transition

**Group:** Camera & composition
**Subcategory:** Feedback and Transitions

## What you see

An exploration camera gradually moves into conversation framing, transitioning position, orientation, and camera parameters over time. (A general game-camera concept; Cinemachine’s blend is a mechanism for handing off camera states.)

## Not to be confused with

This is not a cross-dissolve between two rendered images. Camera interpolation usually produces one intermediate viewpoint, and does not automatically prevent wall intersections or losing the target along the way. Damping follows a moving target; a blend hands off between two camera states.

## Use it for

Maintains flow when changing gameplay states; curves such as linear or ease-in-out shape the transition speed.

## Tunable parameters

blend duration · position curve · rotation interpolation · lens interpolation · target handoff · collision checks · interruption policy

## Request prompt

In your game, blend from exploration to dialogue framing over 0.75 s: use cubic ease-in-out for position, the shortest rotation arc, and smoothly change vertical FOV from 60° to 42°. Test every intermediate position for walls; if another camera request arrives, start the new blend from the current blended state rather than snapping back.

## Implementation hint

Interpolate one complete camera state into another: position along a chosen curve, orientation on the shortest rotation arc, and projection parameters in a perceptually suitable space. Evaluate collision and target visibility on intermediate states, and define whether a new request restarts from the current blended state or queues.

## Related

- [CAM-37](CAM-37.md) — Perspective shift (3D ↔ side-scroll / top-down)

## References

- [Unity Blender Settings：Style／Time／Custom Blends](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineBlending.html)
