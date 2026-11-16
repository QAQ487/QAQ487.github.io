"""Specimen Scale — Fig. 02 (Skin): the GPU-skin story in three large stages.

01 scattered (the first GPU try)  ·  02 compared against the slow, known-right version  ·  03 matched.
"""
import math
import random

from common import (CANOPY, CJK, DISPLAY, FERN, HOLLOW, LUMEN, MONO, MOSS, TRELLIS, circle, ground, line, render,
                    rgb, text)

W, H = 1600, 1000
M = 84
S = 200                     # skeleton scale (px per unit)
BASE_Y = 664                # feet line
PANEL_X = [330, 800, 1270]  # stage centres
LABEL_Y = 740

J = {  # joint positions, x right, y up (units); feet at y = 0
    "head": (0, 1.78), "neck": (0, 1.52), "chest": (0, 1.30), "spine": (0, 1.02), "pelvis": (0, 0.86),
    "shL": (-0.24, 1.44), "elL": (-0.34, 1.12), "haL": (-0.40, 0.82),
    "shR": (0.24, 1.44), "elR": (0.34, 1.12), "haR": (0.40, 0.82),
    "hiL": (-0.13, 0.84), "knL": (-0.15, 0.44), "ftL": (-0.17, 0.03),
    "hiR": (0.13, 0.84), "knR": (0.15, 0.44), "ftR": (0.17, 0.03),
}
BONES = [("neck", "chest"), ("chest", "spine"), ("spine", "pelvis"),
         ("chest", "shL"), ("shL", "elL"), ("elL", "haL"),
         ("chest", "shR"), ("shR", "elR"), ("elR", "haR"),
         ("pelvis", "hiL"), ("hiL", "knL"), ("knL", "ftL"),
         ("pelvis", "hiR"), ("hiR", "knR"), ("knR", "ftR")]


def to_px(cx, p):
    return cx + p[0] * S, BASE_Y - p[1] * S


def capsule(ctx, a, b, w, col, lw, fill=None, dash=None):
    ax, ay = a
    bx, by = b
    ang = math.atan2(by - ay, bx - ax)
    L = math.hypot(bx - ax, by - ay)
    ctx.save()
    ctx.translate(ax, ay)
    ctx.rotate(ang)
    r = w / 2
    ctx.new_path()
    ctx.arc(0, 0, r, math.pi / 2, 3 * math.pi / 2)
    ctx.arc(L, 0, r, -math.pi / 2, math.pi / 2)
    ctx.close_path()
    ctx.restore()
    if fill:
        ctx.set_source_rgba(*fill)
        ctx.fill_preserve()
    ctx.set_source_rgba(*col)
    ctx.set_line_width(lw)
    ctx.set_dash(dash or [])
    ctx.stroke()
    ctx.set_dash([])


