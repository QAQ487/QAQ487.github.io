# PIX-16 · Y-sorting

**Aliases:** Depth sorting; Y-sort; Painter's algorithm (by Y); Sort by foot position

**Group:** 2D & pixel-art techniques
**Subcategory:** Scene construction

## What you see

In a top-down or three-quarter view, objects are drawn from top to bottom by the Y coordinate of their feet: a character behind a tree (higher up) is covered by the tree, and when it walks in front (lower down) it covers the tree. The sort key is the object's bottom anchor, not the top of the image.

## Not to be confused with

Not a Z-buffer depth test (per-pixel depth in 3D) and not fixed layers (characters always above buildings). Y-sorting is a painter's algorithm re-sorted each frame by foot position.

## Use it for

Top-down RPGs, sims and tower defence — correct occlusion as characters weave between trees, houses and fences.

## Tunable parameters

sort key (foot Y, optional per-object offset) · tie-breaker · which layers are sorted vs fixed (ground, decals, UI) · multi-part objects split into separate sort entries

## Request prompt

Implement Y-sorting in the game: put all characters, trees, houses and fences in one sorted layer and every frame draw them in ascending order of their foot-anchor Y (sprite bottom centre); break ties by X then entity ID to prevent flicker. Tall buildings anchor on their foundation line, not their image centre.

## Implementation hint

CPU: build an array of (key = footY*65536 + footX, drawIndex) for the sorted layer, std::sort (or radix sort) each frame, then fill the dynamic sprite VB in that order — one draw call. Alternative: write footY as SV_Depth/vertex Z with a depth test and alpha-tested (clip) sprites, but that fails with semi-transparent pixels.

## Related

- [PIX-24](PIX-24.md) — Sprite pivot at the feet
- [PIX-18](PIX-18.md) — Fake height with ground shadow
- [PIX-17](PIX-17.md) — Autotiling

## References

- [sgeos — Y-sort article](https://sgeos.github.io/games/graphics/projection/2026/04/30/draw_order_y_sort_z_sort_and_painters_algorithm.html)
- [Wikipedia — Painter's algorithm](https://en.wikipedia.org/wiki/Painter%27s_algorithm)
- [Godot docs — Sprite2D (offset, centered, flip_h)](https://docs.godotengine.org/en/stable/classes/class_sprite2d.html)
