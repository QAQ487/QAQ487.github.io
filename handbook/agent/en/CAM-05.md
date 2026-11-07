# CAM-05 · Platform-snapping

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

Camera height stays roughly constant during an ordinary jump. Only after the character lands on a new platform does the camera realign to their height; that realignment can be gentle. (A Keren category.)

## Not to be confused with

This is not vertical following every frame; “snapping” in this name does not guarantee an instantaneous change. A flying character has no landing event, so this rule cannot simply be transferred unchanged.

## Use it for

Preserves a stable reference during jumps and reduces repeated up-and-down camera movement. Lock the vertical reference during normal jumps; only leave the ~+1.5 m / −0.5 m band or a grounded confirm should ease to the new platform. Cross-link CAM-34 for the short land impulse.

## Tunable parameters

landing height threshold · grounded confirmation · realign delay · vertical smooth time · jump lock · drop-through rule · airborne Y hold band (+1.5 m / −0.5 m) · platform-hold Y

## Request prompt

Realign on landing with an airborne Y-hold band: lock vertical reference during normal jumps; only leave the ~+1.5 m / −0.5 m band or a 0.08 s grounded confirm should ease to the new platform over 0.3 s. Do not bob every hop. Cross-link CAM-34 for the short land impulse.

## Implementation hint

Hold the camera vertical reference while airborne unless the character leaves an authored band (about +1.5 m / −0.5 m). Update the reference from the confirmed landing surface and smooth toward the new platform height. Ignore brief one-way contacts. Pair with CAM-34 landing dip as impulse, not as continuous Y follow.

## Related

- [CAM-34](CAM-34.md) — Landing camera dip
- [CAM-04](CAM-04.md) — Camera damping／Follow smoothing／Camera lag

## References

- [Keren：Snapping，Super Mario World／Rayman](https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/)
