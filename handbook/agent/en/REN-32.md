# REN-32 · Color grading/LUT/White balance

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

teal-and-orange, warm yellow, or cool blue looks; shadows and highlights may use different tints.

## Not to be confused with

color grading is the adjustment process; a LUT (lookup table) is one mapping tool, not a synonym for the effect. It cannot replace actual scene lighting; mismatched LUT color spaces or application order can cause errors.

## Use it for

unifying art direction and differentiating regions, seasons, and moods.

## Tunable parameters

temperature · tint · saturation · contrast · shadow color · highlight color · LUT strength

## Request prompt

In your game, add whole-image color grading: set the snow scene white balance to 7500 K and saturation to 0.9, add 8% cyan-blue to shadows and 4% warm yellow to highlights, use LUT strength 0.7, and keep skin-tone shift below 5%.

## Implementation hint

Apply white balance and creative grading in a known color space at a fixed point in the display pipeline. Blend grades by scene state and verify that neutral references and skin tones remain controllable.

## References

- [Unreal — Post Process Effects，Color Grading](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
