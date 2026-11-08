# REN-35 · Lens flare/Lens ghost

**Aliases:** Anamorphic flare; Streak filter; Anamorphic streaks; 變形鏡頭橫向光斑; 拉絲濾鏡; アナモフィックフレア; ストリークフィルター

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

chains of colored spots, rings, or streaks appear near strong lights or along the lens direction.

## Not to be confused with

this is not bloom's simple spreading of bright regions; a lens ghost is not a TAA history trail either. Real-time methods can generate sprites/images; poor occlusion checks can leave flares visible even when walls block the light.

## Use it for

simulating internal lens reflections, intense light, and a photographic look; also useful stylistically. Long directional streaks / a streak filter can evoke anamorphic horizontal flares, but a streak filter is not full anamorphic optics; oval bokeh → REN-34, letterbox / anamorphic framing bars → CIN-01.

## Tunable parameters

ghost count · flare intensity · streak length · chromatic tint · occlusion · threshold · anamorphic streak filter

## Request prompt

In your game, add lens flare with directional streaks: when the sun exceeds brightness 6, create five ghosts along the center axis and an 80 px directional streak at intensity 0.3; fade within 0.1 s when more than 70% occluded. Note that a streak filter is not full anamorphic optics.

## Implementation hint

Generate lens ghosts and long directional streaks from bright visible sources using a controlled optical-style layout. A streak filter can evoke anamorphic horizontal flares but is not full anamorphic optics. Suppress when the source is occluded; oval bokeh belongs with REN-34.

## Related

- [REN-34](REN-34.md) — Depth of Field/DoF/Bokeh
- [CIN-01](CIN-01.md) — Letterbox
- [PP-16](PP-16.md) — Prism filter / Split-prism image

## References

- [Unreal — Post Process Effects，Lens Flare](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
