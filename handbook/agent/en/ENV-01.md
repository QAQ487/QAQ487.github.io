# ENV-01 · Day-night cycle

**Aliases:** Time-of-day cycle; Diurnal cycle; Dynamic time of day

**Group:** Environment, weather & time
**Subcategory:** Time & sky

## What you see

As in-game time advances, the whole image’s tint, brightness and sky pass through dawn, noon, dusk and night; at night windows and torches light up, and shadow direction or length may change.

## Not to be confused with

Not a fade to black (TRN-01); a day-night cycle is a continuous, playable change of state. Not a sky gradient alone (ENV-02).

## Use it for

A sense of time, schedule-based play (enemies come out at night), mood shifts.

## Tunable parameters

day length · key colours & times · light intensity curve · shadow length · ambient vs light balance

## Request prompt

Add a day-night cycle to the game: one day = 8 min; multiply-tint the whole scene by interpolating 4 key colours (dawn #ffd9b0, noon #ffffff, dusk #ff9a6a, night #3a4a8a); at night windows and torches glow with additive warm light whose intensity rises as it gets darker.

## Implementation hint

Global ambient colour in a constant buffer, applied as multiply in the sprite pixel shader (or a fullscreen multiply pass). Lights accumulate additively into a light render target, composited as rgb*ambient + light. Interpolate key colours on the CPU.

## Related

- [ENV-02](ENV-02.md) — Sky gradient
- [TRN-03](TRN-03.md) — Crossfade
- [PIX-21](PIX-21.md) — Normal-mapped sprites
- [REN-32](REN-32.md) — Color grading/LUT/White balance

## References

- [Godot docs — 2D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html)
- [Wikipedia — Diurnal cycle (general background)](https://en.wikipedia.org/wiki/Diurnal_cycle)
