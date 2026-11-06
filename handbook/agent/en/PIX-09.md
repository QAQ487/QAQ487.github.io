# PIX-09 · Hue shifting

**Aliases:** Hue-shifted ramps; Colour ramp hue shift; Warm highlights / cool shadows

**Group:** 2D & pixel-art techniques
**Subcategory:** Colour

## What you see

A dark-to-light colour ramp does not just darken and lighten one hue: shadows lean toward blue/purple and highlights toward yellow/warm. Shadows look clear and highlights feel lit; a ramp made by only mixing black and white looks grey and muddy.

## Not to be confused with

Not a palette swap (PIX-06, swapping a whole set on the same sprite) and not a post-process colour grade. Hue shifting is decided by the artist when designing the palette — every step is chosen.

## Use it for

Makes a limited palette feel richer and more lit; a shared set of ramps unifies the whole game's look.

## Tunable parameters

ramp length (4–6) · hue shift per step (5–20°) · saturation curve (peak in mid-tones) · shared ramps across assets

## Request prompt

Redesign the game's character and foliage ramps with hue shifting: each 5-step ramp goes dark to light; the dark end shifts hue about −20° toward blue-purple with slightly lower saturation, the light end shifts about +15° toward yellow with higher value. Never darken with pure black or lighten with pure white. Make one ramp each for enemy green, grass green and roof red.

## Implementation hint

Art-side technique; engine side only needs indexed palettes (PIX-06) or authoring tools. Optionally provide a debug view that renders every sprite in greyscale (luma) to check value steps independently of hue.

## Related

- [PIX-06](PIX-06.md) — Palette swap
- [PIX-10](PIX-10.md) — Limited palette
- [PIX-12](PIX-12.md) — Selective outlining

## References

- [Slynyrd — Pixelblog 1: Color palettes (hue shifting)](https://www.slynyrd.com/blog/2018/1/10/pixelblog-1-color-palettes)
- [Lospec — Hue-shifting tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/hueshifting)
- [Lospec — Pixel art tutorials](https://lospec.com/pixel-art-tutorials)
