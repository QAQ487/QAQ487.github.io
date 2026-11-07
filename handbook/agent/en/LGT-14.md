# LGT-14 · Moving light pool from a swinging fixture

**Aliases:** Swinging lamp lighting; Pendulum light; Moving lantern shadows; Animated light footprint; 搖燈光斑; 揺れる灯りの光だまり

**Group:** Lighting & shadows
**Subcategory:** Light sources

## What you see

A hanging lamp sways and the illuminated patch sweeps the wall/floor with it — not merely the lamp mesh moving. A moving fixture with a stationary light pool quietly disconnects object and room.

## Not to be confused with

Not brightness flicker (LGT-04); keep brightness steady in the demo. Not the hanging fixture physics alone (PHY-02) — this card centres on the spatial movement of illumination.

## Use it for

Eerie interiors, hanging-lamp puzzles, rooms that need light to travel with the fixture.

## Tunable parameters

light attach socket · shadow casters · brightness held constant · settle coupled to PHY-02 (authoring defaults)

## Request prompt

Fixture receives impulse / support moves → attached light position/direction and receiving surfaces → light pool travels with fixture; eligible shadow silhouettes move consistently → sweep diminishes as the fixture settles.

## Implementation hint

Parent the punctual light (and shadow camera if any) to the fixture socket every frame. Do not animate intensity for this effect. Couple motion to the same pendulum/hinge as PHY-02 so mesh, pool, and shadows share one transform.

## Related

- [PHY-02](PHY-02.md) — Verlet rope and chain
- [LGT-04](LGT-04.md) — Flickering light
- [LGT-03](LGT-03.md) — Light cookie

## References

- [Godot docs — 3D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/3d/lights_and_shadows.html)
