# REN-21 · Ambient occlusion/AO/Occlusion map

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

corners, clothing folds, and ground contacts darken, adding thickness and contact cues.

## Not to be confused with

AO estimates how much of the surrounding environment is occluded; it is neither a light's cast shadow nor complete GI. It can be baked into maps or computed in real time. Indiscriminately blackening all direct lighting can make surfaces look dirty or double-darkened.

## Use it for

reinforcing local geometric readability, including stylized treatment.

## Tunable parameters

occlusion strength · radius · distance · bent normal · direct-light influence · map resolution

## Request prompt

In your game, add ambient occlusion: darken gradually within 10 cm of corners and crate contacts at strength 0.65, affect indirect light only, and never turn contacts pure black under direct noon light.

## Implementation hint

Represent the fraction of surrounding ambient illumination blocked by nearby geometry, from baked data or a runtime estimate. Apply it chiefly to indirect/environment lighting so direct illumination does not become dirty or double-darkened.

## References

- [LearnOpenGL — SSAO，開首 AO 比較及原理](https://learnopengl.com/Advanced-Lighting/SSAO)
