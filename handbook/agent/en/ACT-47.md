# ACT-47 · Air juggle / Launcher

**Aliases:** Air juggle; Juggle; Launcher; Air combo; Juggle decay; Spike; 浮空連擊; 挑空; 空中追打; 浮かせ; 空中コンボ

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

The character knocks an enemy into the air with a rising launcher and can jump up after it. Each hit in the air pauses the enemy and pops it slightly upward, and it falls far slower than normal, as if hung in the air, so the player can keep chasing with hits. The longer the string, the smaller each pop and the shorter each hang, so the enemy gradually sinks; the final downward spike slams it into the ground, where it bounces once and kicks up dust.

## Not to be confused with

Not a pogo bounce (ACT-45, where the attacker is the one bounced). Not knockback (ACT-29, mainly a horizontal push). Not apex hang time (ACT-03, reduced gravity at the top of the player's own jump). This card controls the gravity and pops that keep a struck enemy in the air.

## Use it for

Stylish action games, juggle combos in fighting games, aerial combat.

## Tunable parameters

launch height 2–3 m · airborne gravity scale 0.3–0.5 · per-hit hitstop 3–5 f · per-hit pop · juggle decay per hit (pop & hang shrink ~10–15 %) · spike speed · ground bounce & dust · camera shake on slam (authoring defaults)

## Request prompt

Add air juggles to melee. A launcher hit knocks the enemy about 2–3 m up and the player can jump to follow. While airborne the enemy's gravity drops to 30–50% of normal; each air hit applies 3–5 frames of hitstop and a small upward pop. Within one string, each extra hit shrinks the pop and the hang (e.g. about 10–15% per hit) so the enemy gradually sinks and always lands eventually. A downward spike sends the enemy into the ground at high speed, where it bounces once with dust and a light camera shake. Accept: under continuous air attacks the enemy hangs but steadily sinks and never stays up forever.

## Implementation hint

Put airborne-hit enemies into a juggle state with reduced gravity. Each air hit applies hitstop and sets vertical velocity to a pop value multiplied by a decay factor that shrinks with the number of hits since launch; let the gravity scale also rise with the count so every string eventually lands. A spike sets a large downward velocity; on ground contact apply one small bounce, spawn dust and a camera shake, then enter knockdown.

## Related

- [ACT-45](ACT-45.md) — Pogo bounce / Downward strike bounce
- [ACT-29](ACT-29.md) — Knockback / Pushback
- [ACT-03](ACT-03.md) — Apex Hang Time / Reduced Gravity at Jump Peak
- [ACT-21](ACT-21.md) — Hitstop / Hit Pause / Hitfreeze
- [ACT-22](ACT-22.md) — Hitstun / Hit Reaction Stun
- [FB-18](FB-18.md) — Combo counter
- [ACT-19](ACT-19.md) — Active Frames / Hit Window

## References

- [Wikipedia — Devil May Cry (video game)](https://en.wikipedia.org/wiki/Devil_May_Cry_(video_game))
- [Wikipedia — Devil May Cry 5](https://en.wikipedia.org/wiki/Devil_May_Cry_5)
