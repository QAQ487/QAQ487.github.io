# CIN-12 · Credits roll

**Aliases:** End credits; Closing credits; Staff roll; Scrolling credits

**Group:** Cinematics & narrative
**Subcategory:** Chapters & introductions

## What you see

After the game is finished, the team’s roles and names scroll slowly up from the bottom of the screen, usually over ending music, sometimes beside story recap images, characters walking by, or a small playable scene; it ends with "THE END" or a thank-you.

## Not to be confused with

Not a title card (CIN-09, a short static title); credits are a long, continuous scroll. Not a cutscene (CIN-02), though the two are often chained.

## Use it for

Endings, acknowledgements, letting emotions settle; can be playable (shooting names, running across them).

## Tunable parameters

scroll speed px/s · group spacing · typography · fade masks · side images · speed-up / skip rules

## Request prompt

In your game, make an end credits roll: black background, roles in 10 px grey and names in 14 px white, centred, 24 px between groups, scrolling up at a constant 20 px/s; 20 px fade masks at top and bottom; a recap illustration on the right changes every 8 s with a 1 s crossfade; holding Confirm speeds up 3×; show "THE END" for 3 s when the list finishes.

## Implementation hint

Pre-layout all lines once into a list of (y, text, style); each frame draw only lines whose y − scroll is on screen; fade masks are gradient quads. Time-based scroll keeps it frame-rate independent.

## Related

- [CIN-09](CIN-09.md) — Title card
- [CIN-02](CIN-02.md) — Cutscene
- [TRN-03](TRN-03.md) — Crossfade

## References

- [Wikipedia — Closing credits](https://en.wikipedia.org/wiki/Closing_credits)
