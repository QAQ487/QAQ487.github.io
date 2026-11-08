# REN-30 · Exposure/Auto exposure/Eye adaptation

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

looking outside from a dark room initially looks very white, then gradually darkens; in the reverse direction, dark detail gradually becomes visible.

## Not to be confused with

the lights are not actually getting stronger/weaker. Auto-exposure metering regions, speed, and bounds affect brightness pumping; UI and emissive appearance can also be affected indirectly.

## Use it for

handling large brightness differences, controlling image brightness, and suggesting visual adaptation.

## Tunable parameters

compensation · minimum EV · maximum EV · adaptation up · adaptation down · metering mask

## Request prompt

In your game, add auto exposure: clamp it from EV -2 to 12, adapt dark-to-bright at 3 EV/s and bright-to-dark at 1.5 EV/s, give the central 60% of the image most metering weight, and exclude UI.

## Implementation hint

Estimate representative scene luminance with robust metering, convert it to a bounded exposure target, and approach that target at separate brightening and darkening rates. Exclude overlays and exceptional pixels from metering where appropriate.

## Related

- [REN-32](REN-32.md) — Color grading/LUT/White balance
- [PP-18](PP-18.md) — Image-intensifier night vision / NVG look

## References

- [Unreal — Post Process Effects，Exposure and Local Exposure](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
