# NAV-03 · Foreground-background separation

**Aliases:** Figure–ground separation; Gameplay layer readability; Value separation

**Group:** Visual guidance & wayfinding
**Subcategory:** Readability

## What you see

The playable layer (ground, platforms, characters, enemies, items) clearly stands out from the background in value, saturation and outline; the background is paler, cooler, lower in contrast and less detailed. Even in greyscale you can tell at once where you can stand and which thing is an enemy.

## Not to be confused with

Not depth of field (layers separated by blur) or parallax scrolling (PIX-15, separated by scroll speed); this is a value-and-colour separation that works in a still screenshot. Not silhouette readability (PIX-13, the shape of a single character).

## Use it for

2D platformers and action games with rich backgrounds, bullet hell, and any scene where “can I stand here / is this dangerous” must be read instantly.

## Tunable parameters

background haze colour & amount · background contrast / saturation scale · gameplay outline · target value gap · per-layer settings

## Request prompt

Add foreground-background separation to the game: blend the whole background layer 50% toward a haze colour #9fb8c8 and reduce its contrast to 60%; give standable platforms, characters, enemies and items a 1 px #141a24 outline and keep their full saturation. Check by converting a screenshot to greyscale: the average value difference between the gameplay layer and the background should be at least 25%.

## Implementation hint

Render background layers into their own render target and composite with a fullscreen pass: lerp(col, haze, k) and scale contrast around mid-grey (or bake this into the background art). Draw the gameplay layer afterwards, optionally with a silhouette-outline pass. Add a greyscale debug view (luma = dot(rgb, [.299,.587,.114])) to validate the value gap.

## Related

- [PIX-13](PIX-13.md) — Silhouette readability
- [PIX-15](PIX-15.md) — Parallax scrolling
- [NAV-02](NAV-02.md) — Yellow paint
- [PIX-12](PIX-12.md) — Selective outlining
- [A11Y-01](A11Y-01.md) — Text contrast, backplate and dual outline
- [NAV-16](NAV-16.md) — Colour-coded projectiles / Readable barrage

## References

- [Frozenbyte Wiki — Level Art: Color and Lighting (guiding with values)](https://wiki.frozenbyte.com/index.php/Level_Art:_Color_and_Lighting)
- [Wikipedia — Figure–ground (perception)](https://en.wikipedia.org/wiki/Figure%E2%80%93ground_(perception))
- [Game Developer — How to Reduce Visual Confusion in Your Game](https://www.gamedeveloper.com/design/how-to-reduce-visual-confusion-in-your-game)
- [Wikipedia — Aerial perspective](https://en.wikipedia.org/wiki/Aerial_perspective)
