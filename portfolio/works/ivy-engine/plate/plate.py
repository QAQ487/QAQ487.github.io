"""Pressed Signal — Fig. 01 (Ivy Engine plate). Renders PDF + PNG with pycairo."""
import math
import random
import sys

import cairo

W, H = 841.89, 1190.55  # A3 portrait, points
FRAME = 40
M = 64

CANOPY = (0x0F, 0x1A, 0x16)
HOLLOW = (0x1A, 0x2C, 0x26)
LUMEN = (0xE6, 0xEF, 0xE8)
MOSS = (0x9E, 0xB0, 0xA8)
FERN = (0x9F, 0xD0, 0xB0)
TRELLIS = (0x7E, 0x9A, 0x8F)

DISPLAY = "Dela Gothic One"
MONO = "IBM Plex Mono"
CJK = "Noto Sans CJK JP"

# strata (top -> bottom)
Y_TIP = 244
Y_L3 = 222
Y_L2 = 782
Y_GROUND = 872
Y_SOIL_END = 1010

FEATURES = [  # bottom -> top, alternating sides; (no, key, label, count, adr, jp)
    ("01", "core", "CORE / SCENE", 55, None, "核・シーン"),
    ("02", "build", "BUILD / TEST", 48, None, "ビルドと検証"),
    ("03", "render", "RENDERING", 77, None, "描画・アニメーション"),
    ("04", "phys", "PHYSICS 3D · 2D", 56, None, "物理"),
    ("05", "editor", "EDITOR", 44, None, "エディタ"),
    ("06", "script", "SCRIPTING", 34, None, "スクリプト"),
    ("07", "ui", "UI", 23, None, "メニュー・HUD"),
    ("08", "audio", "AUDIO", 13, None, "サウンド"),
]


def rgb(c, a=1.0):
    return (c[0] / 255, c[1] / 255, c[2] / 255, a)


def stem_x(y):
    t = (Y_GROUND - y) / (Y_GROUND - Y_TIP)
    return 418 + 11 * math.sin(t * 2.6 + 0.3) - 6 * t


# ---------------------------------------------------------------- leaf shape
def leaf_r(theta):
    """Ivy-like palmate outline, theta relative to leaf axis, returns unit radius."""
    def bump(x, mu, w):
        d = math.atan2(math.sin(x - mu), math.cos(x - mu))
        return math.exp(-(d * d) / (2 * w * w))

    v = 0.46
    v += 0.54 * bump(theta, 0.0, 0.34)
    v += 0.38 * (bump(theta, 1.22, 0.28) + bump(theta, -1.22, 0.28))
    v += 0.22 * (bump(theta, 2.25, 0.26) + bump(theta, -2.25, 0.26))
    v -= 0.30 * bump(theta, math.pi, 0.20)  # basal sinus
    return v


LEAF_MAX = max(leaf_r(i / 720 * 2 * math.pi) for i in range(720))


def leaf_points(cx, cy, R, ang, scale=1.0, n=360):
    """Outline; scale < 1 shrinks toward the vein origin so contours converge there."""
    ax, ay = cx - 0.18 * R * math.cos(ang), cy - 0.18 * R * math.sin(ang)
    pts = []
    for i in range(n):
        th = i / n * 2 * math.pi
        r = R * leaf_r(th) / LEAF_MAX
        a = ang + th
        px, py = cx + r * math.cos(a), cy + r * math.sin(a)
        pts.append((ax + (px - ax) * scale, ay + (py - ay) * scale))
    return pts


def notch_point(cx, cy, R, ang):
    r = R * leaf_r(math.pi) / LEAF_MAX
    return cx - r * math.cos(ang), cy - r * math.sin(ang)


# ---------------------------------------------------------------- layout solver
LAYOUT = {  # key: (node_y, leaf centre x, leaf centre y) — placed by hand
    "core": (752, 300, 712),
    "build": (700, 548, 664),
    "render": (628, 282, 566),
    "phys": (548, 556, 494),
    "editor": (474, 296, 424),
    "script": (412, 540, 362),
    "ui": (352, 318, 306),
    "audio": (300, 512, 268),
}


