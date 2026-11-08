# LGT-15 · Komorebi / dappled canopy light

**Aliases:** Dappled canopy light; Forest floor godets; Leaf-gap sunlight; 木漏れ日; 樹隙光斑; 木洩れ日; 葉隙間の光

**Group:** Lighting & shadows
**Subcategory:** Atmosphere & volume

## What you see

Under a tree canopy, rounded warm light spots land on the ground and slide across characters and props as leaf gaps move. Spots breathe and reshape with foliage sway, and canopy shade darkens coherently.

## Not to be confused with

Not a light cookie (LGT-03 — a method that can fake this picture). Not visible shafts in air (REN-27). Not a single object’s penumbra edge (REN-25). Not large slow cloud patches (ENV-07). This card names the recognizable canopy-dapple picture itself.

## Use it for

Forest paths, woodland combat, outdoor scenes that need sunlight through leaf gaps.

## Tunable parameters

spot scale · sway amplitude · warmth tint · canopy shadow depth · scroll speed (authoring defaults)

## Request prompt

Enter a sunlit forest presentation → ground, character, and nearby props under canopy → rounded warm spots appear where leaf gaps aim, slide and reshape as leaves sway, and darken coherently in canopy shadow → restore even illumination when disabled.

## Implementation hint

Multiply a soft circular/spot noise cookie (or projected gobo) over direct sun on ground and characters; animate UV with foliage-sway phase. Keep ambient separate so shade still reads. Prefer world-locked UVs so spots do not swim with the camera.

## Related

- [LGT-03](LGT-03.md) — Light cookie
- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra
- [REN-27](REN-27.md) — Volumetric lighting/Volumetric fog/Light shafts/God rays
- [ENV-07](ENV-07.md) — Cloud shadows
- [ENV-08](ENV-08.md) — Foliage sway
- [REN-29](REN-29.md) — Bloom/Glow

## References

- [Wikipedia — Komorebi](https://en.wikipedia.org/wiki/Komorebi)
- [CAPA — 『ブラックミスト』で映画のワンシーンのように](https://getnavi.jp/capa/special/418770/)
- [Unity Manual — Cookies](https://docs.unity3d.com/Manual/Cookies.html)
