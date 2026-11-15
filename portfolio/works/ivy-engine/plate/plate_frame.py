"""Fig. 02 — Frame: the update ring and the worker pool."""
import math

from common import (CANOPY, FERN, HOLLOW, LUMEN, MONO, MOSS, TRELLIS, DISPLAY, circle, ground, line,
                    mask_text, masthead, rect, render, rgb, text)

W, H = 1200, 720
M = 56
CX, CY = 352, 400
R_OUT, R_IN = 206, 150
STAGES = ["INPUT", "COMPONENT", "LOGIC", "PHYSICS", "CHILDREN", "DRAW", "SWAPCHAIN"]
GAP = math.radians(3.2)


def seg_angles(i):
    span = 2 * math.pi / len(STAGES)
    a0 = -math.pi / 2 + i * span + GAP / 2
    return a0, a0 + span - GAP


def band(ctx, a0, a1, r0, r1, lines=18):
    ctx.new_path()
    ctx.arc(CX, CY, r1, a0, a1)
    ctx.arc_negative(CX, CY, r0, a1, a0)
    ctx.close_path()
    ctx.set_source_rgba(*rgb(HOLLOW, 0.95))
    ctx.fill()
    for k in range(1, lines):
        t = k / lines
        r = r0 + (r1 - r0) * t
        ctx.new_path()
        ctx.arc(CX, CY, r, a0, a1)
        ctx.set_source_rgba(*rgb(TRELLIS, 0.16 + 0.34 * t))
        ctx.set_line_width(0.3)
        ctx.stroke()
    ctx.new_path()
    ctx.arc(CX, CY, r1, a0, a1)
    ctx.arc_negative(CX, CY, r0, a1, a0)
    ctx.close_path()
    ctx.set_source_rgba(*rgb(MOSS))
    ctx.set_line_width(0.7)
    ctx.stroke()


def draw_ring(ctx):
    # 120 timing ticks on the inner dial
    for k in range(120):
        a = -math.pi / 2 + k * 2 * math.pi / 120
        L = 9 if k % 10 == 0 else 4
        r0 = R_IN - 12
        line(ctx, CX + r0 * math.cos(a), CY + r0 * math.sin(a),
             CX + (r0 - L) * math.cos(a), CY + (r0 - L) * math.sin(a),
             rgb(TRELLIS, 0.75 if k % 10 == 0 else 0.4), 0.4)
    circle(ctx, CX, CY, R_IN - 30, rgb(TRELLIS, 0.35), 0.4)
    circle(ctx, CX, CY, 34, rgb(TRELLIS, 0.35), 0.4)
    ctx.set_dash([1, 3])
    circle(ctx, CX, CY, 70, rgb(TRELLIS, 0.4), 0.4)
    ctx.set_dash([])

    for i, name in enumerate(STAGES):
        a0, a1 = seg_angles(i)
        band(ctx, a0, a1, R_IN, R_OUT)
        am = (a0 + a1) / 2
        # stage index inside the band
        rx = (R_IN + R_OUT) / 2
        mask_text(ctx, CX + rx * math.cos(am), CY + rx * math.sin(am) + 2.2, f"{i + 1:02d}",
                  MONO, 6.2, rgb(MOSS), align="c", pad=2)
        # label outside
        rl = R_OUT + 16
        lx, ly = CX + rl * math.cos(am), CY + rl * math.sin(am)
        c = math.cos(am)
        al = "c" if abs(c) < 0.25 else ("l" if c > 0 else "r")
        dy = 2.2 + (6 if math.sin(am) > 0.8 else (-2 if math.sin(am) < -0.8 else 0))
        text(ctx, lx, ly + dy, name, MONO, 6.6, rgb(LUMEN), align=al, track=1.3)

    # WinMain entry stem
    top = CY - R_OUT
    line(ctx, CX, M + 70, CX, top - 4, rgb(TRELLIS, 0.8), 0.6)
    circle(ctx, CX, M + 70, 2.2, rgb(TRELLIS), fill=True)
    text(ctx, CX + 10, M + 72.5, "WinMain", MONO, 6.6, rgb(MOSS))
    # flow arrows between stages (small chevrons on the outer rim)
    for i in range(len(STAGES)):
        a = seg_angles(i)[1] + GAP / 2
        r = R_OUT + 4
        x, y = CX + r * math.cos(a), CY + r * math.sin(a)
        tx, ty = -math.sin(a), math.cos(a)
        nx_, ny_ = math.cos(a), math.sin(a)
        ctx.new_path()
        ctx.move_to(x - tx * 2.5 + nx_ * 2.5, y - ty * 2.5 + ny_ * 2.5)
        ctx.line_to(x + tx * 2.5, y + ty * 2.5)
        ctx.line_to(x - tx * 2.5 - nx_ * 2.5, y - ty * 2.5 - ny_ * 2.5)
        ctx.set_source_rgba(*rgb(TRELLIS))
        ctx.set_line_width(0.6)
        ctx.stroke()

    # the living hand: sweeps to LOGIC, with a fading trail
    a0, a1 = seg_angles(2)
    hand = a0 + 0.3 * (a1 - a0)
    for k in range(26):
        a = hand - k * 0.035
        al = 0.55 * (1 - k / 26) ** 1.6
        ctx.new_path()
        ctx.move_to(CX + 36 * math.cos(a), CY + 36 * math.sin(a))
        ctx.line_to(CX + (R_IN - 32) * math.cos(a), CY + (R_IN - 32) * math.sin(a))
        ctx.set_source_rgba(*rgb(FERN, al * 0.35))
        ctx.set_line_width(0.6)
        ctx.stroke()
    line(ctx, CX + 36 * math.cos(hand), CY + 36 * math.sin(hand),
         CX + (R_OUT + 2) * math.cos(hand), CY + (R_OUT + 2) * math.sin(hand), rgb(FERN), 1.3)
    circle(ctx, CX + (R_OUT + 2) * math.cos(hand), CY + (R_OUT + 2) * math.sin(hand), 2.6, rgb(FERN), fill=True)
    circle(ctx, CX, CY, 3, rgb(FERN), fill=True)
    for r, a in [(9, 0.25), (15, 0.12)]:
        circle(ctx, CX, CY, r, rgb(FERN, a), 0.5)
    return hand