def solve_leaves():
    placed = []
    for no, key, label, count, adr, jp in FEATURES:
        ny, cx, cy = LAYOUT[key]
        nx = stem_x(ny)
        R = 7.2 * math.sqrt(count)
        side = -1 if cx < nx else 1
        ang = math.atan2(cy - ny, cx - nx)
        pxn, pyn = notch_point(cx, cy, R, ang)
        placed.append(dict(no=no, key=key, label=label, count=count, adr=adr, jp=jp, side=side, R=R,
                           cx=cx, cy=cy, ang=ang, nx=nx, ny=ny, px=pxn, py=pyn))
    placed.sort(key=lambda q: -q["ny"])
    for i, q in enumerate(placed):
        q["no"] = f"{i + 1:02d}"
    check(placed)
    return placed


def check(placed):
    from shapely.geometry import LineString, Polygon
    polys = {q["key"]: Polygon(leaf_points(q["cx"], q["cy"], q["R"], q["ang"])) for q in placed}
    stem = LineString([(stem_x(y), y) for y in range(Y_TIP, Y_GROUND)])
    for q in placed:
        P = polys[q["key"]]
        d = P.distance(stem)
        if d < 8:
            print("STEM", q["key"], round(d, 1))
        pet = LineString([(q["nx"], q["ny"]), (q["px"], q["py"])])
        for o in placed:
            if o is q:
                continue
            dd = P.distance(polys[o["key"]])
            if dd < 10 and q["key"] < o["key"]:
                print("LEAF", q["key"], o["key"], round(dd, 1))
            pd = pet.distance(polys[o["key"]])
            if pd < 5:
                print("PETIOLE", q["key"], "->", o["key"], round(pd, 1))
        b = P.bounds
        if b[0] < 172 or b[2] > W - 172 or b[1] < Y_L3 + 6 or b[3] > Y_L2 - 6:
            print("BOUNDS", q["key"], [round(v) for v in b])
    for side in (-1, 1):
        ys = sorted(q["cy"] for q in placed if q["side"] == side)
        for a, b2 in zip(ys, ys[1:]):
            if b2 - a < 26:
                print("LABEL", side, a, b2)


def seg_circle(x1, y1, x2, y2, cx, cy, r):
    dx, dy = x2 - x1, y2 - y1
    L2 = dx * dx + dy * dy
    t = max(0, min(1, ((cx - x1) * dx + (cy - y1) * dy) / L2)) if L2 else 0
    return math.hypot(x1 + t * dx - cx, y1 + t * dy - cy) < r


