# CAM-11 · Over-the-shoulder camera／OTS

**Group:** Camera & composition
**Subcategory:** 3D Following and Readability

## What you see

The character is offset left or right, with their shoulder and back visible nearby and most of the view reserved for targets ahead. Switching shoulders swaps the left-right arrangement. (General photographic and game terminology.)

## Not to be confused with

Third-person does not necessarily mean over-the-shoulder. Offsetting the character alone does not provide aim correction or collision handling.

## Use it for

Keeps the character present while clarifying aim direction and conversation partners.

## Tunable parameters

shoulder offset · camera distance/height · aim convergence distance · shoulder-swap time · FOV · collision response · reticle bias

## Request prompt

In your game, add an over-the-shoulder camera 3.2 m behind, 1.6 m high, and 0.55 m to the character's right, with a 55° vertical FOV. Determine aim from a screen-centre ray; on shoulder swap, blend the offset from +0.55 m to −0.55 m over 0.2 s. Push the camera inward near walls without making the reticle jump off its hit point.

## Implementation hint

Offset the camera laterally from a character-relative pivot while aiming through a separate screen-centre ray. For accurate aiming, resolve the reticle's world hit first and aim the weapon toward that point, then handle near-wall collision independently.

## References

- [Unity Third Person Follow：Shoulder Offset](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineThirdPersonFollow.html)
