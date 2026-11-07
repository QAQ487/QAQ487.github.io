# NPR-14 · HD-2D

**Aliases:** 2D-HD; Pixel sprites in 3D; Diorama look; Octopath-style

**Group:** Stylized rendering (NPR)
**Subcategory:** Retro & lo-fi

## What you see

Pixel-art characters and props stand like paper cut-outs on 3D ground; the camera looks down from an angle with perspective; the top and bottom of the frame are clearly blurred (tilt-shift style depth of field) while the middle stays sharp, like looking at a miniature model; lamps have soft bloom, light shafts cross the air, and the grade is warm.

## Not to be confused with

Not traditional top-down 2D (the same pixel assets but no perspective, depth of field or lighting) nor 3D pixel art (NPR-13, where even the 3D models are pixelated). HD-2D keeps the pixel assets untouched and wraps them in modern 3D perspective and post effects. “HD-2D” is originally a Square Enix brand term.

## Use it for

Retro JRPG remakes or homages, pixel art that wants a cinematic feel, miniature/diorama-style scenes.

## Tunable parameters

camera pitch & FOV · sprite pixel scale · tilt-shift band positions & blur radius · bloom radius & threshold · grade & vignette · shadow style

## Request prompt

Build an HD-2D look in the game: (1) ground and buildings as 3D geometry with pixel textures (16 px per tile, nearest sampling); (2) characters, trees etc. as upright pixel-sprite billboards, scaled to the pixel ratio with nearest sampling and an elliptical shadow at the feet; (3) perspective camera pitched about 35° down, FOV about 44°; (4) tilt-shift depth of field: blend toward a 1/4-resolution blurred image over the top 0–30% and bottom 72–100% of the screen; (5) warm additive bloom on lamps (radius about 1.2 tiles) and 3 faint diagonal light shafts; (6) warm grade (red +12%, blue −12%) and a 55% vignette.

## Implementation hint

Two layers: 3D world (tile-textured meshes, point-sampled) and camera-facing or Y-axis billboards for sprites, sized so one sprite texel = a constant number of screen pixels at the focus distance. Post stack: depth-of-field (or a screen-space vertical mask for tilt-shift) → bloom → colour grade/LUT → vignette. Real-time shadows from billboards use a separate shadow-caster quad.

## Related

- [REN-34](REN-34.md) — Depth of Field/DoF/Bokeh
- [REN-29](REN-29.md) — Bloom/Glow
- [NPR-13](NPR-13.md) — 3D pixel art (pixelated 3D)
- [PIX-01](PIX-01.md) — Integer scaling

## References

- [Wikipedia — HD-2D](https://en.wikipedia.org/wiki/HD-2D)
- [Digital Foundry — Octopath Traveler: a 90s-style JRPG brought to life with cutting-edge tech](https://www.digitalfoundry.net/articles/digitalfoundry-2018-octopath-traveler-a-hybrid-game-for-a-hybrid-console)
- [4Gamer.biz — 「OCTOPATH TRAVELER」アートスタイル開発秘話 (CEDEC 2018)](https://business.4gamer.net/article/1810/18101801/)
- [Wikipedia — Tilt–shift photography](https://en.wikipedia.org/wiki/Tilt%E2%80%93shift_photography)
