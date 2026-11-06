# CAM-27 · Rail camera／Spline dolly／Camera path

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

The camera travels through the scene along a designed curved route. The player may still move, but cannot freely pull the camera off its track. (Rail / camera path are general concepts; Cinemachine Spline Dolly is a tool-specific name.)

## Not to be confused with

A tracked camera is not necessarily a noninteractive cutscene. Progress can be time-driven or determined by character position. Dolly zoom is a different effect coordinating position with lens parameters.

## Use it for

Controls reveal order, traversal pacing, and predesigned views of important scenery.

## Tunable parameters

spline control points · progress driver · travel duration · speed curve · look target · path offset · banking · player influence

## Request prompt

In your game, move the camera along a six-control-point route through the valley over 8 s. Reparameterize by arc length for constant base speed, easing in and out over 0.7 s at each end. Look 4 m ahead of the character and allow up to 0.6 m of right-stick offset beside the rail without leaving it.

## Implementation hint

Evaluate position on a spline by normalized arc length so speed remains consistent despite uneven control-point spacing. Drive progress from time or projected player position, evaluate orientation separately from a look target, and collision-test any optional player-controlled offset.

## References

- [Unity Spline Dolly：Automatic Dolly 與 Nearest Point](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineSplineDolly.html)
