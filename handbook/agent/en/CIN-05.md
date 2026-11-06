# CIN-05 · Dialogue portrait

**Aliases:** Talking head; Character portrait; Face graphic; Bust portrait

**Group:** Cinematics & narrative
**Subcategory:** Characters & dialogue

## What you see

A large face or bust portrait of the speaker sits beside the dialogue box; its expression changes with the line (happy, angry, surprised), the mouth flaps or the portrait bobs while talking, and the portrait swaps or dims when someone else speaks.

## Not to be confused with

Not a speech bubble (CIN-06, text attached to the character in the scene); the portrait is fixed in the UI. Not an emote balloon (CIN-07, a symbol with no line of text).

## Use it for

When characters are too small on screen to read faces, key story dialogue, visual-novel-style scenes.

## Tunable parameters

portrait size · expression set · mouth-flap interval · speaker dimming · enter/exit slide · text speed

## Request prompt

In your game, add portraits to the dialogue box: a 96×96 px portrait left of the box, at least 4 expressions per character (neutral, smile, angry, surprised) switched by tags in the script; while text types out, toggle mouth open/closed every 0.12 s, bob the portrait 3 px on an expression change, and dim the non-speaking portrait by 40%.

## Implementation hint

UI layer: portrait atlas indexed by (character, expression, mouth frame); dialogue script lines carry speaker and expression tags; the typewriter drives the mouth frame while characters are being revealed.

## Related

- [CIN-06](CIN-06.md) — Speech bubble
- [CIN-07](CIN-07.md) — Emote balloon
- [CIN-02](CIN-02.md) — Cutscene
- [CIN-08](CIN-08.md) — Barks

## References

- [RPG Maker MV help — Messages (Show Text with a face image)](https://rpgmakerofficial.com/product/MV_Help/page/01_10_01.html)
- [Voodoo Detective devblog — Talking heads](https://voodoodetective.com/blog/talking-heads)
- [Yarn Spinner docs — Snaaake talking-head presenter](https://www.yarnspinner.dev/docs/godot/gdscript/08-yarn-spinner-plus-and-add-ons/02-snaaake/)
