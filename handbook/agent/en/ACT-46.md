# ACT-46 · Bob and weave / Slip

**Aliases:** Bob and weave; Slip; Sway dodge; Duck; Lean-back dodge; Upper-body evade; 原地搖身閃避; 搖頭閃避; 下潛閃避; スウェー; ダッキング

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

As an enemy punches or swings, the player presses a dodge direction and the character keeps both feet planted, moving only the upper body and head — slipping to the side, leaning back or ducking — so the attack grazes past the side of the head or overhead. The attacker whiffs and over-extends a little forward; the character snaps back upright faster than a back-step or roll and is still in range to counter at once. Straight punches are usually slipped or leaned away from; high sweeps are ducked.

## Not to be confused with

Not a perfect dodge window (ACT-43, the timing and i-frame rule, often with slow motion). Not a perfect parry (FB-26, contact with a mutual pause). Not a roll or dash dodge (the whole body relocates and ends out of range). This card is feet-planted upper-body evasion that leaves you exactly where you were.

## Use it for

Boxing, unarmed close combat, fighting built around reading attacks and countering.

## Tunable parameters

slip directions (side / lean back / duck) · head travel 0.3–0.5 m · slip time 0.15–0.25 s · return 0.1–0.2 s · moved hurtboxes (head / torso) vs i-frames · attacker over-commit step · counter window on return (authoring defaults)

## Request prompt

Add a feet-planted slip to close combat. When the player presses a dodge direction before the enemy hit lands, lock the feet and move the upper body over 0.15–0.25 s by direction — side slip, lean back or duck — taking the head 0.3–0.5 m off the line; move only the head and torso hurtboxes with the bones rather than making the whole character invulnerable. On a whiff, push the attacker one step forward into an over-extended recovery. Return upright over 0.1–0.2 s and allow a direct counter during the return. Accept: a straight punch and a high sweep are each avoided, and afterwards the character is still on the same spot and in counter range.

## Implementation hint

Play an upper-body layered or additive slip animation keyed to the input direction while the root and feet stay locked. Attach head and torso hurtboxes to the animated bones so the attack misses by geometry rather than by blanket invulnerability. If the attack whiffs, send the attacker into an over-extended recovery. Open a short counter-cancel window on the return frames.

## Related

- [ACT-43](ACT-43.md) — Perfect dodge window
- [FB-26](FB-26.md) — Perfect parry flash / Just guard
- [ACT-27](ACT-27.md) — Invulnerability / Invincibility Frames / I-frames
- [ACT-42](ACT-42.md) — Guard counter
- [ACT-34](ACT-34.md) — Animation Layers / Bone Mask / Partial-body Animation
- [ACT-25](ACT-25.md) — Cancel Window / Action Window

## References

- [Wikipedia — Sifu (video game)](https://en.wikipedia.org/wiki/Sifu_(video_game))
- [Wikipedia — Punch-Out!! (2009 video game)](https://en.wikipedia.org/wiki/Punch-Out!!_(2009_video_game))
- [Wikipedia — God Hand](https://en.wikipedia.org/wiki/God_Hand)
