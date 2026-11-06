# NAV-02 · Yellow paint

**Aliases:** Climbable markers; Ledge paint; Traversal markers

**Group:** Visual guidance & wayfinding
**Subcategory:** Interaction cues

## What you see

Climbable ledges, ladders, breakable planks and the like are painted in one consistent, high-contrast colour across the whole game (commonly yellow or white paint marks, cloth strips or scratches); similar-looking rocks that can’t be used have no such colour, so the route reads at a glance.

## Not to be confused with

Not an interactable highlight (NAV-01, an outline or UI that appears only on approach); yellow paint is part of the world and always visible. Not foreground-background separation (NAV-03, value contrast of the whole gameplay layer); yellow paint marks specific usable points.

## Use it for

Climbing and parkour routes, and realistic art where too many rocks look grabbable but aren’t. It is often criticised as immersion-breaking, so offer an intensity or off setting.

## Tunable parameters

marker colour · coverage (edge strip / patches / drips) · consistency rules · intensity setting · diegetic justification (paint, cloth, scratches)

## Request prompt

Add yellow-paint markers to climbable ledges in the game: paint a 2 px tall #f2c94c strip along the top of every climbable edge, plus 1–3 random 1×3 px drips below it; similar-looking rocks that aren’t climbable never get paint. Keep the colour consistent across the game and add a setting “Marker intensity: Off / Subtle / Standard” (Subtle = 50% opacity).

## Implementation hint

Author markers as decals, an overlay layer or tile variants on climbable edges, generated from the same collision tag the movement code uses (one source of truth, so paint never lies). The intensity setting is the overlay alpha or a material parameter. In 3D: a world-space decal or a vertex-colour mask on the climbable mesh.

## Related

- [NAV-01](NAV-01.md) — Interactable highlight
- [NAV-03](NAV-03.md) — Foreground-background separation
- [PIX-13](PIX-13.md) — Silhouette readability

## References

- [GamesRadar+ — Ignore the yellow paint detractors: visual cues are great for games](https://www.gamesradar.com/ignore-the-yellow-paint-detractors-visual-cues-are-great-for-games/)
- [Kotaku — Yellow Paint Is Once Again Breaking People’s Brains](https://kotaku.com/yellow-paint-debate-ff7-rebirth-demo-resident-evil-4-1851249608)
- [CritPoints — It’s Not the Yellow Paint, It’s What the Paint Represents](https://critpoints.net/2024/03/03/yellow-paint-is-fine-actually/)
