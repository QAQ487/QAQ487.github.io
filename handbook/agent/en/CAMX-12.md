# CAMX-12 · Split screen / Dynamic split screen

**Aliases:** Voronoi split screen; Splitscreen; Dynamic split

**Group:** Camera & composition
**Subcategory:** Camera moves & cuts

## What you see

In local multiplayer the screen is divided and each player gets a camera. The dynamic (Voronoi) version uses one shared view while players are close; once they drift apart, the screen splits along a line perpendicular to the line between them, so the divider’s angle tells you where your partner is.

## Not to be confused with

Not zoom-to-fit (CAMX-02, one camera zooming out to keep everyone); split screen uses several cameras. Not a fixed horizontal/vertical split; the dynamic divider rotates and merges when players are close.

## Use it for

Local co-op or versus, two-player games where each explores freely but must know where the other is.

## Tunable parameters

split distance · merge feather range · divider width/colour · player placement within half · max players (2 vs N-way)

## Request prompt

In your game, add a two-player dynamic split screen: while the players are within 60% of the screen height of each other, use one camera at their midpoint; beyond that, split the screen along the line perpendicular to the players’ separation, with each camera placing its player at the centre of its half; fade the divider width from 0 to 3 px with distance so merging and splitting never pop.

## Implementation hint

Render each player camera to its own target (or use stencil per region); composite with a fullscreen pass choosing the source per pixel by sign(dot(pixel − centre, n)). Camera_i = player_i ± n × r, where r = splitDistance/2, so the merged and split views match at the threshold.

## Related

- [CAMX-02](CAMX-02.md) — Zoom-to-fit
- [CAM-13](CAM-13.md) — Group framing／Multi-target framing
- [UI-09](UI-09.md) — Off-screen indicator / Edge arrow

## References

- [Wikipedia — Split screen (video games)](https://en.wikipedia.org/wiki/Split_screen_(video_games))
- [Matt Woelk — Voronoi split screen: a quick tour](https://mattwoelk.github.io/voronoi_split_screen_notes/)
- [Godot demo projects — Dynamic split screen (GitHub)](https://github.com/godotengine/godot-demo-projects/tree/master/viewport/dynamic_split_screen)
- [Juicing Your Cameras With Math (GDC, YouTube)](https://www.youtube.com/watch?v=tu-Qe66AvtY)
