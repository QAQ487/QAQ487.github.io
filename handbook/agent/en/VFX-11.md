# VFX-11 · Beam

**Aliases:** Laser; Ray; Continuous beam; Channelled beam

**Group:** VFX & particles
**Subcategory:** Combat VFX

## What you see

A straight shaft of light continuously connects the caster and target: a muzzle glow at the start, impact sparks at the end, a texture flowing along the middle, and a slight width pulse; usually charge → sustain → wind-down.

## Not to be confused with

Not a projectile trail (VFX-08, following a flying object and expiring); not lightning (VFX-10, jagged and re-shaped every few frames). A beam is one stable straight line that persists while channelled.

## Use it for

Channelled damage, healing beams, tower lock-ons, life drain; clearly shows who is hitting whom.

## Tunable parameters

width & pulse · texture scroll speed · start/end caps · charge & wind-down times · impact spray rate · colour

## Request prompt

Add a mage-tower beam to the game: charge for 0.3 s at the tower top (a growing light point), then fire a 4 px purple-white beam to the target; its texture scrolls along the length at 120 px/s and the width pulses between 3–5 px every 0.1 s; continuous spark spray at the target. On stop, the beam narrows to 0 over 0.1 s.

## Implementation hint

Single quad (or 3: start cap, stretched body, end cap) oriented from A to B, UV.x = distance in texels so the texture does not stretch; scroll UV.x with time. Additive blend; add a wider low-alpha glow quad underneath. Raycast/physics decides B each frame.

## Related

- [VFX-10](VFX-10.md) — Lightning
- [VFX-05](VFX-05.md) — UV scrolling
- [VFX-08](VFX-08.md) — Projectile trail

## References

- [Unity Manual — Line Renderer](https://docs.unity3d.com/Manual/class-LineRenderer.html)
- [Godot docs — Line2D class](https://docs.godotengine.org/en/stable/classes/class_line2d.html)
- [Real Time VFX community (realtimevfx.com)](https://realtimevfx.com/)
