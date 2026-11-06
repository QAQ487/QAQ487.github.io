# TRN-16 · Room transition scroll

**Aliases:** Screen-transition scroll; Flip-screen scroll; Zelda-style scroll

**Group:** Transitions
**Subcategory:** Cuts & spatial transitions

## What you see

When the player reaches the screen edge the game pauses, the camera smoothly scrolls one screen to the adjacent room, carrying the character along, and control resumes.

## Not to be confused with

Not a push (TRN-08, two flat images); a room scroll moves the camera within one continuous world. Not a follow camera (which tracks the character continuously).

## Use it for

Room-based dungeons and top-down mazes, making each room a clear "screen".

## Tunable parameters

scroll duration · easing · player carry distance · freeze gameplay · spawn timing

## Request prompt

In dungeons, use a room-transition scroll: when the hero touches a room edge, freeze gameplay, scroll the camera one room width with a 0.5 s ease-in-out, moving the hero 16 px into the new room; spawn the new room’s enemies only after the scroll ends.

## Implementation hint

Camera tween between room rects; gameplay timeScale = 0 during the tween while rendering continues. Ensure both rooms’ tilemaps are resident (prefetch neighbours).

## Related

- [TRN-08](TRN-08.md) — Push transition
- [TRN-15](TRN-15.md) — Seamless transition
- [PIX-17](PIX-17.md) — Autotiling

## References

- [Wikipedia — Glossary of video game terms (glossary entry)](https://en.wikipedia.org/wiki/Glossary_of_video_game_terms)
- [Itay Keren — Scroll back: the theory and practice of cameras in side-scrollers](https://www.gamedeveloper.com/design/scroll-back-the-theory-and-practice-of-cameras-in-side-scrollers)
