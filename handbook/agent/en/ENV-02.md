# ENV-02 · Sky gradient

**Aliases:** Skybox; Sky dome; Gradient sky

**Group:** Environment, weather & time
**Subcategory:** Time & sky

## What you see

The background sky is a top-to-bottom colour gradient (in 3D a skybox surrounding the scene), changing with time, possibly with separate sun, moon, star and cloud layers.

## Not to be confused with

Not a day-night cycle (ENV-01, tinting the whole scene); the sky gradient handles only the farthest background. Not parallax scrolling (PIX-15, multi-depth layers).

## Use it for

Side-view or horizon scenes, title screens, showing time.

## Tunable parameters

colour stops per time · band count / dither · sun & moon path · star fade · cloud layers

## Request prompt

Add a sky gradient to side-view scenes (if any) or the title screen of the game: 3 colour stops (top/middle/bottom) with one palette per time of day, rendered as 8 dithered bands rather than a smooth gradient to stay pixel-art; move the sun and moon along an arc.

## Implementation hint

Fullscreen background quad with a pixel shader: lerp between stops by uv.y; quantise to N bands with an ordered-dither offset. In 3D, a cubemap skybox drawn with depth = far plane (depth test LESS_EQUAL).

## Related

- [ENV-01](ENV-01.md) — Day-night cycle
- [PIX-15](PIX-15.md) — Parallax scrolling
- [PIX-08](PIX-08.md) — Dithering

## References

- [Wikipedia — Skybox (video games)](https://en.wikipedia.org/wiki/Skybox_(video_games))
