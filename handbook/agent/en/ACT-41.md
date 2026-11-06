# ACT-41 · Stance break / Poise break

**Aliases:** 架勢破壞; 韌性擊破; 姿勢崩壞; Poise break; Stance break; Posture break; Break meter; スタンスブレイク

**Group:** Combat feedback & game feel
**Subcategory:** Combat timing

## What you see

Enemies carry a stance/poise meter separate from HP. Heavy hits, strings or weak-point strikes fill (or drain) it; crossing the threshold triggers a short broken state — action interrupted, long punish window — even if HP barely moved.

## Not to be confused with

Not hitstun (ACT-22, brief lock from one hit) and not super armor (ACT-28, resist interrupt during an attack). Stance is a second accumulated resource that unlocks a long punish only when broken.

## Use it for

Soulslike bosses, fights built around break timing, combat that rewards weapon weight or attack-type swaps.

## Tunable parameters

poise max · gain per attack class · break duration · damage amp while broken · out-of-combat regen · UI second meter (starting points)

## Request prompt

Add a stance value separate from HP for chosen enemies. Heavy hits accumulate stance damage; only after the threshold does a short punishable break play, with a clear stumble and cue. It recovers if the window is missed; normal hits keep their usual rules. Accept: below threshold, just-crossing, and missing the punish. Cross-link ACT-22 hitstun and ACT-28 armor.

## Implementation hint

OnHit: poise = min(max, poise + amount(attackTags)); if poise>=max: EnterBreak(duration), clearArmor=true. While broken: accept punish freefire. Tick regen only when timeSinceHit > delay. Keep HP pipeline untouched.

## Related

- [ACT-22](ACT-22.md) — Hitstun / Hit Reaction Stun
- [ACT-28](ACT-28.md) — Super Armor / Armor / Hyper Armor
- [ACT-23](ACT-23.md) — Blockstun / Guard Stun
- [FB-01](FB-01.md) — Hit flash

## References

- [Fextralife — Elden Ring Poise](https://eldenring.wiki.fextralife.com/Poise)
- [Wikipedia — Elden Ring](https://en.wikipedia.org/wiki/Elden_Ring)
