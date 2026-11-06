# VFX-05 · UV scrolling

**Aliases:** Panning texture; UV panning; Texture scrolling; Scrolling UVs

**Group:** VFX & particles
**Subcategory:** Carriers & techniques

## What you see

The texture on a waterfall, conveyor, energy beam or magic ring keeps moving in one direction while the object itself stays still; two layers at different speeds give a sense of depth.

## Not to be confused with

Not a flowmap (VFX-03, direction varies per point); UV scrolling moves the whole texture uniformly. Not a flipbook (FX-04, swapping frames); here a single image is offset.

## Use it for

Waterfalls, conveyors, simple rivers, beams, portals, spinning magic-circle textures — extremely cheap.

## Tunable parameters

speed (u,v) per layer · layer count & blend · tiling · pixel snapping of offset · wrap mode

## Request prompt

In your game, use UV scrolling for waterfalls and beams: the waterfall texture scrolls down at 40 px/s with a second white ripple layer at 70 px/s and 50% opacity; round the offset to whole pixels to avoid shimmering. Beam textures scroll along their length at 120 px/s.

## Implementation hint

VS or PS: uv += speed * time (wrap/repeat sampler). Pass time in a per-frame constant buffer; keep time modulo the texture period to avoid float precision loss after hours. For pixel art: offset = floor(speed*time*texSize)/texSize.

## Related

- [VFX-03](VFX-03.md) — Flowmap
- [VFX-11](VFX-11.md) — Beam
- [FX-04](FX-04.md) — Flipbook / Sprite-sheet Animation

## References

- [Unity Shader Graph — Tiling And Offset node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Tiling-And-Offset-Node.html)
- [Godot docs — Your first 2D shader (UV / TIME)](https://docs.godotengine.org/en/stable/tutorials/shaders/your_first_shader/your_first_2d_shader.html)
