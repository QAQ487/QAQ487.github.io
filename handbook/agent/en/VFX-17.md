# VFX-17 · Healing effect

**Aliases:** Heal VFX; Regen effect; Restore effect

**Group:** VFX & particles
**Subcategory:** States & buffs

## What you see

When a character regains health, a soft green (or gold) glow washes over it briefly, crosses or motes float upward and vanish, a soft ring may appear at the feet, and a green "+number" pops above the head.

## Not to be confused with

Not a buff aura (VFX-14, lasting as long as the state); healing plays once or per tick. Not a pickup sparkle (VFX-16). Note: "Healing effect" is a descriptive label — games call it many things.

## Use it for

Shows clearly who is being healed and by how much; in tower defence, makes it obvious that the healer tower works.

## Tunable parameters

tint strength & fade · glyph count/shape · rise distance & time · ring size · tick replay interval · colour (green / gold / blue for mana)

## Request prompt

In your game, when an NPC is healed by the healer tower: tint the body 30% green and fade over 0.3 s; spawn 5 green pixel "+" glyphs at random spots around them that rise 12 px and fade over 0.8 s; a squashed pale-green ring spreads out at the feet; show a green "+number". For heal-over-time, replay a smaller version every 1 s.

## Implementation hint

Reuse the per-sprite tint uniform (same path as FB-05) for the glow; "+" glyphs are particles drawn from a tiny atlas frame; ring = flat additive sprite scaled over time. Fire from the gameplay heal event, throttled so many small ticks merge into one visual.

## Related

- [VFX-14](VFX-14.md) — Aura
- [FB-05](FB-05.md) — Status effect tint
- [FB-02](FB-02.md) — Damage numbers
- [VFX-16](VFX-16.md) — Pickup sparkle

## References

- [Jonasson & Purho — Juice it or lose it (talk, YouTube)](https://www.youtube.com/watch?v=Fy0aCDmgnxg)
- [Wikipedia — Health (game terminology)](https://en.wikipedia.org/wiki/Health_(game_terminology))
