# CAM-20 · Dolly in／Dolly out／Push-in／Pull-back

**Group:** Camera & composition
**Subcategory:** Projection and Apparent Distance

## What you see

The camera approaches or withdraws from the character. Foreground-background relationships change with the observation position, rather than the image merely scaling uniformly. (General cinematography terminology. Push-in describes the effect without requiring a physical track; in games, the virtual camera position moves.)

## Not to be confused with

This is not zoom, nor a rail camera restricted to a long track. These identification clues concern perspective views; moving an orthographic camera along its viewing axis does not produce the same scaling.

## Use it for

Approaches important objects, increases emotional pressure, or pulls back to reveal the environment.

## Tunable parameters

start/end distance · travel duration · path direction · easing · fixed FOV · collision handling · focus target

## Request prompt

In your game, add a push-in for a dialogue reveal: move the camera along its view from 8 m to 3.5 m from the character over 1.2 s with ease-in-out, keeping vertical FOV fixed at 55° and looking at the character's eyes. Foreground/background scale relationships must change; stop 0.15 m before any wall on the path.

## Implementation hint

Move the camera's world position along its viewing direction or another designed path while holding FOV constant. Continue recomputing orientation toward the subject if required, and collision-test the swept path rather than only the final position.

## References

- [Wikipedia — Shot (filmmaking)：Dolly in/out and zoom shot](https://en.wikipedia.org/wiki/Shot_(filmmaking))
- [Unity Group Framing：Dolly Only](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineGroupFraming.html)
