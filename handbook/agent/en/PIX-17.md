# PIX-17 · Autotiling

**Aliases:** Tilemap; Bitmask autotiling; Wang tiles; Blob tileset; Terrain transitions; Tile seams; Atlas bleeding; Edge extrusion; 貼圖滲色; tile 接縫

**Group:** 2D & pixel-art techniques
**Subcategory:** Scene construction

## What you see

The map is a grid of fixed-size tiles (e.g. 16×16). When you paint a dirt road the engine checks whether each cell's 4 (or 8) neighbours are the same terrain and automatically picks straight, corner, T-junction and end tiles, so the road's edges join up naturally instead of looking like square blocks.

## Not to be confused with

Not hand-picking each tile (slow and error-prone) and not one big background image. Autotiling computes a neighbour bitmask per cell and looks up the matching tile.

## Use it for

Level editors and in-game terrain changes (digging paths, building walls, corruption spreading) with edges updating automatically. A hairline that appears only while the camera moves is the sampler reading the next cell, not a wrong edge tile. (Former entry PIX-26, “Tile seams”, is merged here.)

## Tunable parameters

tile size · 4-neighbour (16 tiles) vs 8-neighbour blob (47 tiles) vs corner/Wang (16 per pair) · terrain priority when 3 types meet · random variants per mask

## Request prompt

Add autotiling to the game's terrain: 16×16 tiles; the dirt/grass boundary uses a 4-direction bitmask (up 1, right 2, down 4, left 8) to choose among 16 edge tiles. When the player builds a road or enemies trample dirt, recompute that cell and its four neighbours immediately.

## Implementation hint

Keep the tile map as a CPU array of terrain IDs and a derived array of tile indices; on change, recompute mask = N|E<<1|S<<2|W<<3 for the cell and its neighbours and update only those instances in a dynamic instance buffer (one instanced quad draw per chunk). Atlas tiles need about 1 px of edge extrusion and nearest sampling, so a moving camera does not read the neighbouring cell as a seam.

## Related

- [ENV-16](ENV-16.md) — Corruption spread
- [PIX-16](PIX-16.md) — Y-sorting

## References

- [Godot docs — Using TileSets](https://docs.godotengine.org/en/stable/tutorials/2d/using_tilesets.html)
- [Boris the Brave — Classification of tilesets](https://www.boristhebrave.com/2021/11/14/classification-of-tilesets/)
- [Boris the Brave — Tileset roundup](https://www.boristhebrave.com/2013/07/14/tileset-roundup/)
- [Excalibur.js blog — Autotiling technique (bitmask)](https://excaliburjs.com/blog/Autotiling%20Technique/)
- [Wikipedia — Wang tile](https://en.wikipedia.org/wiki/Wang_tile)
- [Wikipedia — Tile-based video game](https://en.wikipedia.org/wiki/Tile-based_video_game)
