# LGT-18 · Character–environment lighting separation

**Aliases:** Split lighting rig; Character vs environment lights; Hero light separation; 角色與場景分開打光; キャラと背景のライティング分離

**Group:** Lighting & shadows
**Subcategory:** Indirect light & shadows

## What you see

The character is lit by a readable, often simpler or warmer key designed for face and costume, while the environment keeps its own lighting. The two can disagree slightly and still look intentional.

## Not to be confused with

Not physical GI binding the character to room bounce (REN-20). Not per-material authored shadow colour (NPR-21). Not an unlit character (REN-02) pasted on a lit background — both sides are lit, with separate authorship.

## Use it for

Readable faces in strongly coloured or contrasty environments.

## Tunable parameters

character key colour/intensity · env lights · link vs separate blend · fill ratio (authoring defaults)

## Request prompt

Place a character in a strongly coloured or contrasty environment → character vs surrounding surfaces → character keeps a stable, readable key/fill while the room lighting stays independent; moving the character does not suddenly dye them with every bounce colour → optional linked-GI compare lane.

## Implementation hint

Maintain a separate character light group (or light layers/channels) that ignores most env lights and GI. Composite character shading from the hero rig; optionally show a linked-GI compare. Keep both sides lit.

## Related

- [REN-20](REN-20.md) — Global illumination/GI/Indirect lighting/Color bleeding
- [REN-03](REN-03.md) — Toon shading/Cel shading/Ramp shading
- [LGT-01](LGT-01.md) — Directional, point and spot lights
- [NPR-21](NPR-21.md) — Authored shadow colours

## References

- [Wikipedia — Three-point lighting](https://en.wikipedia.org/wiki/Three-point_lighting)
