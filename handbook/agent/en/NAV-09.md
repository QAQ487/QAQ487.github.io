# NAV-09 · Weak-point highlight

**Aliases:** 弱點高亮; 弱點標記; Critical spot marker; Weak point outline; 弱点ハイライト; Stagger finisher prompt; Finisher reticle; Deathblow marker; 處決提示點; 忍殺マーク; とどめマーカー; Stagger melee prompt; Limb-shot stagger; Weak-point sigil; Glowing sigil; 部位射擊硬直; 弱點印記; 部位撃ちの体術; 弱点の紋章

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

Crit or breakable parts (head, glowing core, crystal) get an outline, pulse or soft aim snap. Only currently hittable weak points light up; destroyed or closed parts lose the highlight. Stagger finisher prompt: when an enemy is knocked off-balance (stance broken), a red reticle or mark appears on the vulnerable point; when the player is within finisher range and facing the enemy, the mark tightens, brightens and chimes to say press now; it relaxes and fades if the enemy recovers or the player leaves range. Stagger melee prompt after a limb shot: shooting an enemy in the leg drops it to one knee and a head shot makes it reel clutching its face; a melee button prompt then floats over it, and walking up and pressing it plays a kick, or a throw from behind; the prompt disappears once the enemy steadies. Weak-point sigil on a giant creature: the weak point is marked by a glowing sigil that pulses slowly like breathing; it brightens when the climber reaches it, and a charged stab bursts it with a bright flash and spray while the creature thrashes; afterwards the sigil goes dark or moves elsewhere.

## Not to be confused with

Not generic interactable highlight (NAV-01) and not the poise bar (ACT-41 — the off-balance rule itself). This marks a body part to shoot or strike. The finisher prompt only says you can finish now, aim here; the finisher staging itself is CAM-36. Climbing onto a giant creature is ANI-23.

## Use it for

Boss part swaps, shooter headshot reads, puzzle enemies, the finisher moment after an enemy is staggered, shooter-melee hybrids, climbing a giant boss to stab its weak point.

## Tunable parameters

outline colour · pulse · max visible · shielded dashed style · fade on destroy · finisher mark: range & facing cone, tighten time 0.1–0.2 s, chime · stagger melee prompt: trigger (leg / head hit), range 1.5–2 m, front vs back move · giant sigil: pulse 1–1.5 s, brighten on contact, stab flash & spray (starting points)

## Request prompt

While aiming, show hittable weak-point locations; remove the cue when aim ends or the point is invalidated. Hit the highlighted part and a normal part with the same attack and verify the highlight matches real hit results. Add a stagger finisher prompt: when an enemy enters the staggered state, show a red mark on its weak point; when the player is within finisher range and facing it, tighten and brighten the mark within 0.1–0.2 s with a chime; fade it when the stagger ends or the player leaves. Stagger melee prompt: when a leg or head hit puts an enemy into a kneel or reel state, show a melee prompt over its head; pressing it within 1.5–2 m plays a kick, or a throw from behind; remove the prompt when the state ends. Giant weak-point sigil: pulse its glow on a 1–1.5 s cycle and brighten it while the climber is attached nearby; on a charged stab flash it white, spray particles and trigger the creature’s thrash, then turn the sigil off or move it.

## Implementation hint

Author weak-point sockets with flags hittable/shielded. Outline pass only for hittable. Optional magnet: if reticle within soft radius, bias aim slightly toward socket. Finisher prompt: on entering the staggered state, spawn a world-anchored mark at the finisher socket; each frame test distance and facing angle to the player and lerp the mark between loose (dim, large) and ready (tight, bright); play the chime on the ready transition; remove it when the stagger ends. Stagger melee prompt: limb hits push the enemy into kneel or reel states that spawn a world-anchored button prompt; pick the paired move from the player side (front or back). Giant sigil: an emissive decal on the creature mesh with a sine pulse; brighten while the climber is attached nearby; on a charged stab trigger a flash, particles and the creature shake animation, then disable or move the sigil.

## Related

- [NAV-01](NAV-01.md) — Interactable highlight
- [ACT-41](ACT-41.md) — Stance break / Poise break
- [FB-19](FB-19.md) — Reticle bloom and spread recovery
- [CAM-36](CAM-36.md) — Contextual finisher / Environmental takedown
- [FB-27](FB-27.md) — Part break / Component severing
- [ANI-23](ANI-23.md) — Creature climbing / Clinging to large enemies

## References

- [Wikipedia — Sekiro: Shadows Die Twice](https://en.wikipedia.org/wiki/Sekiro:_Shadows_Die_Twice)
- [Wikipedia — Resident Evil 4 (2023 video game)](https://en.wikipedia.org/wiki/Resident_Evil_4_(2023_video_game))
- [Wikipedia — Shadow of the Colossus](https://en.wikipedia.org/wiki/Shadow_of_the_Colossus)
