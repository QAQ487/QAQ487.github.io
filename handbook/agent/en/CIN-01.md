# CIN-01 · Letterbox

**Aliases:** Cinematic bars; Black bars; Widescreen bars

**Group:** Cinematics & narrative
**Subcategory:** Cinematic camera

## What you see

When a story moment starts, black bars slide in from the top and bottom, turning the view into a wider, cinema-like ratio; the HUD usually hides at the same time, and the bars slide back out at the end.

## Not to be confused with

Not a fade to black (TRN-01, the whole image goes dark); bars only cover top and bottom while the scene keeps playing. Not a camera punch-in (FB-09) — the camera itself does not change.

## Use it for

Signals "this is a cinematic, you are not in control": cutscenes, boss entrances, key conversations.

## Tunable parameters

bar height % (8–14) · slide in/out time · easing · HUD fade · input lock

## Request prompt

In your game, when a story sequence starts, slide black bars in from top and bottom over 0.4 s ease-out, each 12% of screen height (≈2.39:1 feel), and fade the HUD out over 0.2 s; at the end slide the bars out over 0.3 s and fade the HUD back; lock player input meanwhile.

## Implementation hint

Two screen-space black quads drawn after the scene and before (or instead of) the HUD; animate their height with a 0→1 parameter. Keep the camera viewport unchanged so gameplay framing does not jump.

## Related

- [CIN-02](CIN-02.md) — Cutscene
- [CIN-03](CIN-03.md) — Scripted camera
- [TRN-01](TRN-01.md) — Fade to black
- [FB-09](FB-09.md) — Camera punch-in
- [REN-35](REN-35.md) — Lens flare/Lens ghost

## References

- [Wikipedia — Letterboxing (filming)](https://en.wikipedia.org/wiki/Letterboxing_(filming))
- [Wikipedia — Aspect ratio (image)](https://en.wikipedia.org/wiki/Aspect_ratio_(image))
