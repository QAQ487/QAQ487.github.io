# CIN-09 · Title card

**Aliases:** Chapter card; Chapter title; Intertitle; Area name card

**Group:** Cinematics & narrative
**Subcategory:** Chapters & introductions

## What you see

On entering a new chapter, area or day, a large title appears centre (or lower) screen — e.g. "Chapter 2 — The Sunken City" or "DAY 3" — often with thin rules, a subtitle and fades, held for 2–3 s; the background may dim or go black.

## Not to be confused with

Not a boss intro name card (CIN-10, which introduces a character); a title card introduces a time or place. Not a loading screen (TRN-17, which hides loading and may show progress).

## Use it for

Chapter breaks, arriving in a new area, day counters or time skips, giving the pacing a breath.

## Tunable parameters

title/subtitle size · rule animation · background dim · hold time · fade · first-visit only

## Request prompt

In your game, show a title card when entering a new area: dim the background 50%, fade in a 28 px title in the centre (e.g. "Northern Woods") over 0.5 s, 0.3 s later expand two 1 px gold rules from the centre outward to 160 px, then fade in a 12 px subtitle; hold 2 s, fade everything out over 0.6 s; on later visits show only a small area name top-left.

## Implementation hint

UI sequence on a timer: dim quad → title text alpha → rule width → subtitle alpha → hold → fade. Store a "seen" flag per chapter/area to choose the full card or the small corner version.

## Related

- [CIN-10](CIN-10.md) — Boss intro card
- [CIN-12](CIN-12.md) — Credits roll
- [TRN-17](TRN-17.md) — Loading screen
- [TRN-01](TRN-01.md) — Fade to black

## References

- [Wikipedia — Title card](https://en.wikipedia.org/wiki/Title_card)
- [Wikipedia — Intertitle](https://en.wikipedia.org/wiki/Intertitle)
