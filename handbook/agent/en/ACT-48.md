# ACT-48 · Directional counter dodge / Warp-behind counter

**Aliases:** Directional counter dodge; Warp-behind counter; Blink counter; Teleport-behind counter; Step-in counter; Colour-keyed counter dodge; Push-off counter; 定向反擊閃避; 瞬移繞背反擊; 迎擊閃避; 後撤反推; 方向回避カウンター; 背後回りカウンター

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

As an enemy winds up a heavy attack, its body first lights up in a specific colour (for example blue); when the player is within counter range, the player's weapon glows the same colour. Before the attack lands, the player pushes the stick toward the enemy and presses dodge: instead of rolling aside, the character becomes an afterimage streak that passes through the enemy, appears behind it in an instant and turns automatically to face its back. The enemy's attack whiffs, its body lurches forward into a brief stagger with its back fully exposed, opening a back attack. The wrong direction, or pressing too early or too late, gives only a normal dodge or a clean hit on the player. Variant — push-off the other way: an attack in a second colour (for example purple) asks for the stick pulled back plus dodge; the character kicks the enemy off, springs back to open distance, the enemy stumbles, and ranged attacks are briefly boosted or the enemy's weak points are revealed.

## Not to be confused with

Not the perfect dodge window (ACT-43, which only defines which frames of a dodge count as perfect; dodge direction does not change the result). Not the unblockable signifier (FB-28, which only says this attack cannot be blocked); this card is the directional dodge that answers it. Not the teleport effect itself (VFX-15, only the vanish and appear flash) or attack magnetism (ACT-37, pulling the attacker toward the target). Not bob and weave (ACT-46, where the body stays in place).

## Use it for

Boss fights that colour-code the correct response, action games that turn dodging into offence, melee-and-ranged hybrids (warp in for melee, push off for shooting).

## Tunable parameters

counter colour per response (e.g. blue = toward, purple = away) · weapon glow when in range · input = stick direction relative to the enemy + dodge · window aligned to the wind-up · warp destination behind the target (≈ 1–2 body lengths) & clearance test · auto-face the back · whiff stagger length · back-attack window · away variant: push-off, back-step distance, ranged boost or weak-point reveal (authoring defaults)

## Request prompt

Add a directional counter dodge to heavy attacks. When an eligible attack winds up, light the enemy in its counter colour (for example blue); while the player is within counter range, light the player's weapon in the same colour. If the player pushes toward the enemy and presses dodge inside the window before the attack becomes active: play an afterimage warp through the enemy, place the character about one to two body lengths behind it and turn to face its back before landing; make the attack whiff into a forward lurch and short stagger during which back attacks land. A wrong direction, early or late press falls through to a normal dodge or a normal hit. Optional opposite variant: a second colour (for example purple) asks for pulling back plus dodge; the character kicks the enemy off and springs back, the enemy stumbles, then ranged attacks are briefly boosted or weak points are shown. Accept: answering the same attack with the right direction, the wrong direction and the wrong timing gives three clearly different results, and the warp never leaves the character inside a wall or the terrain.

## Implementation hint

Tag eligible attacks with a counter type and colour. While one winds up and the player is inside counter range, glow the enemy and the player's weapon in that colour. On dodge during the window, read the stick direction relative to the enemy. Toward on a toward-type attack: compute a destination behind the target along its facing, validate it with a capsule clearance test (fall back to a side position if blocked), hide the character for a few frames while drawing an afterimage streak from start to destination, snap facing to the target's back and push the enemy into a whiff-stagger state that accepts back attacks. Away on an away-type attack: play a push-off, give the enemy a small knockback and the player a back-step, then open a short ranged-boost or weak-point-reveal state. Any other combination falls through to the normal dodge and hit rules.

## Related

- [ACT-43](ACT-43.md) — Perfect dodge window
- [FB-28](FB-28.md) — Unblockable attack signifier
- [VFX-15](VFX-15.md) — Spawn / teleport effect
- [ACT-37](ACT-37.md) — Motion Warping / Root Motion Warping
- [ACT-46](ACT-46.md) — Bob and weave / Slip
- [FB-10](FB-10.md) — Slow motion
- [ACT-42](ACT-42.md) — Guard counter

## References

- [Stellar Blade Wiki (Fextralife) — Combat (blue glow → Blink, purple glow → Repulse; enemy Shield; Balance and Groggy)](https://stellarblade.wiki.fextralife.com/Combat)
- [Game8 — Stellar Blade: How to Blink (stick up + dodge on a blue light; teleport behind the enemy)](https://game8.co/games/Stellar-Blade/archives/451463)
- [Game8 — Stellar Blade: How to Repulse (stick down + dodge on a purple light)](https://game8.co/games/Stellar-Blade/archives/451422)
- [Sekiro Wiki (Fextralife) — Mikiri Counter (forward step-dodge into a thrust attack)](https://sekiroshadowsdietwice.wiki.fextralife.com/Mikiri+Counter)
- [Wikipedia — Nier: Automata](https://en.wikipedia.org/wiki/Nier:_Automata)
- [Wikipedia — Bayonetta (video game) (Witch Time on a well-timed dodge)](https://en.wikipedia.org/wiki/Bayonetta_(video_game))
