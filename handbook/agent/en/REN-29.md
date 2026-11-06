# REN-29 · Bloom/Glow

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

halos spread around signs, the sun, and intense highlights.

## Not to be confused with

bloom spreads bright image regions; it does not actually illuminate nearby objects, and is not emission. Thresholds and implementations vary; not all bloom necessarily operates only above a fixed brightness. Excessive bloom washes out detail and obscures materials.

## Use it for

communicating brightness, magical energy, and soft dreamlike atmosphere.

## Tunable parameters

threshold · knee · intensity · radius · mip count · tint

## Request prompt

In your game, add bloom: use threshold 1.2, soft knee 0.5, intensity 0.35, and a maximum 24 px halo radius; an emissive sign at intensity 8 should glow, while white UI must not trigger it.

## Implementation hint

Extract or weight bright image regions, blur them across several scales, and add the result back conservatively. Keep the source image intact and expose controls that prevent halos from swallowing nearby detail.

## References

- [Unreal — Post Process Effects，Bloom](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
- [Godot — Environment and post-processing，Glow](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
