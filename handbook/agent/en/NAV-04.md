# NAV-04 · Attack telegraph

**Aliases:** Danger zone marking; AoE indicator; Ground telegraph

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

Before an enemy attack lands, a translucent red area with the same shape as the real damage area (circle, cone, line) appears on the ground with a clear border; a fill or sweeping arc inside advances like a clock, damage happens the moment it is full, and then the area disappears.

## Not to be confused with

Not a range indicator (NAV-06, shows what your own unit can reach and stays while selected); a telegraph is a brief “you are about to be hit” warning with a countdown. Not a magic circle (VFX-13, a decorative casting effect that isn’t necessarily the hit area).

## Use it for

Action RPGs, boss fights, MMO raids, bullet hell: anywhere players need a predictable window to dodge.

## Tunable parameters

shape = hitbox · warning time per damage · border / background / fill alpha · countdown style (radial fill, sweep, pulse) · non-colour cue (pattern, outline) · end flash

## Request prompt

Add ground telegraphs to enemy area attacks in the game: before the attack, draw exactly the hitbox shape (circle radius = attack radius) with a background of rgba(224,74,58,0.18), a 2 px dark outer border and a 1 px #e04a3a inner border; fill it from the centre outward with rgba(224,74,58,0.4) as the countdown, 0.6 s for small attacks and 1.5 s for big ones; apply damage only when full, and finish with a 0.05 s white flash and an expanding ring. Use a rectangle filling forward from the enemy for a charge.

## Implementation hint

Draw the telegraph as a ground decal / projected quad after the ground and before actors. A pixel shader computes distance (circle) or local uv (lane, cone) and outputs border, background and fill where dist < progress × radius. Feed the same shape data to the damage query so the visual always equals the hitbox, and add a pattern or outline so the warning doesn’t rely on colour alone.

## Related

- [NAV-06](NAV-06.md) — Range indicator
- [VFX-13](VFX-13.md) — Magic circle
- [VFX-06](VFX-06.md) — Shockwave
- [FB-01](FB-01.md) — Hit flash
- [UI-09](UI-09.md) — Off-screen indicator / Edge arrow
- [ACT-43](ACT-43.md) — Perfect dodge window

## References

- [Game Developer — Enemy Attacks and Telegraphing](https://www.gamedeveloper.com/design/enemy-attacks-and-telegraphing)
- [GreenyNeko — WildStar’s Legacy: The Telegraph-based Combat System](https://www.greenyneko.com/2019/07/wildstars-legacy-telegraph-based-combat.html)
- [Wikipedia — Area of effect](https://en.wikipedia.org/wiki/Area_of_effect)
- [PlayStation — God of War Ragnarök Accessibility (Enemy Off-screen indicator)](https://www.playstation.com/en-us/games/god-of-war-ragnarok/accessibility/)