# ---------------------------------------------------------------- text helpers
def font(ctx, fam, size, bold=False):
    ctx.select_font_face(fam, cairo.FONT_SLANT_NORMAL,
                         cairo.FONT_WEIGHT_BOLD if bold else cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(size)


def text_w(ctx, s, track=0.0):
    w = 0
    for ch in s:
        w += ctx.text_extents(ch).x_advance + track
    return w - track if s else 0


def text(ctx, x, y, s, fam, size, col, align="l", track=0.0, bold=False):
    font(ctx, fam, size, bold)
    w = text_w(ctx, s, track) if track else ctx.text_extents(s).x_advance
    if align == "r":
        x -= w
    elif align == "c":
        x -= w / 2
    ctx.set_source_rgba(*col)
    if not track:
        ctx.move_to(x, y)
        ctx.show_text(s)
        ctx.new_path()
        return w
    for ch in s:
        ctx.move_to(x, y)
        ctx.show_text(ch)
        x += ctx.text_extents(ch).x_advance + track
    ctx.new_path()
    return w


def line(ctx, x1, y1, x2, y2, col, w):
    ctx.set_source_rgba(*col)
    ctx.set_line_width(w)
    ctx.move_to(x1, y1)
    ctx.line_to(x2, y2)
    ctx.stroke()


def poly(ctx, pts):
    ctx.move_to(*pts[0])
    for p in pts[1:]:
        ctx.line_to(*p)
    ctx.close_path()


# ---------------------------------------------------------------- drawing
def draw(ctx, leaves):
    # ground
    ctx.set_source_rgba(*rgb(CANOPY))
    ctx.rectangle(0, 0, W, H)
    ctx.fill()

    # trellis lattice (diagonal) clipped to frame
    ctx.save()
    ctx.rectangle(FRAME, FRAME, W - 2 * FRAME, H - 2 * FRAME)
    ctx.clip()
    ctx.set_source_rgba(*rgb(HOLLOW, 0.85))
    ctx.set_line_width(0.45)
    s = 24
    for k in range(-int(H / s) - 2, int((W + H) / s) + 2):
        x0 = k * s
        ctx.move_to(x0, 0)
        ctx.line_to(x0 + H, H)
        ctx.move_to(x0, 0)
        ctx.line_to(x0 - H, H)
    ctx.stroke()
    # graticule crosses
    g = 48
    ctx.set_source_rgba(*rgb(TRELLIS, 0.22))
    ctx.set_line_width(0.4)
    gx0 = FRAME + ((W - 2 * FRAME) % g) / 2
    gy0 = FRAME + ((H - 2 * FRAME) % g) / 2
    yy = gy0
    while yy <= H - FRAME:
        xx = gx0
        while xx <= W - FRAME:
            if yy < 210 or yy > 1016:
                xx += g
                continue
            ctx.move_to(xx - 2, yy)
            ctx.line_to(xx + 2, yy)
            ctx.move_to(xx, yy - 2)
            ctx.line_to(xx, yy + 2)
            xx += g
        yy += g
    ctx.stroke()
    ctx.restore()

    # frame + ruler ticks
    ctx.set_source_rgba(*rgb(TRELLIS, 0.55))
    ctx.set_line_width(0.5)
    ctx.rectangle(FRAME, FRAME, W - 2 * FRAME, H - 2 * FRAME)
    ctx.stroke()
    ctx.set_line_width(0.35)
    for i in range(0, int(W - 2 * FRAME) + 1, 8):
        L = 5 if i % 64 == 0 else 2.2
        x = FRAME + i
        ctx.move_to(x, FRAME)
        ctx.line_to(x, FRAME + L)
        ctx.move_to(x, H - FRAME)
        ctx.line_to(x, H - FRAME - L)
    for i in range(0, int(H - 2 * FRAME) + 1, 8):
        L = 5 if i % 64 == 0 else 2.2
        y = FRAME + i
        ctx.move_to(FRAME, y)
        ctx.line_to(FRAME + L, y)
        ctx.move_to(W - FRAME, y)
        ctx.line_to(W - FRAME - L, y)
    ctx.stroke()

    draw_header(ctx)
    draw_strata(ctx)
    draw_soil(ctx)
    draw_stem(ctx)
    for lf in leaves:
        draw_leaf(ctx, lf)
    for lf in leaves:
        draw_leaf_label(ctx, lf)
    draw_footer(ctx)


def draw_header(ctx):
    text(ctx, M, 82, "PRESSED SIGNAL", MONO, 6.2, rgb(TRELLIS), track=1.6)
    text(ctx, M, 92, "FIG. 01  —  PLATE / WORKS / IVY-ENGINE", MONO, 6.2, rgb(TRELLIS, 0.7), track=1.0)
    text(ctx, M, 162, "Ivy Engine", DISPLAY, 58, rgb(LUMEN))
    text(ctx, M + 1, 188, "ツタエンジン  —  ゼロから書いた C++ / Direct3D 11 ゲームエンジン", CJK, 8.6, rgb(MOSS))
    # big figure, top right
    xr = W - M
    text(ctx, xr, 162, "350", DISPLAY, 58, rgb(LUMEN), align="r")
    text(ctx, xr, 82, "FEATURES PLOTTED", MONO, 6.2, rgb(TRELLIS), align="r", track=1.6)
    text(ctx, xr, 92, "8 SYSTEMS  ·  LEAF AREA = COUNT", MONO, 6.2, rgb(TRELLIS, 0.7), align="r", track=1.0)
    text(ctx, xr, 188, "solo  ·  2025.10 → now", MONO, 6.6, rgb(MOSS), align="r")
    line(ctx, M, 206, W - M, 206, rgb(TRELLIS, 0.45), 0.45)


def draw_strata(ctx):
    bands = [
        (Y_L3, Y_L2, "FEATURES"),
        (Y_L2, Y_GROUND, "FOUNDATION"),
        (Y_GROUND, Y_SOIL_END, "GAME CONTENT"),
    ]
    ctx.set_dash([1.2, 2.8])
    for y in (Y_L3, Y_L2, Y_SOIL_END):
        line(ctx, M, y, W - M, y, rgb(TRELLIS, 0.38), 0.4)
    ctx.set_dash([])
    line(ctx, M, Y_GROUND, W - M, Y_GROUND, rgb(TRELLIS, 0.75), 0.6)
    for y0, y1, lab in bands:
        # bracket in the gutter
        x = FRAME + 12
        line(ctx, x, y0 + 3, x, y1 - 3, rgb(TRELLIS, 0.45), 0.4)
        line(ctx, x, y0 + 3, x + 3, y0 + 3, rgb(TRELLIS, 0.45), 0.4)
        line(ctx, x, y1 - 3, x + 3, y1 - 3, rgb(TRELLIS, 0.45), 0.4)
        ctx.save()
        ctx.translate(FRAME + 8.5, (y0 + y1) / 2)
        ctx.rotate(-math.pi / 2)
        font(ctx, MONO, 5.4)
        w = text_w(ctx, lab, 1.2)
        # mask under the label
        ctx.set_source_rgba(*rgb(CANOPY))
        ctx.rectangle(-w / 2 - 3, -6, w + 6, 8.5)
        ctx.fill()
        text(ctx, 0, 0, lab, MONO, 5.4, rgb(TRELLIS), align="c", track=1.2)
        ctx.restore()


def draw_soil(ctx):
    rnd = random.Random(487)
    ctx.set_source_rgba(*rgb(TRELLIS, 0.30))
    for _ in range(1500):
        t = rnd.random() ** 1.6
        y = Y_GROUND + 4 + t * (Y_SOIL_END - Y_GROUND - 8)
        x = M + rnd.random() * (W - 2 * M)
        ctx.arc(x, y, 0.42 + 0.25 * rnd.random(), 0, 2 * math.pi)
        ctx.fill()

    base_x = stem_x(Y_GROUND)
    roots = [
        (-1, (base_x - 150, Y_SOIL_END - 30), "EDITOR", "つくる"),
        (1, (base_x + 150, Y_SOIL_END - 30), "GAME", "あそぶ"),
    ]
    rnd = random.Random(48)
    for side, (tx, ty), lab, exe in roots:
        c1 = (base_x + side * 6, Y_GROUND + 40)
        c2 = (tx - side * 60, ty - 30)
        # mask a channel so stipple does not touch the root
        ctx.set_source_rgba(*rgb(CANOPY))
        ctx.set_line_width(7)
        ctx.move_to(base_x, Y_GROUND)
        ctx.curve_to(*c1, *c2, tx, ty)
        ctx.stroke()
        ctx.set_source_rgba(*rgb(MOSS, 0.9))
        ctx.set_line_width(0.9)
        ctx.move_to(base_x, Y_GROUND)
        ctx.curve_to(*c1, *c2, tx, ty)
        ctx.stroke()
        # root hairs
        ctx.set_line_width(0.3)
        ctx.set_source_rgba(*rgb(MOSS, 0.55))
        for i in range(1, 24):
            t = i / 24
            bx, by = bez((base_x, Y_GROUND), c1, c2, (tx, ty), t)
            dx, dy = bez_d((base_x, Y_GROUND), c1, c2, (tx, ty), t)
            L = math.hypot(dx, dy)
            nx_, ny_ = -dy / L, dx / L
            for sgn in (1, -1):
                ln = 3 + 5 * math.sin(t * math.pi) * (0.6 + 0.4 * rnd.random())
                ctx.move_to(bx, by)
                ctx.line_to(bx + sgn * nx_ * ln + dx / L * ln * 0.6, by + sgn * ny_ * ln + dy / L * ln * 0.6)
        ctx.stroke()
        ctx.set_source_rgba(*rgb(MOSS))
        ctx.arc(tx, ty, 1.6, 0, 2 * math.pi)
        ctx.fill()
        al = "r" if side < 0 else "l"
        lx = tx - 8 if side < 0 else tx + 8
        text(ctx, lx, ty - 1, lab, MONO, 6.2, rgb(LUMEN), align=al, track=1.4)
        text(ctx, lx, ty + 10, exe, CJK, 6.4, rgb(MOSS), align=al)

    text(ctx, base_x, Y_SOIL_END - 6, "two roots  ·  one stem", MONO, 5.8, rgb(TRELLIS), align="c", track=0.6)

    # sediment tags (content project files)
    for x, y, s in [(M + 28, Y_GROUND + 30, "scenes"), (M + 28, Y_GROUND + 62, "models · sounds"),
                    (W - M - 28, Y_GROUND + 46, "game logic")]:
        al = "l" if x < W / 2 else "r"
        font(ctx, MONO, 6.2)
        w = ctx.text_extents(s).x_advance
        bx = x if al == "l" else x - w
        ctx.set_source_rgba(*rgb(CANOPY))
        ctx.rectangle(bx - 14, y - 8, w + 20, 12)
        ctx.fill()
        sq = bx - 10
        ctx.set_source_rgba(*rgb(TRELLIS, 0.9))
        ctx.set_line_width(0.5)
        ctx.rectangle(sq, y - 5.5, 5, 5)
        ctx.stroke()
        text(ctx, bx, y, s, MONO, 6.2, rgb(MOSS))


def bez(p0, p1, p2, p3, t):
    u = 1 - t
    return (u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
            u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1])


