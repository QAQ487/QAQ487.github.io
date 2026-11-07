# REN-25 · Cast shadows/Soft shadows/Penumbra

**Aliases:** Lightmapping; Baked lighting; Cascaded shadow maps; CSM; 烘焙光照; 級聯陰影; 窗光柔影

**Group:** Lighting & shadows
**Subcategory:** Lighting, Occlusion, Reflections, and Atmosphere

## What you see

an object blocks light and casts a shadow on another surface; a soft shadow does not transition instantly from lit to black.

## Not to be confused with

shadows are the effect; shadow mapping, PCF, and ray-traced shadows are methods. Soft shadows are not simply uniformly blurred shadows: physical penumbrae depend on light size and occluder distance. Poor bias or precision can produce acne (surface stripes/spots) or peter-panning (detached shadows), not necessarily broken AO.

## Use it for

conveying space, contact positions, and light direction and apparent size. With a fixed light, window light can leave a soft shadow on walls and floors: crisper nearby, coarser far away, without a second shadow at the join. Precomputing that lighting into a texture is only a method; moving objects still need a live shadow. (Former entries LGT-06, “Baked lighting”, and LGT-08, “Cascaded shadow maps”, are merged here.)

## Tunable parameters

light size · shadow resolution · filter radius · depth bias · normal bias · cascade distance

## Request prompt

In your game, add soft cast shadows from a 0.5 m area light: target about 2 cm penumbra at the character's feet and 20 cm for an object 3 meters above the ground, tuning bias to avoid both acne and detached shadows.

## Implementation hint

Project occluders into a shadow representation and filter visibility in a way that reflects the apparent light size. Tune bias by world scale, preserve contact, and allocate resolution according to camera importance.

## References

- [LearnOpenGL — Shadow Mapping](https://learnopengl.com/Advanced-Lighting/Shadows/Shadow-Mapping)
