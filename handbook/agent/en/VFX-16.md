# VFX-16 · Pickup sparkle

**Aliases:** Collect effect; Item glint; Twinkle; Shine

**Group:** VFX & particles
**Subcategory:** Elements

## What you see

A collectable lying on the ground gives a periodic glint (a four-pointed star twinkle or a shine sweeping across it); when picked up it bursts into stars and a ring, flies to the UI and the counter bumps.

## Not to be confused with

Not pickup magnetism (FB-14, the movement of items flying to the player); the sparkle is the "this can be picked up" hint plus the feedback of the pickup moment. Not a buff aura (VFX-14, persistently surrounding a character).

## Use it for

Makes coins, treasure and resources visible on busy ground and gives instant satisfaction on pickup.

## Tunable parameters

glint interval & duration · glint shape (star / sweep) · burst count · ring size · fly-to-UI time · counter bump scale

## Request prompt

In your game, coins on the ground show a 5-px four-pointed star glint (0.15 s) at their top-right every 1.2 s; when the hero picks one up, burst 6 yellow stars and a ring expanding to 10 px over 0.2 s, shrink the coin as it flies to the gold counter in the top-left, and bump the counter to 130% then back.

## Implementation hint

Glint: small additive star sprite spawned on a timer with per-item random phase so coins do not blink in sync; or a sweep via a diagonal band in the sprite PS (frac(time) moving along uv.x+uv.y). Pickup: burst emitter + ring sprite; fly-to-UI by converting UI position to world (or render the flying coin in the UI pass).

## Related

- [FB-14](FB-14.md) — Pickup magnetism
- [VFX-14](VFX-14.md) — Aura
- [FB-02](FB-02.md) — Damage numbers

## References

- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
- [Design Atlas — Juice](https://design.solhun.com/en/game-ui/juice/)