def bez_d(p0, p1, p2, p3, t):
    u = 1 - t
    return (3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]),
            3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]))


def draw_stem(ctx):
    ys = [Y_GROUND - i * 0.5 for i in range(int((Y_GROUND - Y_TIP) / 0.5) + 1)]
    # halo
    ctx.set_source_rgba(*rgb(FERN, 0.10))
    ctx.set_line_width(5)
    ctx.move_to(stem_x(ys[0]), ys[0])
    for y in ys[1:]:
        ctx.line_to(stem_x(y), y)
    ctx.stroke()
    ctx.set_source_rgba(*rgb(FERN))
    ctx.set_line_width(1.5)
    ctx.move_to(stem_x(ys[0]), ys[0])
    for y in ys[1:]:
        ctx.line_to(stem_x(y), y)
    ctx.stroke()

    # L2 foundation nodes
    for y, lab in [(Y_L2 + 22, "Windows  ·  DirectX 11"), (Y_L2 + 45, "objects & components"), (Y_L2 + 68, "scene files")]:
        x = stem_x(y)
        line(ctx, x - 9, y, x - 3, y, rgb(TRELLIS), 0.5)
        ctx.set_source_rgba(*rgb(CANOPY))
        ctx.arc(x, y, 2.1, 0, 2 * math.pi)
        ctx.fill()
        ctx.set_source_rgba(*rgb(FERN))
        ctx.set_line_width(0.7)
        ctx.arc(x, y, 2.1, 0, 2 * math.pi)
        ctx.stroke()
        text(ctx, x - 14, y + 2.2, lab, MONO, 6.2, rgb(MOSS), align="r")

    # tip bud
    x = stem_x(Y_TIP)
    for r, a in [(11, 0.10), (7.5, 0.18), (4.5, 0.35)]:
        ctx.set_source_rgba(*rgb(FERN, a))
        ctx.set_line_width(0.5)
        ctx.arc(x, Y_TIP, r, 0, 2 * math.pi)
        ctx.stroke()
    ctx.set_source_rgba(*rgb(FERN))
    ctx.arc(x, Y_TIP, 2.4, 0, 2 * math.pi)
    ctx.fill()
    text(ctx, x + 16, Y_TIP + 2, "still growing", MONO, 5.8, rgb(FERN), track=0.6)


