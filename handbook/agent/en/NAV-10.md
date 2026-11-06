# NAV-10 · Detection meter (stealth)

**Aliases:** 偵測計; 警覺條; 發現計量; Alert meter; Detection eye; Suspicion meter; 検知メーター

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

An eye or bar on the enemy or HUD fills while they see the player, empties if the player hides, and triggers combat at full. Fill rate depends on distance, light and noise.

## Not to be confused with

Not a health bar and not the last-known-position silhouette (NAV-11). The meter answers how close you are to being spotted.

## Use it for

Stealth stages, assassin routes, vision-reading puzzles.

## Tunable parameters

fill/drain rates · distance falloff · light/noise weights · UI eye vs bar · combat threshold (starting points)

## Request prompt

Show a detection meter per alerting enemy: +35%/s in view, −25%/s when occluded (starting values); at 100% enter combat. Animate yellow→red with an eye icon so colour is not the only cue. Weight with NAV-13 light.

## Implementation hint

detection = integrate(visibility*light*noise*dt); clamp 0..1; on 1: Alert. Share visibility query with NAV-11/12/13.

## Related

- [NAV-11](NAV-11.md) — Last known position silhouette
- [NAV-12](NAV-12.md) — Noise investigation
- [NAV-13](NAV-13.md) — Visibility / light meter
- [UX-02](UX-02.md) — Resource meter / Status bar

## References

- [Wikipedia — Stealth game](https://en.wikipedia.org/wiki/Stealth_game)
