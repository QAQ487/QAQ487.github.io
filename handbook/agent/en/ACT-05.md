# ACT-05 · Wall-Jump Forgiveness / Wall-Jump Window

**Group:** Animation, movement & physics
**Subcategory:** Movement, Jumping, and Forgiveness

## What you see

A wall jump works even when the character is not quite flush against the wall, or is slightly away from it.

## Not to be confused with

A “window” need not be temporal; here it mainly refers to an acceptable distance. Celeste's pixel values should not be transplanted directly into another resolution or a 3D world.

## Use it for

Relax the spatial requirements for wall jumping so that intent is easier to express during fast movement.

## Tunable parameters

wall probe distance · surface normal · jump impulse · approach side · use limit

## Request prompt

Allow wall jumps from up to 12 cm away: use the nearest valid wall normal to launch outward, and permit only one trigger per wall departure.

## Implementation hint

Probe for a valid wall within a small spatial tolerance rather than requiring direct contact. Launch away from the detected surface and consume the wall-jump opportunity according to the movement rules.

## References

- [Maddy Thorson — Celeste & Forgiveness，§8–9](https://www.maddymakesgames.com/articles/celeste_and_forgiveness/index.html)
