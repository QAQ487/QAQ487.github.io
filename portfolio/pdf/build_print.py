#!/usr/bin/env python3
"""Build portfolio/pdf/print.html (A4 landscape, Japanese) from the live site pages.

Run from the repository root:
    python3 portfolio/pdf/build_print.py
    node portfolio/pdf/render.js        # writes portfolio/YEUNG_TszYau_portfolio_ja.pdf

Text comes from the data-ja attributes of the portfolio pages, so the PDF stays in
step with the site. Only the page labels below are written here.
"""
import html
import io
import pathlib
import re

import qrcode
import qrcode.image.svg

ROOT = pathlib.Path(__file__).resolve().parents[2]
SITE = "https://qaq487.github.io"
REPO = "https://github.com/QAQ487/ivy-engine"
ORDER = ["magnet-field", "frisbee-arena", "scrap-burst", "block-shooter", "village-and-goblin", "gravity-swing"]


def esc(s):
    return html.escape(s, quote=True)


def unesc(s):
    return html.unescape(s)


def ja_of(fragment):
    """Text of a fragment: its first data-ja value, else its plain text."""
    m = re.search(r'data-ja="([^"]*)"', fragment)
    if m:
        return unesc(m.group(1))
    return unesc(re.sub(r"<[^>]+>", "", fragment)).strip()


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def qr_svg(url):
    img = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=1)
    buf = io.BytesIO()
    img.save(buf)
    svg = buf.getvalue().decode("utf-8")
    svg = re.sub(r"<\?xml[^>]*\?>", "", svg)
    return svg.replace("<svg ", '<svg class="qr" aria-hidden="true" ', 1)


def facts(h):
    """Spec sheet rows -> [(label, [values])], skipping hidden empty rows."""
    dl = re.search(r'<dl class="facts2">(.*?)</dl>', h, re.S).group(1)
    rows = []
    for div in re.findall(r"^<div([^>]*)>(.*)</div>$", dl, re.M):
        attrs, body = div
        if "is-empty" in attrs:
            continue
        label = ja_of(re.search(r"<dt>(.*?)</dt>", body).group(1))
        dd = re.search(r"<dd>(.*)</dd>", body).group(1)
        lis = re.findall(r"<li[^>]*>.*?</li>", dd)
        vals = [ja_of(x) for x in lis] if lis else [ja_of(dd)]
        rows.append((label, vals))
    return rows


def work(slug):
    h = read(f"portfolio/works/{slug}/index.html")
    title = unesc(re.search(r'<h1 class="w-title">(.*?)</h1>', h).group(1))
    kicker = re.search(r'<p class="w-kicker">(.*?)</p>\n', h).group(1)
    period = re.search(r'<span class="mono fern">([^<]*)</span>', kicker).group(1)
    badge = re.search(r'<span class="badge[^"]*">.*?data-ja="([^"]*)"', kicker)
    lede = ja_of(re.search(r'<p class="w-lede"[^>]*>', h).group(0))
    kpis = []
    for li in re.findall(r'<li><span class="top">(.*?)</li>', re.search(r'<ul class="kpis">(.*?)</ul>', h, re.S).group(1)):
        label = ja_of(li)
        val = re.search(r"<b[^>]*>(.*?)</b>$", li).group(1)
        kpis.append((label, ja_of(val)))
    cl = re.search(r'<div class="cl">(.*?)\n        </div>', h, re.S).group(1)
    challenge, learned = [], []
    for chunk in cl.split('<div class="panel')[1:]:
        if "pending" in chunk:
            continue
        items = [ja_of(x) for x in re.findall(r"<li[^>]*>.*?</li>", chunk)]
        (learned if chunk.startswith(" is-learn") else challenge).extend(items)
    return dict(slug=slug, title=title, period=period, badge=unesc(badge.group(1)) if badge else "",
                lede=lede, kpis=kpis, challenge=challenge, learned=learned, facts=facts(h))


def ivy():
    h = read("portfolio/works/ivy-engine/index.html")
    feats = []
    for li in re.findall(r'<li class="ivy-feat"[^>]*>(.*?)</li>\n', h):
        n = int(re.search(r"<b>(\d+)</b>", li).group(1))
        name = ja_of(re.search(r"<h3[^>]*>.*?</h3>", li).group(0))
        pts = [ja_of(x) for x in re.findall(r"<li[^>]*>.*?</li>", li + "</li>")][:3]
        feats.append((n, name, pts))
    steps = [ja_of(x) for x in re.findall(r'<li class="panel ivy-step[^"]*">.*?(<p data-ja="[^"]*")', h)]
    lesson = ja_of(re.search(r'<div class="panel is-learn ivy-lesson">.*?(<p data-ja="[^"]*")', h).group(1))
    notes = []
    for li in re.findall(r'<ol class="ivy-notes">(.*?)</ol>', h, re.S)[-1].split("<li>")[1:]:
        t = ja_of(re.search(r"<h3[^>]*>.*?</h3>", li).group(0))
        d = ja_of(re.search(r"</h3>(<p[^>]*>)", li).group(1))
        notes.append((t, d))
    lede = ja_of(re.search(r'<p class="w-lede"[^>]*>', h).group(0))
    return dict(feats=feats, steps=steps, lesson=lesson, notes=notes, lede=lede, facts=facts(h))


