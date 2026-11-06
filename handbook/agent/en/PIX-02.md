# PIX-02 · Pixel snapping

**Aliases:** Pixel jitter; Sprite jitter; Position rounding; Snap to pixel grid

**Group:** 2D & pixel-art techniques
**Subcategory:** Display & scaling

## What you see

Object and camera coordinates are rounded to whole pixels before drawing, so sprites always sit on the pixel grid. When it is done wrong, a slowly moving or camera-followed character jitters against the background — one frame a pixel ahead, the next a pixel behind — or some pixel columns inside the sprite flicker wider and narrower.

## Not to be confused with

Not sub-pixel camera smoothing (PIX-03, which deliberately offsets at high resolution for smoother scrolling) nor sub-pixel animation (PIX-14, hand-drawn in-between colours). Pixel jitter is a rounding-order bug: the character and the camera are rounded independently, so their difference flips between 0 and 1.

## Use it for

Keeps lines stable and characters planted; the followed hero should not wobble relative to the screen.

## Tunable parameters

rounding mode (floor vs round, consistent sign handling) · what is snapped (camera, sprites, particles, UI) · snap in base-res pixels, not screen pixels

## Request prompt

Fix pixel jitter in the game: round the camera position to whole pixels first, then compute each object's screen position as round(worldPos) − roundedCamera instead of rounding the floating values separately. Keep physics and movement in floats; round only at draw time. While following the hero, the hero should stay perfectly still on screen.

## Implementation hint

In the sprite batch, compute camI = floor(cam + 0.5) once per frame; per sprite screen = floor(world + 0.5) − camI (use the same rounding for negatives). Feed integer positions to the vertex shader in base-res pixel units and build the ortho matrix with modern texel-centre conventions (no half-texel offset on current graphics APIs). Do not snap inside physics.

## Related

- [PIX-01](PIX-01.md) — Integer scaling
- [PIX-03](PIX-03.md) — Sub-pixel camera smoothing
- [PIX-14](PIX-14.md) — Sub-pixel animation
- [PIX-24](PIX-24.md) — Sprite pivot at the feet

## References

- [Unity — 2D Pixel Perfect package manual](https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html)
- [Godot docs — Multiple resolutions (integer scaling)](https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html)
- [Microsoft Learn — Directly mapping texels to pixels (D3D9 half-texel note; D3D10+ differs)](https://learn.microsoft.com/en-us/windows/win32/direct3d9/directly-mapping-texels-to-pixels)
