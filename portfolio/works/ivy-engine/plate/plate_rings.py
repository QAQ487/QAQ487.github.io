"""Fig. 05 — Rings: fourteen months as growth rings, and the same months as a core sample."""
import math

from common import (CANOPY, FERN, HOLLOW, LUMEN, MONO, MOSS, TRELLIS, DISPLAY, circle, ground, line,
                    mask_text, masthead, rect, render, rgb, text)

W, H = 1200, 720
M = 56
CX, CY = 352, 392
MONTHS = ["10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]  # 2025.10 → 2026.11
N = len(MONTHS)

WORKS = [  # name, first month idx, last idx, angle (deg, screen, 0 = right, clockwise)
    ("Scrap Burst", 0, 5, 158),
    ("Block Shooter", 3, 3, 182),
    ("Magnet Field", 6, 9, 206),
    ("Frisbee Arena", 10, 11, 230),
    ("Gravity Swing", 12, 12, 254),
    ("Village & Goblin", 12, 13, 278),
]
MARKS = [  # label, idx, angle
    ("ADR 0006", 11, 18),
    ("ADR 0007 · 0008", 12, 40),
    ("bridge P7 · agent docs", 13, 62),
]


def ring_r(k):
    # uneven growth: a lean winter, a fast spring
    g = [12, 11, 10, 10, 11, 13, 17, 16, 15, 15, 16, 17, 18, 16]
    return 18 + sum(g[: k + 1])


def wobble(k, th):
    return 1 + 0.008 * math.sin(3 * th + k * 0.7) + 0.005 * math.sin(7 * th + k * 1.9) + 0.003 * math.sin(
        11 * th + k)


def ring_path(ctx, r, k, n=360):
    ctx.new_path()
    for i in range(n + 1):
        th = i / n * 2 * math.pi
        rr = r * wobble(k, th)
        x, y = CX + rr * math.cos(th), CY + rr * math.sin(th)
        (ctx.move_to if i == 0 else ctx.line_to)(x, y)
    ctx.close_path()


def pt(k, deg, extra=0.0):
    th = math.radians(deg)
    r = ring_r(k) * wobble(k, th) + extra
    return CX + r * math.cos(th), CY + r * math.sin(th)


def draw_rings(ctx):
    R = ring_r(N - 1)
    ring_path(ctx, R + 3, N - 1)
    ctx.set_source_rgba(*rgb(HOLLOW, 0.9))
    ctx.fill()
    # fine latewood lines between month rings
    for k in range(N):
        r0 = ring_r(k - 1) if k else 6
        r1 = ring_r(k)
        for j in range(1, 4):
            ring_path(ctx, r0 + (r1 - r0) * j / 4, k)
            ctx.set_source_rgba(*rgb(TRELLIS, 0.16))
            ctx.set_line_width(0.3)
            ctx.stroke()
        ring_path(ctx, r1, k)
        engine = k >= 6
        ctx.set_source_rgba(*rgb(MOSS if engine else TRELLIS, 0.85 if engine else 0.6))
        ctx.set_line_width(0.7 if k in (5, 6) else 0.5)
        ctx.stroke()
    # medullary rays
    for i in range(36):
        th = i * 2 * math.pi / 36 + 0.05
        r0 = 10 + (i % 3) * 14
        line(ctx, CX + r0 * math.cos(th), CY + r0 * math.sin(th), CX + R * 0.97 * math.cos(th),
             CY + R * 0.97 * math.sin(th), rgb(TRELLIS, 0.12), 0.3)
    # the cambium: the newest ring is the living one
    ring_path(ctx, R + 3, N - 1)
    ctx.set_source_rgba(*rgb(FERN))
    ctx.set_line_width(1.2)
    ctx.stroke()
    ring_path(ctx, R + 7, N - 1)
    ctx.set_source_rgba(*rgb(FERN, 0.18))
    ctx.set_line_width(0.5)
    ctx.stroke()
    # pith
    circle(ctx, CX, CY, 3, rgb(MOSS), fill=True)
    # framework -> engine boundary label along the ring
    return R


def leader(ctx, x0, y0, deg, R, label, sub=None, col=None):
    th = math.radians(deg)
    x1, y1 = CX + (R + 22) * math.cos(th), CY + (R + 22) * math.sin(th)
    right = math.cos(th) >= 0
    x2 = x1 + (14 if right else -14)
    ctx.new_path()
    ctx.move_to(x0, y0)
    ctx.line_to(x1, y1)
    ctx.line_to(x2, y1)
    ctx.set_source_rgba(*rgb(TRELLIS, 0.7))
    ctx.set_line_width(0.4)
    ctx.stroke()
    al = "l" if right else "r"
    tx = x2 + (4 if right else -4)
    text(ctx, tx, y1 + 2.2, label, MONO, 6.4, col or rgb(LUMEN), align=al)
    if sub:
        text(ctx, tx, y1 + 11.5, sub, MONO, 5.6, rgb(TRELLIS), align=al)


def draw_events(ctx, R):
    for name, a, b, deg in WORKS:
        r0 = (ring_r(a - 1) if a else 6) + 2
        r1 = ring_r(b) - 2
        th = math.radians(deg)
        # a radial bar of short ticks
        rr = r0
        while rr <= r1:
            w = 3.2
            px, py = CX + rr * math.cos(th), CY + rr * math.sin(th)
            nx_, ny_ = -math.sin(th), math.cos(th)
            line(ctx, px - nx_ * w, py - ny_ * w, px + nx_ * w, py + ny_ * w, rgb(LUMEN, 0.9), 0.6)
            rr += 2.4
        x0, y0 = CX + r1 * math.cos(th), CY + r1 * math.sin(th)
        span = f"{2025 if a < 3 else 2026}.{MONTHS[a]}" + (f"–{MONTHS[b]}" if b != a else "")
        leader(ctx, x0, y0, deg, R, name, span)
    for label, k, deg in MARKS:
        x0, y0 = pt(k, deg)
        ctx.new_path()
        s = 3.4
        ctx.move_to(x0, y0 - s)
        ctx.line_to(x0 + s, y0)
        ctx.line_to(x0, y0 + s)
        ctx.line_to(x0 - s, y0)
        ctx.close_path()
        ctx.set_source_rgba(*rgb(FERN if k == N - 1 else MOSS))
        ctx.fill()
        leader(ctx, x0, y0, deg, R, label, f"2026.{MONTHS[k]}", col=rgb(FERN) if k == N - 1 else None)
    # ADR 0001–0005: dated only as "by 2026.09" — a dotted arc, no point
    k = 11
    ctx.new_path()
    for i in range(0, 41):
        deg = -40 + i * 0.9
        x, y = pt(k, deg, -6)
        (ctx.move_to if i == 0 else ctx.line_to)(x, y)
    ctx.set_source_rgba(*rgb(MOSS, 0.9))
    ctx.set_line_width(0.8)
    ctx.set_dash([0.8, 2.4])
    ctx.stroke()
    ctx.set_dash([])
    x0, y0 = pt(k, -22, -6)
    leader(ctx, x0, y0, -22, R, "ADR 0001–0005", "by 2026.09")
    # centre labels
    mask_text(ctx, CX + 10, CY + 3, "2025.10  framework", MONO, 5.8, rgb(MOSS), pad=1.8)
    x, y = pt(6, 120, 0)
    mask_text(ctx, x - 6, y + 2, "2026.04  Ivy Engine", MONO, 5.8, rgb(LUMEN), align="r", pad=1.8)


def draw_core(ctx):
    X0, X1 = 760, W - M
    y = 214
    text(ctx, X0, y - 46, "CORE SAMPLE", MONO, 6.4, rgb(LUMEN), track=1.6)
    text(ctx, X0, y - 35, "the same fourteen months, laid flat", MONO, 5.9, rgb(MOSS))
    step = (X1 - X0 - 100) / (N - 1)
    gx = X0 + 100

    def mx(i):
        return gx + i * step

    for i, m in enumerate(MONTHS):
        x = mx(i)
        line(ctx, x, y, x, y + 4, rgb(TRELLIS, 0.8), 0.4)
        text(ctx, x, y - 5, m, MONO, 5.4, rgb(TRELLIS), align="c")
    line(ctx, gx - 6, y, X1, y, rgb(TRELLIS, 0.6), 0.45)
    text(ctx, mx(0), y - 15, "2025", MONO, 5.6, rgb(MOSS), align="c")
    text(ctx, mx(3), y - 15, "2026", MONO, 5.6, rgb(MOSS), align="c")
    rows = [("framework", 0, 5, "trellis"), ("Ivy Engine", 6, 13, "fern")]
    rows += [(n, a, b, "moss") for n, a, b, _ in WORKS]
    yy = y + 22
    for name, a, b, kind in rows:
        text(ctx, X0, yy + 2.2, name, MONO, 6.2, rgb(LUMEN if kind != "trellis" else MOSS))
        line(ctx, gx - 6, yy, X1, yy, rgb(TRELLIS, 0.18), 0.35, dash=[1, 3])
        x0, x1 = mx(a) - 3, mx(b) + 3
        if kind == "fern":
            rect(ctx, x0, yy - 3.5, x1 - x0, 7, rgb(FERN, 0.9), fill=True)
            ctx.new_path()
            ctx.move_to(x1 + 2, yy - 3.5)
            ctx.line_to(x1 + 7, yy)
            ctx.line_to(x1 + 2, yy + 3.5)
            ctx.set_source_rgba(*rgb(FERN))
            ctx.fill()
        else:
            rect(ctx, x0, yy - 3.5, x1 - x0, 7, rgb(HOLLOW), fill=True)
            ctx.save()
            ctx.rectangle(x0, yy - 3.5, x1 - x0, 7)
            ctx.clip()
            k = x0 - 8
            while k < x1 + 8:
                line(ctx, k, yy + 3.5, k + 7, yy - 3.5, rgb(TRELLIS, 0.55), 0.35)
                k += 2.6
            ctx.restore()
            rect(ctx, x0, yy - 3.5, x1 - x0, 7, rgb(MOSS if kind == "moss" else TRELLIS), 0.5)
        yy += 27
    # decisions row
    yy += 8
    text(ctx, X0, yy + 2.2, "decisions", MONO, 6.2, rgb(LUMEN))
    line(ctx, gx - 6, yy, X1, yy, rgb(TRELLIS, 0.18), 0.35, dash=[1, 3])
    line(ctx, mx(6), yy, mx(11) - 5, yy, rgb(MOSS, 0.8), 0.6, dash=[0.8, 2.2])
    text(ctx, mx(6) - 4, yy + 2, "…", MONO, 6, rgb(MOSS), align="r")
    for k, col in ((11, MOSS), (12, MOSS), (13, FERN)):
        x = mx(k)
        ctx.new_path()
        s = 3.4
        ctx.move_to(x, yy - s)
        ctx.line_to(x + s, yy)
        ctx.line_to(x, yy + s)
        ctx.line_to(x - s, yy)
        ctx.close_path()
        ctx.set_source_rgba(*rgb(col))
        ctx.fill()
    text(ctx, X0, yy + 20, "dotted: ADR 0001–0005, dated only as “by 2026.09”", MONO, 5.6, rgb(TRELLIS))
    return yy


def draw(ctx):
    ground(ctx, W, H, avoid=[(0, 0, W, M + 30), (0, H - M - 40, W, H)])
    masthead(ctx, W, M, "05", "RINGS", "FOURTEEN MONTHS OF GROWTH", "2025.10  →  2026.11")
    R = draw_rings(ctx)
    draw_events(ctx, R)
    draw_core(ctx)
    yb = 648
    line(ctx, 760, yb - 22, W - M, yb - 22, rgb(TRELLIS, 0.45), 0.45)
    text(ctx, 760, yb, "Ivy Engine", DISPLAY, 18, rgb(LUMEN))
    text(ctx, W - M, yb, "05", DISPLAY, 18, rgb(MOSS), align="r")
    text(ctx, W / 2, H - 40, "PRESSED SIGNAL  ·  one ring a month, the outer one still growing", MONO, 5.6,
         rgb(TRELLIS, 0.8), align="c", track=1.4)


if __name__ == "__main__":
    render("fig05-rings", W, H, draw)
