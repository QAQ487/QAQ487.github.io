# CAM-02 · Dead zone／Camera-window

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

The character takes a few steps near the center of the screen without moving the background. The camera is pushed along only when the character reaches an invisible boundary. (Dead zone is common tool terminology; Camera-window is a Keren category. The concepts are similar, but their precise boundary-crossing behavior may differ.)

## Not to be confused with

This is not a controller input dead zone or a map boundary. An overly large window can leave insufficient visibility ahead or above.

## Use it for

Small movements, idle animations, and ordinary jumps need not move the entire view every time.

## Tunable parameters

window width/height · window offset · per-axis enable · boundary response · follow smoothing · maximum lag

## Request prompt

In your game, add a movement dead zone: on a 320×180 reference frame, place an 80×44 px follow window at the centre. Keep the camera completely still while the character is inside it; after any edge is crossed, move with 0.18 s smoothing and correct only enough to return the character to that edge.

## Implementation hint

Define a rectangle in screen space around the desired composition. Leave the camera unchanged while the target remains inside it; when the target crosses an edge, move the camera by the minimum amount needed to place the target back on that edge.

## References

- [Unity Position Composer：Dead Zone](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachinePositionComposer.html)
- [Keren：Curb Camera Motion](https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/)
