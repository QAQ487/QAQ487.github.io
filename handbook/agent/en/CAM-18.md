# CAM-18 · Field of view／FOV

**Group:** Camera & composition
**Subcategory:** Projection and Apparent Distance

## What you see

With camera position unchanged, increasing FOV reveals more of the surroundings horizontally or vertically and generally makes the character smaller; decreasing it resembles moving closer. (General.)

## Not to be confused with

FOV is not the distance from camera to character. Horizontal and vertical FOV values cannot be compared directly, and aspect ratio affects the result. With the same sensor, increasing focal length decreases FOV.

## Use it for

Adjusts visible information and aiming views, and visually expresses speed or tension.

## Tunable parameters

base vertical FOV · target FOV · transition time · aspect ratio · speed mapping · aim override · comfort limit

## Request prompt

In your game, add dynamic FOV: use 60° vertical FOV while exploring, widening smoothly to 72° as running speed rises from 4 to 8 m/s, with 0.3 s attack and 0.5 s recovery. Aiming uses 45° over 0.18 s. Keep camera position fixed and let players reduce the sprint increase to 0°.

## Implementation hint

Animate the projection's FOV while leaving camera position unchanged, preferably interpolating focal length or tangent-half-angle for perceptually stable motion. Define all tuning against either vertical or horizontal FOV consistently and clamp accessibility-sensitive extremes.

## References

- [Epic：Camera Component Types 的 FOV／aspect ratio 說明](https://dev.epicgames.com/documentation/fortnite/camera-types-in-unreal-editor-for-fortnite?lang=en-US)
- [Epic Cinematic DOF：Focal Length](https://dev.epicgames.com/documentation/unreal-engine/cinematic-depth-of-field-in-unreal-engine?lang=en-US)
