# CAM-29 · Rack focus／Focus pull

**Group:** Camera & composition
**Subcategory:** Composition and Cinematics

## What you see

The camera can remain completely still: a nearby character goes from sharp to blurred while a distant character becomes sharp, transferring attention. (General filmmaking terminology. The source describes changing Focus Distance and Smooth Focus Changes; it does not name that feature Rack focus.)

## Not to be confused with

This is neither turning toward another person nor zooming; the distance in focus changes. If the whole scene is equally sharp, the focus pull may not be visible.

## Use it for

Signals the growing importance of a background person or object without cutting.

## Tunable parameters

start/end focus distance · pull duration · easing · hold time · aperture/blur strength · focus target tracking

## Request prompt

In your game, add a rack focus with the camera completely still: begin focused on the foreground character at 2.2 m, then when the door at 11 m opens, pull focus to 11 m over 0.8 s with ease-in-out and hold for 1.2 s. The character should blur as the door sharpens; do not change FOV or camera transform.

## Implementation hint

Animate only the focus distance between measured subject depths while keeping camera transform and FOV unchanged. Feed the animated value into the depth-of-field calculation, and use stable target anchors to avoid focus jitter from deforming meshes.

## References

- [Epic Cinematic DOF：Focus Distance 與 Smooth Focus Changes](https://dev.epicgames.com/documentation/unreal-engine/cinematic-depth-of-field-in-unreal-engine?lang=en-US)