def main_page():
    h = read("portfolio/index.html")
    pr_big = "".join(ja_of(x) for x in re.findall(r"<(?:span|em) data-ja=\"[^\"]*\"[^>]*>", re.search(r'<p class="pr-big">(.*?)</p>', h).group(1)))
    pr = [ja_of(x) for x in re.findall(r"<p data-ja=\"[^\"]*\"", re.search(r'<div class="pr-text">(.*?)</div>', h, re.S).group(1))]
    pillars = [(ja_of(a), ja_of(b)) for a, b in re.findall(r"(<h3 data-ja=\"[^\"]*\")[^<]*</h3>(<p data-ja=\"[^\"]*\")", re.search(r'<ul class="pillars">(.*?)</ul>', h, re.S).group(1))]
    return dict(pr_big=pr_big, pr=pr, pillars=pillars)


CODE = """#if MODEL3D_CPU_SKIN_ORACLE
        SkinFromScratch();
#else
        if (m_gpuSkinEligible && !m_gpuBindConflict)
            UpdateGpuSkinPalette();
        else
            SkinFromScratch();
#endif"""


def page(inner, cls=""):
    return f'<section class="page {cls}">{inner}</section>\n'


def foot(n):
    return f'<p class="pg-foot"><span>楊 子悠 — ポートフォリオ</span><span>{n:02d}</span></p>'


