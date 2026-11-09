# VFX-22 · Weapon infusion / Surface coating

**Aliases:** Weapon buff; Weapon enchant; Weapon imbue; Elemental coating; Blade infusion; 武器附魔; 屬性塗層; 武器エンチャント; 属性付与; 武器バフ

**Group:** VFX & particles
**Subcategory:** States & buffs

## What you see

After a buff or an applied coating, elemental light creeps from the hilt along the blade to the tip; the whole weapon surface then carries a flowing emissive pattern and the edge keeps shedding small particles (embers, sparks, frost mist). Swing trails and hit sparks switch to the same element colour. Near expiry the glow blinks, and at the end it recedes from tip to hilt, leaving the plain metal.

## Not to be confused with

Not an aura (VFX-14 — light wrapping the whole character); this coats the weapon surface only. Not slash VFX (VFX-07 — the swing arc itself), although the infusion recolours it. Not the trail technique itself (FX-02).

## Use it for

Elemental weapons, timed buffs, poison or oil coatings, weapons with switchable elements.

## Tunable parameters

spread direction & time 0.3–0.5 s · flow speed · edge particle rate · element colour set · trail / hit colour inheritance · expiry blink lead · fade-out direction (authoring defaults)

## Request prompt

Add a weapon infusion look. On buff, element light spreads from hilt to tip, covering the blade in about 0.3–0.5 s; afterwards the blade carries a flowing emissive pattern and the edge sheds element particles. While infused, swing trails and hit sparks use the element colour. Start blinking 2 s before expiry and recede from tip to hilt at the end. Accept: fire, lightning and ice read apart at a glance, and the character's body itself does not glow.

## Implementation hint

Add a coating layer to the weapon material driven by a 0–1 mask along the blade length (hilt→tip UV or a baked gradient); animate the reveal threshold on start and reverse it on end. Scroll a noise texture in the emissive for flow. Emit particles from edge vertices or a spline along the blade. Publish the current element to the trail and hit-spark systems so they swap colour.

## Related

- [VFX-14](VFX-14.md) — Aura
- [VFX-07](VFX-07.md) — Slash VFX
- [FX-02](FX-02.md) — Trails / Ribbons
- [VFX-05](VFX-05.md) — UV scrolling
- [VFX-10](VFX-10.md) — Lightning
- [VFX-12](VFX-12.md) — Fire and smoke

## References

- [Wikipedia — Elden Ring](https://en.wikipedia.org/wiki/Elden_Ring)
- [Wikipedia — Dark Souls](https://en.wikipedia.org/wiki/Dark_Souls)
