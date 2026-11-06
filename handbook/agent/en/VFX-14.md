# VFX-14 · Aura

**Aliases:** Buff glow; Power-up aura; Outline glow; Rim aura

**Group:** VFX & particles
**Subcategory:** States & buffs

## What you see

When a character is buffed or powered up, a glowing (pulsing) band surrounds its outline, particles drift upward from its feet or body, and sometimes a ring lies on the ground. It lasts as long as the state does.

## Not to be confused with

Not a status tint (FB-05, colouring the character itself); an aura sits outside the outline. Not a healing effect (VFX-17, a one-shot restore) or a hit flash (FB-01).

## Use it for

Shows buffs, rage, invulnerability, elite enemies, selected units — lets you spot important characters at a glance in a chaotic battle.

## Tunable parameters

outline width · colour · pulse period & range · particle rate & rise · ground ring on/off · stacking priority (which aura wins)

## Request prompt

In your game, blessed NPCs show a gold aura: a 1-px gold outline outside the sprite whose opacity pulses between 0.5 and 1 every 0.8 s; every 0.15 s a gold pixel particle rises from the feet, living 0.6 s and rising 10 px. Elite enemies use the same aura in red.

## Implementation hint

Outline in the sprite PS: sample alpha at 4–8 neighbour texel offsets; if centre alpha = 0 and any neighbour > 0, output aura colour × pulse (requires 1-texel transparent padding in the atlas). Particles from a small CPU emitter attached to the entity. Put aura colour/pulse in per-instance data so many units batch together.

## Related

- [FB-05](FB-05.md) — Status effect tint
- [VFX-17](VFX-17.md) — Healing effect
- [VFX-12](VFX-12.md) — Fire and smoke
- [FB-01](FB-01.md) — Hit flash

## References

- [Godot docs — CanvasItem shaders](https://docs.godotengine.org/en/stable/tutorials/shaders/shader_reference/canvas_item_shader.html)
- [Cyanilux — Forcefield shader breakdown](https://www.cyanilux.com/tutorials/forcefield-shader-breakdown/)
- [Wikipedia — Status effect](https://en.wikipedia.org/wiki/Status_effect)
