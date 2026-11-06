# CAMX-06 · Flip-screen

**Aliases:** Screen-by-screen scrolling; Room-by-room camera; Flick-screen

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

The world is cut into rooms exactly one screen in size and the camera never moves inside a room; the instant the character walks off an edge, the view is replaced by the next room with no scrolling at all.

## Not to be confused with

Not a room transition scroll (TRN-16 Room transition scroll, which slides over in about 0.5 s); flip-screen is instantaneous. Not a general camera cut (CAM-31 Camera cut, used between cinematic shots).

## Use it for

Retro styles, puzzle or exploration games built from single-screen rooms, cheap map construction.

## Tunable parameters

room size · trigger point (centre vs edge) · inward nudge · optional flash · entity freeze/reset per room

## Request prompt

In your game, use a flip-screen camera: each room is 320×180 px and the camera snaps to the room grid; when the character’s centre crosses a room boundary, jump the camera to the neighbouring room on the same frame, keep the character’s position and nudge it 4 px inward to avoid ping-ponging; optionally a 1-frame white flash.

## Implementation hint

Camera position = floor(player / roomSize) × roomSize, updated only on boundary crossing. Pause or despawn entities outside the current room; respawn room contents on entry if the design calls for it.

## Related

- [TRN-16](TRN-16.md) — Room transition scroll
- [CAMX-05](CAMX-05.md) — Auto-scrolling
- [CAM-31](CAM-31.md) — Camera cut／Hard cut
- [CAM-07](CAM-07.md) — Region-based-anchors

## References

- [Wikipedia — Glossary of video game terms: Flip-screen](https://en.wikipedia.org/wiki/Flip-screen)
- [Wikipedia — Scrolling (auto-scrolling, flip-screen)](https://en.wikipedia.org/wiki/Scrolling)
