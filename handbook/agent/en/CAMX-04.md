# CAMX-04 · Edge scrolling

**Aliases:** Edge pan; Screen-edge panning; Mouse edge scroll

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

When the mouse cursor enters a thin band at the edge of the screen, the camera pans in that direction; the closer to the edge the faster it moves, and it stops when the cursor leaves the band. The camera follows no character.

## Not to be confused with

Not a follow camera (CAM-01 / CAM-04, tracking a character); here the camera is driven only by the cursor. Not drag-panning (holding the mouse to drag the map) or minimap click-to-jump (UI-08).

## Use it for

Real-time strategy, city builders, tactics games — anything viewed from above over a large map.

## Tunable parameters

band width px · max pan speed · speed curve (constant/progressive) · diagonal · disable over UI · map bounds

## Request prompt

In your game, add edge scrolling: a 16 px trigger band on each screen edge; while the cursor is in a band, pan at 600 px/s × (how deep into the band), diagonals allowed; disable when the window loses focus or the cursor is over UI; clamp to the map bounds and offer an on/off option.

## Implementation hint

Each frame read the cursor in normalised viewport space; for each axis compute depth = clamp((band − distToEdge)/band); velocity = maxSpeed × depth × direction; integrate with frame dt; clamp camera to map bounds. Confine the cursor to the window in fullscreen.

## Related

- [CAM-09](CAM-09.md) — Camera bounds／Camera confinement
- [UI-08](UI-08.md) — Minimap
- [ENV-15](ENV-15.md) — Fog of war
- [CAMX-07](CAMX-07.md) — Top-down view

## References

- [GDevelop docs — Edge scroll camera extension](https://wiki.gdevelop.io/gdevelop5/extensions/edge-scroll-camera/)
- [Rambod Dev — UE5 RTS camera edge scrolling (tutorial)](https://rambod.net/tutorial/ue5-rts-camera-edge-scrolling)
- [Wikipedia — Real-time strategy](https://en.wikipedia.org/wiki/Real-time_strategy)
