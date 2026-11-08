# REN-34 · Depth of Field/DoF/Bokeh

**Aliases:** Depth of field; DOF; 景深; 敘事對焦; 焦點在眼睛; Miniature; Tilt-shift; Tilt shift; Split-field diopter; Split diopter; 雙焦點濾鏡; スプリット・ディオプター; 微型景深; 移軸

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

a character stays sharp while distant or nearby scenery blurs; bright points may become discs or aperture-shaped patches.

## Not to be confused with

DoF is the depth-of-field effect; bokeh emphasizes the character of out-of-focus regions and highlight shapes. It is not motion blur. Depth-based post-process approximations can produce color bleeding or halos around hair, transparency, and foreground/background boundaries.

## Use it for

directing attention, cinematic shots, and miniature looks. In dialogue, place the focus on the character’s eyes and let near and far scenery soften with distance. Screen-space HUD must stay fully sharp. (Former entry CAM-28, “Depth of field”, is merged here.)

## Tunable parameters

focus distance · aperture · focal length · near blur · far blur · bokeh blades

## Request prompt

In your game, add depth of field: use a 50 mm lens at f/2.0 focused at 4 meters, keep the character sharp from 3.5 to 4.5 meters, and turn lights beyond 12 meters into roughly 18 px hexagonal bokeh.

## Implementation hint

Derive a circle of confusion from camera focus and aperture, then gather or scatter color while respecting foreground/background depth boundaries. Treat transparent and hair-like geometry with an explicit compositing strategy.

## Related

- [PP-16](PP-16.md) — Prism filter / Split-prism image
- [REN-35](REN-35.md) — Lens flare/Lens ghost

## References

- [Unreal — Post Process Effects，Depth of Field／Camera](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
