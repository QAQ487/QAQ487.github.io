# LGT-06 · Baked lighting

**Aliases:** Lightmapping; Lightmaps; Precomputed lighting; Static lighting

**Group:** Lighting & shadows
**Subcategory:** Indirect light & shadows

## What you see

Lighting for static geometry is computed in advance and stored in textures (lightmaps) mapped back onto walls and floors: soft shadows, dark corners and bounced colour look detailed and cost almost nothing at run time — but moving objects leave no shadow in the baked light, and switching lights or changing time of day does not update it.

## Not to be confused with

Not global illumination itself (REN-20 Global illumination names the effect; baking is one way to get it) and not light probes (LGT-07, baked light sampled for moving objects). Versus real-time shadows (LGT-08): moving a light or object leaves baked lighting unchanged.

## Use it for

Static architecture, interiors, low-end platforms, scenes with fixed lights that need high-quality soft shadows and bounce light.

## Tunable parameters

texel density · bounce count · lightmap UV padding · HDR vs LDR · directional lightmaps · static/dynamic flags

## Request prompt

Use baked lighting for the game's interior levels: mark all non-moving walls, floors and furniture static, generate a second non-overlapping UV set, bake at 20 texels per metre with 2 bounces; do not bake moving characters and props — light them from light probes (LGT-07) and give them real-time shadows. Store lightmaps in an HDR format.

## Implementation hint

Offline: a lightmapper path-traces or radiosity-solves irradiance per lightmap texel. Run time: sample the lightmap with the second UV set (bilinear) and multiply albedo; add real-time direct light only from dynamic lights. Pad UV islands to avoid bleeding.

## Related

- [REN-20](REN-20.md) — Global illumination/GI/Indirect lighting/Color bleeding
- [LGT-07](LGT-07.md) — Light probes
- [LGT-08](LGT-08.md) — Shadow mapping and cascaded shadow maps
- [REN-21](REN-21.md) — Ambient occlusion/AO/Occlusion map
- [DIAG-04](DIAG-04.md) — HDR scene buffer and tone-mapping order

## References

- [Wikipedia — Lightmap](https://en.wikipedia.org/wiki/Lightmap)
- [Godot docs — Using Lightmap global illumination](https://docs.godotengine.org/en/stable/tutorials/3d/global_illumination/using_lightmap_gi.html)
- [Unity Manual — Lightmapping](https://docs.unity3d.com/Manual/Lightmapping.html)
- [Godot docs — Introduction to global illumination](https://docs.godotengine.org/en/stable/tutorials/3d/global_illumination/introduction_to_global_illumination.html)
