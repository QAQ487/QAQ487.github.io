# LGT-04 · Flickering light

**Aliases:** Light flicker; Torch flicker; Candle flicker; Light styles; Animated light

**Group:** Lighting & shadows
**Subcategory:** Light sources

## What you see

Torches, candles and broken fluorescent tubes keep changing brightness irregularly: firelight dips and rises softly with the occasional small jump, the pool radius and light position wobble slightly; a broken tube cuts out and comes back abruptly.

## Not to be confused with

Not a lightning flash (ENV-06, a one-off strong flash over the whole screen) and not attenuation (LGT-02, a static distribution). Flicker is a light animation over time, and is usually not fully random each frame (which reads as a glitch) but smooth or rhythmic.

## Use it for

Torches, campfires, candles, lanterns, broken lamps, horror moods; makes static scenes feel alive.

## Tunable parameters

base intensity · amplitude · noise frequency & octaves · radius wobble · position jitter · per-light phase offset · pattern string & step rate

## Request prompt

Add flicker to the game's torches: brightness = 0.85 + 0.15 × fractal noise(time × 8) (two octaves, second at ×2.3 frequency and ×0.5 amplitude); vary the pool radius by ±6% in sync and jitter the light position within ±1 px; give every torch its own noise offset so they never pulse together. Add a "broken lamp" mode that steps brightness every 0.1 s from a pattern string (e.g. "mmamammmmammamamaaamammma", a = off, m = normal).

## Implementation hint

Animate light parameters on the CPU each frame (intensity, radius, small position offset) from 1D value/Perlin noise of time plus a per-light seed, then upload to the light buffer. Pattern mode: index = floor(time × 10) mod len; brightness = (char − 'a') / ('m' − 'a').

## Related

- [LGT-02](LGT-02.md) — Light attenuation
- [ENV-06](ENV-06.md) — Lightning flash
- [VFX-12](VFX-12.md) — Fire and smoke
- [LGT-01](LGT-01.md) — Directional, point and spot lights
- [LGT-14](LGT-14.md) — Moving light pool from a swinging fixture

## References

- [Quake Wiki — lightstyle](https://quakewiki.org/wiki/lightstyle)
- [Alan Zucconi — The secret behind Valve's flickering lights](https://www.alanzucconi.com/2021/06/15/valve-flickering-lights/)
- [id Software — Quake source, world.qc (light style tables)](https://github.com/id-Software/Quake/blob/master/qw-qc/world.qc)
