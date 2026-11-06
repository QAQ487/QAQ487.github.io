# CIN-13 · Environmental storytelling

**Aliases:** Set-dressing narrative; Visual storytelling; Embedded narrative

**Group:** Cinematics & narrative
**Subcategory:** Narrative techniques

## What you see

Instead of dialogue or cutscenes, the arrangement of the scene lets players infer what happened: overturned furniture, drag marks, a dead campfire, scattered letters, a broken wall; at most a faint highlight or "inspect" hint appears when the player gets close.

## Not to be confused with

Not a cutscene (CIN-02, which shows the player explicitly); environmental storytelling lets players discover and interpret. Not corruption spread (ENV-16, a live change of world state), though the two can combine.

## Use it for

Adding lore, building mystery, rewarding exploration, giving backstory without interrupting play.

## Tunable parameters

prop set · readability at play scale · highlight radius · highlight style · optional inspect text

## Request prompt

In your game, tell "the camp was attacked" through the environment: place an overturned pot, a dead campfire still trailing thin smoke, drag marks leading into the forest, and a letter on the ground; add no dialogue — only when the player is within 24 px give inspectable props a 1 px white outline that pulses every 1.2 s, and show 2 lines of text when the letter is inspected.

## Implementation hint

Content technique more than code: needs decal/prop placement, plus a proximity query that toggles an outline shader (or outline sprite) on inspectable props.

## Related

- [CIN-02](CIN-02.md) — Cutscene
- [ENV-16](ENV-16.md) — Corruption spread
- [ENV-10](ENV-10.md) — Footprints
- [PIX-13](PIX-13.md) — Silhouette readability

## References

- [GDC Vault — What Happened Here? Environmental Storytelling (Smith & Worch, 2010)](https://www.gdcvault.com/play/1012647/What-Happened-Here-Environmental)
- [Wikipedia — Glossary of video game terms ("Environmental storytelling")](https://en.wikipedia.org/wiki/Glossary_of_video_game_terms#Environmental_storytelling)
