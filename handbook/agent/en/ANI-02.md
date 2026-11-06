# ANI-02 · Animating on twos

**Aliases:** Stepped animation; On twos / on threes; Limited animation; Stepped interpolation

**Group:** Animation, movement & physics
**Subcategory:** Animation principles

## What you see

The character’s pose does not update every frame but every second (or third) frame, giving a choppy, hand-drawn rhythm; in 3D games it is used to mimic hand-drawn or stop-motion styles while the camera and background still move smoothly.

## Not to be confused with

Not low frame rate or lag (the whole game slows); only the character’s pose is deliberately stepped while everything else stays smooth. Not sub-pixel animation (PIX-14, subtle motion without changing the outline).

## Use it for

Hand-drawn, cartoon or stop-motion looks; giving 3D characters a 2D rhythm; emphasising key poses.

## Tunable parameters

pose rate (8 / 12 / 24 fps) · interpolation off (stepped) · which layers are stepped · switch to ones for key moments

## Request prompt

In your game, play character animation on twos: sample the animation at a fixed 12 fps (a new pose every 83 ms, no interpolation), but keep world movement, camera and VFX at 60 fps; switch to ones (24 fps) during super moves so they read smoother.

## Implementation hint

Quantise the animation sample time: t_sampled = floor(t * rate) / rate before evaluating the clip (or use constant/stepped key interpolation). Root motion and camera keep using unquantised time so movement stays smooth.

## Related

- [PIX-14](PIX-14.md) — Sub-pixel animation
- [ANI-01](ANI-01.md) — Smear frame
- [ANI-03](ANI-03.md) — Hold frame / Impact frame

## References

- [Wikipedia — Traditional animation ("Shooting on twos")](https://en.wikipedia.org/wiki/Traditional_animation)
- [Wikipedia — Limited animation](https://en.wikipedia.org/wiki/Limited_animation)
- [Blender Manual — F-Curve modifiers (Stepped Interpolation)](https://docs.blender.org/manual/en/latest/editors/graph_editor/fcurves/modifiers.html)
