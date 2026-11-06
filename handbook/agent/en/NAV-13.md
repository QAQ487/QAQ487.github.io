# NAV-13 · Visibility / light meter

**Aliases:** 可見度計; 光線暴露; Hidden in shadow; Light exposure meter; 視認度メーター

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

A HUD or near-character cue shows how exposed you are: low in shadow, high in lamps or with a torch. The value feeds NAV-10 detection speed.

## Not to be confused with

Separate from detection: visibility is how obvious you are; detection is how alert that enemy is. Smaller projects may feed visibility straight into detection.

## Use it for

Light-dark stealth, lamp-off routes, day/night stealth shifts.

## Tunable parameters

ambient base · spotlight add · crouch/shadow scales · HUD shape · link to NAV-10 (starting points)

## Request prompt

Compute visibility 0–1: base = ambient; spotlight cone +0.4; crouch ×0.6; deep shadow ×0.35 (starting values). Show a small eye/diamond HUD; multiply into NAV-10’s per-second gain.

## Implementation hint

visibility = f(lightProbe, stance, cover); detectionRate *= visibility. Keep a debug overlay of probe values.

## Related

- [NAV-10](NAV-10.md) — Detection meter (stealth)
- [NAV-11](NAV-11.md) — Last known position silhouette
- [LGT-01](LGT-01.md) — Directional, point and spot lights

## References

- [Wikipedia — Stealth game](https://en.wikipedia.org/wiki/Stealth_game)
