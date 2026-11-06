# CAM-05 · Platform-snapping

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

Camera height stays roughly constant during an ordinary jump. Only after the character lands on a new platform does the camera realign to their height; that realignment can be gentle. (A Keren category.)

## Not to be confused with

This is not vertical following every frame; “snapping” in this name does not guarantee an instantaneous change. A flying character has no landing event, so this rule cannot simply be transferred unchanged.

## Use it for

Preserves a stable reference during jumps and reduces repeated up-and-down camera movement.

## Tunable parameters

landing height threshold · grounded confirmation · realign delay · vertical smooth time · jump lock · drop-through rule

## Request prompt

In your game, realign camera height only on landing: lock the vertical camera reference during normal jumps. After the character has remained grounded for 0.08 s and the new platform differs by at least 24 px, ease to its height over 0.3 s; ignore brief contacts while dropping through one-way platforms.

## Implementation hint

Hold the camera's vertical reference while the character is airborne, then update the reference from the confirmed landing surface. Ignore brief ground contacts, and smooth toward the new platform height unless the height change exceeds a deliberate snap threshold.

## References

- [Keren：Snapping，Super Mario World／Rayman](https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/)
