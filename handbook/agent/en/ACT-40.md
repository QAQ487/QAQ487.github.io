# ACT-40 · Stamina-based traversal (climb / glide)

**Aliases:** 耐力移動; 攀爬耗耐力; 滑翔耗耐力; Stamina climb; Stamina glide; Shared stamina pool; スタミナ移動

**Group:** Animation, movement & physics
**Subcategory:** Movement & forgiveness

## What you see

Climbing and gliding share one stamina pool: the meter drains while climbing or gliding; at empty the climber drops or the glider folds; stamina recovers when standing on stable ground or a rest ledge. Players read “how much longer” — not only whether the button works.

## Not to be confused with

Not just resource-meter presentation (UX-02); this entry is the movement rule where empty stamina changes state. Not sprint-only stamina that only affects ground acceleration.

## Use it for

Open-world climbing, glide crossings, vertical routes that need planned rest spots.

## Tunable parameters

climb drain %/s · glide drain %/s · empty behaviour (drop/fold) · regen %/s on stable · air regen none · low warn threshold (starting points)

## Request prompt

Climbing and gliding share one stamina pool that drains while used. At zero, climbers let go and gliders fold their wings. Stamina recovers after the character stands stable. Accept: just-empty, recover on a mid ledge, and remaining stamina carrying from climb into glide. HUD presentation is UX-02.

## Implementation hint

stamina = clamp(stamina - cost(action)*dt); if stamina<=0: ExitClimb() or FoldGlider(). On grounded/rest: stamina += regen*dt. Drive the same value into the HUD meter (UX-02). Optional food buffs multiply regen or max.

## Related

- [UX-02](UX-02.md) — Resource meter / Status bar
- [ACT-01](ACT-01.md) — Coyote Time / Ledge Grace Period
- [ACT-08](ACT-08.md) — Air Control / Air Steering

## References

- [Wikipedia — The Legend of Zelda: Breath of the Wild](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild)
- [Nintendo — ブレス オブ ザ ワイルド：冒険の手引き（耐力／攀爬）](https://www.nintendo.com/jp/zelda/botw/guide/index.html)
- [Nintendo — Breath of the Wild Explorer's Guide (PDF)](https://media.nintendo.com/zelda/breath-of-the-wild/assets/ExplorersGuide.pdf)