def skeleton(ctx, cx, col, lw=1.6, w=13, fill=None, dash=None, offsets=None, head=True):
    for i, (a, b) in enumerate(BONES):
        pa, pb = to_px(cx, J[a]), to_px(cx, J[b])
        if offsets:
            dx, dy, rot = offsets[i]
            mx, my = (pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2
            c, s = math.cos(rot), math.sin(rot)

            def tr(p):
                x, y = p[0] - mx, p[1] - my
                return mx + x * c - y * s + dx, my + x * s + y * c + dy
            pa, pb = tr(pa), tr(pb)
        capsule(ctx, pa, pb, w, col, lw, fill, dash)
    if head:
        hx, hy = to_px(cx, J["head"])
        if offsets:
            hx, hy = hx + offsets[0][0] * 0.5, hy + abs(offsets[0][1]) * 0.4
        ctx.new_path()
        ctx.arc(hx, hy, 0.15 * S, 0, 2 * math.pi)
        if fill:
            ctx.set_source_rgba(*fill)
            ctx.fill_preserve()
        ctx.set_source_rgba(*col)
        ctx.set_line_width(lw)
        ctx.set_dash(dash or [])
        ctx.stroke()
        ctx.set_dash([])


def joints(ctx, cx, col, r=3.2):
    for k, p in J.items():
        if k == "head":
            continue
        x, y = to_px(cx, p)
        circle(ctx, x, y, r, col, fill=True)


def stage_scattered(ctx, cx):
    rnd = random.Random(52)
    offs = [(rnd.uniform(-64, 64), rnd.uniform(-40, 46), rnd.uniform(-0.9, 0.9)) for _ in BONES]
    skeleton(ctx, cx, rgb(TRELLIS, 0.45), 1.0, dash=[3, 5])           # where they should be
    skeleton(ctx, cx, rgb(MOSS), 1.6, fill=rgb(HOLLOW, 0.95), offsets=offs)


def stage_compared(ctx, cx):
    rnd = random.Random(104)
    offs = []
    for _ in BONES:
        a = rnd.uniform(0, 2 * math.pi)
        d = rnd.uniform(9, 16)
        offs.append((d * math.cos(a), d * math.sin(a), rnd.uniform(-0.05, 0.05)))
    skeleton(ctx, cx, rgb(LUMEN, 0.55), 1.2, dash=[3, 5])            # the answer key (CPU)
    skeleton(ctx, cx, rgb(MOSS), 1.6, fill=rgb(HOLLOW, 0.9), offsets=offs)
    # measurement ticks at each bone midpoint: answer -> attempt
    for i, (a, b) in enumerate(BONES):
        pa, pb = to_px(cx, J[a]), to_px(cx, J[b])
        mx, my = (pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2
        dx, dy, _ = offs[i]
        line(ctx, mx, my, mx + dx, my + dy, rgb(FERN), 1.5)
        circle(ctx, mx, my, 1.8, rgb(LUMEN, 0.8), fill=True)


def stage_matched(ctx, cx):
    skeleton(ctx, cx, rgb(FERN, 0.12), 9, w=13)                        # halo
    skeleton(ctx, cx, rgb(FERN), 1.8, fill=rgb(HOLLOW, 0.95))
    skeleton(ctx, cx, rgb(LUMEN, 0.5), 0.8, w=5, head=False, dash=[3, 5])  # answer key, inside
    joints(ctx, cx, rgb(FERN))


STAGES = [
    ("01", "SCATTERED", "ばらばら", "first GPU try", stage_scattered, MOSS),
    ("02", "COMPARED", "答え合わせ", "against the slow, right version", stage_compared, LUMEN),
    ("03", "MATCHED", "一致", "fast, and right", stage_matched, FERN),
]


def draw(ctx):
    ground(ctx, W, H, avoid=[(0, 0, W, 250), (0, LABEL_Y - 40, W, H)])
    text(ctx, M, M + 24, "SPECIMEN SCALE  ·  FIG. 02", MONO, 14, rgb(TRELLIS), track=2.6)
    text(ctx, M, 196, "GPU Skin", DISPLAY, 72, rgb(LUMEN))
    text(ctx, W - M, 152, "slow and right,", MONO, 22, rgb(MOSS), align="r", track=1.0)
    text(ctx, W - M, 186, "then fast", MONO, 22, rgb(FERN), align="r", track=1.0)

    # floor line under all three stages
    line(ctx, M, BASE_Y + 14, W - M, BASE_Y + 14, rgb(TRELLIS, 0.5), 0.8)
    for x in range(M, W - M + 1, 16):
        L = 7 if (x - M) % 128 == 0 else 3
        line(ctx, x, BASE_Y + 14, x, BASE_Y + 14 + L, rgb(TRELLIS, 0.45), 0.6)
    # stage dividers
    for x in ((PANEL_X[0] + PANEL_X[1]) / 2, (PANEL_X[1] + PANEL_X[2]) / 2):
        line(ctx, x, 280, x, BASE_Y - 10, rgb(TRELLIS, 0.35), 0.8, dash=[2, 6])
        circle(ctx, x, 280, 2.2, rgb(TRELLIS, 0.6), fill=True)

    for cx, (no, word, jp, sub, fn, col) in zip(PANEL_X, STAGES):
        fn(ctx, cx)
        text(ctx, cx, LABEL_Y + 34, no, DISPLAY, 40, rgb(col), align="c")
        text(ctx, cx, LABEL_Y + 80, word, MONO, 20, rgb(LUMEN), align="c", track=3.0)
        text(ctx, cx, LABEL_Y + 112, sub, MONO, 15, rgb(MOSS), align="c")
        text(ctx, cx, LABEL_Y + 146, jp, CJK, 16, rgb(TRELLIS), align="c", track=4)

    text(ctx, M, H - M + 6, "goal  ·  32 characters at 60 fps", MONO, 14, rgb(TRELLIS), track=2.0)
    text(ctx, W - M, H - M + 6, "Ivy Engine", DISPLAY, 18, rgb(MOSS), align="r")


if __name__ == "__main__":
    render("fig02-skin", W, H, draw)
