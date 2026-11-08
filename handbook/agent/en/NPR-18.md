# NPR-18 · Risograph / misregistered spot-colour print

**Aliases:** Risograph; Riso print; Spot-colour overlay; Stencil print misregistration; 孔版錯版套印; Risograph 風格; リソグラフ; 孔版印刷; 版ズレ

**Group:** Stylized rendering (NPR)
**Subcategory:** Strokes & print

## What you see

A few spot-colour layers (often fluorescent pink, blue, yellow) overprint with visible texture and slight misregistration, plus the look of limited inks rather than continuous RGB.

## Not to be confused with

Not halftone/Ben-Day as a shading pattern (NPR-08 — though riso often uses coarse halftone; this card names the layered print object). Not pixel dither (PIX-08). Not digital corruption (PP-12). Cross-link NPR-08 and note screen angles there.

## Use it for

Zine aesthetics, poster UI, print cutaways.

## Tunable parameters

spot inks · overprint mode · grain · plate offset · screen angle note (authoring defaults)

## Request prompt

Enable riso presentation → scene → separate the image into 2–3 spot plates that overprint, with grainy stencil texture and a 1–2 px plate offset → restore continuous colour on disable.

## Implementation hint

Split the image into 2–3 ink masks (thresholded channels), tint each with a spot colour, offset plates by 1–2 px, multiply/overprint with grain. Link NPR-08 for screen-angle flavour without becoming that card.

## Related

- [NPR-08](NPR-08.md) — Halftone / Ben-Day dots
- [PIX-08](PIX-08.md) — Dithering
- [NPR-16](NPR-16.md) — Ukiyo-e / woodblock print

## References

- [Wikipedia — Risograph](https://en.wikipedia.org/wiki/Risograph)
- [Wikipedia — Halftone](https://en.wikipedia.org/wiki/Halftone)
