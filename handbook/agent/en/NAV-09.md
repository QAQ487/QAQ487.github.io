# NAV-09 · Weak-point highlight

**Aliases:** 弱點高亮; 弱點標記; Critical spot marker; Weak point outline; 弱点ハイライト; Stagger finisher prompt; Finisher reticle; Deathblow marker; 處決提示點; 忍殺マーク; とどめマーカー

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

Crit or breakable parts (head, glowing core, crystal) get an outline, pulse or soft aim snap. Only currently hittable weak points light up; destroyed or closed parts lose the highlight. Stagger finisher prompt: when an enemy is knocked off-balance (stance broken), a red reticle or mark appears on the vulnerable point; when the player is within finisher range and facing the enemy, the mark tightens, brightens and chimes to say press now; it relaxes and fades if the enemy recovers or the player leaves range.

## Not to be confused with

Not generic interactable highlight (NAV-01) and not the poise bar (ACT-41 — the off-balance rule itself). This marks a body part to shoot or strike. The finisher prompt only says you can finish now, aim here; the finisher staging itself is CAM-36.

## Use it for

Boss part swaps, shooter headshot reads, puzzle enemies, the finisher moment after an enemy is staggered.

## Tunable parameters

outline colour · pulse · max visible · shielded dashed style · fade on destroy · finisher mark: range & facing cone, tighten time 0.1–0.2 s, chime (starting points)

## Request prompt

While aiming, show hittable weak-point locations; remove the cue when aim ends or the point is invalidated. Hit the highlighted part and a normal part with the same attack and verify the highlight matches real hit results. Add a stagger finisher prompt: when an enemy enters the staggered state, show a red mark on its weak point; when the player is within finisher range and facing it, tighten and brighten the mark within 0.1–0.2 s with a chime; fade it when the stagger ends or the player leaves.

## Implementation hint

Author weak-point sockets with flags hittable/shielded. Outline pass only for hittable. Optional magnet: if reticle within soft radius, bias aim slightly toward socket. Finisher prompt: on entering the staggered state, spawn a world-anchored mark at the finisher socket; each frame test distance and facing angle to the player and lerp the mark between loose (dim, large) and ready (tight, bright); play the chime on the ready transition; remove it when the stagger ends.

## Related

- [NAV-01](NAV-01.md) — Interactable highlight
- [ACT-41](ACT-41.md) — Stance break / Poise break
- [FB-19](FB-19.md) — Reticle bloom and spread recovery
- [CAM-36](CAM-36.md) — Contextual finisher / Environmental takedown
- [FB-27](FB-27.md) — Part break / Component severing

## References

- [Wikipedia — Sekiro: Shadows Die Twice](https://en.wikipedia.org/wiki/Sekiro:_Shadows_Die_Twice)
