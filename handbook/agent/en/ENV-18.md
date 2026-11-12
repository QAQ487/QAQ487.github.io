# ENV-18 · Systemic environmental interactions

**Aliases:** 系統式環境互動; 火遇雨熄滅; 元素連鎖; Fire and rain; Elemental propagation; Environmental systems; 環境の連動; Fire updraft; Heat updraft; 上升氣流; 熱氣流; 上昇気流

**Group:** Environment, weather & time
**Subcategory:** World state

## What you see

World states affect each other: fire spreads through dry grass; rain extinguishes flames and makes ground slippery; burned grass leaves a charred path that later reads as a new route or hazard. Players see rules operating in the world, not one-shot scripted events. Variant — fire updraft: when grass burns, a rippling heat shimmer and rising embers appear above the flames, and a character gliding over the fire is carried upward by it.

## Not to be confused with

Not a weather filter alone and not a one-time cutscene fire. Systemic interaction is predictable state propagation and residue.

## Use it for

Open-world puzzles, stealth routes (smoke/fire draw attention), weather that reshapes a fight space.

## Tunable parameters

states · spread rate · rain extinguish time · friction when wet · residue lifetime · VFX per state (starting points)

## Request prompt

Let both torches and fire arrows ignite the same burnable thicket; when it burns out, the path opens. Rain only extinguishes designated open flames. Accept with two fire sources, non-flammable props, and a sheltered flame. Propagation must be rule-based, not a one-shot script.

## Implementation hint

Grid or influence-map: each cell holds enum state + timer. Each tick, Burning spreads to neighbour DryGrass; Rain volume > threshold converts Burning→Charred/Wet. Gameplay queries the same grid for pathing and damage.

## Related

- [ENV-01](ENV-01.md) — Day-night cycle
- [ENV-02](ENV-02.md) — Sky gradient
- [VFX-08](VFX-08.md) — Projectile trail
- [NAV-02](NAV-02.md) — Yellow paint
- [ENV-22](ENV-22.md) — Spray-to-clean grime

## References

- [Wikipedia — The Legend of Zelda: Breath of the Wild](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild)
- [Zelda Wiki — Updraft (burning grass creates rising air that lifts the paraglider)](https://zeldawiki.wiki/wiki/Updraft)
