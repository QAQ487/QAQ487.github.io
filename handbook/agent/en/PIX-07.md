# PIX-07 · Color cycling

**Aliases:** Palette cycling; Palette rotation; Palette animation

**Group:** 2D & pixel-art techniques
**Subcategory:** Colour

## What you see

Not a single pixel moves — a range of palette indices just rotates its colours by one step every so often, and suddenly the waterfall flows, the river glints, the torch flickers and the portal spins. Every pixel using that index range animates in sync.

## Not to be confused with

Not a palette swap (PIX-06, a one-off swap of the whole set) and not frame-by-frame animation (redrawing each frame). Only the palette changes, so it is extremely cheap; the sense of motion comes from how the indices are laid out.

## Use it for

Keeps large areas of water, lava, waterfalls, neon or magic circles moving for almost no art cost; a classic 8/16-colour-era technique.

## Tunable parameters

cycle range (start index, length) · step interval · direction · ping-pong vs loop · several independent ranges

## Request prompt

Add colour cycling to the game's river and the town magic circle: draw the water with 6 consecutive palette indices (deep blue → light blue → white) and rotate those 6 colours one step downstream every 0.12 s; the magic circle uses a separate 4-colour range cycling every 0.08 s. No other colours are affected.

## Implementation hint

Keep palette indices in the sprite/tile textures (see PIX-06). Each frame update a small dynamic palette texture (rewritten each frame) or pass a per-range offset in a constant buffer: if idx in [s, s+n) then idx = s + (idx − s + offset) % n before the palette lookup.

## Related

- [PIX-06](PIX-06.md) — Palette swap
- [PIX-10](PIX-10.md) — Limited palette
- [ENV-12](ENV-12.md) — Water surface

## References

- [Wikipedia — Color cycling](https://en.wikipedia.org/wiki/Color_cycling)
- [the-pixel.art — Color cycling article](https://the-pixel.art/articles/color-cycling/)
- [EffectGames — Mark Ferrari color-cycling Q&A](https://www.effectgames.com/effect/article-Q_A_with_Mark_J_Ferrari.html)
