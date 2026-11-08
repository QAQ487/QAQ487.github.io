# NPR-06 · Kuwahara / Painterly filter

**Aliases:** Kuwahara filter; Oil-paint filter; Anisotropic Kuwahara; Painterly post-process

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

Fine noise and texture in the image are smeared into flat patches of colour, as if laid on with an oil brush, yet object edges stay sharp instead of the whole image blurring. Patch borders look slightly blocky or stroke-like. Kuwahara is a screen-space filter that clusters neighbourhoods — distinct from authored form-following strokes (NPR-17).

## Not to be confused with

Not Gaussian blur (PP-08, which also blurs edges) nor posterization (PP-04, which only bands colours and keeps texture detail) nor authored form-following strokes (NPR-17). Kuwahara flattens detail inside neighbourhoods while preserving edges, as a screen filter.

## Use it for

Oil-paint or gouache storybook looks, dream and memory scenes, unifying realistic assets into a painted feel, photo-mode filters.

## Tunable parameters

radius · number of sectors (4 square / 8 anisotropic) · anisotropy strength · sharpness of sector weighting · blend with source

## Request prompt

Add a Kuwahara post-process to the game: for each pixel, compute the mean colour and luminance variance of the four (r+1)×(r+1) quadrants around it (r = 5 px, about r = 8 at 1080p) and output the mean of the quadrant with the lowest variance; use summed-area tables or a separable scheme so cost does not grow with r. For a brush-direction feel, use the anisotropic Kuwahara (kernel stretched into an ellipse along the structure tensor, 8 sectors). Apply after tonemapping and before UI, blendable 0–1 with the source.

## Implementation hint

Per pixel, for each sector k: mean_k and var_k over the sector (box sums via a summed-area table or two-pass separable sums). out = mean of argmin var_k, or a smooth weighting w_k = 1/(1+var_k^q). Generalised/anisotropic versions use Gaussian-weighted polynomial sectors oriented by the local structure tensor. Run at half resolution and upscale for speed.

## Related

- [PP-08](PP-08.md) — Gaussian blur
- [PP-04](PP-04.md) — Posterization
- [NPR-07](NPR-07.md) — Watercolor rendering
- [NPR-17](NPR-17.md) — Stroke-based impasto
- [REN-34](REN-34.md) — Depth of Field/DoF/Bokeh

## References

- [Wikipedia — Kuwahara filter](https://en.wikipedia.org/wiki/Kuwahara_filter)
- [Wikipedia — Non-photorealistic rendering](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
