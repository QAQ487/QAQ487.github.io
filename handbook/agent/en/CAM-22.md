# CAM-22 · Rule of thirds

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

Characters, horizons, or key objects lie near the thirds lines or intersections of a nine-cell grid instead of everything crowding the center. (A general photographic composition guideline, not a physical law.)

## Not to be confused with

This does not mean any off-center image is better. Centered compositions can work too. Placing a character on a thirds line does not imply velocity-predictive look-ahead.

## Use it for

Balances the visual weight of characters and environment and provides a clear starting method for framing.

## Tunable parameters

subject thirds point · horizon line · look-room side · safe margin · anchor smoothing · composition override

## Request prompt

In your game, use thirds-based composition while exploring: place the character's head near viewport (0.33, 0.33) and the horizon at y=0.66. When the character moves left, mirror the anchor to x=0.67 over 0.35 s, preserving a 5% safe margin on every edge.

## Implementation hint

Express composition anchors in normalized viewport coordinates, then solve camera position or aim so selected subjects land near those anchors. Treat thirds as a tunable guide and allow gameplay constraints or central compositions to override it.

## References

- [Wikipedia — Rule of thirds](https://en.wikipedia.org/wiki/Rule_of_thirds)
