# ENV-15 · Fog of war

**Aliases:** Unexplored darkness; Vision mask; Shroud

**Group:** Environment, weather & time
**Subcategory:** World state

## What you see

Unexplored map areas are black, explored-but-not-currently-visible areas are dimmed (terrain shown, enemies hidden), and only within units’ vision radius is everything visible; edges are usually soft or dithered.

## Not to be confused with

Not 2D shadow casting (PIX-22, line-of-sight shadows from obstacles) — though they combine well. Not cloud shadows (ENV-07, decorative). Fog of war controls what the player knows.

## Use it for

Strategy, tower defence, exploration maps; night or cave exploration in the game.

## Tunable parameters

cell size · vision radii · explored dim level · edge softness/dither · update rate

## Request prompt

Add fog of war to the game: an 8 px fog grid with three states (unexplored = black, explored = 50% dark with enemies hidden, visible = clear); hero vision radius 64 px, towers 96 px; dither the cell edges with a 2×2 Bayer pattern to stay pixel-art.

## Implementation hint

CPU updates a small R8 texture (one texel per cell: 0 unexplored, 0.5 explored, 1 visible); fullscreen pass samples it with linear filtering, then applies a Bayer threshold for the dithered edge. Gameplay uses the same grid to hide enemies.

## Related

- [PIX-22](PIX-22.md) — 2D shadow casting
- [PIX-08](PIX-08.md) — Dithering
- [ENV-07](ENV-07.md) — Cloud shadows

## References

- [Wikipedia — Fog of war](https://en.wikipedia.org/wiki/Fog_of_war)
- [Red Blob Games — 2D visibility](https://www.redblobgames.com/articles/visibility/)
