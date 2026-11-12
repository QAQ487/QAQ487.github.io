# ACT-29 · Knockback / Pushback

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

A character is pushed away after a hit or block, increasing the distance between the two sides.

## Not to be confused with

Displacement and loss-of-control duration are different quantities. Long hitstun need not push far, and a large push need not cause a long lockout. Some games name knockback and block pushback separately; there is no need to force them into one state.

## Use it for

Control post-attack spacing, corner pressure, and whether the next move can reach.

## Tunable parameters

push distance · push duration · direction · stun duration · wall response

## Request prompt

On a normal hit, push the target 1.2 m away from contact over 180 ms while applying a separate 300 ms hitstun; stop displacement at walls without shortening the stun.

## Implementation hint

Compute displacement from contact direction and apply it over its own duration, separately from any action lockout. Define wall and corner behavior so spacing changes remain predictable.

## Related

- [ACT-45](ACT-45.md) — Pogo bounce / Downward strike bounce
- [ACT-47](ACT-47.md) — Air juggle / Launcher
- [FB-33](FB-33.md) — Telekinetic grab & throw
- [FB-36](FB-36.md) — Percentage knockback & trajectory influence

## References

- [Celia Wagar — Stunning Detail，pushback](https://critpoints.net/2016/08/14/stunning-detail/)
- [Source Gaming — Thoughts on Hitstop: Sakurai’s Famitsu Column Vol. 490](https://sourcegaming.info/2015/11/11/thoughts-on-hitstop-sakurais-famitsu-column-vol-490-1/)
