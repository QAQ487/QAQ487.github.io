# NAV-06 · Range indicator

**Aliases:** Tower radius; Attack range circle; Range preview

**Group:** Visual guidance & wayfinding
**Subcategory:** Placement & range

## What you see

When a tower, unit or skill is selected or being placed, a translucent circle (or set of tiles) with a clear edge appears around it, showing how far it can attack or affect; enemies inside are marked. Before an upgrade, the new radius is often previewed as a dashed ring.

## Not to be confused with

Not an attack telegraph (NAV-04, an enemy hit about to land, with a countdown); a range indicator is information about your own unit and stays while selected. Not fog of war (ENV-15, which shows vision, not attack reach).

## Use it for

Tower defense, real-time strategy, tactics games (move / attack tiles), skill aiming.

## Tunable parameters

radius = gameplay range · fill & edge alpha · when shown (hover, select, placement) · in-range highlight · upgrade preview style · circle vs tiles

## Request prompt

Add range indicators to the game: when the cursor hovers or selects a tower, draw a circle centred on it with radius = attack range, fill rgba(255,255,255,0.12) and a 1 px rgba(255,255,255,0.8) edge; enemies inside get a 3 px red marker above their heads. While the upgrade button is hovered, draw the upgraded radius as a dashed ring with 2 px gaps; on upgrade, grow the radius over 0.25 s with ease-out.

## Implementation hint

Draw a circle quad on the ground layer below units with a shader: d = length(uv); fill alpha inside, an edge band near d = 1, discard outside (dash by angle for previews). For tile-based games, flood-fill the reachable tiles and tint them. Use the same range value as the targeting query.

## Related

- [NAV-04](NAV-04.md) — Attack telegraph
- [NAV-05](NAV-05.md) — Placement ghost
- [ENV-15](ENV-15.md) — Fog of war

## References

- [GDQuest — Visualizing the weapon’s attack range (tower defense)](https://school.gdquest.com/courses/godot_2d_secrets_godot_3/tower_defense/visualizing_attack_range)
- [GameDev.Land — Tower Defense with PIXI, step 6: tower coverage](https://gamedev.land/articles/tower-defense/preparation-for-shooting/)
- [Wikipedia — Tower defense](https://en.wikipedia.org/wiki/Tower_defense)
