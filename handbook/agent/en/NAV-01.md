# NAV-01 · Interactable highlight

**Aliases:** Outline on hover; Proximity highlight; Interaction outline

**Group:** Visual guidance & wayfinding
**Subcategory:** Interaction cues

## What you see

When the character walks up to, or the cursor hovers over, an object that can be used (chest, sign, door, NPC), a 1-pixel bright outline appears around it and pulses gently, usually with a button prompt (e.g. “E”) above it; the outline fades when you leave. Similar-looking objects that can’t be used stay unchanged.

## Not to be confused with

Not yellow paint (NAV-02, always painted into the world, mostly for climbing routes); this outline only appears on approach or hover. Not selective outlining (PIX-12, an art technique for colouring line work) or a pickup sparkle (VFX-16, the item itself glints all the time).

## Use it for

Exploration, puzzles, point-and-click adventures and survival games, to show “what can I press” and which of several nearby objects will be chosen.

## Tunable parameters

trigger radius / hover · outline width & colour · pulse period · fade in/out time · nearest-only vs all · prompt icon offset

## Request prompt

Add interactable highlighting to the game: when the player is within 24 px of an object (or the cursor hovers it), draw a 1 px #ffe08a outline around it, fade in over 0.12 s and pulse between 60% and 100% opacity on a 1.2 s period; highlight only the single nearest object at a time and show a button-prompt icon 6 px above it; fade out over 0.15 s on leaving. Objects that can’t be used never get an outline.

## Implementation hint

Draw the sprite’s silhouette (alpha>0 → outline colour) at 1-px offsets in 4 or 8 directions behind the sprite; or in the sprite pixel shader, output the outline colour where own alpha=0 and any neighbouring texel’s alpha>0 (pad atlas regions by 1 px). In 3D use an inverted-hull pass or a mask + edge-detect post pass. Pick the target on the CPU: nearest interactable in range, ties broken by facing direction.

## Related

- [NAV-02](NAV-02.md) — Yellow paint
- [PIX-12](PIX-12.md) — Selective outlining
- [VFX-16](VFX-16.md) — Pickup sparkle
- [FB-14](FB-14.md) — Pickup magnetism

## References

- [Vallentin — Interactive hints (outline vs overlay highlight tests)](https://survival.vallentin.dev/blog/post/interactive-hints)
- [Beyond the Norm — Pick Up That Can: The Problem With Interactive Objects](https://www.beyondthenorm.org/pick-up-that-can-the-problem-with-interactive-objects/)
- [Game Developer — Affordance Design in Half-Life 2](https://www.gamedeveloper.com/design/affordance-design-in-half-life-2)
