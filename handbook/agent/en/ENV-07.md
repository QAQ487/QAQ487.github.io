# ENV-07 · Cloud shadows

**Aliases:** Moving cloud shadows; Cloud shadow overlay

**Group:** Environment, weather & time
**Subcategory:** Weather

## What you see

Large soft dark patches drift slowly across the ground, like clouds blocking the sun; characters and buildings darken as they pass under.

## Not to be confused with

Not fog (which whitens and obscures) nor fog of war (ENV-15, visibility). Cloud shadows are only moving shade with no gameplay effect.

## Use it for

Adds life and a sense of wind to a static top-down map at very low cost.

## Tunable parameters

texture scale · scroll direction & speed · darkness · coverage threshold · softness

## Request prompt

Add cloud shadows to the game: a tileable 256×256 soft-noise texture scrolling north-east at 6 px/s, multiplied over ground and characters, darkest areas at 80% brightness; increase coverage on overcast days.

## Implementation hint

Fullscreen multiply pass (Blend: DestColor/Zero) sampling a tiling noise texture with world-space UVs + time*windDir so shadows stay locked to the world when the camera moves.

## Related

- [ENV-08](ENV-08.md) — Foliage sway
- [ENV-01](ENV-01.md) — Day-night cycle

## References

- [The Book of Shaders — Noise](https://thebookofshaders.com/11/)
