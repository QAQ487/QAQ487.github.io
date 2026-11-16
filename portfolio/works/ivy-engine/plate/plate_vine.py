"""Specimen Scale — Fig. 01 (Vine): eight systems as eight leaves on one horizontal stem.

Landscape, drawn to be read at web size: few, large forms; one row of labels above, one below.
"""
import math

from common import (CANOPY, CJK, DISPLAY, FERN, HOLLOW, LUMEN, MONO, MOSS, TRELLIS, circle, ground, line, render,
                    rgb, text)
from plate import LEAF_MAX, leaf_points, leaf_r

W, H = 1600, 1000
M = 84
X0, X1 = 500, 1490          # stem start / bud
Y_STEM = 500
GAP = 34                    # stem -> leaf edge
K = 12.6                    # leaf radius = K * sqrt(count)
Y_TOP_NUM, Y_TOP_NAME = 150, 186
Y_BOT_NAME, Y_BOT_NUM = 830, 884

LEAVES = [  # left -> right, largest first; (name, jp, count)
    ("RENDERING", "描画", 77),
    ("PHYSICS", "物理", 56),
    ("CORE", "シーン", 55),
    ("BUILD & TEST", "検証", 48),
    ("EDITOR", "エディタ", 44),
    ("SCRIPTING", "スクリプト", 34),
    ("UI & INPUT", "UI", 23),
    ("AUDIO", "サウンド", 13),
]


def stem_y(x):
    t = (x - X0) / (X1 - X0)
    return Y_STEM + 14 * math.sin(t * 2.4 + 0.4) - 10 * t


def stem_path(ctx, xa=X0, xb=X1):
    n = int(xb - xa)
    ctx.move_to(xa, stem_y(xa))
    for i in range(1, n + 1):
        x = xa + i
        ctx.line_to(x, stem_y(x))


def layout():
    n = len(LEAVES)
    span = (X1 - 100) - (X0 + 92)
    out = []
    for i, (name, jp, c) in enumerate(LEAVES):
        nx = X0 + 92 + span * i / (n - 1)
        ny = stem_y(nx)
        up = i % 2 == 0
        R = K * math.sqrt(c)
        s = -1 if up else 1
        tilt = math.radians(8 if up else -8)
        ang = s * math.pi / 2 + tilt
        reach = R * leaf_r(math.pi) / LEAF_MAX + GAP  # notch sits GAP beyond the node
        # place centre so the notch lands GAP from the stem along the axis
        cx = nx + reach * math.cos(ang) + 0
        cy = ny + reach * math.sin(ang)
        out.append(dict(name=name, jp=jp, c=c, R=R, ang=ang, up=up, nx=nx, ny=ny, cx=cx, cy=cy))
    return out


def poly(ctx, pts):
    ctx.move_to(*pts[0])
    for p in pts[1:]:
        ctx.line_to(*p)
    ctx.close_path()


def draw_leaf(ctx, lf):
    cx, cy, R, ang = lf["cx"], lf["cy"], lf["R"], lf["ang"]
    r_n = R * leaf_r(math.pi) / LEAF_MAX
    px, py = cx - r_n * math.cos(ang), cy - r_n * math.sin(ang)
    # petiole
    ctx.set_source_rgba(*rgb(MOSS, 0.95))
    ctx.set_line_width(1.4)
    ctx.move_to(lf["nx"], lf["ny"])
    ctx.line_to(px, py)
    ctx.stroke()
    circle(ctx, lf["nx"], lf["ny"], 3.2, rgb(FERN), fill=True)

    outline = leaf_points(cx, cy, R, ang)
    ctx.set_source_rgba(*rgb(HOLLOW, 0.95))
    poly(ctx, outline)
    ctx.fill()
    rings = max(3, int(R / 6.5))
    ctx.set_line_width(0.7)
    for k in range(1, rings):
        sc = k / rings
        ctx.set_source_rgba(*rgb(TRELLIS, 0.16 + 0.34 * sc))
        poly(ctx, leaf_points(cx, cy, R, ang, sc, n=300))
        ctx.stroke()
    bx, by = cx - 0.18 * R * math.cos(ang), cy - 0.18 * R * math.sin(ang)
    ctx.set_source_rgba(*rgb(MOSS, 0.7))
    ctx.set_line_width(1.0)
    for th in (0.0, 1.22, -1.22, 2.25, -2.25):
        r = R * leaf_r(th) / LEAF_MAX * 0.9
        ctx.move_to(bx, by)
        ctx.line_to(cx + r * math.cos(ang + th), cy + r * math.sin(ang + th))
    ctx.stroke()
    ctx.set_source_rgba(*rgb(MOSS))
    ctx.set_line_width(1.6)
    poly(ctx, outline)
    ctx.stroke()


