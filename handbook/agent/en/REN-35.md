# REN-35 · Lens flare/Lens ghost

**Aliases:** Anamorphic flare; Streak filter; Anamorphic streaks; 變形鏡頭橫向光斑; 拉絲濾鏡; アナモフィックフレア; ストリークフィルター

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

chains of colored spots, rings, or streaks appear near strong lights or along the lens direction.

## Not to be confused with

this is not bloom's simple spreading of bright regions; a lens ghost is not a TAA history trail either. Real-time methods can generate sprites/images; poor occlusion checks can leave flares visible even when walls block the light.

## Use it for

simulating internal lens reflections, intense light, and a photographic look; also useful stylistically.

## Tunable parameters

ghost count · flare intensity · streak length · chromatic tint · occlusion · threshold

## Request prompt

In your game, add lens flare: when the sun exceeds brightness 6, create five ghosts along the screen-center axis and an 80 px streak at total intensity 0.3; fade it within 0.1 seconds when a building occludes more than 70% of the sun.

## Implementation hint

Generate lens ghosts and streaks from bright, visible light sources or bright image regions using a controlled optical-style layout. Test source occlusion and suppress the effect when the light is behind solid geometry.

## Related

- [REN-34](REN-34.md) — Depth of Field/DoF/Bokeh
- [CIN-01](CIN-01.md) — Letterbox
- [PP-16](PP-16.md) — Prism filter / Split-prism image

## References

- [Unreal — Post Process Effects，Lens Flare](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
