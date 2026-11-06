# NPR-13 · 3D pixel art (pixelated 3D)

**Aliases:** Pixelated 3D; 3D-to-pixel pipeline; Low-res 3D render; Pixel-perfect 3D

**Group:** Stylized rendering (NPR)
**Subcategory:** Retro & lo-fi

## What you see

The image looks like hand-drawn pixel art, yet objects rotate smoothly with correct perspective and lighting: everything is made of clear big pixels, shading has only 2–3 steps, objects have 1-pixel dark outlines, colours come from a limited palette, and the pixel grid does not crawl or shimmer when the camera moves.

## Not to be confused with

Not a pixelation filter (PP-05, just chopping a high-res image into blocks, no outlines or banding, shimmering in motion) nor PS1 style (NPR-11, vertex jitter and texture warping). 3D pixel art means low-res rendering plus pixel-art rules (outlines, bands, palette, stable grid).

## Use it for

Games that want a pixel-art look with 3D freedom (rotation, lighting, lots of animation), isometric sims or strategy games, auto-generating pixel sprites from 3D models.

## Tunable parameters

internal resolution / pixel scale · light bands · palette · outline rule (ID, depth, normal) · camera snapping · orthographic vs perspective

## Request prompt

Render the game’s 3D scene as pixel art: (1) render with an orthographic camera at 1/4 output resolution (e.g. 480×270) and upscale by an integer factor with nearest filtering; (2) quantize lighting to 3 bands (N·L > 0.6 / > 0.25 / else, multipliers 1.0/0.78/0.56) and colours to 8 levels per channel or a palette; (3) draw 1-pixel outlines where object ID or depth changes (colour ×0.35, on the nearer object); (4) snap the camera position to the pixel size (world units per low-res pixel), then shift the upscaled image by the sub-pixel remainder to avoid pixel crawl.

## Implementation hint

Render to a low-res target with an ortho camera; snap camera position to texel size in view space and apply the leftover fraction as a screen-space offset when blitting. Shade with stepped N·L, then palette-map. Outline pass on the low-res buffer: compare object ID/depth with 4 neighbours, darken the nearer pixel. Blit with point filtering at an integer scale.

## Related

- [PP-05](PP-05.md) — Pixelation
- [PIX-01](PIX-01.md) — Integer scaling
- [PIX-03](PIX-03.md) — Sub-pixel camera smoothing
- [NPR-11](NPR-11.md) — PS1-style rendering
- [PIX-10](PIX-10.md) — Limited palette

## References

- [David Holland — 3D pixel art rendering](https://www.davidhol.land/articles/3d-pixel-art-rendering/)
- [Game Developer — Art design deep dive: using a 3D pipeline for 2D animation in Dead Cells](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-)
