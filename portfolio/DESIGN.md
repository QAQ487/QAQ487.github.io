# Portfolio mockup — design plan

The live portfolio is a person-first job page at `/portfolio/`. This document still describes the engine showcase, which now lives at `/portfolio/works/ivy-engine/` (same tokens, type, and WebGL hero).



Subject: a Japanese-primary 就職 portfolio for Terry Yeung, an engine programmer who built Ivy Engine (ツタエンジン) and shipped games on it.
Audience: hiring engineers and recruiters at Japanese game companies (they skim).
Job of the page: make the engine’s world felt in one glance, then prove it with short project rows.

## Colour (6 named tokens, dark) — unchanged

| Name | Hex | Role |
| --- | --- | --- |
| Canopy | `#0F1A16` | Page ground — deep forest, green-cast, not neutral `#0B0B0B` / `#111` |
| Hollow | `#1A2C26` | Editor chrome, shot wells, raised panels |
| Lumen | `#E6EFE8` | Body text (cool off-white, ~15:1 on Canopy) |
| Moss | `#9EB0A8` | Captions and secondary text (AAA on Canopy) |
| Fern | `#9FD0B0` | The one accent: links, buds, focus, active language — dusty celadon, not acid lime |
| Trellis | `#7E9A8F` | Structural spine, frames, muted chrome |

## Type

- Display (wordmark only): **Dela Gothic One**, now a louder poster size `clamp(3rem, 11vw, 7.25rem)` against a quiet `1.05rem` body — contrast lives in scale, not in extra copy.
- Everything else: **IBM Plex Sans JP**, 400 / 500 / 600 / 700. Section titles step up to `clamp(1.55rem, 2.8vw, 2.2rem)`. Featured game title is larger than the others.
- Copy stays short: one-line lede, systems as label + one line, projects as title + one line + fact line + media well.

## Layout

Left-aligned. The **trellis** rail is more expressive: a fern-tinted head, a node at the header crossing, and a bud at each section title. Not a repeating ornament and not a numbered sequence.

Hub (`index.html`) remains a quiet poster — destinations shift slightly on hover. The live demo is reserved for the portfolio (boldness in one place).

Portfolio (`/portfolio/`):

```
[ name | 作品集                    日本語  English ]

ツタエンジン          (large wordmark)
lede (one line)

+------------------------------------------------------+
| titlebar                                             |
| hierarchy      LIVE WEBGL VIEWPORT        inspector  |
|  · Icosahedron  grid floor, PBR mesh,      Rotation  |
|  · Light        RGB gizmo, mouse orbit     Roughness |
|  · Grid                                      Metallic|
| asset strip                                          |
+------------------------------------------------------+
[ 2D+F11 ] [ Play mode ] [ Runtime boot ]

Systems — compact rows
Ivy games — large, asymmetric wells (featured Village; alternating sides)
Other work — slightly quieter wells
About — short table
```

## Hero: a live ghost editor (the characteristic object)

The viewport is no longer an empty grid. A tiny **vanilla WebGL** sketch (no libraries) suggests the engine’s world: a faceted icosahedron with a Cook-Torrance-ish shade, a grid floor, and an RGB gizmo.

One orchestrated loop (~8s): wireframe settles, fill fades in, slow auto-orbit, hierarchy selection syncs, inspector values tick. Pointer movement adds a little orbit. This is clearly labelled as a WebGL sketch, not a capture of the real D3D11 editor; real screenshots still belong in the wells below.

`prefers-reduced-motion`: one static shaded frame, no orbit, no ticking. Pause the loop when the editor is off-screen. Cap DPR, low-power context, small mesh.

## Depth elsewhere (not a card kit)

- Ivy games use larger media ratios; Village is a featured 16:9 well; Gravity Swing flips the well to the right.
- Shot wells and links react to hover (fern edge, a slight shift) — response to the user, not decorative shadow.
- No drop shadows, no gradient wash, no identical rounded card grid.

## Principles

1. Boldness is spent in the live editor; everything around it stays quieter.
2. Japanese is the default voice; English is a toggle, equally terse.
3. Honesty: the viewport is a web sketch; third-party libraries credited; private repos unlinked; missing facts marked as placeholders.

## Review against AI-default clusters (this pass)

- Cream + serif + terracotta: still rejected.
- Near-black + acid green: still rejected. Canopy/Fern unchanged; the demo’s base colour is a dusty celadon metal, not neon.
- Broadsheet: still one trellis, now with a few structural nodes, not dense hairlines.
- SaaS-card kit: rejected again. No card grid, no shared shadow, no wash. Projects stay full-width rows; only the media ratio and alternation change.
- Template chrome: no all-caps eyebrows, no middle-dot meta, no arrow suffixes, no monospace chips (inspector values use tabular figures in Plex).

A generic “make it less dull” pass would add glow, particles, and a bento grid. This pass makes the *editor itself* move, which is the subject’s world.
