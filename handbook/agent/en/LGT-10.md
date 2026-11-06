# LGT-10 · Blob shadow

**Aliases:** Drop shadow; Fake shadow; Circle shadow; Shadow decal

**Group:** Lighting & shadows
**Subcategory:** Indirect light & shadows

## What you see

A soft dark ellipse sits under characters and props, the same whatever the light direction; it does not follow the character's shape, but tells the player clearly where the object is on the ground. When jumping, the shadow stays on the ground and shrinks and fades.

## Not to be confused with

Not a real cast shadow (LGT-08 / REN-25 Cast shadows, which follow the light's shape and direction) and not a contact shadow (LGT-09, a thin line along the light direction). Versus fake height (PIX-18): fake height is the spatial trick of drawing the object higher while the shadow stays down; the blob shadow is how that shadow itself is drawn, and is common in 3D too.

## Use it for

Judging landing spots in platformers, top-down characters, mobile and retro styles, replacing costly real-time shadows when there are many units (RTS).

## Tunable parameters

size ratio · opacity · edge softness · shrink & fade with height · decal projection depth

## Request prompt

Add blob shadows to the game's characters and enemies: draw a soft ellipse at ground level under each one, width = character width × 0.9, height = width × 0.4, 45% opacity at the centre fading to 0 at the edge; when airborne scale width by 1 / (1 + height × 0.15) and lower opacity with it, minimum 15%. In 3D implement it as a downward-projected decal that conforms to slopes.

## Implementation hint

2D: a pre-blurred ellipse sprite drawn in a ground layer below sprites (multiply or alpha blend). 3D: a projected decal or a quad aligned to the ground normal from a downward raycast; scale and fade from the raycast distance. Disable it when real shadows are on to avoid double shadows.

## Related

- [PIX-18](PIX-18.md) — Fake height with ground shadow
- [LGT-09](LGT-09.md) — Contact shadows
- [LGT-08](LGT-08.md) — Shadow mapping and cascaded shadow maps
- [REN-25](REN-25.md) — Cast shadows/Soft shadows/Penumbra

## References

- [Godot docs — Using decals (blob shadows section)](https://docs.godotengine.org/en/stable/tutorials/3d/using_decals.html)
