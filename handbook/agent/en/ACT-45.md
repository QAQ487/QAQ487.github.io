# ACT-45 · Pogo bounce / Downward strike bounce

**Aliases:** Pogo bounce; Pogo jump; Downward strike bounce; Down-slash bounce; Nail bounce; 下劈反彈; 下突彈跳; 空中下劈彈起; ポゴジャンプ; 下突きバウンド

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

The character attacks downward in mid-air; the moment the weapon's hitbox touches an enemy, spikes or certain props, the character pops straight back up about a short-hop high. The struck enemy flashes white, a small spark burst appears at the contact point, and there is a very short hit pause. On the way down the player can strike again and keep bouncing across enemy heads or a row of spikes without landing; the weapon touches the spikes first, so the character takes no damage. A down-strike that hits nothing just lets the character fall as normal.

## Not to be confused with

Not coyote time (ACT-01) or jump buffering (ACT-02), which forgive the take-off. Not a plain head-stomp bounce (the body lands on the enemy, no attack needed). Not knockback (ACT-29, where the victim is pushed away); here the attacker is the one pushed back. Not an air juggle (ACT-47, which keeps the enemy in the air).

## Use it for

Mid-air combat in platformers, levels that turn spike pits into stepping stones, designs where the down attack doubles as movement.

## Tunable parameters

bounce height (≈ short hop, fixed) · hitstop 2–4 f · down-hitbox reach & width · bounceable tags (enemy / spikes / props) · air jump & dash refresh on bounce · horizontal speed kept vs damped · one bounce per swing (authoring defaults)

## Request prompt

Add a pogo bounce to the mid-air down attack. When the player presses down + attack in the air, extend the weapon hitbox below the feet; on the first frame it touches an enemy, spikes or a prop tagged as bounceable, set the character's vertical speed straight to a fixed upward value (about a short hop, regardless of current fall speed), hitstop 2–4 frames, spawn sparks at the contact point and flash the struck enemy. Refresh air jumps and dash on bounce so the player can strike again while falling and chain bounces; a miss just falls normally. Accept: bouncing across three spike groups in a row deals no damage and every bounce reaches the same height.

## Implementation hint

Give the airborne down attack a hitbox below the feet that is tested before the body's hurtbox. On the first overlap with a bounceable tag (enemy hurtbox, hazard, bounce prop), overwrite vertical velocity with a fixed upward value so bounce height is consistent, apply a short hitstop, spawn contact sparks and optionally refresh air jumps and dash. Allow one bounce per swing; hazards touched by the hitbox first do not damage the player.

## Related

- [ACT-03](ACT-03.md) — Apex Hang Time / Reduced Gravity at Jump Peak
- [ACT-21](ACT-21.md) — Hitstop / Hit Pause / Hitfreeze
- [ACT-29](ACT-29.md) — Knockback / Pushback
- [ACT-47](ACT-47.md) — Air juggle / Launcher
- [ACT-01](ACT-01.md) — Coyote Time / Ledge Grace Period
- [ACT-05](ACT-05.md) — Wall-Jump Forgiveness / Wall-Jump Window

## References

- [Hollow Knight Wiki — Nail (Nail-bouncing / pogo)](https://hollowknight.wiki/w/Nail)
- [Wikipedia — Shovel Knight](https://en.wikipedia.org/wiki/Shovel_Knight)
- [Wikipedia — DuckTales (video game)](https://en.wikipedia.org/wiki/DuckTales_(video_game))
