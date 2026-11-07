# CAM-04 · Camera damping／Follow smoothing／Camera lag

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

After the character stops, the camera continues easing into place. A change of direction no longer instantly reverses the entire background. (A general concept; parameter direction and numerical meaning can differ between engines.)

## Not to be confused with

This is not motion blur, nor necessarily input delay. Smooth-looking movement does not prove that lerp or a spring algorithm is being used.

## Use it for

Softens abrupt changes in speed and direction and gives movement a greater sense of weight. While airborne, hold camera Y unless the player leaves a band (~+1.5 m / −0.5 m); retarget Y to the new ground height on landing. Ordinary hops must not bob the camera. Landing dip (CAM-34) is a short impulse — keep it separate from this follow policy.

## Tunable parameters

position smooth time · rotation smooth time · max speed · damping model · per-axis damping · teleport threshold · vertical follow hysteresis band (+1.5 m / −0.5 m authoring) · airborne Y hold · landing retarget

## Request prompt

Add vertical follow hysteresis on top of smooth following: while airborne hold camera Y unless the player leaves a band (authoring start about +1.5 m / −0.5 m); retarget Y to the new ground height on landing. Ordinary hops must not bob the camera every jump. Landing camera dip (CAM-34) is a short impulse — keep it separate from this follow policy. Use 0.18 s horizontal and 0.28 s vertical smooth times.

## Implementation hint

Filter desired position/orientation with a critically damped spring. While airborne, hold camera Y unless the follow target leaves a vertical band (authoring start about +1.5 m / −0.5 m); on landing retarget Y to the new ground height. Jumping must not bob the camera every hop. Landing dip (CAM-34) is a separate short impulse — do not fold it into this follow policy.

## Related

- [CAM-34](CAM-34.md) — Landing camera dip
- [CAM-05](CAM-05.md) — Platform-snapping
- [CAM-33](CAM-33.md) — Handheld idle camera / Camera breathing

## References

- [Unity Position Composer：Damping](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachinePositionComposer.html)
