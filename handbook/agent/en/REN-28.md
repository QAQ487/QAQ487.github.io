# REN-28 · High Dynamic Range/HDR rendering

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

exposure and mapping can retain distinct levels in bright windows and dark rooms; intensely bright areas can drive bloom.

## Not to be confused with

HDR describes a brightness range/data representation, not one style. Internal HDR rendering does not mean an HDR signal is being sent to an HDR monitor; the final output can be SDR. A high-contrast image alone cannot establish whether an HDR buffer was used.

## Use it for

lighting accumulation, exposure adjustment, and bright-region post-processing.

## Tunable parameters

buffer range · white point · exposure · highlight threshold · precision · output mode

## Request prompt

In your game, add an HDR rendering pipeline: preserve at least 0 to 16 linear scene brightness, set exterior sunlight peaks to 12 and interior lamps to 2, and retain gradation in both after reducing exposure by 2 stops.

## Implementation hint

Accumulate scene lighting in a format that preserves values well above display white, then apply exposure and display mapping later. Keep internal HDR rendering distinct from the final SDR or HDR display encoding.

## References

- [Godot — Environment and post-processing，Tonemap](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
