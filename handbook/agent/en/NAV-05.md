# NAV-05 · Placement ghost

**Aliases:** Build placement preview; Ghost building; Valid / invalid placement tint

**Group:** Visual guidance & wayfinding
**Subcategory:** Placement & range

## What you see

After choosing something to build, a translucent ghost follows the cursor and snaps to the grid — or to a joinable surface/seam; it tints green when placement or joining is legal, red on conflicts, and join previews often highlight the alignment axis or seam before confirm turns it solid.

## Not to be confused with

Not a range indicator (NAV-06, shows attack or effect radius); both can appear during placement, but the ghost answers “is this footprint legal”. Not an interactable highlight (NAV-01, for objects that already exist).

## Use it for

City builders, tower defense, survival base building, farm decoration, level editors, joinable physics-assembly previews.

## Tunable parameters

grid size & snapping · ghost alpha · valid / invalid colours · per-cell conflict marks · reason text · rotate key · confirm animation

## Request prompt

Add a placement preview to the game: after a building is selected, draw it at 50% opacity at the cursor, snapped to a 12 px grid; tint each footprint cell rgba(80,220,120,0.35) if buildable, otherwise rgba(230,60,60,0.45) with a red X; placement is refused if any cell is red, and a reason (e.g. “Blocked”) appears next to the cursor. On confirm, play a 0.2 s scale pop and dust particles.

## Implementation hint

Ghost = the same sprite drawn with alpha and a tint uniform (or a colour-multiply material). Check the footprint cells on the CPU against an occupancy grid whenever the snapped cell changes, and draw one quad per cell for valid / invalid. The preview must call the same validation function as real placement, so it can never lie.

## Related

- [NAV-06](NAV-06.md) — Range indicator
- [NAV-01](NAV-01.md) — Interactable highlight
- [PIX-17](PIX-17.md) — Autotiling
- [UX-04](UX-04.md) — Objective marker / Waypoint；Objective tracker
- [UI-08](UI-08.md) — Minimap
- [UI-22](UI-22.md) — Spatial inventory / grid inventory

## References

- [RoClicks — Building UX: placing, picking and selecting (placement ghost)](https://roclicks.gg/resources/building/building-ux)
- [Wikipedia — The Legend of Zelda: Tears of the Kingdom](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Tears_of_the_Kingdom)
