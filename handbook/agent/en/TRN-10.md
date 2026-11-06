# TRN-10 · Pixelate transition

**Aliases:** Mosaic transition; Pixelation fade; Blocky dissolve

**Group:** Transitions
**Subcategory:** Pixel & stylised

## What you see

Pixel blocks grow until the image is a few big colour patches; the scene swaps at the peak, then blocks shrink back to sharp.

## Not to be confused with

Not a dither (TRN-09, dot-pattern replacement) nor an upscaling filter. In a pixelate transition the resolution itself changes.

## Use it for

Classic console-style scene changes, teleports, entering a painting.

## Tunable parameters

max block size · step mode (integer / continuous) · duration · brightness dip · swap point

## Request prompt

In your game, build a pixelate transition: over 0.4 s step the block size 1→2→4→8→16 game pixels (integer steps), swap to the new scene at the peak, then reverse back to 1 over 0.4 s while dimming brightness by 20%.

## Implementation hint

Pixel shader: uvq = (floor(uv*res/b)+0.5)*b/res, sample with point filter. Integer power-of-two steps look most "console"; use the snapshot of A for the first half and live B for the second.

## Related

- [TRN-09](TRN-09.md) — Dither transition
- [TRN-01](TRN-01.md) — Fade to black
- [PIX-04](PIX-04.md) — Pixel-art upscaling filters

## References

- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
- [Wikipedia — Pixel art](https://en.wikipedia.org/wiki/Pixel_art)
