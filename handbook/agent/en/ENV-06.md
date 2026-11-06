# ENV-06 · Lightning flash

**Aliases:** Thunder flash; Storm flash; Sky flash

**Group:** Environment, weather & time
**Subcategory:** Weather

## What you see

In a storm the whole image suddenly flashes white once or twice (sometimes with a jagged bolt), objects become high-contrast silhouettes for an instant, then darkness returns; thunder follows after a delay.

## Not to be confused with

Not an electric-arc VFX (VFX-10, combat electricity); this is an environmental lighting event. Not a fade to white (TRN-02).

## Use it for

Storm mood, horror jump scares, briefly lighting a dark map so players see enemies.

## Tunable parameters

interval range · flash count & intensity · silhouette mode · bolt chance · thunder delay

## Request prompt

Add lightning flashes to stormy nights in the game: randomly every 6–14 s, brighten additively twice (0.05 s each, 0.08 s apart, the second weaker), drawing objects as dark silhouettes during the flash; occasionally draw a 3-segment jagged bolt in the far sky; thunder follows 0.5–2 s later.

## Implementation hint

Fullscreen additive quad for the flash; silhouette mode = draw sprites with a solid dark colour override (same uniform as FB-01). Bolt: a line-strip mesh from a midpoint-displacement generator.

## Related

- [VFX-10](VFX-10.md) — Lightning
- [ENV-04](ENV-04.md) — Rain
- [TRN-02](TRN-02.md) — Fade to white

## References

- [Envato Tuts+ — How to generate shockingly good 2D lightning effects](https://gamedevelopment.tutsplus.com/how-to-generate-shockingly-good-2d-lightning-effects--gamedev-2681t)
- [Wikipedia — Lichtenberg figure](https://en.wikipedia.org/wiki/Lichtenberg_figure)
