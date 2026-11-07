# LGT-03 · Light cookie

**Aliases:** Gobo; Projector texture; Light mask; Projected light texture

**Group:** Lighting & shadows
**Subcategory:** Light sources

## What you see

As if a cut-out plate sits in front of the light, the light on the floor and walls carries a pattern: window-frame bars, dappled light through leaves, coloured stained glass; the pattern moves or rotates with the light.

## Not to be confused with

Not a shadow (REN-25 Cast shadows / REN-25, made by real objects blocking light); a cookie is just a texture attached to the light, with no actual window or leaves needed in the scene. Not cloud shadows (ENV-07, usually a large layer scrolling over the whole ground).

## Use it for

Window light indoors, dappled forest light, stage and disco lights, irregular flashlight pools, cheaply implying off-screen objects.

## Tunable parameters

cookie texture · projection size / angle · scroll & rotation speed · colour vs greyscale · affects direct light only

## Request prompt

Add light cookies to the game's interiors: the spot light outside each window uses a 128×128 greyscale texture (2×3 panes, 8 px bars) to throw a grid of light on the floor; the forest directional light uses a dappled-leaf cookie panning at 0.05 UV/s to suggest leaves in the wind. Cookies affect direct light only, not ambient.

## Implementation hint

Project the shaded point into the light's space (spot: its view-projection; directional: an orthographic tiling projection; point: a cubemap) and multiply the light contribution by the sampled cookie. Uses the same light-space transform as a shadow map, but needs no depth comparison.

## Related

- [LGT-01](LGT-01.md) — Directional, point and spot lights
- [ENV-07](ENV-07.md) — Cloud shadows
- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra
- [LGT-14](LGT-14.md) — Moving light pool from a swinging fixture

## References

- [Unity Manual — Cookies](https://docs.unity3d.com/Manual/Cookies.html)
- [Wikipedia — Gobo (lighting)](https://en.wikipedia.org/wiki/Gobo_(lighting))
- [Godot docs — 3D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/3d/lights_and_shadows.html)
