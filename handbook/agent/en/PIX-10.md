# PIX-10 · Limited palette

**Aliases:** Indexed color; Restricted palette; Fixed palette; Colour budget

**Group:** 2D & pixel-art techniques
**Subcategory:** Colour

## What you see

The whole game (or each scene or sprite) uses one fixed set of colours — 4, 8, 16 or 32. Every asset picks from the same set, so the image is unified and contrast and readability are controlled by a handful of colours.

## Not to be confused with

Not dithering (PIX-08, a way to make in-between tones inside a limited palette) and not a post-process that quantises the frame (that produces stray colours and noise). A limited palette is a design constraint the art is drawn to from the start.

## Use it for

Keeps a pixel style coherent; makes palette swaps, colour cycling and day/night recolouring easy; keeps character-versus-background contrast under control.

## Tunable parameters

palette size · split per role (background / actors / UI / FX) · per-scene sub-palettes · import validation

## Request prompt

Define a 32-colour master palette for the game: backgrounds and ground use only its 16 low-saturation colours, characters and interactive objects use another 12 high-saturation colours, and UI uses the last 4. When importing a new asset, check it only uses these 32 colours and fail the import otherwise.

## Implementation hint

Validate at asset build time (hash each texel colour against the palette set). If sprites are converted to indices (R8), the same palette texture drives PIX-06/PIX-07 and day/night palette rows. Avoid runtime quantisation post-processes except as a deliberate filter.

## Related

- [PIX-06](PIX-06.md) — Palette swap
- [PIX-07](PIX-07.md) — Color cycling
- [PIX-08](PIX-08.md) — Dithering
- [PIX-09](PIX-09.md) — Hue shifting

## References

- [Wikipedia — Indexed color](https://en.wikipedia.org/wiki/Indexed_color)
- [Lospec — Palette list](https://lospec.com/palette-list)
- [Wikipedia — Posterization (banding)](https://en.wikipedia.org/wiki/Posterization)