def draw_leaf(ctx, lf):
    cx, cy, R, ang = lf["cx"], lf["cy"], lf["R"], lf["ang"]
    # petiole
    ctx.set_source_rgba(*rgb(MOSS, 0.9))
    ctx.set_line_width(0.7)
    mx, my = (lf["nx"] + lf["px"]) / 2, (lf["ny"] + lf["py"]) / 2 - 3
    ctx.move_to(lf["nx"], lf["ny"])
    ctx.curve_to(mx, my, mx, my, lf["px"], lf["py"])
    ctx.stroke()
    # node on stem
    ctx.set_source_rgba(*rgb(FERN))
    ctx.arc(lf["nx"], lf["ny"], 1.5, 0, 2 * math.pi)
    ctx.fill()

    outline = leaf_points(cx, cy, R, ang)
    ctx.set_source_rgba(*rgb(CANOPY))
    poly(ctx, outline)
    ctx.fill_preserve()
    ctx.set_source_rgba(*rgb(HOLLOW, 0.9))
    ctx.fill()

    # contour rings, spacing ~2.4pt
    rings = max(2, int(R / 2.4))
    ctx.set_line_width(0.3)
    for k in range(1, rings):
        sc = k / rings
        ctx.set_source_rgba(*rgb(TRELLIS, 0.18 + 0.32 * sc))
        poly(ctx, leaf_points(cx, cy, R, ang, sc, n=240))
        ctx.stroke()

    # veins from the notch region to the lobes
    bx, by = cx - 0.18 * R * math.cos(ang), cy - 0.18 * R * math.sin(ang)
    ctx.set_source_rgba(*rgb(MOSS, 0.65))
    ctx.set_line_width(0.45)
    for th in (0.0, 1.22, -1.22, 2.25, -2.25):
        r = R * leaf_r(th) / LEAF_MAX * 0.9
        ctx.move_to(bx, by)
        ctx.line_to(cx + r * math.cos(ang + th), cy + r * math.sin(ang + th))
    ctx.stroke()

    ctx.set_source_rgba(*rgb(MOSS))
    ctx.set_line_width(0.75)
    poly(ctx, outline)
    ctx.stroke()

    # ADR tag on petiole
    if lf["adr"]:
        t = 0.5
        tx = lf["nx"] + (lf["px"] - lf["nx"]) * t
        ty = lf["ny"] + (lf["py"] - lf["ny"]) * t - 1.5
        font(ctx, MONO, 4.8)
        w = ctx.text_extents(lf["adr"]).x_advance
        ctx.set_source_rgba(*rgb(CANOPY))
        ctx.rectangle(tx - w / 2 - 2.2, ty - 9.5, w + 4.4, 7.2)
        ctx.fill()
        ctx.set_source_rgba(*rgb(TRELLIS, 0.85))
        ctx.set_line_width(0.4)
        ctx.rectangle(tx - w / 2 - 2.2, ty - 9.5, w + 4.4, 7.2)
        ctx.stroke()
        text(ctx, tx, ty - 3.9, lf["adr"], MONO, 4.8, rgb(MOSS), align="c")


