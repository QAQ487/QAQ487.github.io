# REN-05 · Rim lighting/Rim light

**Group:** Stylized rendering (NPR)
**Subcategory:** Overall Style and Outlines

## What you see

bright color appears along shoulders, hair, or the sides of a sphere, usually within the object's surface boundary.

## Not to be confused with

real backlighting can produce a rim; games also commonly generate one artificially from the angle between the view and surface normal. The latter need not respect light direction or occlusion. It is a bright band, not an outline tracing the geometry, and need not involve bloom.

## Use it for

separating characters from backgrounds, cartoon highlights, shields, and energy looks.

## Tunable parameters

rim color · rim power · rim width · light alignment · intensity · occlusion

## Request prompt

In your game, add rim lighting: give the hero a cyan rim covering about 6% inside the silhouette at intensity 1.8, increasing to 3.0 only when the key light is behind the character.

## Implementation hint

Build a surface-edge mask from the view and normal angle, then optionally constrain it by light direction and occlusion. Apply the result inside the silhouette as a controlled lighting or emissive contribution.

## References

- [Unity Shader Graph — Fresnel Effect Node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Fresnel-Effect-Node.html)
