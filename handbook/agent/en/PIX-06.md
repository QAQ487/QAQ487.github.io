# PIX-06 · Palette swap

**Aliases:** Palette shift; Recolour variant; Colour LUT swap; Indexed sprite recolour

**Group:** 2D & pixel-art techniques
**Subcategory:** Colour

## What you see

One sprite is drawn in colour indices; swapping the palette gives a red elite, a blue frozen or a purple poisoned version. Shape and shading are identical — only the colours change.

## Not to be confused with

Not a status tint (FB-05, a translucent colour laid over the original, which also covers the shading) nor colour cycling (PIX-07, rotating indices over time for animation). A palette swap replaces colours index-for-index, so dark stays dark.

## Use it for

Many enemy variants, team colours or rare versions from little art; players can read strength at a glance.

## Tunable parameters

palette size (4–16) · which indices are swappable (skin/cloth vs outline/eyes) · per-instance palette row · swap timing (instant vs flash)

## Request prompt

Add palette swaps to the game's enemies: store the sprite as an 8-colour index map; normal enemies use the green palette, elites the red one, shamans the purple one, and frozen enemies temporarily switch to a light-blue palette. Each palette keeps the same dark-to-light value order and the outline colour is unchanged.

## Implementation hint

Store sprites as R8_UNORM index textures (or encode index in the red channel of the atlas). Bind a palette texture (N×rows, R8G8B8A8) with a point sampler; pixel shader: idx = tex.r*255; col = pal.Load(int3(idx, paletteRow, 0)). Pass paletteRow per instance. Index 0 = transparent.

## Related

- [FB-05](FB-05.md) — Status effect tint
- [PIX-07](PIX-07.md) — Color cycling
- [PIX-10](PIX-10.md) — Limited palette
- [PP-15](PP-15.md) — Selective colour / Colour splash
- [PP-20](PP-20.md) — False-colour infrared / Aerochrome

## References

- [Wikipedia — Palette swap](https://en.wikipedia.org/wiki/Palette_swap)
- [Lospec — Palette list](https://lospec.com/palette-list)
