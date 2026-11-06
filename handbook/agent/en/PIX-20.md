# PIX-20 · Mode 7 and raster effects

**Aliases:** Mode 7; Per-scanline effects; Line scroll; Raster scroll; HDMA effects

**Group:** 2D & pixel-art techniques
**Subcategory:** Scene construction

## What you see

Each horizontal scanline uses a different scroll or scale: lower lines are magnified more, so a flat map becomes a rotatable perspective floor stretching to the horizon (Mode 7). If each line only changes its horizontal offset you get heat-haze wobble, underwater sway or flag-like waves (line scroll).

## Not to be confused with

Not multi-layer parallax (PIX-15, whole layers translating) and not a true 3D floor. Everything comes from one set of parameters per line; the map itself is still a flat pixel image.

## Use it for

World-map flights, racing, warping boss backgrounds, per-line wobble for underwater or heat.

## Tunable parameters

horizon line · camera height h · field of view · rotation · per-line offset function (sin wave amplitude/frequency for line scroll)

## Request prompt

Make a Mode 7 world-map fly-over for the game: for each scanline y below the horizon compute distance d = h / (y − horizon) and from it the map sample position and scale for that line, rotating the map with the flight heading; draw a sky gradient above the horizon. Sample with nearest-neighbour so the distance does not turn to mush.

## Implementation hint

Full-screen pixel shader on the base-res RT: for pixel (x, y) below the horizon, d = h / (y − horizon + ε); world = camPos + R(angle) * float2((x − cx) * d / f, d); sample the map texture with point + WRAP. Line scroll: uv.x += amp * sin(y * freq + time) in base-res pixels, rounded to whole pixels for a crisp look.

## Related

- [PIX-15](PIX-15.md) — Parallax scrolling
- [ENV-17](ENV-17.md) — Heat haze
- [TRN-11](TRN-11.md) — Battle transition

## References

- [Wikipedia — Mode 7](https://en.wikipedia.org/wiki/Mode_7)
- [Wikipedia — Raster interrupt](https://en.wikipedia.org/wiki/Raster_interrupt)
- [Tonc (GBA programming) — Mode 7 part 1](https://www.coranac.com/tonc/text/mode7.htm)
