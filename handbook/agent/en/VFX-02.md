# VFX-02 · GPU particles

**Aliases:** Compute-shader particles; GPU particle simulation; Massive particles

**Group:** VFX & particles
**Subcategory:** Carriers & techniques

## What you see

Tens of thousands of particles (sparks, fireflies, magic dust) swirl and get pushed around by force fields on screen at once without the frame rate dropping. Motion often reads like a fluid or a swarm.

## Not to be confused with

Not ordinary CPU particles (each updated on the CPU; tops out at hundreds to a few thousand). GPU particles run the simulation in a compute shader; visually the difference is mostly the order of magnitude and the coherent flow.

## Use it for

Scenes that need huge counts: magic vortices, swarms of fireflies, blizzards, big bursts, or ambient particles across a whole map.

## Tunable parameters

max count · emit rate · force fields (curl noise, attractors) · lifetime · sort (none / bitonic) · collision (depth buffer)

## Request prompt

Add a GPU particle system to your engine: keep particle state in a RWStructuredBuffer, update position/velocity/age each frame in a compute shader (with a curl-noise force field), recycle dead particles through an append/consume index buffer, and draw them as billboards with DrawInstancedIndirect. Target 100,000 particles at 60 fps and show a debug counter of live particles.

## Implementation hint

HLSL-style example (GLSL: SSBOs): StructuredBuffer<Particle> with UAV; dead-list as AppendStructuredBuffer; emit CS + update CS (Dispatch(ceil(N/256))); CopyStructureCount into an indirect-args buffer then DrawInstancedIndirect with a VS that reads the buffer by SV_InstanceID and expands a quad. Additive particles need no sorting; alpha particles need a bitonic sort pass.

## Related

- [ENV-11](ENV-11.md) — Ambient particles
- [VFX-03](VFX-03.md) — Flowmap
- [FX-01](FX-01.md) — Sprite / Billboard Particles
- [VFX-20](VFX-20.md) — Flipbook frame blending / motion-vector flipbook

## References

- [Microsoft Learn — Direct3D 11 compute shader](https://learn.microsoft.com/en-us/windows/win32/direct3d11/direct3d-11-advanced-stages-compute-shader)
- [Microsoft Learn — Introduction to buffers in Direct3D 11](https://learn.microsoft.com/en-us/windows/win32/direct3d11/overviews-direct3d-11-resources-buffers-intro)
- [Godot docs — GPUParticles2D class](https://docs.godotengine.org/en/stable/classes/class_gpuparticles2d.html)
- [Unity — Visual Effect Graph manual (GPU particles)](https://docs.unity3d.com/Packages/com.unity.visualeffectgraph@17.0/manual/index.html)
- [Bridson et al. — Curl-noise for procedural fluid flow (SIGGRAPH 2007, PDF)](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf)
