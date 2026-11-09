# NAV-16 · Colour-coded projectiles / Readable barrage

**Aliases:** Colour-coded projectiles; Bullet colour coding; Readable bullet hell; Projectile response colours; Destructible vs indestructible bullets; 顏色分類彈幕; 彈幕顏色規則; 可打碎子彈; 弾の色分け; 破壊可能弾

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

In a dense barrage each bullet's colour and shape tell the player how to respond: for example, orange round shots can be shot down, purple spiked shots cannot and must be avoided, and a blue ring spreading along the ground can be dashed through. One colour always means the same response across the whole game. Bullets are brighter than the background and carry a dark outline, so they stay visible among explosions and effects; in grayscale they can still be told apart by shape.

## Not to be confused with

Not general value and saturation hierarchy (FX-12, how visual emphasis is distributed over the whole image); this card locks specific colours to response rules. Not an attack telegraph (NAV-04, marking the hit area in advance) or an unblockable signifier (FB-28, a warning symbol for one attack).

## Use it for

Shoot-'em-ups, boss barrages, bullet-hell and action hybrids.

## Tunable parameters

response categories (destroy / avoid / dash through / jump) · one colour + one shape each · brightness margin over background · dark outline 1–2 px · reserved hues banned from other VFX · colour-blind shape fallback (authoring defaults)

## Request prompt

Build a colour rule for the barrage. Use exactly one colour plus one shape per response: orange circles for destructible shots, purple spiked shapes for indestructible ones, blue rings for ground waves you can dash through. Make every bullet clearly brighter than the background with a 1–2 px dark outline, and keep the reserved colours out of explosions, particles and other effects. A colour means only one response for the whole game; provide a colour-blind mode that relies on shape. Accept: with the screen converted to grayscale, the three bullet types can still be told apart by shape.

## Implementation hint

Define a small projectile response table (category → colour, shape, outline) and drive every projectile's material from it instead of per-enemy art. Render projectiles in a late pass above most effects with an outline, and lint other effects so they never use the reserved hues. Provide an alternative palette and make shape carry the category so grayscale still separates them.

## Related

- [FX-12](FX-12.md) — Value / Saturation Hierarchy
- [NAV-04](NAV-04.md) — Attack telegraph
- [FB-28](FB-28.md) — Unblockable attack signifier
- [NAV-03](NAV-03.md) — Foreground-background separation
- [FB-32](FB-32.md) — Projectile reflect / Batting
- [A11Y-03](A11Y-03.md) — Colour-blind modes with shape redundancy

## References

- [Wikipedia — Ikaruga](https://en.wikipedia.org/wiki/Ikaruga)
- [Gamepressure — NieR: Automata hacking guide (orange bullets destructible, purple not)](https://www.gamepressure.com/nier-automata/hacking/z4ea86)
- [Wikipedia — Returnal](https://en.wikipedia.org/wiki/Returnal)
