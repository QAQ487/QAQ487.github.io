# CAM-14 · Camera collision／Collision resolution

**Group:** Camera & composition
**Subcategory:** 3D Following and Readability

## What you see

When the character backs against a wall, the camera is pushed closer or sideways rather than passing into the wall and showing the back of its geometry. (General.)

## Not to be confused with

The camera being inside a wall and the character being hidden behind an intervening pillar are different problems. Collision handling does not automatically provide complete occlusion management.

## Use it for

Maintains a usable camera position and prevents geometry intersections from breaking the sense of space.

## Tunable parameters

collision shape radius · skin distance · obstacle layers · minimum distance · push-in speed · recovery speed · side-slide bias

## Request prompt

In your game, add camera collision: sphere-sweep from the character pivot to the desired camera position with a 0.25 m radius, stopping 0.08 m before the nearest wall and never closer than 0.6 m. Push in over 0.06 s, restore distance over 0.35 s after clearance, and ignore the character and non-solid particles.

## Implementation hint

Sweep a sphere or capsule from the target pivot toward the desired camera position and place the camera just before the nearest blocking surface. Move inward quickly when blocked and restore distance more slowly after clearance to avoid popping at wall edges.

## Related

- [CAM-35](CAM-35.md) — See-through occluder / Dithered fade

## References

- [Unity Third Person Follow：Built-in Collision Resolution](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineThirdPersonFollow.html)
