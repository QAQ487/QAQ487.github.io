# LGT-01 · Directional, point and spot lights

**Aliases:** Light types; Sun light; Omni light; Spotlight; Punctual lights; Forward+; Clustered shading; Deferred rendering; Tiled forward; 多光源管線

**Group:** Lighting & shadows
**Subcategory:** Light sources

## What you see

The three basic light types: a directional light (the sun) lights the whole scene from one direction with parallel shadows; a point light (bulb, torch) radiates from one point in all directions and gets darker with distance; a spot light (flashlight, stage light) lights only a cone, with a visible pool and edge.

## Not to be confused with

Not light attenuation (LGT-02, how brightness falls off with distance) and not an area light (LGT-05, a light with size and soft shadow edges). All three are "punctual" (no size), so their shadows are inherently hard-edged.

## Use it for

Setting the key light and mood: directional for daytime exteriors, point lights for interiors and night, spot lights for searchlights, flashlights, stages and guard vision cones. How many dynamic lights the frame can hold is a pipeline limit; it does not change how one light looks. (Former entry LGT-11, “Many-light pipelines”, is merged here.)

## Tunable parameters

type · direction / position · colour · intensity · range · inner & outer cone angle · shadow on/off

## Request prompt

Set up the three light types in the game: one directional light as the sun (direction (−0.4, −1, −0.3), colour #fff4e0, intensity 1.0); torches as point lights (radius 6 m, colour #ffb060); the guard's flashlight as a spot light (inner angle 20°, outer 30°, range 12 m) with a smooth blend between inner and outer angle. Make every light editable and previewable live in the editor.

## Implementation hint

Directional: L = −dir, constant intensity. Point: L = normalize(pos − p), multiplied by an attenuation term (LGT-02). Spot: as point, times smoothstep(cos(outer), cos(inner), dot(−L, spotDir)). Pack lights in a constant/structured buffer; evaluate N·L per pixel.

## Related

- [LGT-02](LGT-02.md) — Light attenuation
- [LGT-05](LGT-05.md) — Area light
- [PIX-21](PIX-21.md) — Normal-mapped sprites
- [LGT-03](LGT-03.md) — Light cookie

## References

- [LearnOpenGL — Light casters (directional, point, spot; attenuation)](https://learnopengl.com/Lighting/Light-casters)
- [Godot docs — 3D lights and shadows](https://docs.godotengine.org/en/stable/tutorials/3d/lights_and_shadows.html)
- [Unity Manual — Light component](https://docs.unity3d.com/Manual/class-Light.html)
