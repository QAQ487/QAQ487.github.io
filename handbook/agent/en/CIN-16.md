# CIN-16 · Photo mode

**Aliases:** Virtual photography; Photo camera; Screenshot mode

**Group:** Cinematics & narrative
**Subcategory:** Narrative techniques

## What you see

At a button press the game pauses, the whole HUD hides, and the view becomes a camera the player can freely move, rotate and zoom; there are framing guides (rule of thirds), filters, depth of field, frames and stickers, and pressing the shutter flashes white and saves the image.

## Not to be confused with

Not a scripted camera (CIN-03, taken over by the game); in photo mode the player drives the camera. Not a plain screenshot (no control over framing or effects).

## Use it for

Sharing, community marketing, admiring scenes and characters; also a simple "pause and look around".

## Tunable parameters

camera range · zoom/tilt limits · grid overlay · filter list · vignette/DOF · capture resolution · HUD hide

## Request prompt

In your game, add a photo mode: P pauses the game and hides the HUD; the camera moves freely within 200 px of the player, zooms 0.5–2×, and tilts ±15°; show a toggleable rule-of-thirds grid, offer 4 filters (none, mono, sepia, high contrast) and a vignette slider; on shutter flash white for 0.1 s and save the image as a PNG at 2× resolution.

## Implementation hint

Pause gameplay time but keep rendering; spawn a free camera from the current view with clamped bounds; post-process stack exposed as sliders; capture by rendering to an offscreen target at higher resolution and encoding to PNG.

## Related

- [CIN-03](CIN-03.md) — Scripted camera
- [CIN-14](CIN-14.md) — Flashback filter
- [TRN-02](TRN-02.md) — Fade to white

## References

- [Wikipedia — Virtual photography (photo mode)](https://en.wikipedia.org/wiki/Virtual_photography)
- [Unity Technologies — Photo Mode sample (GitHub)](https://github.com/UnityTechnologies/PhotoMode)
