# NAV-12 · Noise investigation

**Aliases:** 噪音調查; 聲東擊西; Sound bait; Noise distraction; 音の調査

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

Loud actions (thrown bottle, gunshot, heavy footsteps) make nearby enemies turn or walk to the sound point, look briefly, then resume patrol — unless they spot the player on the way.

## Not to be confused with

Not the detection fill itself (NAV-10). Investigation is a short AI trip to a sound point. Not sound visualization captions (FX-36).

## Use it for

Stealth distraction, pulling guards, opening a path.

## Tunable parameters

radius per noise class · priority · investigate duration · max responders (starting points)

## Request prompt

Noise events carry radius and priority: bottle ~8 m, gunshot ~20 m (starting values). Enemies enter Investigate, path to the source, search 1.5–2.5 s. Pursue only the highest-priority sound. Keep separate from NAV-10: spotting the player mid-investigate starts the meter.

## Implementation hint

EmitNoise(pos,radius,priority). Nearby AI compare priority, path to pos, Play(Search). OnSeePlayer: transfer to detection (NAV-10).

## Related

- [NAV-10](NAV-10.md) — Detection meter (stealth)
- [NAV-11](NAV-11.md) — Last known position silhouette
- [FX-36](FX-36.md) — Visualized Sound Cues / Sound Indicators

## References

- [Wikipedia — Stealth game](https://en.wikipedia.org/wiki/Stealth_game)
