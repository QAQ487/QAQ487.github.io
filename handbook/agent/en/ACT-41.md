# ACT-41 · Stance break / Poise break

**Aliases:** 架勢破壞; 韌性擊破; 姿勢崩壞; Poise break; Stance break; Posture break; Break meter; スタンスブレイク; Impact gauge; Stagger gauge; ACS overload; Direct hit window; 衝擊計量; 直擊破防; スタッガー; 衝撃ゲージ; Segmented posture; Balance pips; Pip-based stance; Posture pips; 分格式架勢; 架勢格; 分割式スタンス; バランスの菱形

**Group:** Combat feedback & game feel
**Subcategory:** Combat timing

## What you see

Enemies carry a stance/poise meter separate from HP. Heavy hits, strings or weak-point strikes fill (or drain) it; crossing the threshold triggers a short broken state — action interrupted, long punish window — even if HP barely moved. Impact gauge presentation: the stance bar on the enemy jumps up a notch on every heavy hit, keeps climbing under sustained hits and only drains after a short pause; near full it brightens and starts to blink. The moment it fills, the bar turns red, the enemy shudders and locks up, and a brief impact flash and cue play; during this broken window hits land with a bigger, brighter direct-hit effect that says this is the moment to strike; when the window ends the bar resets to zero and the enemy recovers. Segmented posture: instead of a continuous bar, a row of small diamonds or dots sits under the enemy’s health bar; every perfect parry shatters one of them with a little spray of sparks and leaves the slot dark. When the last one breaks the enemy loses balance and sags, and a finisher prompt appears; once the break and finisher are over, all the slots refill at once. Counting the remaining pips tells the player how many more parries are needed.

## Not to be confused with

Not hitstun (ACT-22, brief lock from one hit) and not super armor (ACT-28, resist interrupt during an attack). Stance is a second accumulated resource that unlocks a long punish only when broken. Not a part break (FB-27, severing one body part); the finisher prompt after a break is NAV-09. Segmented posture follows the same rule as a continuous bar; it just shows what is left as pips you can count.

## Use it for

Soulslike bosses, fights built around break timing, combat that rewards weapon weight or attack-type swaps, mech or vehicle duels where sustained fire pins the opponent, parry-centred combat where each pip stands for one parry.

## Tunable parameters

poise max · gain per attack class · break duration · damage amp while broken · out-of-combat regen · UI second meter · impact gauge look: per-hit jump, decay delay 1–2 s, blink above 80 %, break flash & cue, direct-hit effect while broken · segmented variant: pip count per enemy, one pip per perfect parry, pip-break effect, refill all when the break ends (starting points)

## Request prompt

Add a stance value separate from HP for chosen enemies. Heavy hits accumulate stance damage; only after the threshold does a short punishable break play, with a clear stumble and cue. It recovers if the window is missed; normal hits keep their usual rules. Accept: below threshold, just-crossing, and missing the punish. Cross-link ACT-22 hitstun and ACT-28 armor. Optional impact gauge presentation: each hit makes the stance bar jump; it starts draining only 1–2 s after attacks stop; it blinks above 80%; at full it turns red, the enemy staggers with an impact flash and cue; hits during the break use an enlarged, brighter direct-hit effect; the bar resets to zero when the break ends. Or use segmented posture: show a row of pips under the enemy’s health bar, with the count set by how tough the enemy is; each perfect parry shatters one pip with a small effect; when the last pip breaks, enter the break and show the finisher prompt; refill every pip once the break or finisher ends. Accept: the number of perfect parries matches the number of dark pips, and ordinary blocks never break a pip.

## Implementation hint

OnHit: poise = min(max, poise + amount(attackTags)); if poise>=max: EnterBreak(duration), clearArmor=true. While broken: accept punish freefire. Tick regen only when timeSinceHit > delay. Keep HP pipeline untouched. Presentation: animate the meter with a fast jump per hit and a delayed drain; blink near full; on break swap to the broken colour, play the stagger pose, flash and audio cue; while broken route hits to an enlarged direct-hit impact effect. Segmented variant: keep an integer pip count instead of a float; each qualifying perfect parry decrements it and plays a break effect on that slot; at zero enter the break; refill all pips when the break or finisher ends.

## Related

- [ACT-22](ACT-22.md) — Hitstun / Hit Reaction Stun
- [ACT-28](ACT-28.md) — Super Armor / Armor / Hyper Armor
- [ACT-23](ACT-23.md) — Blockstun / Guard Stun
- [FB-01](FB-01.md) — Hit flash
- [FB-27](FB-27.md) — Part break / Component severing
- [NAV-09](NAV-09.md) — Weak-point highlight

## References

- [Fextralife — Elden Ring Poise](https://eldenring.wiki.fextralife.com/Poise)
- [Wikipedia — Elden Ring](https://en.wikipedia.org/wiki/Elden_Ring)
- [ARMORED CORE VI official site — game system tips (ACS overload / stagger)](https://www.armoredcore.net/article/230911_1.html)
- [Epicdope — How to perform Retribution in Stellar Blade (yellow diamond Balance bar drained by parries)](https://www.epicdope.com/how-to-perform-retribution-in-stellar-blade/)
- [Stellar Blade Wiki (Fextralife) — Combat (blue glow → Blink, purple glow → Repulse; enemy Shield; Balance and Groggy)](https://stellarblade.wiki.fextralife.com/Combat)
