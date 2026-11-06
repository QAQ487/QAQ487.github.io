# ENV-16 · Corruption spread

**Aliases:** Biome blend; Blight spread; Creep

**Group:** Environment, weather & time
**Subcategory:** World state

## What you see

A "bad" ground (purple corruption, black blight, creep) spreads outward from a source with an irregular edge and a transition band; plants it covers change colour or wither. Cleansing makes it recede.

## Not to be confused with

Not seasonal change (ENV-03, the whole map at once); corruption is local, sourced and spreading. Not fog of war (ENV-15).

## Use it for

Shows enemy territory, adds countdown pressure, rewards cleansing play.

## Tunable parameters

growth rate · noise amplitude/scale · blend band width · dither vs smooth · particle density · recede speed

## Request prompt

Add corruption spread around enemy camps in the game: radius grows 8 px per minute from the camp; decide coverage with a noise-perturbed distance field, using purple-grey grass tiles inside and a 6 px dithered blend band at the edge, spawning small purple spore particles there; when the camp is destroyed the radius shrinks to 0 over 5 s.

## Implementation hint

Ground pixel shader: d = distance(worldPos, source) + noise(worldPos*s)*amp; w = saturate((radius - d)/band); choose tile palette by Bayer(w) for a dithered edge. Gameplay queries the same function for "inside corruption".

## Related

- [ENV-03](ENV-03.md) — Seasonal change
- [ENV-15](ENV-15.md) — Fog of war
- [PIX-17](PIX-17.md) — Autotiling
- [PIX-08](PIX-08.md) — Dithering

## References

- [The Book of Shaders — Noise](https://thebookofshaders.com/11/)
- [Boris the Brave — Classification of tilesets](https://www.boristhebrave.com/2021/11/14/classification-of-tilesets/)
