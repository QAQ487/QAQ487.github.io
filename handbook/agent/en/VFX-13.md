# VFX-13 · Magic circle

**Aliases:** Rune circle; Summoning circle; Spell circle; Ground sigil

**Group:** VFX & particles
**Subcategory:** Elements

## What you see

A pattern of concentric rings, runes and geometry appears on the ground: the lines draw on segment by segment, rings spin in opposite directions, glow and pulse; on completion it flashes, shoots light upward and fades.

## Not to be confused with

Not an area-of-effect indicator (FX-08, a plain shape showing where an attack lands); a magic circle is decorative casting theatre. Not a teleport (VFX-15, where the character itself vanishes and appears).

## Use it for

Spell wind-ups, summons, portals, traps, blessing zones; gives "charging" a visible progression.

## Tunable parameters

ring count & radii · draw-on duration · rotation speeds per ring · rune count · glow/pulse · perspective squash · completion burst

## Request prompt

Add a casting magic circle for mages in the game: draw a circle at their feet squashed to 60% height for the top-down view, outer radius 18 px, drawn on over 0.4 s; outer ring clockwise, inner ring counter-clockwise, a hexagram in the middle, 8 runes around the rim lighting up one by one. On cast, flash white once and shoot a light pillar upward, fading over 0.3 s.

## Implementation hint

Author ring/rune art as separate textures (or a single SDF texture) on flat quads in world space; per-ring rotation via UV rotation in the PS; draw-on via an angular mask: clip(drawAngle - atan2(uv)). Additive blend with a low-alpha wider glow copy. For top-down 2D just scale Y by 0.6.

## Related

- [FX-08](FX-08.md) — Telegraph; Area-of-effect Indicator (Related Concepts, Not Synonyms)
- [VFX-15](VFX-15.md) — Spawn / teleport effect
- [VFX-14](VFX-14.md) — Aura
- [FX-13](FX-13.md) — VFX Anticipation / Attack Charge-up

## References

- [Wikipedia — Magic circle (folklore background)](https://en.wikipedia.org/wiki/Magic_circle)
- [Real Time VFX community (realtimevfx.com)](https://realtimevfx.com/)