def draw_leaf_label(ctx, lf):
    side = lf["side"]
    cx, cy, R, ang = lf["cx"], lf["cy"], lf["R"], lf["ang"]
    pts = leaf_points(cx, cy, R, ang)
    edge = min(pts, key=lambda p: p[0]) if side < 0 else max(pts, key=lambda p: p[0])
    ex, ey = edge
    col_x = M + 92 if side < 0 else W - M - 92
    # leader: horizontal at label y, elbow up to edge point
    ly = cy
    ctx.set_source_rgba(*rgb(TRELLIS, 0.6))
    ctx.set_line_width(0.35)
    ctx.move_to(ex + side * 3, ey)
    ctx.line_to(ex + side * 10, ly)
    ctx.line_to(col_x + (6 if side < 0 else -6), ly)
    ctx.stroke()
    ctx.arc(ex + side * 3, ey, 0.9, 0, 2 * math.pi)
    ctx.fill()

    if side < 0:
        text(ctx, M, ly - 3, lf["no"], MONO, 5.8, rgb(TRELLIS))
        text(ctx, M + 14, ly - 3, lf["label"], MONO, 5.8, rgb(LUMEN), track=0.9)
        text(ctx, M, ly + 13, str(lf["count"]), DISPLAY, 13, rgb(MOSS))
        text(ctx, M, ly + 26, lf["jp"], CJK, 6.4, rgb(TRELLIS))
    else:
        xr = W - M
        text(ctx, xr, ly - 3, lf["no"], MONO, 5.8, rgb(TRELLIS), align="r")
        text(ctx, xr - 14, ly - 3, lf["label"], MONO, 5.8, rgb(LUMEN), align="r", track=0.9)
        text(ctx, xr, ly + 13, str(lf["count"]), DISPLAY, 13, rgb(MOSS), align="r")
        text(ctx, xr, ly + 26, lf["jp"], CJK, 6.4, rgb(TRELLIS), align="r")