JOBS = [  # id, lane, x0, x1, deps
    (1, 0, 0, 80, []),
    (2, 1, 0, 58, []),
    (3, 2, 96, 188, [1, 2]),
    (4, 3, 74, 134, [2]),
    (5, 0, 206, 296, [3]),
    (6, 3, 150, 214, [4]),
    (7, 1, 312, 412, [5, 6]),
]
JX = 700
LANE_Y = [214, 250, 286, 322]
SEQ_Y = 420


def hatch(ctx, x, y, w, h, col):
    ctx.save()
    ctx.rectangle(x, y, w, h)
    ctx.clip()
    ctx.set_source_rgba(*col)
    ctx.set_line_width(0.35)
    k = -h
    while k < w + h:
        ctx.move_to(x + k, y + h)
        ctx.line_to(x + k + h, y)
        k += 3.2
    ctx.stroke()
    ctx.restore()


def job_box(ctx, x, y, w, idx, h=14):
    rect(ctx, x, y - h / 2, w, h, rgb(HOLLOW), fill=True)
    hatch(ctx, x, y - h / 2, w, h, rgb(TRELLIS, 0.45))
    rect(ctx, x, y - h / 2, w, h, rgb(MOSS), 0.6)
    mask_text(ctx, x + 5, y + 2.3, f"j{idx}", MONO, 5.8, rgb(LUMEN), pad=1.6)


def draw_jobs(ctx, hand):
    x_end = W - M - 36
    text(ctx, JX - 44, 166, "WORKER POOL", MONO, 6.4, rgb(LUMEN), track=1.6)
    text(ctx, JX - 44, 176, "dependency graph  ·  parallel script update", MONO, 5.9, rgb(MOSS))
    for i, y in enumerate(LANE_Y):
        text(ctx, JX - 14, y + 2.2, f"W{i}", MONO, 6, rgb(TRELLIS), align="r")
        line(ctx, JX - 6, y, x_end, y, rgb(TRELLIS, 0.35), 0.4, dash=[1.2, 2.8])
    pos = {}
    for jid, lane, x0, x1, deps in JOBS:
        pos[jid] = (JX + x0, JX + x1, LANE_Y[lane])
    # dependency curves first
    for jid, lane, x0, x1, deps in JOBS:
        for d in deps:
            ax, ay = pos[d][1], pos[d][2]
            bx, by = pos[jid][0], pos[jid][2]
            ctx.new_path()
            ctx.move_to(ax, ay)
            ctx.curve_to(ax + 14, ay, bx - 14, by, bx, by)
            ctx.set_source_rgba(*rgb(MOSS, 0.75))
            ctx.set_line_width(0.5)
            ctx.stroke()
            circle(ctx, bx - 1, by, 1.2, rgb(MOSS), fill=True)
    for jid, lane, x0, x1, deps in JOBS:
        job_box(ctx, JX + x0, LANE_Y[lane], x1 - x0, jid)
    par_end = max(p[1] for p in pos.values())
    # result node (parallel)
    rx = x_end
    ry = LANE_Y[1]
    line(ctx, par_end, ry, rx - 5, ry, rgb(MOSS, 0.75), 0.5)
    circle(ctx, rx, ry, 4.5, rgb(CANOPY), fill=True)
    circle(ctx, rx, ry, 4.5, rgb(FERN), 0.7)
    circle(ctx, rx, ry, 1.6, rgb(FERN), fill=True)

    # sequential fallback
    text(ctx, JX - 44, SEQ_Y - 34, "SEQUENTIAL FALLBACK", MONO, 6.4, rgb(LUMEN), track=1.6)
    text(ctx, JX - 44, SEQ_Y - 24, "same jobs, one lane", MONO, 5.9, rgb(MOSS))
    text(ctx, JX - 14, SEQ_Y + 2.2, "S", MONO, 6, rgb(TRELLIS), align="r")
    line(ctx, JX - 6, SEQ_Y, x_end, SEQ_Y, rgb(TRELLIS, 0.35), 0.4, dash=[1.2, 2.8])
    total = sum(x1 - x0 for _, _, x0, x1, _ in JOBS)
    avail = (x_end - 22) - JX - 3 * (len(JOBS) - 1)
    k = avail / total
    x = JX
    for jid, lane, x0, x1, deps in JOBS:
        w = (x1 - x0) * k
        job_box(ctx, x, SEQ_Y, w, jid)
        x += w + 3
    circle(ctx, rx, SEQ_Y, 4.5, rgb(CANOPY), fill=True)
    circle(ctx, rx, SEQ_Y, 4.5, rgb(FERN), 0.7)
    circle(ctx, rx, SEQ_Y, 1.6, rgb(FERN), fill=True)
    # equality bracket
    bx = rx + 14
    line(ctx, rx + 6, ry, bx, ry, rgb(FERN, 0.8), 0.5)
    line(ctx, rx + 6, SEQ_Y, bx, SEQ_Y, rgb(FERN, 0.8), 0.5)
    line(ctx, bx, ry, bx, SEQ_Y, rgb(FERN, 0.8), 0.5)
    my = (ry + SEQ_Y) / 2
    circle(ctx, bx, my, 6, rgb(CANOPY), fill=True)
    line(ctx, bx - 3, my - 1.5, bx + 3, my - 1.5, rgb(FERN), 0.8)
    line(ctx, bx - 3, my + 1.5, bx + 3, my + 1.5, rgb(FERN), 0.8)
    text(ctx, bx - 10, my + 2.2, "identical result", MONO, 5.9, rgb(MOSS), align="r")

    # link from the LOGIC stage to the pool
    sx, sy = CX + (R_OUT + 2) * math.cos(hand), CY + (R_OUT + 2) * math.sin(hand)
    ctx.new_path()
    ctx.move_to(sx + 4, sy)
    ctx.curve_to(sx + 90, sy - 10, JX - 100, LANE_Y[0], JX - 24, LANE_Y[0] + 50)
    ctx.set_source_rgba(*rgb(TRELLIS, 0.7))
    ctx.set_line_width(0.45)
    ctx.set_dash([2, 3])
    ctx.stroke()
    ctx.set_dash([])


