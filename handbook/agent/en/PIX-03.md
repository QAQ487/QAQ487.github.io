# PIX-03 · Sub-pixel camera smoothing

**Aliases:** Smooth pixel camera; High-res camera offset; Render-target margin scrolling

**Group:** 2D & pixel-art techniques
**Subcategory:** Display & scaling

## What you see

The game is still drawn on a low-res canvas at whole pixels (the pixel grid never distorts), but the camera's fractional part is not thrown away: the low-res image is rendered with a one-pixel margin and, when it is enlarged to the screen, it is shifted by fraction × scale screen pixels. The camera can glide in 1/6-art-pixel steps instead of jumping a whole art pixel at a time.

## Not to be confused with

Not pixel snapping (PIX-02, where everything rounds and the camera steps a pixel at a time), and not switching the whole game to high-resolution drawing (that lets sprites stop at half pixels and creates mixels, PIX-23). Only the finished frame is shifted by a sub-pixel amount; art pixels stay on whole-pixel offsets relative to each other.

## Use it for

At low base resolutions (e.g. 320×180) slow camera follow visibly stutters; this keeps scrolling smooth while staying pixel-perfect.

## Tunable parameters

margin (1 px each side) · scale factor k · whether UI is excluded from the offset · camera damping curve (see CAM-04)

## Request prompt

Add sub-pixel camera smoothing to the game: render the world into a (320+2)×(180+2) render target using the integer part of the camera; keep the fractional part. In the final upscale pass offset the whole RT by −frac × scale screen pixels and crop the extra one-pixel border. Sprites and tiles stay aligned to each other in whole pixels.

## Implementation hint

World pass: RT size (baseW+2, baseH+2), view = translate(−floor(cam)+1). Upscale pass: draw a quad of size (baseW+2)*k at screen offset −frac(cam)*k − k, inside a scissor rect / viewport of baseW*k × baseH*k. Point sampler throughout. Draw HUD after this pass so it does not slide.

## Related

- [PIX-01](PIX-01.md) — Integer scaling
- [PIX-02](PIX-02.md) — Pixel snapping
- [CAM-04](CAM-04.md) — Camera damping／Follow smoothing／Camera lag

## References

- [Unity — 2D Pixel Perfect package manual](https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html)
- [Godot docs — Multiple resolutions (integer scaling)](https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html)
- [Cole Cecil — Scaling pixel art without destroying it](https://colececil.dev/blog/2017/scaling-pixel-art-without-destroying-it/)