def draw_footer(ctx):
    y0 = 1040
    stats = [("14", "MONTHS"), ("08", "SYSTEMS"), ("03", "GAMES"), ("01", "PERSON")]
    x = M
    for num, lab in stats:
        text(ctx, x, y0 + 30, num, DISPLAY, 24, rgb(LUMEN))
        text(ctx, x, y0 + 44, lab, MONO, 5.6, rgb(TRELLIS), track=1.0)
        x += 92
    text(ctx, M, y0 + 74, "Direct3D 11  ·  DirectXMath  ·  XAudio2  ·  Dear ImGui  ·  Box2D 3.1.1  ·  Effekseer",
         MONO, 5.8, rgb(MOSS))

    # herbarium label card
    cw, ch = 262, 92
    cx0, cy0 = W - M - cw, y0
    ctx.set_source_rgba(*rgb(HOLLOW, 0.95))
    ctx.rectangle(cx0, cy0, cw, ch)
    ctx.fill()
    ctx.set_source_rgba(*rgb(TRELLIS, 0.7))
    ctx.set_line_width(0.5)
    ctx.rectangle(cx0, cy0, cw, ch)
    ctx.stroke()
    ctx.set_line_width(0.3)
    ctx.rectangle(cx0 + 3, cy0 + 3, cw - 6, ch - 6)
    ctx.stroke()
    text(ctx, cx0 + 14, cy0 + 20, "HEDERA EX NIHILO", MONO, 8, rgb(LUMEN), track=2.2, bold=True)
    text(ctx, cx0 + cw - 14, cy0 + 20, "No. 001", MONO, 6, rgb(TRELLIS), align="r")
    line(ctx, cx0 + 14, cy0 + 27, cx0 + cw - 14, cy0 + 27, rgb(TRELLIS, 0.5), 0.35)
    rows = [("coll.", "楊 子悠  /  YEUNG Tsz Yau"), ("det.", "C++17  ·  Direct3D 11  ·  ImGui editor"),
            ("loc.", "HAL Tokyo  ·  personal work"), ("date", "2025.10  →  2026.11")]
    for i, (k, v) in enumerate(rows):
        yy = cy0 + 41 + i * 13
        text(ctx, cx0 + 14, yy, k, MONO, 6, rgb(TRELLIS))
        if i == 0:
            w = text(ctx, cx0 + 48, yy, "楊 子悠", CJK, 6.6, rgb(LUMEN))
            text(ctx, cx0 + 48 + w + 6, yy, "/  YEUNG Tsz Yau", MONO, 6.2, rgb(MOSS))
        else:
            text(ctx, cx0 + 48, yy, v, MONO, 6.2, rgb(MOSS))

    text(ctx, W / 2, H - FRAME - 12, "IVY ENGINE  ·  grown alongside its games", MONO, 5.6,
         rgb(TRELLIS, 0.8), align="c", track=1.4)


def main():
    leaves = solve_leaves()
    for lf in leaves:
        print(f'{lf["label"]:16} side={lf["side"]:+d} R={lf["R"]:.1f} c=({lf["cx"]:.0f},{lf["cy"]:.0f})')
    pdf = cairo.PDFSurface("./ivy-engine-pressed-signal.pdf", W, H)
    ctx = cairo.Context(pdf)
    draw(ctx, leaves)
    pdf.finish()
    S = 3
    png = cairo.ImageSurface(cairo.FORMAT_ARGB32, int(W * S), int(H * S))
    ctx = cairo.Context(png)
    ctx.scale(S, S)
    draw(ctx, leaves)
    png.write_to_png("./ivy-engine-pressed-signal.png")


if __name__ == "__main__":
    main()
