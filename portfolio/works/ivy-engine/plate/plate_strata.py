"""Fig. 03 — Strata: 3D and 2D render paths as core samples, and the GPU skin palette."""
import math

from common import (CANOPY, FERN, HOLLOW, LUMEN, MONO, MOSS, TRELLIS, DISPLAY, circle, ground, line,
                    mask_text, masthead, rect, render, rgb, text)

W, H = 1200, 720
M = 56
TOP = 168
ROWS = [  # key, label, height
    ("shadow", "CASCADED SHADOWS", 92),
    ("forward", "FORWARD  PBR / IBL", 132),
    ("post", "POST  bloom · vignette · CA", 92),
    ("ui", "SCREEN UI", 72),
]
GAP = 10
C3 = (214, 384)   # 3D core x-range
C2 = (430, 600)   # 2D core x-range


def row_y():
    y = TOP
    out = []
    for key, label, h in ROWS:
        out.append((key, label, y, h))
        y += h + GAP
    return out


def clip_box(ctx, x0, y0, x1, y1):
    ctx.save()
    ctx.rectangle(x0, y0, x1 - x0, y1 - y0)
    ctx.clip()


def tex_shadow(ctx, x0, y0, x1, y1):
    cx = (x0 + x1) / 2
    # three cascades as nested frustum slices
    for i, (w0, w1, a) in enumerate([(12, 38, 0.9), (38, 80, 0.65), (80, 128, 0.45)]):
        ya = y0 + 13 + i * 22
        yb = ya + 22
        ctx.new_path()
        ctx.move_to(cx - w0 / 2, ya)
        ctx.line_to(cx + w0 / 2, ya)
        ctx.line_to(cx + w1 / 2, yb)
        ctx.line_to(cx - w1 / 2, yb)
        ctx.close_path()
        ctx.set_source_rgba(*rgb(MOSS, a))
        ctx.set_line_width(0.6)
        ctx.stroke()
        for k in range(1, 6):
            t = k / 6
            yy = ya + 22 * t
            ww = w0 + (w1 - w0) * t
            line(ctx, cx - ww / 2, yy, cx + ww / 2, yy, rgb(TRELLIS, 0.25), 0.3)
        mask_text(ctx, cx + w1 / 2 + 8, (ya + yb) / 2 + 2, f"c{i}", MONO, 5.4, rgb(TRELLIS), pad=1.4)


def tex_forward(ctx, x0, y0, x1, y1):
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2 + 2
    R = 48
    circle(ctx, cx, cy, R, rgb(HOLLOW), fill=True)
    # latitude contours
    for k in range(1, 12):
        phi = -math.pi / 2 + k * math.pi / 12
        yy = cy + R * math.sin(phi)
        rx = R * math.cos(phi)
        ctx.new_path()
        ctx.save()
        ctx.translate(cx, yy)
        ctx.scale(rx, rx * 0.22)
        ctx.arc(0, 0, 1, 0, math.pi)
        ctx.restore()
        ctx.set_source_rgba(*rgb(TRELLIS, 0.45))
        ctx.set_line_width(0.3)
        ctx.stroke()
    # shading: hatch density grows away from the light (upper-left)
    ctx.save()
    ctx.new_path()
    ctx.arc(cx, cy, R, 0, 2 * math.pi)
    ctx.clip()
    lx, ly = -0.6, -0.7
    for i in range(-60, 61):
        off = i * 1.6
        # line perpendicular to light dir
        px, py = cx + lx * off, cy + ly * off
        d = (off / R)
        if d < -0.15:
            continue
        a = min(0.55, 0.08 + 0.5 * (d + 0.15))
        ctx.new_path()
        ctx.move_to(px - ly * R * 2, py + lx * R * 2)
        ctx.line_to(px + ly * R * 2, py - lx * R * 2)
        ctx.set_source_rgba(*rgb(TRELLIS, a))
        ctx.set_line_width(0.35)
        ctx.stroke()
    ctx.restore()
    circle(ctx, cx, cy, R, rgb(MOSS), 0.7)
    # specular highlight
    circle(ctx, cx - 17, cy - 19, 5, rgb(LUMEN, 0.85), fill=True)
    for r, a in [(9, 0.3), (14, 0.14)]:
        circle(ctx, cx - 17, cy - 19, r, rgb(LUMEN, a), 0.4)


