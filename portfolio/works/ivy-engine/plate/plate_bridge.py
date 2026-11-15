"""Fig. 04 — Bridge: the Debug named-pipe test bridge between a client and the two hosts."""
import math

from common import (CANOPY, FERN, HOLLOW, LUMEN, MONO, MOSS, TRELLIS, DISPLAY, circle, ground, line,
                    mask_text, masthead, rect, render, rgb, text)

W, H = 1200, 720
M = 56
PY = 372            # pipe centre line
PX0, PX1 = 268, 852  # pipe span
PH = 9              # half height of the pipe

VERBS = ["hello", "status", "quit", "keyboard", "observe", "capture", "mouse", "controller", "events",
         "controller_probe", "list_objects", "pause", "resume", "step", "perf", "reset_scene",
         "set_transform", "set_velocity", "apply_impulse", "apply_torque_impulse", "set_setting"]
EDITOR_VERBS = ["play_enter", "play_exit", "load_scene"]


def panel(ctx, x, y, w, h, title, lines, accent=False):
    rect(ctx, x, y, w, h, rgb(HOLLOW, 0.95), fill=True)
    rect(ctx, x, y, w, h, rgb(FERN if accent else MOSS), 0.7)
    rect(ctx, x + 3, y + 3, w - 6, h - 6, rgb(TRELLIS, 0.35), 0.3)
    text(ctx, x + 12, y + 18, title, MONO, 6.6, rgb(LUMEN), track=1.6, bold=True)
    for i, (s, col) in enumerate(lines):
        text(ctx, x + 12, y + 32 + i * 11, s, MONO, 5.9, col)


def draw_pipe(ctx):
    # double wall
    line(ctx, PX0, PY - PH, PX1, PY - PH, rgb(MOSS), 0.7)
    line(ctx, PX0, PY + PH, PX1, PY + PH, rgb(MOSS), 0.7)
    rect(ctx, PX0, PY - PH + 0.6, PX1 - PX0, 2 * PH - 1.2, rgb(CANOPY), fill=True)
    # wall ribs every 8pt
    for x in range(PX0, PX1 + 1, 8):
        line(ctx, x, PY - PH - 2.5, x, PY - PH, rgb(TRELLIS, 0.5), 0.35)
        line(ctx, x, PY + PH, x, PY + PH + 2.5, rgb(TRELLIS, 0.5), 0.35)
    # frames travelling inside: LF-terminated JSON frames
    xs = [PX0 + 22 + i * 46 for i in range(12)]
    for i, x in enumerate(xs):
        w = 18 + (i * 7) % 13
        live = i == 7
        rect(ctx, x, PY - 3.5, w, 7, rgb(FERN if live else TRELLIS, 1 if live else 0.75), fill=live,
             lw=0.5)
        line(ctx, x + w + 2, PY - 4.5, x + w + 2, PY + 4.5, rgb(FERN if live else MOSS), 0.7)  # LF
    # direction marks
    for x in range(PX0 + 40, PX1, 120):
        pass
    return xs


def draw_verbs(ctx):
    n = len(VERBS)
    step = (PX1 - PX0 - 40) / (n - 1)
    for i, v in enumerate(VERBS):
        x = PX0 + 20 + i * step
        up = i % 2 == 0
        L = 34 + (i % 4) * 9
        y0 = PY - PH - 3 if up else PY + PH + 3
        y1 = y0 - L if up else y0 + L
        line(ctx, x, y0, x, y1, rgb(TRELLIS, 0.7), 0.4)
        circle(ctx, x, y1, 1.6, rgb(MOSS), fill=True)
        ctx.save()
        ctx.translate(x + (2 if up else -2), y1 + (-5 if up else 5))
        ctx.rotate(-math.pi / 3 if up else -math.pi / 3)
        if up:
            text(ctx, 0, 0, v, MONO, 6.2, rgb(LUMEN))
        else:
            text(ctx, 0, 0, v, MONO, 6.2, rgb(LUMEN), align="r")
        ctx.restore()


