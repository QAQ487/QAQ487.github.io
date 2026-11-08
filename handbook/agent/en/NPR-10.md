# NPR-10 · 1-bit dithering (Obra Dinn style)

**Aliases:** 1-bit rendering; Monochrome dithering; Obra Dinn style; Two-colour ordered dither

**Group:** Stylized rendering (NPR)
**Subcategory:** Retro & lo-fi

## What you see

The whole 3D image uses just two colours (e.g. dark ink and off-white); every shade is made with a regular dot pattern, more dark dots where it is darker; with crisp outlines it looks like an early Macintosh monochrome screen or an engraving.

## Not to be confused with

Not dithering in general (PIX-08, any use of dot patterns to fake more colours, possibly with many colours); here the whole 3D scene outputs exactly two colours as an overall style. Not halftone (NPR-08, variable dot size on a tilted grid).

## Use it for

Detective puzzles, horror, vintage-computer nostalgia; games that emphasise shape and composition and deliberately withhold colour.

## Tunable parameters

internal resolution · two palette colours · dither matrix (Bayer 4/8, blue noise) · tone curve · edge forcing · pattern anchoring (screen vs world/sphere)

## Request prompt

Add 1-bit rendering to the game: render greyscale at 640×360 (tone = lighting × AO), then threshold with an 8×8 Bayer matrix: tone > (bayer+0.5)/64 outputs the light colour #e6e1c5, otherwise the dark colour #1d1b26; force depth and normal edges to dark. Upscale by an integer factor with nearest filtering. To stop the pattern “swimming” when the camera turns, map the dither pattern onto a sphere around the camera direction instead of fixing it to the screen.

## Implementation hint

Render tone to a low-res target; out = tone > bayer8[(p.y&7)*8+(p.x&7)] ? light : dark. Blue-noise thresholds look more organic. Anchor the threshold texture in a camera-centred spherical mapping (as described by Lucas Pope) to reduce swimming under rotation. Edges: run edge detection on the low-res buffer before thresholding.

## Related

- [PIX-08](PIX-08.md) — Dithering
- [NPR-08](NPR-08.md) — Halftone / Ben-Day dots
- [PIX-10](PIX-10.md) — Limited palette
- [NPR-03](NPR-03.md) — Edge-detection outline
- [MATX-06](MATX-06.md) — Dithered transparency
- [NPR-15](NPR-15.md) — Sumi-e / ink-wash

## References

- [Lucas Pope — Obra Dinn devlog, Nov 2017 (dither stabilisation)](https://dukope.com/devlogs/obra-dinn/tig-32/)
- [Wikipedia — Return of the Obra Dinn](https://en.wikipedia.org/wiki/Return_of_the_Obra_Dinn)
- [Surma — Ditherpunk: the article I wish I had about monochrome image dithering](https://surma.dev/things/ditherpunk/)
- [Wikipedia — Ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering)
