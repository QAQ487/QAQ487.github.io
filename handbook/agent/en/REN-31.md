# REN-31 · Tone mapping/Tonemapper/Filmic curve

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

highlights compress gradually instead of abruptly becoming white; contrast and bright colors also change.

## Not to be confused with

this is not simply brightening, nor is it color grading. Real-time curves labeled ACES/filmic may implement only an approximation or part of a pipeline; the name does not establish complete cinematic color management. Different curves can make the same material look different.

## Use it for

converting scene brightness into a displayable image and establishing its tonal character.

## Tunable parameters

curve · white point · toe · shoulder · contrast · output gamut

## Request prompt

In your game, add filmic tone mapping: set the linear white point to 11.2, begin a soft highlight shoulder at 4, map 0.18 middle gray to about 45% display brightness, and keep a red neon value of 8 from abruptly turning white.

## Implementation hint

Map scene-referred HDR values into the target display range with a smooth toe and highlight shoulder. Apply the transform in a documented color pipeline and test hue preservation in saturated highlights.

## References

- [Godot — Environment and post-processing，Tonemap](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
- [Unreal — Color Grading and Tonemapper](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
