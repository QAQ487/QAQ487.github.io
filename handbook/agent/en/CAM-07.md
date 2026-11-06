# CAM-07 · Region-based-anchors

**Group:** Camera & composition
**Subcategory:** 2D Following

## What you see

Entering a cave, room, or vast scene changes the rules for camera height, framing emphasis, or viewing distance. (A Keren category. Camera regions / camera zones are also useful search terms, but do not guarantee exactly the same mechanism.)

## Not to be confused with

Not every region must have a fixed camera, and the region system is not the transition itself. Regions select rules; transitions determine how to move between them.

## Use it for

Lets level design determine the information shown in each region instead of blindly following the character.

## Tunable parameters

region volume · composition anchor · camera height · zoom/distance · region priority · transition duration · overlap hysteresis

## Request prompt

In your game, add region-based composition anchors: in the cave, focus 32 px above the entrance with a 180 px orthographic visible height; in the boss room, focus on the room centre and widen to 260 px. Switch only after the character moves 24 px inside a region, give the boss room priority on overlap, and blend over 0.6 s.

## Implementation hint

Associate each level region with a camera-state preset containing its anchor, viewing distance, and framing rules. Resolve overlapping regions by explicit priority and hysteresis, then hand the selected state to a separate cut or blend system.

## References

- [Keren：Direction，Limbo／Vessel](https://web.archive.org/web/20261026201424/https://gamedesignskills.com/game-design/camera-design-2d-side-scroller-games/)
