# DIAG-07 · Detail normal blending (reoriented normal mapping)

**Aliases:** 細節法線變平; 疊加法線後凹凸消失; 法線圖疊起來變扁; Detail normals look flat; Bumps vanish after blending normals; Wrong normal blend; Linear normal blend; RNM; UDN blend; Whiteout blend; ディテールマップ; セカンドノーマルマップ

**Group:** Image quality & render diagnostics
**Subcategory:** Normals & specular

## What you see

A small-scale detail normal map (wear, pores, weave) is layered over a large brick-wall normal map, and both sets of bumps get shallower; details on slopes look flattened or point the wrong way under grazing light. The cause is adding or averaging the two normals: normals are directions and can't be mixed like colours. Using RNM (rotating the detail normal onto the base normal) or the cheaper UDN/Whiteout formulas keeps the detail strength and tilts it correctly along the large shape.

## Not to be confused with

Not normal mapping itself (REN-13 only defines faking bumps with shading), not triplanar mapping (MATX-03, which handles texture orientation without UVs), and not height-blend splatting (MATX-04, which handles transitions between two materials). This entry is about combining two normal maps correctly.

## Use it for

Detail normals on skin and cloth, detail layers on terrain, wear and scratch overlays, decal normals on top of wall normals.

## Tunable parameters

blend formula (linear / UDN / Whiteout / RNM) · detail strength (scale n2.xy) · detail tiling and UV set · detail mask · normal-map encoding (BC5 two-channel, reconstruct z) · tangent-space consistency between maps

## Request prompt

Fix detail-normal blending in the game's materials: decode the base normal n1 and detail normal n2 to [-1,1]; switch to RNM: t = n1 + (0,0,1), u = n2 × (−1,−1,1), result = normalize(t × dot(t,u) − u × t.z); on mobile, Whiteout is acceptable: normalize(float3(n1.xy + n2.xy, n1.z × n2.z)); control detail strength by scaling n2.xy, not by scaling after the blend. The weave on sloped areas must read as clearly as on flat areas.

## Implementation hint

All formulas in tangent space with both maps decoded to [-1,1] and z reconstructed for two-channel formats. Linear (avoid): normalize(n1 + n2). UDN: normalize(float3(n1.xy + n2.xy, n1.z)). Whiteout: normalize(float3(n1.xy + n2.xy, n1.z × n2.z)). RNM: t = n1 + (0,0,1); u = n2 × (−1,−1,1); n = t × dot(t,u)/t.z − u, then normalize. Both maps must share the same tangent basis (same UV set or same mikktspace bake); engines' 'detail normal' material slots usually implement one of these — check which.

## Related

- [MATX-03](MATX-03.md) — Triplanar mapping
- [MATX-04](MATX-04.md) — Height-blend texture splatting
- [DIAG-10](DIAG-10.md) — Specular anti-aliasing (Toksvig / geometric roughness)
- [REN-13](REN-13.md) — Normal mapping/Bump mapping

## References

- [Barré-Brisebois & Hill — Blending in detail (reoriented normal mapping)](https://blog.selfshadow.com/publications/blending-in-detail/)
- [Unity マニュアル — セカンダリマップ（ディテールマップ）と詳細マスク](https://docs.unity3d.com/ja/current/Manual/StandardShaderMaterialParameterDetail.html)
