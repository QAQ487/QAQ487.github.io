# CAM-31 · Camera cut／Hard cut

**Group:** Camera & composition
**Subcategory:** Feedback and Transitions

## What you see

One frame is behind the protagonist; the next faces the boss, with no flight between positions. (General; Cinemachine represents Cut as a zero-duration blend.)

## Not to be confused with

This is not a dropped frame or fade to black. Whether the audience can still orient themselves after the cut is a separate spatial-continuity issue.

## Use it for

Changes viewpoint quickly, skips meaningless travel, and controls narrative rhythm.

## Tunable parameters

cut trigger · source/destination state · one-frame switch · input continuity · audio continuity · post-cut hold · orientation check

## Request prompt

In your game, add a hard cut for the boss entrance: one frame is the camera behind the character and the next is a frontal close view of the boss, with no interpolation or fade. Hold for 0.9 s, then cut back; keep the shot directions within 150° and update visibility and the audio listener on the same frame.

## Implementation hint

Replace the active camera state between rendered frames without interpolating position, rotation, or lens values. Update dependent visibility and audio-listener state atomically, and preserve or deliberately remap player input so the cut does not masquerade as a control reversal.

## References

- [Unity Blender Settings：Cut](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineBlending.html)
- [Wikipedia — Shot (filmmaking)：Shot sequencing 與空間連續性](https://en.wikipedia.org/wiki/Shot_(filmmaking))
