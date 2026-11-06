# REN-41 · Temporal ghosting/History smearing/Disocclusion artifacts

**Group:** Image quality & render diagnostics
**Subcategory:** Clarity, Shimmering, and Residual Images

## What you see

translucent tails follow moving characters, grass blades, or glowing objects; newly revealed backgrounds briefly appear smeared.

## Not to be confused with

this can arise from TAA, temporal upscaling, volumetric-fog reprojection, or other temporal accumulation; trails alone do not prove TAA is responsible. Check motion vectors, transparency/vertex animation, history validity, and disocclusion (previously hidden areas becoming visible). First A/B test by separately disabling motion blur, TAA/upscaling, and volumetric effects. Higher frame rates may help, but are not a universal cure.

## Use it for

an artifact name for identification and debugging, not an effect to enable intentionally.

## Tunable parameters

motion vectors · history rejection · disocclusion mask · reactive mask · transparency velocity · frame weight

## Request prompt

In your game, diagnose and fix temporal ghosting: move a character at 8 m/s across a high-contrast wall and A/B test motion blur, TAA/upscaling, and volumetrics separately; after the fix, trails must disappear within two frames and disoccluded background must recover within three.

## Implementation hint

Identify which temporal accumulator owns the stale history, then verify motion vectors, disocclusion, and validity masks in that pass. Reject or reduce history around newly revealed pixels and surfaces whose shading changes independently of geometry.

## References

- [Godot — 3D antialiasing，TAA／FSR2](https://docs.godotengine.org/en/stable/tutorials/3d/3d_antialiasing.html)
- [Godot — Volumetric fog（temporal reprojection）](https://docs.godotengine.org/en/stable/tutorials/3d/volumetric_fog.html)
