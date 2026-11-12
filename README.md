# QAQ487.github.io

Static personal site served by GitHub Pages from the repository root (`main` branch, path `/`).

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Hub. Links to `/portfolio/`, `/portfolio/works/ivy-engine/`, and `/handbook/`. |
| `portfolio/index.html` | Job portfolio: profile, skills, works, and contact. Japanese by default, with Traditional Chinese and English. |
| `portfolio/works/` | One page per work. `ivy-engine/` keeps the engine showcase (WebGL hero and systems). |
| `css/`, `js/`, `fonts/` | Styles, language toggle, WebGL editor sketch, and self-hosted fonts shared by the hub and portfolio. Fonts are subset WOFF2 (Dela Gothic One, IBM Plex Sans JP); see `fonts/OFL.txt`. |
| `handbook/index.html` | Self-contained, offline single-file page: 遊戲畫面表現手冊 / Game Visual Handbook / ゲーム画面表現ハンドブック. |
| `handbook/llms.txt` | Agent catalog for the handbook (do not ingest the SPA HTML). |
| `handbook/agent/en/*.md` | One English Markdown file per handbook entry for agents. |
| `PURPOSE.md` | Purpose of the Game Visual Handbook (why it exists, what it covers, and what each card should answer). |
| `llms.txt` | Root pointer to `/handbook/llms.txt`. |
| `.nojekyll` | Empty marker so GitHub Pages publishes the files as-is and skips Jekyll. |

The handbook is built from `handbook-src/` (`python3 build.py`). Open `index.html` in a browser, or publish the `main` branch with GitHub Pages.
