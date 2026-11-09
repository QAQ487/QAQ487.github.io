# CAM-17 · Orthographic projection

**Group:** Camera & composition
**Subcategory:** Projection and Apparent Distance

## What you see

Equally sized objects retain the same screen size regardless of distance, without perspective foreshortening that makes distant objects smaller. (General computer-graphics terminology.)

## Not to be confused with

Orthographic does not mean top-down, nor does it mean every isometric style. It is a projection method, not a specified viewing angle. Orthographic framing typically changes visible width / size rather than perspective FOV.

## Use it for

2D, maps, scenes requiring clearly measurable proportions, and some oblique-view games.

## Tunable parameters

visible height/width · aspect handling · camera angle · near/far clip · pixel snapping · zoom limits

## Request prompt

In your game, use an orthographic view based on 320×180: show 180 world pixels vertically and extend width with the window aspect ratio. Align world pixels and the camera position to the physical pixel grid. Two 32 px-tall characters separated by 10 m in depth must remain the same height on screen.

## Implementation hint

Use an orthographic projection whose scale is defined by visible world height or width, not FOV. Recalculate the opposite dimension from aspect ratio, and for pixel art align the final camera transform to the world-units-per-pixel grid.

## Related

- [CAM-37](CAM-37.md) — Perspective shift (3D ↔ side-scroll / top-down)

## References

- [Epic Camera Component Types：Orthographic](https://dev.epicgames.com/documentation/fortnite/camera-types-in-unreal-editor-for-fortnite?lang=en-US)