def tex_post(ctx, x0, y0, x1, y1):
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    for k in range(1, 15):
        circle(ctx, cx, cy, k * 3.1, rgb(TRELLIS, 0.6 * (1 - k / 15) + 0.08), 0.35)
    circle(ctx, cx, cy, 2.2, rgb(LUMEN), fill=True)
    # vignette corners: dense short arcs
    for sx, sy in [(x0, y0), (x1, y0), (x0, y1), (x1, y1)]:
        for k in range(4, 30, 3):
            ctx.new_path()
            ctx.arc(sx, sy, k, 0, 2 * math.pi)
            ctx.set_source_rgba(*rgb(TRELLIS, 0.18))
            ctx.set_line_width(0.3)
            ctx.stroke()
    # chromatic aberration: offset ghost rings
    circle(ctx, cx + 3, cy, 26, rgb(MOSS, 0.4), 0.4)
    circle(ctx, cx - 3, cy, 26, rgb(MOSS, 0.4), 0.4)


def tex_ui(ctx, x0, y0, x1, y1):
    # anchored canvas: a bar, two buttons, a text block
    pad = 12
    rect(ctx, x0 + pad, y0 + pad, 60, 6, rgb(MOSS), 0.5)
    rect(ctx, x0 + pad, y0 + pad, 38, 6, rgb(TRELLIS, 0.7), fill=True)
    rect(ctx, x1 - pad - 34, y0 + pad, 34, 12, rgb(MOSS), 0.5)
    for i in range(3):
        line(ctx, x0 + pad, y1 - pad - 18 + i * 6, x0 + pad + 70 - i * 16, y1 - pad - 18 + i * 6, rgb(TRELLIS, 0.6), 0.4)
    rect(ctx, x1 - pad - 52, y1 - pad - 16, 52, 16, rgb(MOSS), 0.6)
    text(ctx, x1 - pad - 26, y1 - pad - 5.5, "START", MONO, 5.2, rgb(LUMEN), align="c", track=0.8)
    # anchor cross at centre
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    line(ctx, cx - 4, cy, cx + 4, cy, rgb(TRELLIS), 0.4)
    line(ctx, cx, cy - 4, cx, cy + 4, rgb(TRELLIS), 0.4)


def tex_sprites(ctx, x0, y0, x1, y1):
    # a sprite sheet: 6 frames x 2 rows, one frame lit
    cols, rws = 6, 2
    fw, fh = 20, 26
    gx = (x0 + x1) / 2 - cols * (fw + 2) / 2
    gy = (y0 + y1) / 2 - rws * (fh + 2) / 2
    for r in range(rws):
        for c in range(cols):
            x = gx + c * (fw + 2)
            y = gy + r * (fh + 2)
            lit = (r, c) == (0, 2)
            rect(ctx, x, y, fw, fh, rgb(FERN if lit else MOSS, 1 if lit else 0.7), 0.5)
            # a little figure: head + body, leaning by frame
            lean = math.sin(c / cols * 2 * math.pi) * 2.5
            col = rgb(FERN) if lit else rgb(TRELLIS, 0.8)
            circle(ctx, x + fw / 2 + lean * 0.4, y + 7, 2.4, col, 0.5)
            line(ctx, x + fw / 2 + lean * 0.4, y + 9.5, x + fw / 2, y + 17, col, 0.5)
            line(ctx, x + fw / 2, y + 17, x + fw / 2 - 3 + lean, y + 23, col, 0.5)
            line(ctx, x + fw / 2, y + 17, x + fw / 2 + 3 - lean, y + 23, col, 0.5)
    text(ctx, gx, gy + rws * (fh + 2) + 9, "sprites, drawn layer by layer", MONO, 5.2, rgb(TRELLIS))


