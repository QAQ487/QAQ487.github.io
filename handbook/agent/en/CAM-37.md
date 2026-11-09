# CAM-37 · Perspective shift (3D ↔ side-scroll / top-down)

**Aliases:** Perspective shift; Dimension shift; 2.5D section; Side-scrolling section; Top-down section; Camera mode switch with input remap; 視角維度轉換; 3D 轉橫向捲軸; 2D 段落; 視点切り替え; 2D 区間

**Group:** Camera & composition
**Subcategory:** Feedback and Transitions

## What you see

The character walks into a zone in third-person view and, over about a second, the camera swings smoothly round to a pure side view (or straight overhead) and pulls back, turning the screen into a side-scroller (or top-down). From then on left/right input maps straight to screen left/right and the character is held on a rail plane with no movement in depth; leaving the zone swings the camera back behind the character and input returns to camera-relative 3D movement. The character's heading stays continuous through the swing instead of jerking with the camera.

## Not to be confused with

Not an ordinary camera blend (CAM-32, a transition between two cameras where the gameplay dimension stays the same). Not orthographic projection (CAM-17, just the projection). This card switches the gameplay dimension: camera, input axes and movement constraint change together.

## Use it for

Side-scrolling sections inside 3D action games, top-down shooting sections, areas that pay homage to 2D eras, puzzles that need another viewing angle.

## Tunable parameters

transition 0.8–1.2 s & easing · target view (side / top-down) · distance & FOV (or ortho) · input remap (camera-relative ↔ screen axis) · rail-plane constraint & soft snap · held-input direction lock · enter / exit volumes (authoring defaults)

## Request prompt

Add a perspective shift. When the player enters a shift zone, swing the camera from behind the character to a pure side view over 0.8–1.2 s, pulling back and narrowing the FOV (or switching to orthographic). Once done, map left/right input directly to screen left/right, lock the character onto the zone's rail plane and remove movement in depth. Keep the movement direction held at entry until the stick is released, then switch to the new mapping. Swing back to third person the same way on exit. Accept: holding one direction through the zone never makes the character turn suddenly or walk back.

## Implementation hint

Trigger volumes switch camera mode. Blend position, rotation and FOV (or projection) from the follow camera to a fixed side or top camera over the transition. Swap the input mapping from camera-relative 3D movement to screen-axis movement projected onto the rail plane, and constrain the character to that plane with a gentle snap. Cache the movement direction at entry and keep using it until the stick is released or reversed, so the camera rotation does not twist the player's path.

## Related

- [CAM-32](CAM-32.md) — Camera blend／Interpolated camera transition
- [CAM-17](CAM-17.md) — Orthographic projection
- [CAM-10](CAM-10.md) — Orbit camera／Orbital follow
- [CAM-07](CAM-07.md) — Region-based-anchors
- [CAM-01](CAM-01.md) — Position-locking／Locked follow

## References

- [Wikipedia — Nier: Automata](https://en.wikipedia.org/wiki/Nier:_Automata)
- [Wikipedia — Super Mario Odyssey](https://en.wikipedia.org/wiki/Super_Mario_Odyssey)
