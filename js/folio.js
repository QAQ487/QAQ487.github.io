/* Portfolio charts (Trellis Telemetry). Every label carries data-ja / data-en / data-zh,
   so js/i18n.js translates the charts together with the rest of the page.
   This file must load before i18n.js. */
(function () {
  "use strict";
  const F = "#9FD0B0", T = "#7E9A8F", M = "#9EB0A8", L = "#E6EFE8", C = "#0F1A16", H = "#1A2C26", LN = "#2e3f39", LN2 = "#3d524a";
  const NS = "http://www.w3.org/2000/svg";
  const MONO = "IBM Plex Mono, monospace", BODY = "IBM Plex Sans JP, Noto Sans TC, sans-serif", DISP = "Dela Gothic One, Noto Sans TC, sans-serif";

  function el(p, tag, a) { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; }
  // s: a plain string, or { ja, en, zh }
  function tx(p, a, s) {
    const e = el(p, "text", a);
    if (typeof s === "string") { e.textContent = s; return e; }
    e.setAttribute("data-ja", s.ja); e.setAttribute("data-en", s.en); e.setAttribute("data-zh", s.zh);
    e.textContent = s.ja; return e;
  }
  const $ = (id) => document.getElementById(id);
  function useIcon(p, id, x, y, size, color) {
    const s = el(p, "svg", { x, y, width: size, height: size, viewBox: "0 0 24 24", color: color || F, fill: "none", stroke: "currentColor", "stroke-width": 1.5, "stroke-linecap": "round", "stroke-linejoin": "round" });
    el(s, "use", { href: "/icons.svg?v=20261115a#" + id });
    return s;
  }

  /* ---------- hero vine ---------- */
  function vine() {
    const s = $("vine"); if (!s) return;
    const W = 668, Hh = 720, cx = 322, cy = 372;
    const defs = el(s, "defs", {});
    const g = el(defs, "filter", { id: "vglow", x: "-50%", y: "-50%", width: "200%", height: "200%" }); el(g, "feGaussianBlur", { stdDeviation: 6 });
    for (let r = 60; r <= 300; r += 40) el(s, "circle", { cx, cy, r, fill: "none", stroke: LN2, "stroke-width": 1, "stroke-dasharray": r % 80 ? "2 5" : "none" });
    for (let i = 0; i < 120; i++) {
      const a = i / 120 * Math.PI * 2, r1 = 300, r2 = i % 10 ? 306 : 316;
      el(s, "line", { x1: cx + Math.cos(a) * r1, y1: cy + Math.sin(a) * r1, x2: cx + Math.cos(a) * r2, y2: cy + Math.sin(a) * r2, stroke: i % 10 ? LN2 : T, "stroke-width": 1 });
    }
    el(s, "line", { x1: cx - 330, y1: cy, x2: cx + 330, y2: cy, stroke: LN2, "stroke-width": 1 });
    el(s, "line", { x1: cx, y1: cy - 330, x2: cx, y2: cy + 330, stroke: LN2, "stroke-width": 1 });
    const pts = [], N = 420;
    for (let i = 0; i <= N; i++) { const t = i / N, a = -Math.PI * .5 + t * Math.PI * 3.15, r = 34 + t * 248; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * .98]); }
    const d = "M" + pts.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L");
    el(s, "path", { d, fill: "none", stroke: F, "stroke-width": 2, opacity: .22, filter: "url(#vglow)" });
    el(s, "path", { d, fill: "none", stroke: F, "stroke-width": 1.6, "stroke-linecap": "round" });
    for (let i = 14; i < N - 6; i += 13) {
      const p = pts[i], q = pts[i + 1], ang = Math.atan2(q[1] - p[1], q[0] - p[0]), side = (i / 13) % 2 ? 1 : -1;
      const la = ang + side, len = 9 + (i / N) * 9, tx2 = p[0] + Math.cos(la) * len, ty2 = p[1] + Math.sin(la) * len;
      const o = Math.PI / 2 * side, k = len * .32;
      const m1 = [(p[0] + tx2) / 2 + Math.cos(la + o) * k, (p[1] + ty2) / 2 + Math.sin(la + o) * k];
      const m2 = [(p[0] + tx2) / 2 - Math.cos(la + o) * k, (p[1] + ty2) / 2 - Math.sin(la + o) * k];
      el(s, "path", { d: `M${p[0]} ${p[1]} Q${m1[0]} ${m1[1]} ${tx2} ${ty2} Q${m2[0]} ${m2[1]} ${p[0]} ${p[1]}Z`, fill: i % 3 ? "none" : F, "fill-opacity": .18, stroke: F, "stroke-width": 1, opacity: .75 });
    }
    const proj = [["Scrap Burst", "2025/10", 1, "07"], ["Block Shooter", "2026/01", 0, "06"], ["Ivy Engine", "2026/04", 0, "01"], ["Magnet Field", "2026/04", 1, "05"], ["Frisbee Arena", "2026/08", 0, "04"], ["Gravity Swing", "2026/10", 0, "03"], ["Village & Goblin", "2026/10", 0, "02"]];
    const idx = [40, 105, 165, 200, 268, 365, 400];
    proj.forEach((pr, k) => {
      const p = pts[idx[k]];
      if (pr[2]) el(s, "circle", { cx: p[0], cy: p[1], r: 9, fill: C, stroke: F, "stroke-width": 1.5 });
      else { el(s, "circle", { cx: p[0], cy: p[1], r: 14, fill: "none", stroke: F, "stroke-width": 1, opacity: .35 }); el(s, "circle", { cx: p[0], cy: p[1], r: 6.5, fill: F }); }
      let sd = p[0] > cx ? 1 : -1; if (sd > 0 && p[0] + 150 > W - 6) sd = -1;
      const lx = p[0] + sd * 22, ly = p[1];
      el(s, "rect", { x: sd > 0 ? lx - 4 : lx - 132, y: ly - 17, width: 136, height: 36, fill: C, opacity: .82, rx: 2 });
      el(s, "line", { x1: p[0] + sd * 12, y1: p[1], x2: lx - sd * 4, y2: ly, stroke: T, "stroke-width": 1 });
      tx(s, { x: lx, y: ly - 3, fill: L, "font-family": BODY, "font-size": 13, "font-weight": 500, "text-anchor": sd > 0 ? "start" : "end" }, pr[0]);
      tx(s, { x: lx, y: ly + 13, fill: T, "font-family": MONO, "font-size": 10, "letter-spacing": 1, "text-anchor": sd > 0 ? "start" : "end" }, pr[1] + "  ·  NO." + pr[3]);
    });
    el(s, "circle", { cx, cy, r: 3, fill: F });
    tx(s, { x: cx + 10, y: cy + 22, fill: T, "font-family": MONO, "font-size": 10, "letter-spacing": 1.5 }, "ORIGIN · FRAMEWORK");
    tx(s, { x: W - 4, y: Hh - 28, fill: T, "font-family": MONO, "font-size": 10, "letter-spacing": 1.5, "text-anchor": "end" }, "FIG. 00B — GROWTH OF IVY, 2025/10 → 2026/11");
    tx(s, { x: W - 4, y: 46, fill: F, "font-family": MONO, "font-size": 10, "letter-spacing": 1.5, "text-anchor": "end" }, "07 NODES · 14 MONTHS");
  }

  /* ---------- 01b build time ---------- */
  function duration() {
    const s = $("dur"); if (!s) return;
    const W = 502, x0 = 150, x1 = 470, mw = (x1 - x0) / 6, X = (m) => x0 + m * mw;
    for (let m = 0; m <= 6; m++) {
      el(s, "line", { x1: X(m), y1: 50, x2: X(m), y2: 388, stroke: LN, "stroke-width": 1, "stroke-dasharray": m ? "2 4" : "none" });
      tx(s, { x: X(m), y: 40, "text-anchor": "middle", fill: M, "font-family": MONO, "font-size": 10 }, m < 6 ? String(m) : { ja: "6ヶ月", en: "6 mo", zh: "6 個月" });
    }
    const rows = [
      ["Scrap Burst", { ja: "チーム · 10人", en: "Team · 10", zh: "團隊 · 10 人" }, 6, 1, null],
      ["Magnet Field", { ja: "チーム · リード", en: "Team · lead", zh: "團隊 · 主程式" }, 4, 1, null],
      ["Frisbee Arena", { ja: "単独 · 約1か月", en: "Solo · ~1 month", zh: "個人 · 約 1 個月" }, 1, 0, { ja: "意欲賞", en: "Motivation Award", zh: "意欲獎" }],
      ["Block Shooter", { ja: "単独 · 約2週間", en: "Solo · ~2 weeks", zh: "個人 · 約 2 週" }, .5, 0, { ja: "構成力賞", en: "Composition Award", zh: "構成力獎" }],
    ];
    rows.forEach((r, i) => {
      const y = 96 + i * 80;
      tx(s, { x: 26, y: y - 2, fill: L, "font-family": BODY, "font-size": 13.5, "font-weight": 500 }, r[0]);
      tx(s, { x: 26, y: y + 15, fill: T, "font-family": BODY, "font-size": 11 }, r[1]);
      const a = X(0) + 1, b = X(r[2]), h = 16;
      if (r[3]) {
        el(s, "rect", { x: a, y: y - h / 2, width: b - a, height: h, rx: 2, fill: "none", stroke: F, "stroke-width": 1.2, opacity: .75 });
        for (let hx = a + 6; hx < b - 2; hx += 7) el(s, "line", { x1: hx, y1: y + h / 2 - 2, x2: hx + 5, y2: y - h / 2 + 2, stroke: F, "stroke-width": 1, opacity: .35 });
      } else {
        el(s, "rect", { x: a, y: y - h / 2, width: b - a, height: h, rx: 2, fill: F });
        const ax = b + 16;
        el(s, "circle", { cx: ax, cy: y, r: 7, fill: "none", stroke: F, "stroke-width": 1.5 }); el(s, "circle", { cx: ax, cy: y, r: 3, fill: F });
        tx(s, { x: ax + 14, y: y + 4.5, fill: F, "font-family": BODY, "font-size": 13, "font-weight": 500 }, r[4]);
      }
    });
    const ya = 96 + 2 * 80 - 14, yb = 96 + 3 * 80 + 14;
    el(s, "path", { d: `M14 ${ya} h-4 v${yb - ya} h4`, fill: "none", stroke: F, "stroke-width": 1.2 });
    el(s, "line", { x1: 26, y1: 414, x2: W - 26, y2: 414, stroke: LN2, "stroke-width": 1 });
    tx(s, { x: 26, y: 446, fill: F, "font-family": MONO, "font-size": 10.5, "letter-spacing": 1.2 }, "SOLO × 2 · ≈ 1.5 MONTHS · 2 AWARDS");
    tx(s, { x: W - 26, y: 446, "text-anchor": "end", fill: T, "font-family": BODY, "font-size": 11.5 }, { ja: "短期間でも最後まで形にする", en: "Finished, even on short schedules", zh: "時間再短也做到成形" });
  }

  /* ---------- 01c debug loop ---------- */
  function loop() {
    const s = $("loop"); if (!s) return;
    const cx = 305, cy = 208, R = 122;
    const defs = el(s, "defs", {});
    const mk = el(defs, "marker", { id: "loop-arr", viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" });
    el(mk, "path", { d: "M0 1 L9 5 L0 9", fill: "none", stroke: F, "stroke-width": 1.6 });
    for (let r = 40; r <= 170; r += 26) el(s, "circle", { cx, cy, r, fill: "none", stroke: LN, "stroke-width": 1, "stroke-dasharray": "2 5" });
    const steps = [
      ["bulb", { ja: "仮説を立てる", en: "Form a hypothesis", zh: "立下假設" }, "HYPOTHESIZE"],
      ["columns", { ja: "複数の手を並べる", en: "Lay out options", zh: "並列多種做法" }, "ENUMERATE"],
      ["compare", { ja: "照らし合わせる", en: "Compare them", zh: "互相對照" }, "COMPARE"],
      ["flask", { ja: "検証する", en: "Verify", zh: "驗證" }, "VERIFY"],
      ["scissors", { ja: "切り分ける", en: "Isolate the cause", zh: "切分問題" }, "ISOLATE"],
    ];
    const ang = (k) => (-90 + k * 72) * Math.PI / 180;
    steps.forEach((st, k) => {
      const a1 = ang(k) + .27, a2 = ang(k + 1) - .27;
      el(s, "path", { d: `M${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R} A${R} ${R} 0 0 1 ${cx + Math.cos(a2) * R} ${cy + Math.sin(a2) * R}`, fill: "none", stroke: F, "stroke-width": 1.4, "marker-end": "url(#loop-arr)", opacity: .85 });
    });
    steps.forEach((st, k) => {
      const a = ang(k), x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R, c = Math.cos(a);
      el(s, "circle", { cx: x, cy: y, r: 30, fill: H, stroke: F, "stroke-width": 1.3 });
      el(s, "circle", { cx: x, cy: y, r: 37, fill: "none", stroke: LN2, "stroke-width": 1, "stroke-dasharray": "2 3" });
      useIcon(s, st[0], x - 11, y - 11, 22, F);
      let tx0, ty0, anc;
      if (k === 0) { tx0 = x; ty0 = y - 58; anc = "middle"; }
      else if (k === 1) { tx0 = x + 50; ty0 = y - 4; anc = "start"; }
      else if (k === 4) { tx0 = x - 50; ty0 = y - 4; anc = "end"; }
      else { tx0 = x + (c > 0 ? 14 : -14); ty0 = y + 56; anc = c > 0 ? "start" : "end"; }
      tx(s, { x: tx0, y: ty0, "text-anchor": anc, fill: L, "font-family": BODY, "font-size": 14, "font-weight": 500 }, st[1]);
      tx(s, { x: tx0, y: ty0 + 16, "text-anchor": anc, fill: T, "font-family": MONO, "font-size": 9.5, "letter-spacing": 1.4 }, "0" + (k + 1) + " · " + st[2]);
    });
    tx(s, { x: cx, y: cy - 4, "text-anchor": "middle", fill: L, "font-family": DISP, "font-size": 16 }, { ja: "限られた時間で", en: "Results in", zh: "在有限時間內" });
    tx(s, { x: cx, y: cy + 20, "text-anchor": "middle", fill: F, "font-family": DISP, "font-size": 16 }, { ja: "成果を出す", en: "limited time", zh: "交出成果" });
  }

  /* ---------- 03 engine growth ---------- */
  function grow() {
    const s = $("grow"); if (!s) return;
    const W = 1246, m0 = 40, cw = (W - 2 * m0) / 6, tw = 172, th = 97, ty = 56;
    const st = [
      ["scrap-burst", "Scrap Burst", "2025/10", { ja: "フレームワーク構築", en: "Built the framework", zh: "建立框架" }, [{ ja: "堅牢な基盤を作り、", en: "A solid base that", zh: "打造穩固的基礎，" }, { ja: "後の制作を円滑に", en: "eased later work", zh: "讓之後更順暢" }], 0],
      ["block-shooter", "Block Shooter", "2026/01", { ja: "既存の土台に適応", en: "Adapted to the base", zh: "適應既有框架" }, [{ ja: "土台は変えずに", en: "Kept the base,", zh: "不改動底層，" }, { ja: "TPSを実装", en: "built a TPS on it", zh: "實作 TPS" }], 0],
      ["magnet-field", "Magnet Field", "2026/04", { ja: "ゲームエンジン化", en: "Remade as an engine", zh: "改造成遊戲引擎" }, [{ ja: "フレームワークを", en: "Rebuilt the framework", zh: "把框架" }, { ja: "エンジンへ作り直し", en: "into a game engine", zh: "重做成引擎" }], 1],
      ["frisbee-arena", "Frisbee Arena", "2026/08", { ja: "層の分離", en: "Split the layers", zh: "分層" }, [{ ja: "エンジン層と", en: "Engine level vs.", zh: "區分引擎層" }, { ja: "スクリプト層を分離", en: "script level", zh: "與腳本層" }], 0],
      ["gravity-swing", "Gravity Swing", "2026/10", { ja: "物理ショーケース", en: "Physics showcase", zh: "物理展示" }, [{ ja: "物理挙動を", en: "Shows the physics", zh: "以可遊玩的形式" }, { ja: "遊べる形で見せる", en: "in a playable scene", zh: "展示物理" }], 0],
      ["village-and-goblin", "Village & Goblin", "2026/10", { ja: "2D対応", en: "Added 2D", zh: "支援 2D" }, [{ ja: "エンジンに", en: "Brought 2D support", zh: "為引擎" }, { ja: "2D対応を追加", en: "into the engine", zh: "加入 2D 支援" }], 0],
    ];
    const defs = el(s, "defs", {});
    const mk = el(defs, "marker", { id: "grow-arr", viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: "auto" });
    el(mk, "path", { d: "M0 1 L9 5 L0 9", fill: "none", stroke: F, "stroke-width": 1.6 });
    st.forEach((d, i) => {
      const x0 = m0 + i * cw, cx = x0 + cw / 2, tx0 = cx - tw / 2;
      tx(s, { x: tx0, y: 38, fill: d[5] ? F : T, "font-family": MONO, "font-size": 10, "letter-spacing": 1.4 }, "STAGE 0" + (i + 1) + " · " + d[2]);
      const cp = el(defs, "clipPath", { id: "grow-cp" + i }); el(cp, "rect", { x: tx0, y: ty, width: tw, height: th, rx: 2 });
      const a = el(s, "a", { href: "/portfolio/works/" + d[0] + "/" });
      el(a, "image", { href: "/portfolio/media/" + d[0] + ".jpg", x: tx0, y: ty, width: tw, height: th, preserveAspectRatio: "xMidYMid slice", "clip-path": `url(#grow-cp${i})` });
      el(s, "rect", { x: tx0, y: ty, width: tw, height: th, rx: 2, fill: "none", stroke: d[5] ? F : LN2, "stroke-width": d[5] ? 1.6 : 1 });
      if (d[5]) {
        el(s, "rect", { x: tx0 + tw - 74, y: ty - 9, width: 82, height: 20, rx: 10, fill: F });
        tx(s, { x: tx0 + tw - 33, y: ty + 5, "text-anchor": "middle", fill: C, "font-family": BODY, "font-size": 11, "font-weight": 500 }, { ja: "Ivy 誕生", en: "Ivy is born", zh: "Ivy 誕生" });
      }
      if (i < 5) el(s, "line", { x1: tx0 + tw + 4, y1: ty + th / 2, x2: tx0 + cw - 4, y2: ty + th / 2, stroke: F, "stroke-width": 1.3, "marker-end": "url(#grow-arr)" });
      tx(s, { x: tx0, y: 182, fill: L, "font-family": BODY, "font-size": 15, "font-weight": 500 }, d[1]);
      tx(s, { x: tx0, y: 205, fill: F, "font-family": BODY, "font-size": 13, "font-weight": 500 }, d[3]);
      d[4].forEach((ln, j) => tx(s, { x: tx0, y: 228 + j * 18, fill: M, "font-family": BODY, "font-size": 12 }, ln));
    });
    const top = 286, bot = 528, bh = 34, gap = 7;
    el(s, "line", { x1: m0, y1: top - 10, x2: W - m0, y2: top - 10, stroke: LN2, "stroke-width": 1 });
    tx(s, { x: m0, y: top + 8, fill: F, "font-family": MONO, "font-size": 10, "letter-spacing": 1.6 }, "FIG. 03B — CAPABILITY LAYERS");
    tx(s, { x: W - m0, y: top + 8, "text-anchor": "end", fill: T, "font-family": MONO, "font-size": 10, "letter-spacing": 1.6 }, "STACKED OVER TIME  →  NOW");
    for (let i = 1; i < 6; i++) el(s, "line", { x1: m0 + i * cw, y1: top + 20, x2: m0 + i * cw, y2: bot, stroke: LN, "stroke-width": 1, "stroke-dasharray": "2 4" });
    const lg = el(defs, "linearGradient", { id: "grow-fade", x1: 0, x2: 1 });
    el(lg, "stop", { offset: 0, "stop-color": F, "stop-opacity": .2 }); el(lg, "stop", { offset: 1, "stop-color": F, "stop-opacity": .07 });
    const bands = [
      [{ ja: "フレームワーク基盤", en: "Framework base", zh: "框架基礎" }, "2025/10", 0],
      [{ ja: "ゲームエンジン化 — ゲームと並行開発", en: "Game engine — built alongside a game", zh: "遊戲引擎化 — 與遊戲並行開發" }, "2026/04", 2],
      [{ ja: "エンジン層 / スクリプト層の分離", en: "Engine / script layer split", zh: "引擎層／腳本層分離" }, "2026/08", 3],
      [{ ja: "物理ショーケース", en: "Physics showcase", zh: "物理展示" }, "2026/10", 4],
      [{ ja: "2D対応", en: "2D support", zh: "支援 2D" }, "2026/10", 5],
    ];
    bands.forEach((b, k) => {
      const y = bot - (k + 1) * (bh + gap) + gap, x = m0 + b[2] * cw + 8, w = W - m0 - x;
      el(s, "rect", { x, y, width: w, height: bh, rx: 2, fill: "url(#grow-fade)", stroke: F, "stroke-width": 1, "stroke-opacity": .5 });
      el(s, "rect", { x, y, width: 5, height: bh, fill: F });
      tx(s, { x: x + 18, y: y + bh / 2 + 5, fill: L, "font-family": BODY, "font-size": 13, "font-weight": 500 }, b[0]);
      tx(s, { x: W - m0 - 12, y: y + bh / 2 + 4, "text-anchor": "end", fill: T, "font-family": MONO, "font-size": 9.5, "letter-spacing": 1.2 }, "+" + b[1]);
    });
    const c2 = m0 + 1.5 * cw, y2 = bot - 2 * (bh + gap) + gap + bh / 2 + 4;
    tx(s, { x: c2, y: y2, "text-anchor": "middle", fill: T, "font-family": BODY, "font-size": 11.5 }, { ja: "土台は変えずに適応", en: "Base kept as is", zh: "底層保持不變" });
    el(s, "line", { x1: c2, y1: y2 + 8, x2: c2, y2: bot - bh - gap + 2, stroke: T, "stroke-width": 1, "stroke-dasharray": "2 3" });
  }

  /* ---------- 04 timeline ---------- */
  function gantt() {
    const s = $("gantt"); if (!s) return;
    const W = 1246, Hh = 520, x0 = 250, x1 = W - 40, months = 15, mw = (x1 - x0) / months, X = (m) => x0 + m * mw;
    const labels = ["10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const top = 74, rowH = 58;
    tx(s, { x: X(0) + 8, y: 30, fill: F, "font-family": MONO, "font-size": 11, "letter-spacing": 2 }, "2025");
    tx(s, { x: X(3) + 8, y: 30, fill: F, "font-family": MONO, "font-size": 11, "letter-spacing": 2 }, "2026");
    el(s, "line", { x1: X(3), y1: 16, x2: X(3), y2: Hh - 20, stroke: T, "stroke-width": 1 });
    for (let m = 0; m <= months; m++) {
      el(s, "line", { x1: X(m), y1: top - 12, x2: X(m), y2: Hh - 20, stroke: LN, "stroke-width": 1 });
      if (m < months) tx(s, { x: X(m) + mw / 2, y: top - 22, fill: M, "font-family": MONO, "font-size": 10, "text-anchor": "middle", "letter-spacing": 1 }, labels[m]);
    }
    const now = new Date(), nm = Math.min(14.9, Math.max(13, (now.getFullYear() - 2025) * 12 + now.getMonth() - 9 + now.getDate() / 31));
    const nx = X(nm);
    el(s, "rect", { x: nx, y: top - 12, width: X(15) - nx, height: Hh - 20 - top + 12, fill: F, opacity: .04 });
    el(s, "line", { x1: nx, y1: top - 12, x2: nx, y2: Hh - 20, stroke: F, "stroke-width": 1, "stroke-dasharray": "3 4" });
    tx(s, { x: nx + 6, y: Hh - 26, fill: F, "font-family": MONO, "font-size": 9.5, "letter-spacing": 1.5 }, "NOW");
    const P = [
      ["Scrap Burst", 0, 6, 1, null, 0, { ja: "10人 · フレームワーク", en: "Team of 10 · framework", zh: "10 人 · 框架" }, "07"],
      ["Block Shooter", 3, 4, 0, { ja: "構成力賞", en: "Composition Award", zh: "構成力獎" }, 0, { ja: "個人 · 約2週間", en: "Solo · ~2 weeks", zh: "個人 · 約 2 週" }, "06"],
      ["Ivy Engine", 6, null, 0, null, 1, { ja: "個人 · エンジン", en: "Solo · engine", zh: "個人 · 引擎" }, "01"],
      ["Magnet Field", 6, 10, 1, null, 0, { ja: "10人 · リード", en: "Team of 10 · lead", zh: "10 人 · 主程式" }, "05"],
      ["Frisbee Arena", 10, 12, 0, { ja: "意欲賞", en: "Motivation Award", zh: "意欲獎" }, 0, { ja: "個人 · 約1か月", en: "Solo · ~1 month", zh: "個人 · 約 1 個月" }, "04"],
      ["Gravity Swing", 12, 13, 0, null, 0, { ja: "個人 · インターン期間", en: "Solo · internship", zh: "個人 · 實習期間" }, "03"],
      ["Village & Goblin", 12, null, 0, null, 1, { ja: "個人 · インターン期間", en: "Solo · internship", zh: "個人 · 實習期間" }, "02"],
    ];
    const defs = el(s, "defs", {});
    const lg = el(defs, "linearGradient", { id: "gantt-fade", x1: 0, x2: 1 });
    el(lg, "stop", { offset: 0, "stop-color": F }); el(lg, "stop", { offset: 1, "stop-color": F, "stop-opacity": 0 });
    const cy = (i) => top + i * rowH + 32;
    P.forEach((p, i) => {
      const y = cy(i);
      el(s, "line", { x1: 20, y1: y + rowH / 2, x2: W - 20, y2: y + rowH / 2, stroke: LN, "stroke-width": 1, opacity: .6 });
      tx(s, { x: 26, y: y - 2, fill: F, "font-family": MONO, "font-size": 10, "letter-spacing": 1 }, p[7]);
      tx(s, { x: 56, y: y - 1, fill: L, "font-family": BODY, "font-size": 14, "font-weight": 500 }, p[0]);
      tx(s, { x: 56, y: y + 16, fill: T, "font-family": BODY, "font-size": 11 }, p[6]);
      const a = X(p[1]) + 3, b = p[2] == null ? X(15) - 2 : X(p[2]) - 3, h = 16;
      if (p[3]) {
        el(s, "rect", { x: a, y: y - h / 2, width: b - a, height: h, rx: 2, fill: "none", stroke: F, "stroke-width": 1.2 });
        for (let hx = a + 6; hx < b - 2; hx += 7) el(s, "line", { x1: hx, y1: y + h / 2 - 2, x2: hx + 5, y2: y - h / 2 + 2, stroke: F, "stroke-width": 1, opacity: .45 });
        tx(s, { x: (a + b) / 2, y: y + 4, "text-anchor": "middle", fill: L, "font-family": MONO, "font-size": 10, "letter-spacing": 1, "paint-order": "stroke", stroke: H, "stroke-width": 6 }, "TEAM 10");
      } else el(s, "rect", { x: a, y: y - h / 2, width: b - a, height: h, rx: 2, fill: p[5] ? "url(#gantt-fade)" : F });
      if (p[5]) tx(s, { x: a + 10, y: y + 4, fill: C, "font-family": MONO, "font-size": 10, "font-weight": 500, "letter-spacing": 1 }, "ONGOING →");
      if (p[4]) {
        const ax = b + 18;
        el(s, "circle", { cx: ax, cy: y, r: 7, fill: "none", stroke: F, "stroke-width": 1.5 }); el(s, "circle", { cx: ax, cy: y, r: 3, fill: F });
        tx(s, { x: ax + 14, y: y + 4, fill: F, "font-family": BODY, "font-size": 12, "font-weight": 500 }, p[4]);
      }
    });
    const link = (m1, r1, m2, r2) => {
      const xa = X(m1), ya = cy(r1) + 8, xb = X(m2), yb = cy(r2) - 8;
      el(s, "path", { d: `M${xa} ${ya} C${xa} ${(ya + yb) / 2} ${xb} ${(ya + yb) / 2} ${xb} ${yb}`, fill: "none", stroke: F, "stroke-width": 1.3, "stroke-dasharray": "3 3", opacity: .85 });
      el(s, "circle", { cx: xa, cy: ya, r: 2.5, fill: F }); el(s, "circle", { cx: xb, cy: yb, r: 2.5, fill: F });
    };
    link(3.4, 0, 3.4, 1); link(5.6, 0, 6.4, 2);
    tx(s, { x: X(6.4) + 16, y: cy(2) - 20, fill: F, "font-family": MONO, "font-size": 9.5, "letter-spacing": 1.2 }, "REMADE AS ENGINE → IVY ENGINE");
    link(7.2, 2, 7.2, 3); link(10.4, 2, 10.4, 4); link(12.4, 2, 12.4, 5); link(12.7, 2, 12.7, 6);
  }

  /* ---------- donuts ---------- */
  function donut(id, data, center) {
    const s = $(id); if (!s) return;
    const r = 58, c = 2 * Math.PI * r, tot = data.reduce((a, b) => a + b, 0); let off = 0;
    el(s, "circle", { cx: 75, cy: 75, r: 70, fill: "none", stroke: LN, "stroke-width": 1, "stroke-dasharray": "2 4" });
    const styles = s.getAttribute("data-styles").split(",");
    data.forEach((v, i) => {
      const len = c * v / tot - 3, st = styles[i];
      const a = { cx: 75, cy: 75, r, fill: "none", "stroke-width": st === "o" ? 1.6 : 14, stroke: st === "m" ? T : F, "stroke-dasharray": `${len} ${c}`, "stroke-dashoffset": -off, transform: "rotate(-90 75 75)" };
      if (st === "o") { el(s, "circle", Object.assign({}, a, { r: r + 7 })); el(s, "circle", Object.assign({}, a, { r: r - 7 })); }
      else el(s, "circle", a);
      off += c * v / tot;
    });
    tx(s, { x: 75, y: 82, "text-anchor": "middle", fill: L, "font-family": DISP, "font-size": 30 }, center);
    tx(s, { x: 75, y: 100, "text-anchor": "middle", fill: T, "font-family": MONO, "font-size": 9, "letter-spacing": 1.5 }, "WORKS");
  }

  /* ---------- language rings ---------- */
  function rings() {
    document.querySelectorAll("svg[data-ring]").forEach((s) => {
      const v = parseFloat(s.getAttribute("data-ring")), r = 46, c = 2 * Math.PI * r;
      for (let i = 0; i < 60; i++) {
        const a = i / 60 * Math.PI * 2 - Math.PI / 2, o = i % 5 ? 53 : 51;
        el(s, "line", { x1: 59 + Math.cos(a) * 55, y1: 59 + Math.sin(a) * 55, x2: 59 + Math.cos(a) * o, y2: 59 + Math.sin(a) * o, stroke: i / 60 < v ? T : LN2, "stroke-width": 1 });
      }
      el(s, "circle", { cx: 59, cy: 59, r, fill: "none", stroke: LN, "stroke-width": 6 });
      el(s, "circle", { cx: 59, cy: 59, r, fill: "none", stroke: F, "stroke-width": 6, "stroke-dasharray": `${c * v} ${c}`, transform: "rotate(-90 59 59)", "stroke-linecap": v < 1 ? "round" : "butt" });
      const big = s.getAttribute("data-big"), small = s.getAttribute("data-small");
      const bigT = big.startsWith("{") ? JSON.parse(big) : big;
      // Fit the label inside the ring: CJK glyphs ≈ 1em wide, Latin ≈ 0.55em.
      const em = (t) => [...t].reduce((w, ch) => w + (ch.charCodeAt(0) < 0x2e80 ? 0.55 : 1), 0);
      const widest = Math.max(...(typeof bigT === "string" ? [bigT] : Object.values(bigT)).map(em));
      tx(s, { x: 59, y: 63, "text-anchor": "middle", fill: L, "font-family": DISP, "font-size": Math.min(17, 72 / widest) }, bigT);
      tx(s, { x: 59, y: 79, "text-anchor": "middle", fill: T, "font-family": MONO, "font-size": 8, "letter-spacing": 1 }, small);
    });
  }

  function swatches() {
    const b = $("hbsw"); if (!b) return;
    ["linear-gradient(#9FD0B0,#1A2C26)", "repeating-linear-gradient(0deg,#9FD0B0 0 1px,transparent 1px 4px)", "radial-gradient(circle,#9FD0B0 0 20%,transparent 60%)", "repeating-linear-gradient(45deg,#7E9A8F 0 1px,transparent 1px 6px)", "conic-gradient(#9FD0B0,#0F1A16,#9FD0B0)"]
      .forEach((x) => { const i = document.createElement("i"); i.style.background = x; b.appendChild(i); });
  }

  // Loop clips only play while on screen, and not at all for reduced motion.
  function clips() {
    const vids = document.querySelectorAll("video[data-loop]");
    if (!vids.length) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    vids.forEach((v) => { v.muted = true; v.removeAttribute("autoplay"); });
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { if (v.preload !== "auto") v.preload = "auto"; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      else v.pause();
    }), { threshold: .35 });
    vids.forEach((v) => io.observe(v));
  }

  vine(); duration(); loop(); grow(); gantt();
  donut("d1", [5, 2], "07"); donut("d2", [4, 2, 1], "07");
  rings(); swatches(); clips();
})();
