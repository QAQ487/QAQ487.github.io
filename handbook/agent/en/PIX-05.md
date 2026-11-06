# PIX-05 · RotSprite

**Aliases:** Pixel-art rotation; Rotating sprites without breaking lines

**Group:** 2D & pixel-art techniques
**Subcategory:** Display & scaling

## What you see

A pixel sprite is rotated to any angle and its lines stay one pixel wide and continuous, with no holes and no new blended colours. It works by upscaling 8× with a Scale2x-style algorithm, rotating, then sampling back down to the original size. By comparison, a straight nearest-neighbour rotation breaks diagonals into gaps and stray single pixels.

## Not to be confused with

Not real-time bilinear rotation (blurry, invents colours) and not hand-drawing each angle. RotSprite is normally baked offline or at load time, and the result is still rougher than hand-drawn frames.

## Use it for

Spinning weapons, flying arrows and projectiles, rotating doors or windmills — whenever you do not want to hand-draw every angle.

## Tunable parameters

number of baked angles (8/16/32) · pre-scale factor (8×) · downsample rule (centre sample vs similarity vote) · pivot pixel

## Request prompt

Pre-bake 16 rotation angles for the game's arrows and thrown axes: for each source image, Scale2x it to 8×, rotate with nearest-neighbour sampling, then take the centre pixel of every 8×8 block to shrink back to the original size, and store the results in the atlas. In game pick the closest angle to the flight direction — no real-time rotation.

## Implementation hint

Offline/tool step (C++ at asset import): scale2x ×3 → nearest rotate around the sprite pivot → pick centre texel of each 8×8 cell. Pack angles into the atlas; at runtime select frame = round(angle / (2π/N)) mod N. Keep the pivot on a whole pixel so the projectile does not wobble between angles.

## Related

- [PIX-04](PIX-04.md) — Pixel-art upscaling filters
- [PIX-11](PIX-11.md) — Manual anti-aliasing
- [PIX-24](PIX-24.md) — Sprite pivot at the feet

## References

- [Wikipedia — Pixel-art scaling algorithms (xBR, hqx, Scale2x, RotSprite)](https://en.wikipedia.org/wiki/Pixel-art_scaling_algorithms)
- [Scale2x — algorithm description](https://www.scale2x.it/algorithm)