def build():
    m = main_page()
    iv = ivy()
    works = [work(s) for s in ORDER]
    pages = []
    n = 1

    # 01 cover
    pages.append(page(f"""
<div class="cover-l">
  <p class="eyebrow">ポートフォリオ · エンジン／ツール／ゲームプログラマー志望</p>
  <h1 class="name">楊 子悠</h1>
  <p class="kana">ヨウ シユ · YEUNG Tsz Yau (Terry)</p>
  <p class="tag">ゲームを作りながら、<em>エンジン</em>を育てる。</p>
  <dl class="cover-facts">
    <div><dt>学校</dt><dd>HAL東京 ゲーム制作学科（4年制）· 2028年卒業予定</dd></div>
    <div><dt>メール</dt><dd>terryyeung234@gmail.com</dd></div>
    <div><dt>Web</dt><dd>{SITE}/portfolio/</dd></div>
    <div><dt>GitHub</dt><dd>github.com/QAQ487</dd></div>
  </dl>
</div>
<div class="cover-r">
  <img src="/portfolio/media/reel.jpg" alt="">
  <div class="cover-qr">{qr_svg(SITE + '/portfolio/')}<p>Web 版（プレイ映像あり）</p></div>
</div>""", "cover"))
    n += 1

    # 02 profile + self-PR
    pr = "".join(f"<p>{esc(p)}</p>" for p in m["pr"])
    pil = "".join(f"<li><b>{esc(a)}</b><span>{esc(b)}</span></li>" for a, b in m["pillars"])
    pages.append(page(f"""
<header class="ph"><span class="idx">01</span><h2>自己PR</h2></header>
<div class="cols-pr">
  <div>
    <p class="pr-big">{esc(m['pr_big'])}</p>
    <div class="pr-text">{pr}</div>
  </div>
  <aside>
    <h3>プロフィール</h3>
    <dl class="kv">
      <div><dt>技術</dt><dd>C++ · Direct3D 11 · HLSL · Dear ImGui · FBX SDK</dd></div>
      <div><dt>資格</dt><dd>基本情報技術者試験（2025年10月 取得）</dd></div>
      <div><dt>言語</dt><dd>広東語（母語）· 普通話（ネイティブ）· 英語（TOEIC 940）· 日本語（JLPT N1）</dd></div>
      <div><dt>受賞</dt><dd>構成力賞（Block Shooter）· 意欲賞（Frisbee Arena）</dd></div>
      <div><dt>制作</dt><dd>作品 7 本（チーム制作 2 本 · 自作エンジン 1 本）</dd></div>
    </dl>
    <h3>入社後に目指すこと</h3>
    <ol class="pillars">{pil}</ol>
  </aside>
</div>{foot(n)}"""))
    n += 1

    # 03 Ivy Engine overview
    mx = max(f[0] for f in iv["feats"])
    bars = "".join(
        f'<li><span class="fn">{esc(name)}</span><span class="bar"><i style="width:{cnt / mx * 100:.1f}%"></i></span><b>{cnt}</b>'
        f'<span class="fp">{esc(" · ".join(pts))}</span></li>' for cnt, name, pts in iv["feats"])
    notes = "".join(f"<li><b>{esc(t)}</b><span>{esc(d)}</span></li>" for t, d in iv["notes"])
    spec = {k: v for k, v in iv["facts"]}
    pages.append(page(f"""
<header class="ph"><span class="idx">02</span><h2>Ivy Engine</h2><p class="sub">ツタエンジン · 2025/10– · 個人制作</p></header>
<p class="lede">{esc(iv['lede'])}</p>
<ul class="kpis"><li><b>14</b><span>か月</span></li><li><b>350</b><span>機能</span></li><li><b>約7万</b><span>行（自作部分）</span></li><li><b>3</b><span>本のゲーム</span></li></ul>
<div class="cols-ivy">
  <div><h3>8 つの系統と機能数</h3><ol class="bars">{bars}</ol></div>
  <aside>
    <h3>進め方</h3><ol class="notes">{notes}</ol>
    <h3>使用技術</h3><p class="small">{esc(" ".join(spec.get("使用技術", [""])))}</p>
    <h3>ライブラリ</h3><p class="small">{esc(" ".join(spec.get("ライブラリ", [""])))}</p>
  </aside>
</div>{foot(n)}"""))
    n += 1

    # 04 GPU skinning + code
    st = iv["steps"]
    pages.append(page(f"""
<header class="ph"><span class="idx">03</span><h2>いちばんの山場：GPU スキン</h2></header>
<ol class="steps">
  <li><span class="st">課題</span><p>{esc(st[0])}</p></li>
  <li><span class="st">対策</span><p>{esc(st[1])}</p></li>
  <li><span class="st">結果</span><p>{esc(st[2])}</p></li>
</ol>
<div class="cols-code">
  <div class="metric"><p class="m-l">CPU スキン</p><p class="m-v">4 体で <b>20</b> fps</p><p class="m-l">GPU スキン</p><p class="m-v fern">10 体以上で <b>60</b> fps</p><p class="small">i5-12600 / RTX 3060</p></div>
  <div>
    <p class="small">engine/rendering/model/model.cpp — CPU 版を「答え」として残し、コンパイル時のスイッチ一つで戻して見比べられるようにした。</p>
    <pre><code>{esc(CODE)}</code></pre>
  </div>
  <div class="cover-qr">{qr_svg(REPO)}<p>ソースコード（GitHub）</p></div>
</div>
<p class="lesson"><b>学び</b>{esc(iv['lesson'])}</p>{foot(n)}"""))
    n += 1

    # works
    for i, w in enumerate(works, start=4):
        kp = "".join(f"<div><dt>{esc(a)}</dt><dd>{esc(b)}</dd></div>" for a, b in w["kpis"])
        fx = "".join(
            f"<div><dt>{esc(a)}</dt><dd>{'<br>'.join(esc(v) for v in vals)}</dd></div>"
            for a, vals in w["facts"] if a not in ("ジャンル", "概要", "ダウンロード"))
        genre = next((v[0] for a, v in w["facts"] if a == "ジャンル"), "")
        ch = "".join(f"<li>{esc(x)}</li>" for x in w["challenge"])
        le = "".join(f"<li>{esc(x)}</li>" for x in w["learned"])
        badge = f'<span class="badge">{esc(w["badge"])}</span>' if w["badge"] else ""
        url = f"{SITE}/portfolio/works/{w['slug']}/"
        pages.append(page(f"""
<header class="ph"><span class="idx">{i:02d}</span><h2 class="latin">{esc(w['title'])}</h2><p class="sub">{esc(w['period'])} · {esc(genre)}</p>{badge}</header>
<div class="cols-work">
  <div>
    <img class="still" src="/portfolio/media/{w['slug']}.jpg" alt="">
    <p class="lede">{esc(w['lede'])}</p>
    <div class="cl">
      <div><h3>課題・苦労した点</h3><ul>{ch}</ul></div>
      {'<div><h3>学んだこと</h3><ul>' + le + '</ul></div>' if le else ''}
    </div>
  </div>
  <aside>
    <dl class="kv">{kp}{fx}</dl>
    <div class="cover-qr">{qr_svg(url)}<p>プレイ映像（PV）</p></div>
  </aside>
</div>{foot(n)}"""))
        n += 1

    body = "".join(pages)
    out = f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>楊 子悠 — ポートフォリオ（PDF 版）</title>
<link rel="stylesheet" href="/portfolio/pdf/print.css">
</head>
<body>
{body}</body>
</html>
"""
    (ROOT / "portfolio/pdf/print.html").write_text(out, encoding="utf-8")
    print("pages:", len(pages))


if __name__ == "__main__":
    build()
