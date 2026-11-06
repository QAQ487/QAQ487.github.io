# PIX-13 · Silhouette readability

**Aliases:** Readable silhouettes; Shape language; Silhouette test

**Group:** 2D & pixel-art techniques
**Subcategory:** Line & form

## What you see

Fill every character solid black and you can still tell who is who: NPC, archer, enemy and brute each have a distinctive outline feature (weapon direction, ears, body proportions). In a pixel game a character is only a dozen or so pixels tall, so the silhouette is the main way it is recognised.

## Not to be confused with

Not outlining (PIX-12, which is about line colour) and not colour coding (fails for colour-blind players or at night). Silhouette readability is a shape-design issue: if two units look identical filled black, no colour change is enough.

## Use it for

Lets players instantly tell friend from foe and unit types in crowds, at night or at a distance; it also decides how large a character needs to be on screen.

## Tunable parameters

character height (px) · unique feature per unit · test on dark & light backgrounds · facing-left variants also distinct

## Request prompt

Audit the game's units for silhouette readability: fill every sprite pure black and line them up; NPC, archer, guard, enemy, enemy shaman and enemy brute must each have one unique shape feature (pointed ears, bow, shield, staff, bulk) and be distinguishable without colour. Keep characters 14–18 px tall.

## Implementation hint

Add a renderer debug toggle that renders all sprites with colour = (0,0,0,a) (one-line pixel shader branch on a constant-buffer flag) so silhouettes can be reviewed in the live scene.

## Related

- [PIX-12](PIX-12.md) — Selective outlining
- [PIX-24](PIX-24.md) — Sprite pivot at the feet
- [PIX-25](PIX-25.md) — Sprite flipping for facing

## References

- [Lospec — Silhouette tutorials (tag)](https://lospec.com/pixel-art-tutorials/tags/silhouette)
- [Wikipedia — Silhouette](https://en.wikipedia.org/wiki/Silhouette)
- [Slynyrd — Pixelblog 22: Top-down character sprites](https://www.slynyrd.com/blog/2019/10/21/pixelblog-22-top-down-character-sprites)