def draw_label(ctx, lf):
    pts = leaf_points(lf["cx"], lf["cy"], lf["R"], lf["ang"])
    x = lf["nx"]
    if lf["up"]:
        tip = min(p[1] for p in pts)
        line(ctx, x, Y_TOP_NAME + 18, x, tip - 12, rgb(TRELLIS, 0.55), 0.8, dash=[2, 4])
        text(ctx, x, Y_TOP_NUM, str(lf["c"]), DISPLAY, 46, rgb(LUMEN), align="c")
        text(ctx, x, Y_TOP_NAME, lf["name"], MONO, 17, rgb(MOSS), align="c", track=2.2)
    else:
        tip = max(p[1] for p in pts)
        line(ctx, x, tip + 12, x, Y_BOT_NAME - 30, rgb(TRELLIS, 0.55), 0.8, dash=[2, 4])
        text(ctx, x, Y_BOT_NAME, lf["name"], MONO, 17, rgb(MOSS), align="c", track=2.2)
        text(ctx, x, Y_BOT_NUM, str(lf["c"]), DISPLAY, 46, rgb(LUMEN), align="c")


def draw_stem(ctx):
    ctx.set_source_rgba(*rgb(FERN, 0.12))
    ctx.set_line_width(10)
    stem_path(ctx)
    ctx.stroke()
    ctx.set_source_rgba(*rgb(FERN))
    ctx.set_line_width(2.6)
    stem_path(ctx)
    ctx.stroke()
    # bud
    bx, by = X1, stem_y(X1)
    for r, a in [(22, 0.10), (15, 0.18), (9, 0.34)]:
        circle(ctx, bx, by, r, rgb(FERN, a), 1.0)
    circle(ctx, bx, by, 4.6, rgb(FERN), fill=True)
    # roots: two, curling down into the left column
    base = (X0, stem_y(X0))
    for (tx, ty), lab in [((X0 - 190, 770), "EDITOR"), ((X0 - 40, 790), "GAME")]:
        far = tx < X0 - 100
        c1 = (base[0] - 12, base[1] + 90) if far else (base[0] + 34, base[1] + 120)
        c2 = (tx + 40, ty - 110) if far else (tx + 54, ty - 70)
        ctx.set_source_rgba(*rgb(MOSS, 0.9))
        ctx.set_line_width(1.6)
        ctx.move_to(*base)
        ctx.curve_to(*c1, *c2, tx, ty)
        ctx.stroke()
        circle(ctx, tx, ty, 3.4, rgb(MOSS), fill=True)
        text(ctx, tx, ty + 34, lab, MONO, 16, rgb(MOSS), align="c", track=2.4)
    circle(ctx, base[0], base[1], 4.0, rgb(FERN), fill=True)


def draw(ctx):
    ground(ctx, W, H, avoid=[(M - 20, M - 20, 470, 640)])
    leaves = layout()
    # left column: title + the one big number
    text(ctx, M, M + 24, "SPECIMEN SCALE  ·  FIG. 01", MONO, 14, rgb(TRELLIS), track=2.6)
    text(ctx, M, 214, "Ivy", DISPLAY, 96, rgb(LUMEN))
    text(ctx, M, 314, "Engine", DISPLAY, 96, rgb(LUMEN))
    text(ctx, M + 4, 362, "ツタエンジン", CJK, 22, rgb(MOSS), track=8)
    line(ctx, M, 412, 400, 412, rgb(TRELLIS, 0.5), 0.8)
    text(ctx, M - 4, 540, "350", DISPLAY, 112, rgb(FERN))
    text(ctx, M, 584, "FEATURES  ·  8 SYSTEMS", MONO, 16, rgb(MOSS), track=2.2)
    text(ctx, M, 612, "leaf area = number of features", MONO, 14, rgb(TRELLIS))

    draw_stem(ctx)
    for lf in leaves:
        draw_leaf(ctx, lf)
    for lf in leaves:
        draw_label(ctx, lf)
    line(ctx, X1, Y_TOP_NAME + 18, X1, stem_y(X1) - 30, rgb(FERN, 0.5), 0.8, dash=[2, 4])
    text(ctx, W - M, Y_TOP_NAME, "STILL GROWING", MONO, 15, rgb(FERN), align="r", track=1.2)

    text(ctx, W - M, H - M + 6, "2025.10  →  now", MONO, 14, rgb(TRELLIS), align="r", track=2.2)
    text(ctx, M, H - M + 6, "楊 子悠  ·  solo", CJK, 15, rgb(TRELLIS))

    return leaves


def check():
    from shapely.geometry import Polygon, box
    lv = layout()
    polys = [Polygon(leaf_points(l["cx"], l["cy"], l["R"], l["ang"])) for l in lv]
    for i, p in enumerate(polys):
        b = p.bounds
        if b[1] < Y_TOP_NAME + 30 or b[3] > Y_BOT_NAME - 40 or b[0] < 470:
            print("BOUNDS", lv[i]["name"], [round(v) for v in b])
        for j in range(i + 1, len(polys)):
            d = p.distance(polys[j])
            if d < 14:
                print("NEAR", lv[i]["name"], lv[j]["name"], round(d, 1))
    xs = [l["nx"] for l in lv]
    print("label spacing", round(xs[1] - xs[0]), "same-side", round(xs[2] - xs[0]))


if __name__ == "__main__":
    check()
    render("fig01-vine", W, H, draw)
