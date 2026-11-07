# ANI-01 · Smear frame

**Aliases:** Smears; Smear drawing; Multiples

**Group:** Animation, movement & physics
**Subcategory:** Animation principles

## What you see

During a fast swing or turn, one or two frames deliberately stretch and distort the character or weapon into a blurred streak, or draw the same limb several times; a single frame looks odd when paused, but in playback the motion reads as very fast and fluid.

## Not to be confused with

Not slash VFX (VFX-07, an extra glowing arc layered on top); a smear is the character drawing itself being stretched. Not afterimages (several separate complete poses), and not post-process motion blur (REN-33, blur along velocity; PP-07 is radial zoom blur).

## Use it for

Fast attacks, dashes and turns; adding speed to low-frame-count pixel or hand-drawn animation.

## Tunable parameters

smear length (×2–4) · frames shown (1–2) · shape (stretch / multiples / streak) · fade at tail · which frame of the swing

## Request prompt

In your game, for the hero’s horizontal slash (6 frames, 50 ms each), insert a smear on frame 3: stretch the blade and arm along the swing into a crescent about 3× longer, solid at the leading edge and fading at the tail, for one frame (50 ms); keep clear wind-up and follow-through poses on either side.

## Implementation hint

Authored as ordinary frames in the sprite sheet or as a deformed mesh/blend shape for 1–2 frames; nothing special at runtime. For 3D, scale the limb bone along its velocity or swap in a stretched mesh for the peak frame. Keep the leading edge crisp so the silhouette still reads.

## Related

- [VFX-07](VFX-07.md) — Slash VFX
- [REN-33](REN-33.md) — Motion blur/Velocity blur
- [ANI-02](ANI-02.md) — Animating on twos
- [ANI-03](ANI-03.md) — Hold frame / Impact frame
- [PIX-14](PIX-14.md) — Sub-pixel animation

## References

- [Wikipedia — Smear frame](https://en.wikipedia.org/wiki/Smear_frame)
- [Wikipedia — Twelve basic principles of animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
