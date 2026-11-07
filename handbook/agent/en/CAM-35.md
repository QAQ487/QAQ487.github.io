# CAM-35 · See-through occluder / Dithered fade

**Aliases:** X-ray occluder; Cutout silhouette; Wall fade; Occlusion dither; 遮擋漸隱; 壁抜けディザ

**Group:** Camera & composition
**Subcategory:** 3D Following and Readability

## What you see

A wall between camera and character fades to a screen-door / dither pattern, or a hole opens around the character — without dollying the camera.

## Not to be confused with

Not camera collision / deocclusion moves (CAM-14 / CAM-15). This keeps the camera and changes the wall. Not a permanent X-ray material state (MATX-10).

## Use it for

Isometric action RPGs, third-person indoors, anytime the character must stay readable.

## Tunable parameters

fade-in ~0.15 s · target opacity ~0.3 · restore ~0.3 s · dither vs cutout · ray thickness (authoring defaults)

## Request prompt

When an object intersects the camera→character ray, dither-fade it to ~30% opacity over ~0.15 s, or cut a circular silhouette around the character; restore over ~0.3 s once clear.

## Implementation hint

Each frame gather occluders along camera-to-focus. Blend a per-renderer opacity or clip threshold; prefer ordered dither / alpha-to-coverage so sorting stays stable. Cutout variant: clip in screen space with a soft circle around the focus projection. Never move the camera for this effect.

## Related

- [CAM-15](CAM-15.md) — Occlusion avoidance／Deocclusion
- [CAM-14](CAM-14.md) — Camera collision／Collision resolution
- [MATX-06](MATX-06.md) — Dithered transparency
- [MATX-10](MATX-10.md) — X-ray silhouette

## References

- [Wikipedia — Ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering)
