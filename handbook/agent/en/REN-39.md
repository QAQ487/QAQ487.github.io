# REN-39 · FXAA/SMAA 1x/Spatial post-process AA

**Group:** Image quality & render diagnostics
**Subcategory:** Clarity, Shimmering, and Residual Images

## What you see

reduced jaggies, but fine patterns or text may soften slightly.

## Not to be confused with

FXAA and SMAA 1x are different algorithms, grouped here only to identify the category of single-frame image antialiasing; they are not synonyms. Without temporal data, they have limited ability to reduce moving fine-highlight shimmer. SMAA also has other variants; not every variant is 1x.

## Use it for

relatively inexpensive antialiasing without frame history.

## Tunable parameters

edge threshold · local contrast · search steps · blend weight · quality preset · sharpness

## Request prompt

In your game, add spatial post-process antialiasing: use an edge threshold of 0.1 and up to 16 search steps at 1080p, smooth diagonal railings, and preserve at least 90% of the original stroke contrast in 12 px text.

## Implementation hint

Detect high-contrast edge patterns in the current resolved image and blend across them with bounded neighborhood searches. Run after opaque compositing but before crisp UI, and protect fine texture with contrast thresholds.

## References

- [Godot — 3D antialiasing，FXAA／SMAA 1x](https://docs.godotengine.org/en/stable/tutorials/3d/3d_antialiasing.html)
