# CIN-15 · Quick time event

**Aliases:** QTE; Button prompt sequence; Press X to …

**Group:** Cinematics & narrative
**Subcategory:** Narrative techniques

## What you see

In the middle of a scene a button icon suddenly appears (e.g. "A" or a mash prompt) with a shrinking ring or timer bar; the player must press the right input in time — success continues the scene (counter, dodge), failure plays a fail branch; time often slows down.

## Not to be confused with

Not an ordinary UI hint (that only explains a button); a QTE has a time limit and decides the outcome. Not slow motion (FB-10), although QTEs often use it.

## Use it for

Making cutscenes interactive, boss finishers, breaking free, chase scenes.

## Tunable parameters

time window · slow-down factor · ring/timer visual · perfect window · fail branch · mash vs hold option

## Request prompt

In your game, add a QTE: slow time to 0.3× during the scene, show a 24 px button icon in the centre with a white ring shrinking from 40 px to 24 px over 1.2 s; pressing while ring and icon overlap is "Perfect" (gold flash), pressing correctly in time is success, timing out or a wrong press turns the icon red with a shake and plays the fail branch; offer a hold-instead-of-mash accessibility option.

## Implementation hint

A timed prompt node in the cutscene timeline: it pauses or slows the timeline, reads input against a window, and jumps to the success or fail track. Show the correct glyph for the active input device.

## Related

- [CIN-02](CIN-02.md) — Cutscene
- [FB-10](FB-10.md) — Slow motion
- [FB-11](FB-11.md) — Freeze-frame finisher
- [CIN-01](CIN-01.md) — Letterbox
- [ACT-44](ACT-44.md) — Weapon clash / Hitbox clash
- [CAM-36](CAM-36.md) — Contextual finisher / Environmental takedown

## References

- [Wikipedia — Quick time event](https://en.wikipedia.org/wiki/Quick_time_event)
