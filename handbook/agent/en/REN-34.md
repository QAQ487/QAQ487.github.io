# REN-34 · Depth of Field/DoF/Bokeh

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

a character stays sharp while distant or nearby scenery blurs; bright points may become discs or aperture-shaped patches.

## Not to be confused with

DoF is the depth-of-field effect; bokeh emphasizes the character of out-of-focus regions and highlight shapes. It is not motion blur. Depth-based post-process approximations can produce color bleeding or halos around hair, transparency, and foreground/background boundaries.

## Use it for

directing attention, cinematic shots, and miniature looks.

## Tunable parameters

focus distance · aperture · focal length · near blur · far blur · bokeh blades

## Request prompt

In your game, add depth of field: use a 50 mm lens at f/2.0 focused at 4 meters, keep the character sharp from 3.5 to 4.5 meters, and turn lights beyond 12 meters into roughly 18 px hexagonal bokeh.

## Implementation hint

Derive a circle of confusion from camera focus and aperture, then gather or scatter color while respecting foreground/background depth boundaries. Treat transparent and hair-like geometry with an explicit compositing strategy.

## References

- [Unreal — Post Process Effects，Depth of Field／Camera](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
