# CAMX-02 · Zoom-to-fit

**Aliases:** Auto-zoom to fit targets; Dynamic zoom; Framing zoom

**Group:** Camera & composition
**Subcategory:** Follow & framing rules

## What you see

When several players or targets spread out, the camera automatically zooms out so everyone stays on screen with a margin; when they regroup it zooms back in. The zoom is clamped and changes smoothly.

## Not to be confused with

Not group framing (CAM-13 Group framing), which only moves the camera centre; zoom-to-fit is about the zoom factor following the bounding box. Not an impact punch-in (FB-09, a brief feedback move).

## Use it for

Local multiplayer, group fights, scenes where the hero and the enemies must be visible together.

## Tunable parameters

margin px · min/max zoom · zoom smoothing (separate in/out) · aspect handling · per-target weight

## Request prompt

In your game, add zoom-to-fit: each frame compute the bounding box of all targets plus a 24 px margin on every side; zoom = min(screenW/boxW, screenH/boxH), clamped to 0.6–1.5×; smooth the zoom with a 0.5 s time, zooming out twice as fast as zooming in so no target is clipped.

## Implementation hint

Compute an AABB of targets in world space, pad it, derive the zoom (2D) or the camera distance/FOV (3D: distance = (boxRadius) / tan(fov/2)). Smooth zoom in log space so in/out feel symmetric; then centre on the box and apply bounds.

## Related

- [CAM-13](CAM-13.md) — Group framing／Multi-target framing
- [CAM-19](CAM-19.md) — Zoom／Lens zoom
- [CAMX-12](CAMX-12.md) — Split screen / Dynamic split screen
- [FB-09](FB-09.md) — Camera punch-in

## References

- [Itay Keren — Scroll Back: The Theory and Practice of Cameras in Side-Scrollers (Game Developer)](https://www.gamedeveloper.com/design/scroll-back-the-theory-and-practice-of-cameras-in-side-scrollers)
- [Cinemachine 3.1 — Group Framing extension](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineGroupFraming.html)
