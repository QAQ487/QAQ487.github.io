# CAM-19 · Zoom／Lens zoom

**Group:** Camera & composition
**Subcategory:** Projection and Apparent Distance

## What you see

The observation position stays the same while the frame narrows or widens, as with binoculars or a scope. (General. Informally, game developers sometimes also use zoom for camera movement; this entry distinguishes them strictly.)

## Not to be confused with

Cinemachine’s Zoom Only changes FOV only. Adjusting orthographic size is also commonly called zoom in games, but does not change perspective focal length. A subject becoming larger alone may not distinguish zoom from dolly.

## Use it for

Selects how much the frame covers and adjusts subject size.

## Tunable parameters

wide/tele FOV · zoom duration · easing · zoom steps · sensitivity scaling · reticle overlay · projection mode

## Request prompt

In your game, add binocular zoom: while aim is held, keep the camera position fixed and narrow vertical FOV from 60° to 24° over 0.22 s, returning over 0.3 s on release. Reduce look sensitivity to 45%, add a circular mask, and keep the reticle centre on the same world point before and after zoom.

## Implementation hint

Change FOV for a perspective camera, or visible size for an orthographic camera, without moving its observation point. Scale look sensitivity with the zoom ratio and keep the same aim ray so entering zoom does not shift the target under the reticle.

## References

- [Unity Group Framing：Zoom Only／Dolly Only](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineGroupFraming.html)