def draw_hosts(ctx):
    hx, hw, hh = 940, 204, 92
    hy_rt, hy_ed = 250, 404
    # branch: the pipe splits in two like a stem
    for hy in (hy_rt, hy_ed):
        cy = hy + hh / 2
        for off, col in ((-PH, MOSS), (PH, MOSS)):
            ctx.new_path()
            ctx.move_to(PX1, PY + off)
            ctx.curve_to(PX1 + 44, PY + off, hx - 44, cy + off * 0.6, hx, cy + off * 0.6)
            ctx.set_source_rgba(*rgb(col))
            ctx.set_line_width(0.7)
            ctx.stroke()
    panel(ctx, hx, hy_rt, hw, hh, "RUNTIME", [
        ("IvyEngineRuntime.exe", rgb(MOSS)),
        ('host: "runtime"', rgb(TRELLIS)),
        ("Debug  ·  GAME_RUNTIME", rgb(TRELLIS)),
        ("--scene rom/…json", rgb(TRELLIS)),
    ])
    panel(ctx, hx, hy_ed, hw, hh + 12, "EDITOR  ·  PLAY MODE", [
        ("IvyEngine.exe", rgb(MOSS)),
        ('host: "editor"', rgb(TRELLIS)),
        ("+ " + "  ·  ".join(EDITOR_VERBS), rgb(FERN)),
        ('playMode: none | viewport |', rgb(TRELLIS)),
        ('          fullscreen', rgb(TRELLIS)),
    ], accent=True)
    text(ctx, hx + hw, hy_ed + hh + 30, "phase 7  ·  2026.11", MONO, 5.8, rgb(FERN), align="r")


def draw_client(ctx):
    x, y, w, h = 72, 318, 170, 108
    # pipe joins the client
    line(ctx, x + w, PY - PH, PX0, PY - PH, rgb(MOSS), 0.7)
    line(ctx, x + w, PY + PH, PX0, PY + PH, rgb(MOSS), 0.7)
    panel(ctx, x, y, w, h, "CLIENT", [
        ("runtime_test_client.py", rgb(MOSS)),
        ("scenario  ·  schema v1", rgb(TRELLIS)),
        ("stdlib + ctypes", rgb(TRELLIS)),
        ("verifies server PID", rgb(TRELLIS)),
    ])
    # a request frame, spelled out
    ry = y + h + 30
    text(ctx, x, ry, "REQUEST FRAME", MONO, 6, rgb(LUMEN), track=1.4)
    rows = ['{ "protocolVersion": 1,', '  "requestId": 7,', '  "runId": "…",', '  "verb": "observe" }\\n']
    for i, r in enumerate(rows):
        text(ctx, x, ry + 13 + i * 10, r, MONO, 5.9, rgb(FERN) if i == 1 else rgb(MOSS))
    text(ctx, x, ry + 62, "requestId strictly increasing", MONO, 5.6, rgb(TRELLIS))
    text(ctx, x, ry + 71, "for the whole run", MONO, 5.6, rgb(TRELLIS))


def draw_gate(ctx):
    x = 72
    y = 118
    text(ctx, x, y, "BUILD GATE", MONO, 6.4, rgb(LUMEN), track=1.6)
    rows = [("Debug runtime", True), ("Debug editor", True), ("Release", False)]
    for i, (k, on) in enumerate(rows):
        yy = y + 18 + i * 16
        # switch glyph
        rect(ctx, x, yy - 7, 22, 9, rgb(HOLLOW), fill=True)
        rect(ctx, x, yy - 7, 22, 9, rgb(MOSS if on else TRELLIS, 0.9), 0.5)
        circle(ctx, x + (16.5 if on else 5.5), yy - 2.5, 3, rgb(FERN) if on else rgb(TRELLIS, 0.7), fill=True)
        text(ctx, x + 32, yy, k, MONO, 6.2, rgb(LUMEN if on else MOSS))
        text(ctx, x + 132, yy, "bridge on (opt-in)" if on else "compiled out", MONO, 5.9,
             rgb(MOSS) if on else rgb(TRELLIS))


