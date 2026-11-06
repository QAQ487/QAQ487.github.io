# REN-36 · Chromatic aberration/Color fringing

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

red, green, and blue channels become misaligned along object edges, especially near the image periphery.

## Not to be confused with

objects do not actually have colored outlines, and this is not necessarily a temporal error. Excessive strength harms detail and readability; whether UI is also affected depends on compositing order.

## Use it for

lens-imperfection looks, damage/impact feedback, and science-fiction visuals.

## Tunable parameters

radial strength · channel offset · center point · edge falloff · intensity · UI exclusion

## Request prompt

In your game, add chromatic aberration: use 0 px offset at the center and ramp red/blue separation to 1.5 px in the outer 10%; on a heavy hit, peak at 4 px within 0.15 seconds and recover over 0.4 seconds, excluding UI.

## Implementation hint

Offset color channels radially by a small, position-dependent amount, normally increasing toward the image edge. Apply it before UI composition and clamp the displacement to preserve text and gameplay readability.

## References

- [Unreal — Post Process Effects，Chromatic Aberration](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
