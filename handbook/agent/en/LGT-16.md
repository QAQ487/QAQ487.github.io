# LGT-16 · Stained-glass colored light pool

**Aliases:** Stained-glass light pool; Colored window caustic; Cathedral colour spill; 彩窗色光; 彩色玻璃投影; ステンドグラスの投影; 色つき窓光

**Group:** Lighting & shadows
**Subcategory:** Atmosphere & volume

## What you see

Colored glass (or a colored window) throws distinct hue patches onto the floor, pews, and anyone standing in the pool. Patches can creep as the sun angle changes.

## Not to be confused with

Not stained-glass cell style (NPR-20), which breaks the *image* into leaded glowing cells. Not the cookie method (LGT-03). Not water caustics (ENV-14, usually one sunlight colour as bright nets). Not a global grade (REN-32).

## Use it for

Cathedrals, colored-window corridors, interiors that need colour spill on people.

## Tunable parameters

pane colours · pool softness · sun-creep speed · intensity · which surfaces receive colour (authoring defaults)

## Request prompt

Enable cathedral window lighting → floor and a character in the pool → saturated colour shapes that match the window’s panes land on surfaces and move slowly with sun angle → restore white sunlight when disabled.

## Implementation hint

Project a multi-colour cookie (or several tinted cookies) from the window light into light space; multiply into direct lighting on receivers. Animate the projection with a slow sun-angle offset. Do not recolour the whole frame.

## Related

- [LGT-03](LGT-03.md) — Light cookie
- [ENV-14](ENV-14.md) — Caustics
- [LGT-15](LGT-15.md) — Komorebi / canopy light shafts
- [NPR-20](NPR-20.md) — Stained-glass cell style

## References

- [Wikipedia — Stained glass](https://en.wikipedia.org/wiki/Stained_glass)
- [Unity Manual — Cookies](https://docs.unity3d.com/Manual/Cookies.html)