def draw_limits(ctx, xs):
    # 4096 B bracket over one frame, 2000 ms dial
    x0 = PX0
    y = 560
    text(ctx, x0, y - 26, "LIMITS", MONO, 6.4, rgb(LUMEN), track=1.6)
    # byte ruler
    rx0, rx1 = x0, x0 + 256
    line(ctx, rx0, y, rx1, y, rgb(MOSS), 0.6)
    for k in range(0, 257, 16):
        L = 6 if k % 64 == 0 else 3
        line(ctx, rx0 + k, y, rx0 + k, y - L, rgb(TRELLIS, 0.8), 0.4)
    text(ctx, rx0, y + 13, "0", MONO, 5.6, rgb(TRELLIS))
    text(ctx, rx1, y + 13, "4096 B", MONO, 5.6, rgb(LUMEN), align="r")
    text(ctx, rx0, y + 24, "request body per LF frame", MONO, 5.6, rgb(MOSS))
    # timeout dial
    cx, cy, r = x0 + 360, y - 6, 20
    circle(ctx, cx, cy, r, rgb(MOSS), 0.6)
    for k in range(40):
        a = -math.pi / 2 + k * 2 * math.pi / 40
        L = 4 if k % 10 == 0 else 2
        line(ctx, cx + (r - L) * math.cos(a), cy + (r - L) * math.sin(a), cx + r * math.cos(a),
             cy + r * math.sin(a), rgb(TRELLIS, 0.7), 0.35)
    a1 = -math.pi / 2 + 2 * math.pi * 0.66
    ctx.new_path()
    ctx.arc(cx, cy, r - 7, -math.pi / 2, a1)
    ctx.set_source_rgba(*rgb(FERN, 0.8))
    ctx.set_line_width(1.1)
    ctx.stroke()
    line(ctx, cx, cy, cx + (r - 4) * math.cos(a1), cy + (r - 4) * math.sin(a1), rgb(LUMEN), 0.6)
    text(ctx, cx + r + 10, cy - 2, "2000 ms", MONO, 6.2, rgb(LUMEN))
    text(ctx, cx + r + 10, cy + 9, "mid-frame body timeout", MONO, 5.6, rgb(MOSS))
    text(ctx, cx + r + 10, cy + 18, "idle between frames: unlimited", MONO, 5.6, rgb(TRELLIS))
    # step range
    sx = x0 + 560
    text(ctx, sx, y - 2, "step  1 … 600", MONO, 6.2, rgb(LUMEN))
    text(ctx, sx, y + 9, "fixed ticks while paused", MONO, 5.6, rgb(MOSS))
    for k in range(30):
        line(ctx, sx + k * 4, y + 16, sx + k * 4, y + 20 + (3 if k % 5 == 0 else 0), rgb(TRELLIS, 0.7), 0.4)


def draw(ctx):
    ground(ctx, W, H, avoid=[(0, 0, W, M + 30), (0, H - M - 40, W, H)])
    masthead(ctx, W, M, "04", "BRIDGE", "DEBUG NAMED-PIPE TEST BRIDGE", "PROTOCOL V1  ·  24 VERBS  ·  PHASES 1–7")
    draw_gate(ctx)
    draw_client(ctx)
    xs = draw_pipe(ctx)
    draw_verbs(ctx)
    draw_hosts(ctx)
    mask_text(ctx, PX0 + 6, PY - PH - 118, "\\\\.\\pipe\\IvyRuntimeTest-<PID>-<runId>", MONO, 6.4, rgb(FERN))
    mask_text(ctx, PX0 + 6, PY - PH - 107, "local only  ·  current-user DACL", MONO, 5.6, rgb(TRELLIS))
    draw_limits(ctx, xs)
    yb = 648
    line(ctx, 940, yb - 22, W - M, yb - 22, rgb(TRELLIS, 0.45), 0.45)
    text(ctx, 940, yb, "Ivy Engine", DISPLAY, 18, rgb(LUMEN))
    text(ctx, W - M, yb, "04", DISPLAY, 18, rgb(MOSS), align="r")
    text(ctx, W / 2, H - 40, "PRESSED SIGNAL  ·  every request is a leaf on the same stem", MONO, 5.6,
         rgb(TRELLIS, 0.8), align="c", track=1.4)


if __name__ == "__main__":
    render("fig04-bridge", W, H, draw)