def draw_cores(ctx):
    rows = row_y()
    bottom = rows[-1][2] + rows[-1][3]
    text(ctx, (C3[0] + C3[1]) / 2, TOP - 30, "3D", DISPLAY, 22, rgb(LUMEN), align="c")
    text(ctx, (C2[0] + C2[1]) / 2, TOP - 30, "2D", DISPLAY, 22, rgb(LUMEN), align="c")
    text(ctx, (C3[0] + C3[1]) / 2, TOP - 14, "full path", MONO, 5.8, rgb(TRELLIS), align="c")
    text(ctx, (C2[0] + C2[1]) / 2, TOP - 14, "lighter path", MONO, 5.8, rgb(TRELLIS), align="c")
    for i, (key, label, y, h) in enumerate(rows):
        # row label on the left with index
        text(ctx, C3[0] - 18, y + 12, f"{i + 1:02d}", MONO, 5.8, rgb(TRELLIS), align="r")
        text(ctx, C3[0] - 18, y + 22, label.split("  ")[0], MONO, 6.2, rgb(LUMEN), align="r", track=1.0)
        if "  " in label:
            text(ctx, C3[0] - 18, y + 31, label.split("  ")[1], MONO, 5.6, rgb(MOSS), align="r")
        # 3D layer
        rect(ctx, C3[0], y, C3[1] - C3[0], h, rgb(HOLLOW, 0.92), fill=True)
        clip_box(ctx, C3[0], y, C3[1], y + h)
        {"shadow": tex_shadow, "forward": tex_forward, "post": tex_post, "ui": tex_ui}[key](
            ctx, C3[0], y, C3[1], y + h)
        ctx.restore()
        rect(ctx, C3[0], y, C3[1] - C3[0], h, rgb(MOSS), 0.7)
        # 2D layer
        if key in ("forward", "ui"):
            rect(ctx, C2[0], y, C2[1] - C2[0], h, rgb(HOLLOW, 0.92), fill=True)
            clip_box(ctx, C2[0], y, C2[1], y + h)
            (tex_sprites if key == "forward" else tex_ui)(ctx, C2[0], y, C2[1], y + h)
            ctx.restore()
            rect(ctx, C2[0], y, C2[1] - C2[0], h, rgb(MOSS), 0.7)
        else:
            rect(ctx, C2[0], y, C2[1] - C2[0], h, rgb(TRELLIS, 0.55), 0.5, dash=[2, 3])
            mask_text(ctx, (C2[0] + C2[1]) / 2, y + h / 2 + 2, "skipped", MONO, 6, rgb(TRELLIS), align="c",
                      track=1.2)
        # tie between cores
        line(ctx, C3[1] + 4, y + h / 2, C2[0] - 4, y + h / 2,
             rgb(TRELLIS, 0.5 if key in ("forward", "ui") else 0.25), 0.4, dash=[1, 2.5])
    # frame-order arrow down the far left
    ax = C3[0] - 150
    line(ctx, ax, TOP + 4, ax, bottom - 6, rgb(TRELLIS, 0.6), 0.5)
    ctx.new_path()
    ctx.move_to(ax - 3, bottom - 10)
    ctx.line_to(ax, bottom - 4)
    ctx.line_to(ax + 3, bottom - 10)
    ctx.set_source_rgba(*rgb(TRELLIS))
    ctx.set_line_width(0.6)
    ctx.stroke()
    ctx.save()
    ctx.translate(ax - 6, (TOP + bottom) / 2)
    ctx.rotate(-math.pi / 2)
    mask_text(ctx, 0, 0, "FRAME ORDER", MONO, 5.6, rgb(TRELLIS), align="c", track=1.4)
    ctx.restore()
    # backbuffer plate under both cores
    by = bottom + 16
    for x0, x1 in (C3, C2):
        line(ctx, x0, by, x1, by, rgb(FERN), 1.1)
        for k in range(0, int(x1 - x0) + 1, 6):
            line(ctx, x0 + k, by + 2, x0 + k, by + 5, rgb(FERN, 0.5), 0.4)
    text(ctx, (C3[0] + C2[1]) / 2, by + 18, "screen", MONO, 6, rgb(MOSS), align="c", track=1.2)
    return bottom


