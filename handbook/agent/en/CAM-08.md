# CAM-08 · Region-focus

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

As the character moves within a room, the camera shifts only slightly, remaining primarily focused on the room or arena center. (A Keren category.)

## Not to be confused with

This is not simply damping: even after a long wait, the camera may never center on the character. It also differs from entry 07’s change of settings on entering another region.

## Use it for

Preserves an overview of a puzzle or spatial orientation within an arena while still making the player’s movement feel consequential to the view.

## Tunable parameters

region weight · character weight · maximum offset · weight falloff · smoothing time · anchor radius

## Request prompt

In your game, blend region and character focus in the puzzle room: set the camera focus to 75% room centre and 25% character position, clamp the character-driven offset to 48 px, and smooth it over 0.25 s. Even after the character stops, do not eventually centre the view fully on them.

## Implementation hint

Compute a persistent weighted focus between the region anchor and the character rather than waiting for the camera to catch the character fully. Clamp the character-induced offset and smooth the resulting focus before applying camera bounds.

## References

- [Keren：Geometry Wars／Vessel 的 Region-focus](https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/)
