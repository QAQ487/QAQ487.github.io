# CAM-10 · Orbit camera／Orbital follow

**Group:** Camera & composition
**Subcategory:** 3D Following and Readability

## What you see

The character stays roughly near the center while the right stick rotates the camera around them, including views from above or below. (General; Cinemachine Orbital Follow is a tool-specific name.)

## Not to be confused with

This is not turning the view from a stationary position: orbit changes camera position, whereas pan / tilt can change direction alone. A character turning around need not force the camera to orbit with them.

## Use it for

Lets players inspect their surroundings, navigate, and look behind them.

## Tunable parameters

orbit radius · yaw sensitivity · pitch range · rotation smoothing · target height · collision radius · invert Y

## Request prompt

In your game, add an orbit camera around a pivot 1.2 m above the character with a 4.5 m radius. Let the right stick rotate up to 150°/s, clamp pitch from −25° to 65°, and smooth rotation over 0.08 s. Character turning must not overwrite camera yaw; use a 0.25 m collision radius against walls.

## Implementation hint

Represent orbit orientation as yaw and pitch around a target pivot, clamp pitch before converting the angles and radius to a camera position, and look back at the pivot. Resolve camera collision along the pivot-to-camera segment and preserve the player's yaw while the character turns.

## References

- [Unity Orbital Follow](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineOrbitalFollow.html)
