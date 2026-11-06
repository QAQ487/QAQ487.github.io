# PIX-22 · 2D shadow casting

**Aliases:** Line-of-sight shadows; 2D visibility; Light occluders; Hard 2D shadows

**Group:** 2D & pixel-art techniques
**Subcategory:** Lighting

## What you see

A light (torch, a character's view) shines outward and walls, crates and tree trunks leave crisp shadow regions behind them; as the light moves the shadow shapes update instantly. In pixel games shadow edges are usually kept hard or given a dithered penumbra rather than blurred.

## Not to be confused with

Not normal-mapped lighting (PIX-21, which only shades surfaces) and not fog of war (ENV-15, which hides the map by exploration state). 2D shadow casting computes geometrically whether light can reach each point.

## Use it for

Night stealth, torch lighting, dungeon visibility, tower line of sight.

## Tunable parameters

light radius · occluder shapes (tile-based vs polygons) · shadow darkness · penumbra (hard / dithered) · shadow resolution (base-res)

## Request prompt

Add 2D shadow casting to the game at night: every town torch is a light and houses and fences are occluder polygons; each frame compute the visibility polygon around each light (cast rays to occluder corners) and use it as a light mask, with shadowed areas 70% dark. Do not blur the edge — use a 1–2 px Bayer-dithered penumbra instead.

## Implementation hint

Option A (polygons): CPU visibility polygon per light (sort rays to occluder vertices ±ε), triangulate as a fan, draw into a base-res light-mask RT with additive blend; composite with multiply. Option B (GPU, mattdesl-style): render occluders to a 1D shadow map per light via polar transform, then sample in the light pass. Keep the mask at base resolution with point sampling.

## Related

- [PIX-21](PIX-21.md) — Normal-mapped sprites
- [ENV-15](ENV-15.md) — Fog of war
- [PIX-08](PIX-08.md) — Dithering

## References

- [Red Blob Games — 2D visibility](https://www.redblobgames.com/articles/visibility/)
- [Nicky Case — Sight & Light: 2D visibility/shadow effects (interactive)](https://ncase.me/sight-and-light/)
- [mattdesl — 2D pixel-perfect shadows](https://github.com/mattdesl/lwjgl-basics/wiki/2D-Pixel-Perfect-Shadows)
- [Godot docs — 2D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html)
