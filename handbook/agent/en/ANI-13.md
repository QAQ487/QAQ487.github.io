# ANI-13 · Morph targets / Blend shapes

**Aliases:** Shape keys; Blend shapes; Vertex morphing; Facial blend shapes

**Group:** Animation, movement & physics
**Subcategory:** Animation systems

## What you see

The face or body smoothly blends between several pre-made shapes: the mouth opens and closes with speech, brows furrow, eyes close, cheeks puff, and several can be mixed at once (smiling while blinking).

## Not to be confused with

Not skeletal animation (bones rotating the mesh); morph targets move vertices directly, suited to detail bones handle poorly. Not swapping images (a different face drawing in 2D); this is a continuous blend. Not squash and stretch (overall scaling).

## Use it for

Facial expressions, lip sync, muscle bulges, character customisation, corrective shapes.

## Tunable parameters

target set · weight range · blend speed · combination rules (exclusive groups) · driven by audio / animation curves · corrective shapes

## Request prompt

In your game, add facial morph targets to the character: at least 5 — mouth open, smile, frown, left eye closed, right eye closed; while speaking, drive "mouth open" between 0 and 0.8 from the audio level (update every 80 ms, smooth over 40 ms); blink every 4 s by taking both eye weights 0→1→0 over 120 ms.

## Implementation hint

Each target stores per-vertex position (and normal) deltas from the base mesh; final = base + Σ weight_i × delta_i, evaluated in the vertex shader or a compute pass before skinning. Weights are animated by clips, curves or runtime drivers such as audio amplitude.

## Related

- [ANI-04](ANI-04.md) — Idle animation
- [ANI-01](ANI-01.md) — Smear frame
- [ANI-11](ANI-11.md) — Look-at / Head tracking

## References

- [Wikipedia — Morph target animation](https://en.wikipedia.org/wiki/Morph_target_animation)
- [Unity Manual — Blend shapes](https://docs.unity3d.com/Manual/BlendShapes.html)
- [Unreal Engine docs — Morph targets](https://dev.epicgames.com/documentation/en-us/unreal-engine/morph-targets-in-unreal-engine)
- [Khronos glTF tutorial — Simple morph target](https://github.com/KhronosGroup/glTF-Tutorials/blob/main/gltfTutorial/gltfTutorial_017_SimpleMorphTarget.md)
