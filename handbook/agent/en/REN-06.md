# REN-06 · Fresnel effect/Fresnel reflectance

**Group:** Stylized rendering (NPR)
**Subcategory:** Overall Style and Outlines

## What you see

water or glass generally reflects more noticeably when viewed at a very shallow angle than head-on.

## Not to be confused with

physical Fresnel and an artistic node are not fully equivalent. This Unity node provides a view-angle-based approximation mask; adding it to emission is a stylized use, not proof that the object reflects according to the full Fresnel equations.

## Use it for

plausible angle-dependent reflection; an angle mask can also create a stylized rim.

## Tunable parameters

F0 · grazing strength · exponent · roughness · tint · view-angle bias

## Request prompt

In your game, add Fresnel reflectance to water: use 0.02 reflectance head-on, rise gradually toward 1.0 at grazing angles, and set roughness to 0.08 for a clear distant reflection.

## Implementation hint

Evaluate angle-dependent reflectance from the view-normal relationship, using a physically plausible approximation for reflective materials. Keep any stylized emissive use as a separate, clearly labeled artistic layer.

## References

- [Unity — Fresnel Effect Node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Fresnel-Effect-Node.html)
- [LearnOpenGL — PBR Theory](https://learnopengl.com/PBR/Theory)
