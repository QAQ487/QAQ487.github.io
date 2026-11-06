# CIN-07 · Emote balloon

**Aliases:** Emotion bubble; Balloon icon; Emote icon; Reaction icon

**Group:** Cinematics & narrative
**Subcategory:** Characters & dialogue

## What you see

A small bubble briefly pops up above a character containing only a symbol: "!" (noticed), "?" (confused), a sweat drop, a heart, a music note, "…" or an anger mark; it pops, holds about a second, then disappears — no text needed.

## Not to be confused with

Not a speech bubble (CIN-06, which contains a line of dialogue) nor a dialogue portrait (CIN-05). Unlike damage numbers (FB-02), it expresses feeling, not a value.

## Use it for

An enemy spotting the player, NPC reactions, wordless emotion, small acting beats in story scenes.

## Tunable parameters

icon set · bubble size · offset · pop overshoot · hold time · fade · colour per meaning

## Request prompt

In your game, add emote balloons: a 16×16 px white bubble 4 px above the character’s head with a pixel symbol inside (! ? ♥ ♪ … sweat, anger); pop in from 0 to 1.2× and back to 1× over 0.1 s, hold 0.9 s, fade out over the last 0.15 s; when an enemy spots the player show a red "!" with one bounce.

## Implementation hint

Small world-anchored sprite (atlas of balloon frames) attached to the character’s head bone/anchor; a tiny state machine (pop → hold → fade) drives scale and alpha. Trigger from AI perception or the dialogue script.

## Related

- [CIN-06](CIN-06.md) — Speech bubble
- [CIN-05](CIN-05.md) — Dialogue portrait
- [CIN-08](CIN-08.md) — Barks
- [FB-02](FB-02.md) — Damage numbers

## References

- [RPG Maker MV help — Character commands (Show Balloon Icon)](https://rpgmakerofficial.com/product/MV_Help/page/01_10_07.html)
