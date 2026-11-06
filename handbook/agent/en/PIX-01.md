# PIX-01 · Integer scaling

**Aliases:** Pixel-perfect rendering; Nearest-neighbour upscaling; Point filtering; Low-res render target

**Group:** 2D & pixel-art techniques
**Subcategory:** Display & scaling

## What you see

The whole game is drawn into a tiny low-resolution canvas (e.g. 320×180) and then enlarged to the screen by a whole-number factor — 2×, 3×, 4× — with nearest-neighbour sampling. Every art pixel becomes an identical square on screen with sharp edges and no blur. Leftover space is letterboxed.

## Not to be confused with

Not an upscaling filter (PIX-04, which invents smooth edges), and not merely switching texture filtering to point: at a non-integer factor like 2.5× even nearest-neighbour gives alternating wide and narrow pixel columns (see PIX-23 mixels). Bilinear filtering makes the whole image soft.

## Use it for

The foundation of pixel art: it decides how big a character reads, whether lines stay stable, and whether things shimmer when they move. Every other pixel effect sits on top of this display pipeline.

## Tunable parameters

base resolution (320×180 / 384×216 / 480×270) · integer factor = floor(min(winW/baseW, winH/baseH)) · letterbox colour · UI at native vs base res

## Request prompt

Make the game render pixel-perfect: draw all game content into a 320×180 render target, use point (nearest) samplers everywhere, then upscale to the back buffer by the largest integer factor that fits the window, centring it with black letterbox bars. Character sprites are about 16×16, shown at 6× on 1080p. No bilinear filtering and no non-integer factors.

## Implementation hint

Render the world into a base-res render target (RGBA8, e.g. 320×180). Every sprite sampler: point/nearest filtering, clamp addressing, no mips. Final pass: viewport = (base*k) centred in the back buffer, draw a full-screen quad sampling the RT with the point sampler. Snap sprite positions to whole base pixels before writing vertices. Handle window resize by recomputing k, never by stretching.

## Related

- [PIX-02](PIX-02.md) — Pixel snapping
- [PIX-03](PIX-03.md) — Sub-pixel camera smoothing
- [PIX-04](PIX-04.md) — Pixel-art upscaling filters
- [PIX-23](PIX-23.md) — Mixels
- [PIX-26](PIX-26.md) — Texture bleeding and atlas padding

## References

- [Godot docs — Multiple resolutions (integer scaling)](https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html)
- [Unity — 2D Pixel Perfect package manual](https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html)
- [Cole Cecil — Scaling pixel art without destroying it](https://colececil.dev/blog/2017/scaling-pixel-art-without-destroying-it/)
- [Wikipedia — Nearest-neighbor interpolation](https://en.wikipedia.org/wiki/Nearest-neighbor_interpolation)
- [Microsoft Learn — D3D11_SAMPLER_DESC (point vs linear filtering)](https://learn.microsoft.com/en-us/windows/win32/api/d3d11/ns-d3d11-d3d11_sampler_desc)
