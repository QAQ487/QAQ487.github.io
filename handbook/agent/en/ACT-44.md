# ACT-44 · Weapon clash / Hitbox clash

**Aliases:** Weapon clash; Hitbox clash; Clank; Attack cancel-out; Blade lock; 兵器互撞; 刀劍相擊; 拼刀; 鍔迫り合い; 相殺; 打ち消し

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

Both fighters attack at once with active hitboxes, and the two weapons meet in mid-air before either reaches a body: sparks burst at the contact point, both freeze for a beat, then both rebound backwards — nobody takes the hit. Optional variant: the weapons bind into a blade lock, both push back and forth with sparks grinding until one is shoved away or both spring apart.

## Not to be confused with

Not a perfect parry (FB-26 — one defends, the other is knocked away, asymmetric pause); here both sides are attacking and the reaction is symmetric. Not a quick time event (CIN-15 — a sequence driven by button prompts); a bind may add input, but the core of this card is the hitbox-meets-hitbox picture. Not a trade where both attacks reach bodies and both get hurt.

## Use it for

Sword-against-sword melee, attack cancel-out in fighting games, climactic boss-versus-player blade locks.

## Tunable parameters

clash hitstop 6–10 f (symmetric) · rebound distance & recovery · spark colour · optional bind 1–2 s · push oscillation · which attack pairs can clash (authoring defaults)

## Request prompt

Add weapon clashes to melee. When both attacks are active and the weapon volumes overlap before either body hurtbox is reached, treat it as a clash: no damage to either side, sparks and a metallic impact at the contact point, both freeze 6–10 frames, then both rebound back to a neutral, actionable state. Optional bind: after the clash lock the weapons for 1–2 s while both push back and forth with sustained sparks, ending with one side shoved away. Accept: simultaneous clash, one side reaching the body slightly earlier, and only one side attacking all behave correctly.

## Implementation hint

Give weapons a separate clash volume. Each tick, test opposing active clash volumes before hurtboxes; if they overlap first, consume both attacks, raise a Clash event at the overlap midpoint, apply an equal per-entity time-scale freeze to both fighters, then play a rebound state on both. Optional bind: enter a paired state where both are locked and sway, resolved by a timer or input.

## Related

- [FB-26](FB-26.md) — Perfect parry flash / Just guard
- [ACT-19](ACT-19.md) — Active Frames / Hit Window
- [ACT-21](ACT-21.md) — Hitstop / Hit Pause / Hitfreeze
- [ACT-29](ACT-29.md) — Knockback / Pushback
- [CIN-15](CIN-15.md) — Quick time event
- [FX-09](FX-09.md) — Impact Burst / Hit Spark
- [UI-28](UI-28.md) — Directional guard indicator

## References

- [Wikipedia — Samurai Shodown](https://en.wikipedia.org/wiki/Samurai_Shodown)
- [Wikipedia — Super Smash Bros.](https://en.wikipedia.org/wiki/Super_Smash_Bros.)
