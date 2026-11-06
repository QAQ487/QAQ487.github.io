# CIN-06 · Speech bubble

**Aliases:** Speech balloon; Dialogue balloon; Word balloon

**Group:** Cinematics & narrative
**Subcategory:** Characters & dialogue

## What you see

The line appears in a rounded box with a pointed tail above the character, the tail pointing at the speaker; the bubble moves with the character in the scene, text types out, then fades or waits for a button press.

## Not to be confused with

Not a dialogue portrait (CIN-05, text in a fixed UI box at the bottom); the bubble belongs to the scene and follows the character. Not an emote balloon (CIN-07, symbol only).

## Use it for

Several people talking at once, small talk, commentary that should not interrupt play, comic-style scenes.

## Tunable parameters

padding · max width · tail position · offset above head · screen clamping · type speed · pop-in scale

## Request prompt

In your game, show NPC lines as speech bubbles: white fill, 2 px dark outline, 6 px corner radius, 6 px padding, max width 160 px with word wrap; tail pointing at the speaker’s head, bubble floating 8 px above it and clamped inside the screen; type at 30 characters/s and pop in from 0.6× to 1× scale over 0.12 s.

## Implementation hint

World-anchored UI: project the speaker’s head position to screen each frame, build a 9-slice box sized from the wrapped text, attach a tail sprite pointing toward the anchor, and clamp the box to the safe area.

## Related

- [CIN-05](CIN-05.md) — Dialogue portrait
- [CIN-07](CIN-07.md) — Emote balloon
- [CIN-08](CIN-08.md) — Barks

## References

- [Wikipedia — Speech balloon](https://en.wikipedia.org/wiki/Speech_balloon)
