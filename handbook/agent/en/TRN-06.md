# TRN-06 · Luma wipe

**Aliases:** Gradient-mask wipe; Luma fade; Grayscale-map transition; Rule transition

**Group:** Transitions
**Subcategory:** Shape & mask wipes

## What you see

A greyscale map decides when each pixel switches: a threshold sweeps from black to white, so dark areas of the map switch to the new scene first and the boundary can take any pattern (swirl, clouds, brush).

## Not to be confused with

A shape wipe (TRN-04) scales one shape; a luma wipe can make almost any wipe style from an image. Japanese visual-novel engines call these maps "rule images".

## Use it for

One shader plus a set of mask images gives you a whole transition library — ideal for engine tooling.

## Tunable parameters

mask texture · progress k · edge softness · invert · edge glow colour

## Request prompt

Implement a generic luma-wipe transition in your engine: inputs are old frame, new frame, greyscale mask, progress k and edge width; show the new frame where mask < k, blending smoothly within a 0.05 edge band. First use it in the game with a swirl mask for entering the forest.

## Implementation hint

out = lerp(A, B, smoothstep(k - e, k + e, k*(1+2e) - e > mask ? 1 : ...)) — in practice: w = saturate((k*(1+e) - mask)/e); out = lerp(A,B,w). Sample the mask with linear filtering; keep k remapped so 0 and 1 are fully A/B.

## Related

- [TRN-04](TRN-04.md) — Shape wipe
- [TRN-05](TRN-05.md) — Clock wipe
- [TRN-09](TRN-09.md) — Dither transition
- [VFX-04](VFX-04.md) — Dissolve

## References

- [Kronnect Transitions Plus — transition types (docs)](https://kronnect.com/docs/transitions-plus/transition-types/)
- [Wikipedia — Wipe (transition)](https://en.wikipedia.org/wiki/Wipe_(transition))
