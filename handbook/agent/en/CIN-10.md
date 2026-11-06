# CIN-10 · Boss intro card

**Aliases:** Boss name card; Boss title card; Name plate; Boss subtitles

**Group:** Cinematics & narrative
**Subcategory:** Chapters & introductions

## What you see

As the boss enters, the camera frames it and its name and epithet appear in large type (e.g. "Magma Colossus — Ancient Gatekeeper"), often sliding in over a slanted stripe or slamming in with a scale punch; after 1.5–3 s the fight starts and the boss health bar appears.

## Not to be confused with

Not a title card (CIN-09, which introduces a place or chapter); the name card introduces a character, usually with a camera takeover (CIN-03). Not a wave announcement (CIN-11, announcing a group of enemies).

## Use it for

Boss fight openings, a major character’s first appearance, giving an opponent weight and memorability.

## Tunable parameters

camera move · band shape/colour · name slide & overshoot · epithet · hold time · health-bar fill · skip on retry

## Request prompt

In your game, add a boss intro card: move the camera to the boss over 0.6 s and push in 10%, sweep a 30 px tall slanted crimson band in from left to right over 0.25 s, slide the boss name (24 px, white with black outline) in from the right with a slight overshoot and its epithet in 10 px below; hold 1.8 s, then exit band and text to the left, return the camera to the player and fill the boss health bar from empty over 0.5 s.

## Implementation hint

Combine a scripted camera (CIN-03) with a UI timeline: band quad with animated clip rect, text with eased x offset, then a health-bar fill tween. Make the intro shorter or skippable after the first attempt.

## Related

- [CIN-03](CIN-03.md) — Scripted camera
- [CIN-09](CIN-09.md) — Title card
- [CIN-11](CIN-11.md) — Wave announcement banner
- [CIN-01](CIN-01.md) — Letterbox

## References

- [Wikipedia — Boss (video games)](https://en.wikipedia.org/wiki/Boss_(video_games))
- [Interface In Game — NieR:Automata UI captures (incl. "Boss Intro")](https://interfaceingame.com/games/nierautomata/)
- [Epic Boss System docs — boss intro styles (NamePlate / CameraFocus / Cutscene)](https://adrenalinegames.pl/epicbosssystem)
