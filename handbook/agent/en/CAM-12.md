# CAM-12 · Camera recentering／Auto-recenter

**Group:** Camera & composition
**Subcategory:** 3D Following and Readability

## What you see

After the player leaves the right stick alone for a while, the camera gradually returns behind the character or their direction of movement. (A general concept; setting names vary by tool.)

## Not to be confused with

This is neither a player-triggered “reset camera” action nor damping. Recentering determines where to face; damping determines how to catch up. The reference can be the character rather than a fixed world direction.

## Use it for

Reduces the burden of continually adjusting the view manually.

## Tunable parameters

idle delay · recenter reference · yaw speed · pitch return · input threshold · movement threshold · cancel conditions

## Request prompt

In your game, add automatic recentering: after right-stick input stays below 0.12 for 1.2 s, rotate toward a position behind the character's movement direction at 90°/s, while pitch returns to 12° over 0.5 s. Pause recentering below 0.5 m/s and cancel it immediately when the player moves the stick again.

## Implementation hint

After manual camera input becomes idle, derive a target heading from character facing or filtered movement direction and rotate toward it on the shortest arc. Reset the idle timer immediately on fresh camera input and use separate speeds for yaw and pitch return.

## References

- [Unity Orbital Follow：Recentering 與參照設定](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineOrbitalFollow.html)
