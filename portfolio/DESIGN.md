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
- Work pages (`/portfolio/works/<work>/`): title, PV player, KPI column, challenge and lesson panels, a spec sheet (empty items are hidden), previous / next.

## Ivy Engine page — "Pressed Signal" (2026/11)

`/portfolio/works/ivy-engine/` is the flagship work page. It keeps the work-page parts (`w-hero`, `sh`, `facts2`, `w-nav`) and adds a field-journal layer in `css/ivy.css`. `js/ivy.js` only plays the game preview loops while they are on screen (never under reduced motion).

- Redesigned 2026/11/16 to be simpler and show no code: no file names, executable names, API names, version numbers or shortcut keys anywhere on the page or inside the plates.
- 2026/11/17: the engine repo went public, so section 06 "Code" now shows three short excerpts (GPU skinning with its CPU oracle switch, parallel update with sequential fallback, undo commands), each linked to a pinned commit on GitHub. The rest of the page still shows no code. The spec sheet moved to section 07.
- Hero: four KPIs (14 months, 350 features, 3 games, 1 developer) beside three plain lines (build, play, grow). No figure in the hero.
- Sections 01–07: what the engine is (one trilingual SVG diagram + three notes), features (an inline SVG vine, then eight system cards; hovering a leaf lights its card and back), games (three looping previews), the GPU-skin story (three panels, each with an inline SVG skeleton: scattered → compared → matched, then a one-line lesson), approach (three habits), spec sheet with three "next" items.
- The vine and the skeletons are inline SVG drawn with the page tokens (`--fern`, `--moss`, `--hollow`, `--line-2`) and page fonts, with no frame or baked-in text, so they sit on the site grid like the other diagrams. Their geometry is generated from the leaf outline in `plate/plate.py`; labels are `data-ja/en/zh` text.
- Plates in `plate/` (`fig01-vine`, `fig02-skin`, `ivy-engine-pressed-signal`, `fig02-frame`, `fig03-strata`, `fig04-bridge`, `fig05-rings`) are no longer on the page. Philosophies: `plate/pressed-signal-philosophy.md`, `plate/pressed-signal-quiet-philosophy.md`, `plate/specimen-scale-philosophy.md`.
- Source of facts: the engine repo `docs/` (manual, user guide, content project, test bridge, ADRs, TODO).

## Rules

1. Information is plotted before it is written. Words anchor what the chart already shows.
2. Fern is used sparingly; everything else is Trellis, Moss and hairlines.
3. Every visible string has ja / en / zh. Chart labels are SVG `<text>` with `data-ja` / `data-en` / `data-zh`.
4. Honesty: state only facts that are confirmed; a spec field or panel that is still empty (`is-empty`, `.pending`) is hidden rather than shown as "not filled in yet". Say plainly where generative AI made shipped assets. The WebGL editor is labelled as a sketch.
5. Motion: loop clips play only while on screen and never under `prefers-reduced-motion`.

Icons: the original hand-drawn sprite in `/icons.svg`, plus a few from Lucide (ISC License), marked in the sprite.
