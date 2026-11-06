# QAQ487.github.io

Static personal site served by GitHub Pages from the repository root (`main` branch, path `/`).

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Homepage. The intro line is placeholder text; edit it in place. Add further work by appending another `<li>` inside `.cards`. |
| `handbook/index.html` | Self-contained, offline single-file page: 遊戲畫面表現手冊 / Game Visual Handbook / ゲーム画面表現ハンドブック. |
| `handbook/llms.txt` | Agent catalog for the handbook (do not ingest the SPA HTML). |
| `handbook/agent/en/*.md` | One English Markdown file per handbook entry for agents. |
| `llms.txt` | Root pointer to `/handbook/llms.txt`. |
| `.nojekyll` | Empty marker so GitHub Pages publishes the files as-is and skips Jekyll. |

The handbook is built from `handbook-src/` (`python3 build.py`). Open `index.html` in a browser, or publish the `main` branch with GitHub Pages.
