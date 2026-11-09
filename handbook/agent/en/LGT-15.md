# LGT-15 · Komorebi / canopy light shafts

**Aliases:** Forest light shafts; Canopy god rays; Crepuscular rays through trees; Tree-filtered sunbeams; Jacob's ladder in woodland; 木漏れ日; 林間光芒; 樹隙光束; 樹蔭光芒; 木洩れ日; 樹間の光芒; 林間の天使の梯子

**Group:** Lighting & shadows
**Subcategory:** Atmosphere & volume

## What you see

Sunlight leaks through gaps in a forest canopy and becomes visible as several pale shafts in mist or dust, fanning through dark trunks toward a path or road. The air inside each shaft is brighter than the air beside it. Where a shaft meets the ground or a wet road, it lands as a bright elongated pool — not a scatter of small round discs. Canopy leaves may glow at the rim of the opening; the woodland interior stays dark. As foliage sways or the sun angle creeps, the shafts drift and the landings slide.

## Not to be confused with

Not a light cookie / gobo (LGT-03 — a projector-mask method that can stamp leaf spots or window bars onto surfaces without any visible air shafts). Not ground 光斑 / dappled discs only: a floor of bouncing circular spots with no shafts readable in the air is not this card — that cheap cookie approximation must not be treated as 木漏れ日 here. Not volumetric lighting / god rays in general (REN-27 — church windows, stage spots, any occluder through smoke or fog). Not a single object’s cast shadow / penumbra (REN-25). Not large slow cloud-shadow patches (ENV-07). Not glow inside backlit leaves themselves (LGT-17). This card is the specific forest-canopy picture: many shafts shaped by leaf gaps, dark woodland, a receding path or road receiving the landings.

## Use it for

Forest paths, woodland combat, outdoor scenes that need sunlight through leaf gaps as visible shafts.

## Tunable parameters

shaft count · mist density · canopy gap contrast · landing elongation · foliage-sway phase · sun angle (authoring defaults)

## Request prompt

Enter a sunlit forest presentation → the woodland air, the canopy opening, the path or road, and anyone standing in a shaft → several pale shafts become visible in mist where leaf gaps aim, the air inside each shaft brightens, and elongated bright pools land where shafts meet the ground; shafts drift as foliage sways → restore clear air and even illumination when disabled.

## Implementation hint

Occlude a strong directional sun with canopy foliage (or a high-contrast canopy shadow map). Integrate scattering in a participating medium (mist/dust) so shafts are visible in air, not only as surface multiply. Where a shaft hits the ground, add a brighter elongated pool (wet-road specular optional). Animate the canopy / shadow map with a slow foliage-sway phase so shafts drift. Do not implement this card as a tiled circular-spot cookie on the ground with no volumetric term.

## Related

- [LGT-03](LGT-03.md) — Light cookie
- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra
- [REN-27](REN-27.md) — Volumetric lighting/Volumetric fog/Light shafts/God rays
- [ENV-07](ENV-07.md) — Cloud shadows
- [ENV-08](ENV-08.md) — Foliage sway
- [REN-29](REN-29.md) — Bloom/Glow
- [LGT-17](LGT-17.md) — Backlit leaf translucency

## References

- [Wikipedia — Komorebi](https://en.wikipedia.org/wiki/Komorebi)
- [CAPA — 『ブラックミスト』で映画のワンシーンのように](https://getnavi.jp/capa/special/418770/)
- [Unity Manual — Cookies](https://docs.unity3d.com/Manual/Cookies.html)
