# CIN-11 · Wave announcement banner

**Aliases:** Wave banner; Incoming wave text; Round announcement

**Group:** Cinematics & narrative
**Subcategory:** Chapters & introductions

## What you see

Just before a new wave of enemies, a horizontal banner crosses the centre of the screen with big text — "WAVE 3" or "Wave 3 incoming" — often with a countdown, blinking and warning colours; it slides in, holds, slides out, and enemies pour in from the edges.

## Not to be confused with

Not a boss intro card (CIN-10, introducing one character) nor a title card (CIN-09, introducing a place at a slower pace). The wave banner is a short, repeating gameplay-rhythm cue.

## Use it for

Tower defence, survival, brawler and arena modes; telling the player "break’s over, get ready".

## Tunable parameters

band height · slide time · text colour by wave type · countdown length · final-wave variant · spawn sync

## Request prompt

In your game, show a wave banner before each wave: a 28 px tall translucent black band slides from the left to the screen centre over 0.2 s with "WAVE 3" in 20 px gold, then a 3-2-1 countdown below, one per second, each scaling 1.3→1×; after the countdown slide the band out to the right over 0.2 s as enemies appear at the screen edges. Use a red "FINAL WAVE" for the last wave.

## Implementation hint

UI timeline driven by the wave spawner’s state machine (intermission → announce → spawn); the banner’s end event triggers spawning so text and enemies stay in sync.

## Related

- [CIN-10](CIN-10.md) — Boss intro card
- [CIN-09](CIN-09.md) — Title card
- [FB-18](FB-18.md) — Combo counter

## References

- [Wikipedia — Glossary of video game terms ("Wave")](https://en.wikipedia.org/wiki/Glossary_of_video_game_terms#Wave)
- [Wikipedia — Tower defense](https://en.wikipedia.org/wiki/Tower_defense)
