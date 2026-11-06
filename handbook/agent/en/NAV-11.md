# NAV-11 · Last known position silhouette

**Aliases:** 最後已知位置; 記憶剪影; LKP ghost; Last-seen silhouette; 捜索シルエット

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

When line of sight breaks, a translucent silhouette or marker remains where the enemy last saw the player; they search there first, then widen. The ghost fades after a few seconds.

## Not to be confused with

Not the detection meter (NAV-10) and not a marker of the real player. The silhouette is the AI’s memory and can diverge from truth.

## Use it for

Re-hiding after a near spot; baiting enemies to a false position.

## Tunable parameters

silhouette lifetime · opacity · search radius after miss · fade style (starting points)

## Request prompt

On LOS loss spawn a 50% silhouette at LKP for 4–6 s; AI walks there and plays a search. If the player stays hidden until it fades, alert drops back to patrol.

## Implementation hint

OnLoseSight: lkp=playerPos; spawnGhost(lkp); setState(SearchLKP). OnArrive without reacquire: setState(ExpandSearch), destroyGhost after lifetime.

## Related

- [NAV-10](NAV-10.md) — Detection meter (stealth)
- [NAV-12](NAV-12.md) — Noise investigation
- [NAV-13](NAV-13.md) — Visibility / light meter

## References

- [Wikipedia — Stealth game](https://en.wikipedia.org/wiki/Stealth_game)
