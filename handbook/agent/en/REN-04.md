# REN-04 · Outline/Contour/Inverted-hull outline

**Group:** Stylized rendering (NPR)
**Subcategory:** Overall Style and Outlines

## What you see

black or colored lines surround characters or objects; they can also mark selected targets.

## Not to be confused with

outline is the effect; inverted hull is one method that expands a shell and renders its back faces to form the contour. Screen-space methods can instead use depth, normals, or object masks, and do not all detect the same internal creases. Shell methods depend on mesh normals, seams, scale, and distance; screen-space methods depend on pixels and available inputs. This is not rim lighting.

## Use it for

comic-style contours, interaction cues, and clearer foreground/background separation.

## Tunable parameters

line width · line color · depth threshold · normal threshold · distance scaling · object mask

## Request prompt

In your game, add object outlines: use a 2 px dark-blue contour for the player and a 4 px yellow contour for interactable targets, keeping the screen-space width stable from 5 to 30 meters.

## Implementation hint

Generate contours from an expanded shell or from depth, normal, and object-ID discontinuities. Stabilize width in screen space and exclude small interior edges that would clutter the image.

## Related

- [NPR-16](NPR-16.md) — Ukiyo-e / woodblock print
- [NPR-24](NPR-24.md) — Cavity and ridge shading

## References

- [Unity Toon Shader — Outline Settings（含開關及粗幼比較）](https://docs.unity3d.com/Packages/com.unity.toonshader@0.11/manual/Outline.html)
