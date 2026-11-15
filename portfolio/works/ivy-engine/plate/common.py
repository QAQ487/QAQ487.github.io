"""Shared drawing kit for the Pressed Signal plates (pycairo).

Fonts (installed system-wide): Dela Gothic One, IBM Plex Mono, Noto Sans CJK JP.
"""
import math
import os
import sys

import cairo

CANOPY = (0x0F, 0x1A, 0x16)
HOLLOW = (0x1A, 0x2C, 0x26)
LUMEN = (0xE6, 0xEF, 0xE8)
MOSS = (0x9E, 0xB0, 0xA8)
FERN = (0x9F, 0xD0, 0xB0)
TRELLIS = (0x7E, 0x9A, 0x8F)

DISPLAY = "Dela Gothic One"
MONO = "IBM Plex Mono"
CJK = "Noto Sans CJK JP"

FRAME = 28
OUT_DIR = os.path.dirname(os.path.abspath(__file__))


def rgb(c, a=1.0):
    return (c[0] / 255, c[1] / 255, c[2] / 255, a)


def font(ctx, fam, size, bold=False):
    ctx.select_font_face(fam, cairo.FONT_SLANT_NORMAL,
                         cairo.FONT_WEIGHT_BOLD if bold else cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(size)


def text_w(ctx, s, fam, size, track=0.0, bold=False):
    font(ctx, fam, size, bold)
    if not track:
        return ctx.text_extents(s).x_advance
    return sum(ctx.text_extents(ch).x_advance + track for ch in s) - track


def text(ctx, x, y, s, fam, size, col, align="l", track=0.0, bold=False):
    w = text_w(ctx, s, fam, size, track, bold)
    if align == "r":
        x -= w
    elif align == "c":
        x -= w / 2
    ctx.set_source_rgba(*col)
    if not track:
        ctx.move_to(x, y)
        ctx.show_text(s)
    else:
        for ch in s:
            ctx.move_to(x, y)
            ctx.show_text(ch)
            x += ctx.text_extents(ch).x_advance + track
    ctx.new_path()
    return w


def mask_text(ctx, x, y, s, fam, size, col, align="l", track=0.0, pad=2.5, bold=False):
    """Text on a Canopy chip so hairlines behind it do not cross the glyphs."""
    w = text_w(ctx, s, fam, size, track, bold)
    x0 = x - w if align == "r" else (x - w / 2 if align == "c" else x)
    ctx.set_source_rgba(*rgb(CANOPY))
    ctx.rectangle(x0 - pad, y - size * 0.82 - pad * 0.6, w + 2 * pad, size * 1.1 + pad * 1.2)
    ctx.fill()
    return text(ctx, x, y, s, fam, size, col, align, track, bold)


def line(ctx, x1, y1, x2, y2, col, w, dash=None):
    ctx.set_source_rgba(*col)
    ctx.set_line_width(w)
    ctx.set_dash(dash or [])
    ctx.move_to(x1, y1)
    ctx.line_to(x2, y2)
    ctx.stroke()
    ctx.set_dash([])


def circle(ctx, x, y, r, col, w=None, fill=False):
    ctx.new_path()
    ctx.arc(x, y, r, 0, 2 * math.pi)
    ctx.set_source_rgba(*col)
    if fill:
        ctx.fill()
    else:
        ctx.set_line_width(w or 0.5)
        ctx.stroke()


def rect(ctx, x, y, w, h, col, lw=None, fill=False, dash=None):
    ctx.new_path()
    ctx.rectangle(x, y, w, h)
    ctx.set_source_rgba(*col)
    if fill:
        ctx.fill()
    else:
        ctx.set_line_width(lw or 0.5)
        ctx.set_dash(dash or [])
        ctx.stroke()
        ctx.set_dash([])


def ground(ctx, W, H, avoid=None):
    """Canopy ground, trellis lattice, graticule crosses, ruled frame.

    avoid: list of (x0, y0, x1, y1) boxes where graticule crosses are skipped.
    """
    avoid = avoid or []
    ctx.set_source_rgba(*rgb(CANOPY))
    ctx.rectangle(0, 0, W, H)
    ctx.fill()
    ctx.save()
    ctx.rectangle(FRAME, FRAME, W - 2 * FRAME, H - 2 * FRAME)
    ctx.clip()
    ctx.set_source_rgba(*rgb(HOLLOW, 0.8))
    ctx.set_line_width(0.45)
    s = 24
    for k in range(-int(H / s) - 2, int((W + H) / s) + 2):
        x0 = k * s
        ctx.move_to(x0, 0)
        ctx.line_to(x0 + H, H)
        ctx.move_to(x0, 0)
        ctx.line_to(x0 - H, H)
    ctx.stroke()
    g = 48
    ctx.set_source_rgba(*rgb(TRELLIS, 0.2))
    ctx.set_line_width(0.4)
    gx0 = FRAME + ((W - 2 * FRAME) % g) / 2
    gy0 = FRAME + ((H - 2 * FRAME) % g) / 2
    yy = gy0
    while yy <= H - FRAME:
        xx = gx0
        while xx <= W - FRAME:
            if not any(a <= xx <= c and b <= yy <= d for a, b, c, d in avoid):
                ctx.move_to(xx - 2, yy)
                ctx.line_to(xx + 2, yy)
                ctx.move_to(xx, yy - 2)
                ctx.line_to(xx, yy + 2)
            xx += g
        yy += g
    ctx.stroke()
    ctx.restore()
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


def masthead(ctx, W, M, fig, title, meta_l, meta_r):
    """Small header: movement + figure number at left, metadata at right."""
    text(ctx, M, M + 2, "PRESSED SIGNAL", MONO, 6.2, rgb(TRELLIS), track=1.6)
    text(ctx, M, M + 12, f"FIG. {fig}  —  {title}", MONO, 6.2, rgb(TRELLIS, 0.7), track=1.0)
    text(ctx, W - M, M + 2, meta_l, MONO, 6.2, rgb(TRELLIS), align="r", track=1.6)
    text(ctx, W - M, M + 12, meta_r, MONO, 6.2, rgb(TRELLIS, 0.7), align="r", track=1.0)


def render(name, W, H, draw, scale=2):
    pdf = cairo.PDFSurface(os.path.join(OUT_DIR, f"{name}.pdf"), W, H)
    draw(cairo.Context(pdf))
    pdf.finish()
    png = cairo.ImageSurface(cairo.FORMAT_ARGB32, int(W * scale), int(H * scale))
    ctx = cairo.Context(png)
    ctx.scale(scale, scale)
    draw(ctx)
    path = os.path.join(OUT_DIR, f"{name}.png")
    png.write_to_png(path)
    print("wrote", path, file=sys.stderr)
