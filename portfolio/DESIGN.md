# Portfolio — design notes (Trellis Telemetry, 2026/11)

The portfolio was redesigned in November 2026 so it reads less like a text list: the facts are plotted as charts, diagrams and icons. The colour tokens and typefaces stay the same; the engine showcase keeps its WebGL hero at `/portfolio/works/ivy-engine/`.

Subject: a Japanese-primary 就職 portfolio for YEUNG Tsz Yau (Terry), an engine programmer who builds Ivy Engine and makes games on it.
Audience: hiring engineers and recruiters at Japanese game companies (they skim).

## Idea

A garden trellis and an instrument graticule laid over each other, with one living line growing through them. The page is a "field journal plate": a fine lattice ground, hairline panels, small mono labels (`Fig. 03`), and one luminous accent (Fern) that marks what is alive — the current value, the active branch, an award.

## Colour (6 named tokens, dark) — unchanged

| Name | Hex | Role |
| --- | --- | --- |
| Canopy | `#0F1A16` | Page ground |
| Hollow | `#1A2C26` | Panels, wells |
| Lumen | `#E6EFE8` | Body text |
| Moss | `#9EB0A8` | Secondary text |
| Fern | `#9FD0B0` | The one accent: links, live data, awards, active language |
| Trellis | `#7E9A8F` | Structure, axes, labels |

## Type

- Display: **Dela Gothic One** (names, section titles, big numbers). Traditional Chinese text uses Noto Sans TC Bold instead; Latin work titles keep Dela in every language.
- Body: **IBM Plex Sans JP** / **Noto Sans TC**.
- Labels and figure numbers: **IBM Plex Mono** (Latin subset).
- All WOFF2 files are subset to the characters used on the hub, portfolio and work pages. Re-subset them from the full fonts when new text is added (see `fonts/OFL.txt`).

## Pages

- Hub (`/`): wordmark, three destination panels.
- Portfolio (`/portfolio/`):
  1. Hero — name, role line, chips; a spiral "vine" plotting the seven works in time order.
  2. Stat strip — six numbers with icons.
  3. 自己PR — the statement, a build-time bar chart with awards, the debug loop (hypothesis → options → compare → verify → isolate), and three goals after joining.
  4. Skills — tech stack cards and four language rings.
  5. Ivy Engine — six stages with screenshots, and a stacked "capability layers" chart showing what each work added to the engine.
  6. Timeline — Gantt chart with the framework → engine lineage, two donuts, awards.
  7. Works — cards with a muted loop, PV button, role / challenge / lesson rows.
- Work pages (`/portfolio/works/<work>/`): title, PV player, KPI column, challenge and lesson panels, a spec sheet (unfilled items shown as dashed cards), previous / next.

## Ivy Engine page — "Pressed Signal" (2026/11)

`/portfolio/works/ivy-engine/` is the flagship work page. It keeps the work-page parts (`w-hero`, `sh`, `facts2`, `w-nav`) and adds a field-journal layer in `css/ivy.css` and `js/ivy.js` (feature atlas tabs; without JS every panel shows).

- Hero: Fig. 01 anatomy plate (portrait) beside six KPIs and the five layers L4–L0.
- Sections 01–10: anatomy diagrams (inline SVG, trilingual), frame, rendering + GPU-skin case, feature atlas (350 items from the old chips), editor live sketch, test bridge, ADR 0001–0008, limits and next, games, spec sheet.
- Plates live in `plate/`: `fig02-frame`, `fig03-strata`, `fig04-bridge`, `fig05-rings` (pycairo scripts with a shared `common.py`; PDF + PNG + a 1600px WebP for the page). Labels inside plates are code-like English; every caption around them is ja / en / zh. The design philosophy is `plate/pressed-signal-philosophy.md`.
- Source of facts: the engine repo `docs/` (manual, user guide, content project, test bridge, ADRs, TODO).

## Rules

1. Information is plotted before it is written. Words anchor what the chart already shows.
2. Fern is used sparingly; everything else is Trellis, Moss and hairlines.
3. Every visible string has ja / en / zh. Chart labels are SVG `<text>` with `data-ja` / `data-en` / `data-zh`.
4. Honesty: unfilled facts stay visible as "not filled in yet"; the WebGL editor is labelled as a sketch.
5. Motion: loop clips play only while on screen and never under `prefers-reduced-motion`.

Icons: the original hand-drawn sprite in `/icons.svg`, plus a few from Lucide (ISC License), marked in the sprite.
