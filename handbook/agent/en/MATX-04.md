# MATX-04 · Height-blend texture splatting

**Aliases:** Height blending; Height-based blend; Texture splatting; Terrain layer blend; Splat map; Triplanar mapping; Triplanar projection; 三向投影; 陡壁貼圖拉伸

**Group:** Materials & surfaces
**Subcategory:** Surface detail

## What you see

The border between two ground layers (cobbles and grass, mud and sand) is not a smeared gradient but “the higher one shows first”: stone tops poke through the grass first and grass creeps into the low gaps between stones; the border follows the stone shapes and stays crisp and natural.

## Not to be confused with

Not a plain alpha blend (two textures cross-fading by weight, which looks dirty at the border); height blending uses each layer’s own height map to decide which is on top. Not a wet surface (MATX-05, changing roughness on one material). Stretched streaks on a steep wall are the texture laid along the wrong axis, not the border between two ground layers.

## Use it for

Terrain painting (borders of grass, mud, stone, snow), worn paths, moss and snow cover, grime and moss in wall corners. To keep the same pattern density on a cliff as on the top, sample along the three axes by surface facing and blend. (Former entry MATX-03, “Triplanar mapping”, is merged here.)

## Tunable parameters

layer heights (texture alpha) · splat weights · transition depth · per-layer height bias/contrast · up to 4 layers per pass

## Request prompt

Switch the game’s terrain to height blending: store height (0–1) in each layer’s alpha channel, add it to the splat-map weight a, then keep only what lies within 0.08 below the maximum (h_i + a_i − max + 0.08, clamped above 0, then normalised); the cobble/grass border then follows the stone edges. Paint the splat map with a brush in the editor and expose a transition width of 0.02–0.3.

## Implementation hint

For layers i: v_i = h_i + a_i; m = max(v_i) - depth; w_i = max(v_i - m, 0); col = Σ col_i*w_i / Σ w_i. Four layers fit one RGBA splat texture; more layers need index maps or multiple passes. Apply the same weights to normal and roughness so lighting matches.

## Related

- [MATX-05](MATX-05.md) — Wet surface
- [PIX-17](PIX-17.md) — Autotiling
- [ENV-03](ENV-03.md) — Seasonal change
- [REN-13](REN-13.md) — Normal mapping/Bump mapping

## References

- [Game Developer — Advanced terrain texture splatting (height blend)](https://www.gamedeveloper.com/programming/advanced-terrain-texture-splatting)
- [Wikipedia — Texture splatting](https://en.wikipedia.org/wiki/Texture_splatting)
