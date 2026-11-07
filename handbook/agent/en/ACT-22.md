# ACT-22 · Hitstun / Hit Reaction Stun

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

After being hit, a character recoils or leans back and temporarily cannot act as intended; the background need not pause.

## Not to be confused with

Every hit-reaction animation removing control. Some games permit specific actions during stun. Hitstun is not defined solely by health loss, and is not the same as a separately accumulated stun gauge.

## Use it for

Allow hits to interrupt actions, establish combat rhythm, and create combo opportunities in some games.

## Tunable parameters

stun duration · control lockout · reaction pose · escape options · combo scaling

## Request prompt

Apply 280 ms of hitstun on a normal hit, blocking movement and attacks but allowing one resource-cost escape during the final 80 ms; do not derive control lockout solely from the reaction animation.

## Implementation hint

Apply a timed action restriction after a valid hit while allowing explicitly listed escape or defensive actions. Keep the reaction animation and health change separate from the authoritative stun state.

## Related

- [ACT-41](ACT-41.md) — Stance break / Poise break
- [ACT-28](ACT-28.md) — Super Armor / Armor / Hyper Armor

## References

- [Source Gaming — Thoughts on Hitstop: Sakurai’s Famitsu Column Vol. 490](https://sourcegaming.info/2015/11/11/thoughts-on-hitstop-sakurais-famitsu-column-vol-490-1/)
- [戰鬥設計作者 Celia Wagar — Stunning Detail](https://critpoints.net/2016/08/14/stunning-detail/)