def keycap(ctx, x, y, key, label):
    w, h = 26, 18
    ctx.new_path()
    r = 3
    ctx.arc(x + r, y + r, r, math.pi, 1.5 * math.pi)
    ctx.arc(x + w - r, y + r, r, 1.5 * math.pi, 2 * math.pi)
    ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * math.pi)
    ctx.arc(x + r, y + h - r, r, 0.5 * math.pi, math.pi)
    ctx.close_path()
    ctx.set_source_rgba(*rgb(HOLLOW))
    ctx.fill_preserve()
    ctx.set_source_rgba(*rgb(MOSS))
    ctx.set_line_width(0.6)
    ctx.stroke()
    line(ctx, x + 3, y + h - 3.2, x + w - 3, y + h - 3.2, rgb(TRELLIS, 0.5), 0.35)
    text(ctx, x + w / 2, y + 11.5, key, MONO, 7, rgb(LUMEN), align="c")
    text(ctx, x + w + 8, y + 11.5, label, MONO, 6.2, rgb(MOSS))


def draw(ctx):
    ground(ctx, W, H, avoid=[(0, 0, W, M + 30), (0, H - M - 40, W, H)])
    masthead(ctx, W, M, "02", "FRAME", "ONE FRAME, SEVEN STAGES", "WORKERS  ·  FALLBACK  ·  DEBUG KEYS")
    hand = draw_ring(ctx)
    draw_jobs(ctx, hand)
    ky = 520
    text(ctx, JX - 44, ky - 14, "DEBUG KEYS", MONO, 6.4, rgb(LUMEN), track=1.6)
    keycap(ctx, JX - 44, ky, "F3", "play")
    keycap(ctx, JX + 60, ky, "F7", "time scale")
    keycap(ctx, JX + 186, ky, "F11", "colliders")
    keycap(ctx, JX + 306, ky, "F12", "frame step")
    line(ctx, JX - 44, 600, W - M, 600, rgb(TRELLIS, 0.45), 0.45)
    text(ctx, JX - 44, 622, "Ivy Engine", DISPLAY, 18, rgb(LUMEN))
    text(ctx, W - M, 622, "02", DISPLAY, 18, rgb(MOSS), align="r")
    text(ctx, JX - 44, 638, "update order: component  ·  logic  ·  physics  ·  children", MONO, 6.2, rgb(MOSS))
    text(ctx, W / 2, H - FRAME_PAD, "PRESSED SIGNAL  ·  the ring turns once per frame", MONO, 5.6,
         rgb(TRELLIS, 0.8), align="c", track=1.4)


FRAME_PAD = 40

if __name__ == "__main__":
    render("fig02-frame", W, H, draw)
