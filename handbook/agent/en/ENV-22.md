# ENV-22 · Spray-to-clean grime

**Aliases:** Spray cleaning; Grime wash-off; Goop cleaning; Power washing; Dirt mask; Clean reveal; 噴水清除污垢; 污垢沖洗; 清除黏液; 高壓清洗; 汚れを洗い流す; 洗浄; 放水で掃除

**Group:** Environment, weather & time
**Subcategory:** World state

## What you see

Walls, floors or objects are coated in murky grime, graffiti or goo. When the player sprays with a water gun, the jet splashes where it hits and the grime is washed away in strips along the path the jet sweeps, revealing a clean, brightly coloured surface underneath; the freshly cleaned edges have a wet sheen that slowly dries off. Thick grime takes several passes before it is gone completely. When a whole area is clean, a completion chime sounds and a flash of light runs over the surface, sometimes with plants or residents coming back. Variant — jet hover: spraying straight down holds the character up in the air while cleaning the ground directly below.

## Not to be confused with

Not corruption spread (ENV-16, where bad ground spreads out from a source and recedes as a whole when cleansed); this card is the player clearing a surface stroke by stroke. Not bullet-hole or blood decals (which only accumulate and are never washed off). Not inking the ground to claim territory, which adds colour to a surface instead of removing grime.

## Use it for

Cleaning and restoration games, clearing grime as a level goal, revealing hidden pictures by cleaning, platformers where the jet both moves the character and cleans.

## Tunable parameters

grime mask resolution per surface · brush size & strength · thickness (passes needed) · splash at the hit point · wet sheen & dry-off · completion standard & tolerance · completion chime & flash · jet-hover variant (authoring defaults)

## Request prompt

Add spray-to-clean grime. Give every cleanable surface a grime mask: high values show grime, low values show the clean surface. When the water jet hits a surface, lower the mask around the hit point with a brush shape and play a splash there; add a temporary wet sheen to freshly cleaned parts that fades afterwards. Thick grime needs several passes. Track the cleaned fraction of each area and play a completion chime and a flash when it meets the completion standard. Accept: the cleaned shape follows the path the jet swept, and completion can never be blocked forever by a few specks that are hard to see.

## Implementation hint

Give each cleanable surface a grime mask texture in its UV space. On each spray hit, convert the hit point to UV and paint into the mask with a soft brush (subtracting thickness), and write a wet value into a second channel that decays over time. The surface shader blends grime over the clean material by the mask and adds sheen from the wet channel. Track coverage per surface (count cleared texels incrementally or sample the mask at low resolution) and trigger completion a little before full coverage so tiny specks never block it.

## Related

- [ENV-16](ENV-16.md) — Corruption spread
- [ACT-56](ACT-56.md) — Hover float (puff, flutter, jet)
- [ENV-18](ENV-18.md) — Systemic environmental interactions

## References

- [Wikipedia — Super Mario Sunshine (FLUDD sprays water to clean goop; Hover nozzle)](https://en.wikipedia.org/wiki/Super_Mario_Sunshine)
- [Wikipedia — PowerWash Simulator (power washer removes dirt and grime)](https://en.wikipedia.org/wiki/PowerWash_Simulator)
- [Wikipedia — Viscera Cleanup Detail (cleaning up after a disaster)](https://en.wikipedia.org/wiki/Viscera_Cleanup_Detail)
