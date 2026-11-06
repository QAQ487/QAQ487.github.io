# MATX-02 · Clear coat, sheen and iridescence

**Aliases:** Clearcoat; Coat layer; Cloth sheen; Velvet; Thin-film interference; Iridescent

**Group:** Materials & surfaces
**Subcategory:** Shading models & material parameters

## What you see

Three extra layers on top of a base material: clear coat adds a transparent glossy varnish over a coloured base, so you see the base’s broad blurry highlight and the coat’s small sharp one at the same time (car paint, lacquer); sheen adds a soft glow along the silhouette edges (velvet, peach skin); iridescence shifts colour with viewing angle from blue-green to magenta (soap bubbles, beetle shells, oil films).

## Not to be confused with

Not a single specular highlight (REN-10 Specular highlight) or roughness (REN-08 Roughness); clear coat is two stacked highlights. The sheen edge is not rim lighting (REN-05 Rim lighting, usually an artistic extra light), and none of these is anisotropy (REN-11 Anisotropy, a stretched highlight).

## Use it for

Cars, painted furniture, ceramics, velvet clothing and felt, insects and gems, soap bubbles, magic potion bottles.

## Tunable parameters

coat strength · coat roughness · coat normal · sheen colour & roughness · film thickness range · film IOR

## Request prompt

Add three optional layers to the game’s material: clear coat (strength 0–1, coat roughness 0.05, a second GGX highlight computed separately, with the base attenuated by the coat’s Fresnel), sheen (colour #f0d0ff, roughness 0.6, using the Charlie distribution so silhouette edges glow) and iridescence (film thickness 300–600 nm, interference colour from the view angle, multiplied into the specular). Each layer has a toggle and costs nothing when off.

## Implementation hint

Clear coat: f = base * (1 - Fc) + coatSpec, where Fc = Fresnel(0.04, N·V) and coatSpec is a second GGX lobe with its own roughness (Filament). Sheen: Charlie distribution D = (2 + 1/r)·sin^(1/r)θ /2π with a simple visibility term. Iridescence: thin-film interference — phase = 4π·n·d·cosθt/λ evaluated for R, G, B (KHR_materials_iridescence gives a reference implementation).

## Related

- [REN-10](REN-10.md) — Specular highlight
- [REN-08](REN-08.md) — Roughness/Smoothness/Glossiness
- [REN-05](REN-05.md) — Rim lighting/Rim light
- [REN-11](REN-11.md) — Anisotropy/Anisotropic reflection
- [MATX-01](MATX-01.md) — Matcap

## References

- [Google Filament — Physically Based Rendering (clear coat, cloth/sheen)](https://google.github.io/filament/Filament.md.html)
- [Khronos glTF — KHR_materials_clearcoat](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat)
- [Khronos glTF — KHR_materials_sheen](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen)
- [Khronos glTF — KHR_materials_iridescence](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence)
- [Unreal Engine docs — Using the Clear Coat shading model](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-the-clear-coat-shading-model-in-unreal-engine)
- [Blender Manual — Principled BSDF (coat, sheen, thin film)](https://docs.blender.org/manual/en/latest/render/shader_nodes/shader/principled.html)
- [Wikipedia — Thin-film interference](https://en.wikipedia.org/wiki/Thin-film_interference)
