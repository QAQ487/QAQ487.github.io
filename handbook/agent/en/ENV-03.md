# ENV-03 · Seasonal change

**Aliases:** Seasons; Seasonal palette swap; Season cycle

**Group:** Environment, weather & time
**Subcategory:** World state

## What you see

The same map changes appearance with the seasons: spring flowers, deep summer green, orange-red autumn leaves falling, winter snow and bare branches — usually palette swaps plus a few extra props.

## Not to be confused with

Not weather (ENV-04/05, short-term and passing); seasons are long-cycle, whole-palette changes. Not corruption spread (ENV-16, local creep).

## Use it for

Farming/life sims, a sense of long-term time, regional variety.

## Tunable parameters

palette per season · prop swaps · particle set · transition style & length

## Request prompt

Add four seasons to the game: palette-swap grass and leaves (spring #7fcf5a, summer #4f9a3f, autumn #d98a3a, winter #e8eef2); add falling-leaf particles in autumn; in winter swap trees to bare versions and add snow strips on roofs; cross between seasons with a 2 s dither transition.

## Implementation hint

Palette-indexed sprites (PIX-06) with a season palette row selected by a constant; or a colour LUT texture lerped between seasons. Props swap via tile variants in the tilemap.

## Related

- [PIX-06](PIX-06.md) — Palette swap
- [ENV-05](ENV-05.md) — Snow
- [TRN-09](TRN-09.md) — Dither transition
