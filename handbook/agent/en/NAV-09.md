# NAV-09 · Weak-point highlight

**Aliases:** 弱點高亮; 弱點標記; Critical spot marker; Weak point outline; 弱点ハイライト

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

Crit or breakable parts (head, glowing core, crystal) get an outline, pulse or soft aim snap. Only currently hittable weak points light up; destroyed or closed parts lose the highlight.

## Not to be confused with

Not generic interactable highlight (NAV-01) and not the poise bar (ACT-41). This marks a body part to shoot or strike.

## Use it for

Boss part swaps, shooter headshot reads, puzzle enemies.

## Tunable parameters

outline colour · pulse · max visible · shielded dashed style · fade on destroy (starting points)

## Request prompt

While aiming, show hittable weak-point locations; remove the cue when aim ends or the point is invalidated. Hit the highlighted part and a normal part with the same attack and verify the highlight matches real hit results.

## Implementation hint

Author weak-point sockets with flags hittable/shielded. Outline pass only for hittable. Optional magnet: if reticle within soft radius, bias aim slightly toward socket.

## Related

- [NAV-01](NAV-01.md) — Interactable highlight
- [ACT-41](ACT-41.md) — Stance break / Poise break
- [FB-19](FB-19.md) — Reticle bloom and spread recovery
