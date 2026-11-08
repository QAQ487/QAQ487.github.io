# REN-29 · Bloom/Glow

**Aliases:** Film halation; Red halation; Halation; Optical diffusion; Black mist; Black-mist filter; 菲林紅暈; 黑柔濾鏡; フィルム・ハレーション; ブラックミスト

**Group:** Post-processing & screen filters
**Subcategory:** Cameras, Color, and Post-Processing

## What you see

halos spread around signs, the sun, and intense highlights.

## Not to be confused with

bloom spreads bright image regions; it does not actually illuminate nearby objects, and is not emission. Thresholds and implementations vary; not all bloom necessarily operates only above a fixed brightness. Excessive bloom washes out detail and obscures materials.

## Use it for

communicating brightness, magical energy, and soft dreamlike atmosphere. Film red halation and optical black-mist diffusion are distinct looks — not interchangeable; not chromatic aberration (REN-36) and not plain Gaussian blur (PP-08). Dappled leaf light is LGT-15.

## Tunable parameters

threshold · knee · intensity · radius · mip count · tint · halation width · halation warm tint · black-mist strength · black vs white diffusion

## Request prompt

In your game, add bloom and two named variants: film red-halation as a narrow warm fringe only at very bright boundaries; black-mist diffusion that softens lamp shoulders and fine skin contrast while keeping subject edges. Use threshold 1.2, soft knee 0.5, intensity 0.35; white UI must not trigger bloom.

## Implementation hint

Extract or weight bright image regions, blur them across several scales, and add the result back conservatively for bloom. For film halation, add a narrow warm red-orange fringe only at very bright/dark boundaries. For black-mist diffusion, soften highlight shoulders and fine contrast while keeping subject edges readable — not a full-screen Gaussian blur.

## Related

- [LGT-15](LGT-15.md) — Komorebi / dappled canopy light
- [CIN-14](CIN-14.md) — Flashback filter

## References

- [Unreal — Post Process Effects，Bloom](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-effects-in-unreal-engine)
- [Godot — Environment and post-processing，Glow](https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html)
