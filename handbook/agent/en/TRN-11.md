# TRN-11 · Battle transition

**Aliases:** Encounter transition; Battle swirl; Encounter wipe

**Group:** Transitions
**Subcategory:** Pixel & stylised

## What you see

On an encounter the map flashes a few times, then is quickly swallowed by a swirl, shards, spiral stripes or a black pattern before the battle screen appears.

## Not to be confused with

Not a general scene transition; it is the RPG-specific signal of "entering a different mode of play", usually faster and more aggressive, often built with a luma wipe (TRN-06).

## Use it for

Turn-based or separate-battle-screen games: encounters, boss fights.

## Tunable parameters

pre-flash count · pattern mask (swirl/spiral/shards) · rotation speed · duration · audio sting sync

## Request prompt

If your game gets an "encounter → battle scene" flow, add a battle transition: invert-flash the screen twice (0.06 s each), then spin into black with a spiral luma mask over 0.7 s, then fade into the battle scene.

## Implementation hint

Use the TRN-06 luma-wipe shader with a spiral mask (mask = frac(atan2/τ + r*twist)) or a polar-coordinate distortion of A before the cut. Flashes: invert pass (1 - rgb) for N frames.

## Related

- [TRN-06](TRN-06.md) — Luma wipe
- [TRN-12](TRN-12.md) — Shatter transition
- [TRN-02](TRN-02.md) — Fade to white

## References

- [Dan Game Dev — Shaders Case Study: Pokémon Battle Transitions (YouTube)](https://www.youtube.com/watch?v=LnAoD7hgDxw)
- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