def draw_palette(ctx):
    X0 = 690
    text(ctx, X0, TOP - 30, "SKIN PALETTE", MONO, 6.6, rgb(LUMEN), track=1.6)
    text(ctx, X0, TOP - 19, "bones moved on the GPU  ·  checked against a slow, known-right version", MONO, 5.9, rgb(MOSS))
    cols, cell, gap = 13, 30, 5.2
    meshes = [("mesh 0", "body surface"), ("mesh 1", "joints")]
    y = TOP + 4
    hi = 52  # first slot of mesh 1: meshIndex * boneCount
    for m, (tag, name) in enumerate(meshes):
        text(ctx, X0, y + 8, tag, MONO, 6, rgb(TRELLIS))
        text(ctx, X0 + 44, y + 8, name, MONO, 6, rgb(MOSS))
        text(ctx, X0 + cols * (cell + gap) - gap, y + 8, f"bones {m * 52}–{m * 52 + 51}", MONO, 5.6,
             rgb(TRELLIS), align="r")
        y += 16
        for b in range(52):
            r, c = divmod(b, cols)
            x = X0 + c * (cell + gap)
            yy = y + r * (cell + gap)
            slot = m * 52 + b
            lit = slot == hi
            rect(ctx, x, yy, cell, cell, rgb(HOLLOW), fill=True)
            rect(ctx, x, yy, cell, cell, rgb(FERN if lit else MOSS, 1 if lit else 0.55), 0.7 if lit else 0.45)
            # a 4x4 matrix glyph: dots, the diagonal brighter
            for i in range(4):
                for j in range(4):
                    dx = x + 7.5 + j * 5
                    dy = yy + 7.5 + i * 5
                    on = i == j or (j == 3 and i < 3)
                    circle(ctx, dx, dy, 0.85 if on else 0.55,
                           rgb(FERN if lit else (LUMEN if on else TRELLIS), 0.95 if on else 0.5), fill=True)
            if b % cols == 0:
                text(ctx, x - 6, yy + cell / 2 + 2, f"{slot:03d}", MONO, 5.2, rgb(TRELLIS), align="r")
        y += 4 * (cell + gap) + 12
    gx1 = X0 + cols * (cell + gap) - gap
    # formula
    fy = y + 8
    text(ctx, X0, fy, "2 meshes  ×  52 bones", MONO, 7, rgb(LUMEN))
    text(ctx, gx1, fy, "104 slots", MONO, 7, rgb(FERN), align="r")
    line(ctx, X0, fy + 10, gx1, fy + 10, rgb(TRELLIS, 0.45), 0.4)
    rows = [("CPU", "slow, known-right", "kept as the answer key"),
            ("GPU", "fast", "matched to it, every frame")]
    for i, (k, a, b) in enumerate(rows):
        yy = fy + 26 + i * 13
        text(ctx, X0, yy, k, MONO, 6.2, rgb(TRELLIS))
        text(ctx, X0 + 30, yy, a, MONO, 6.2, rgb(LUMEN))
        text(ctx, gx1, yy, b, MONO, 6, rgb(MOSS), align="r")
    return gx1


def draw(ctx):
    ground(ctx, W, H, avoid=[(0, 0, W, M + 30), (0, H - M - 40, W, H)])
    masthead(ctx, W, M, "02", "STRATA", "TWO RENDER PATHS, ONE DEVICE", "DIRECTX 11  ·  FORWARD  ·  GPU SKIN")
    bottom = draw_cores(ctx)
    gx1 = draw_palette(ctx)
    yb = bottom + 52
    line(ctx, 690, yb - 22, W - M, yb - 22, rgb(TRELLIS, 0.45), 0.45)
    text(ctx, 690, yb, "Ivy Engine", DISPLAY, 18, rgb(LUMEN))
    text(ctx, W - M, yb, "02", DISPLAY, 18, rgb(MOSS), align="r")
    text(ctx, W / 2, H - 40, "PRESSED SIGNAL  ·  what the 2D path leaves out is drawn as absence", MONO, 5.6,
         rgb(TRELLIS, 0.8), align="c", track=1.4)


if __name__ == "__main__":
    render("fig03-strata", W, H, draw)
