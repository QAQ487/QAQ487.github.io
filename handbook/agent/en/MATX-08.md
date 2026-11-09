# MATX-08 · Force field / Shield

**Aliases:** Energy shield; Bubble shield; Intersection highlight; Depth-fade edge; Shield impact ripple; Shield burn-through; Light burn shield; Shield pop; 聚光燒穿護盾; 光で剥がすシールド; Shield hit vs flesh hit; Shielded hit feedback; Shield break feedback; 護盾命中回饋; 破盾手感; シールド被弾の手応え

**Group:** Materials & surfaces
**Subcategory:** Special materials

## What you see

A nearly transparent energy sphere or dome surrounds a character or base: invisible face-on, bright at the silhouette edges (Fresnel); wherever it intersects the ground, a wall or anything passing through it, a glowing intersection line appears; the surface often carries a hex grid or flowing pattern, and a hit sends a ripple ring outward from the impact point. Beam burn-through: some enemies wear a dark or energy shell that ignores normal attacks; holding a focused light or energy beam on it thins the shell around the lit spot, which glows and peels outward with sparks at the edge while a shrinking progress ring shows on the enemy; when it is fully burned through, the shell pops and vanishes, the enemy reels and its body is exposed, and only then do normal attacks work. Shielded hit vs exposed hit: while the shield holds, each hit gives only a thin, sharp ping with small blue-white sparks, a very short hit pause and almost no flinch; the moment the shield breaks there is a clear shatter and flash and the enemy briefly reels; from then on hits land with a low, heavy thud, a bigger spray, a longer hit pause and an obvious recoil. Without reading any numbers, the player can hear whether the shield is still up.

## Not to be confused with

Not an aura (VFX-14, a soft glow hugging the character with no solid boundary) or a shockwave (VFX-06, a one-off expanding ring); a force field has a clear shape and intersection lines. Not screen distortion (PP-09, just one optional ingredient) or a hologram (MATX-07, where the object itself turns to light). Burn-through is a shell peeled away by sustained exposure, not the ripple of a single hit. Shielded vs exposed feedback is the contrast between the same attack in two states, not the look of the shield itself; hit reactions are ANI-05 and hitstop is ACT-21.

## Use it for

Energy shields and invulnerability, base shields, map boundaries and no-go zones, portal membranes, a boss’s shielded phase, enemies whose shield must be burned off with a light or energy beam before they can be hurt, any shielded enemy or character where the player should hear shield first, then body.

## Tunable parameters

tint · Fresnel power · intersection width (depth fade distance) · pattern (hex / noise) & scroll speed · hit ripple speed/width/lifetime · distortion amount · beam burn-through: dissolve radius from the beam hit point, glowing burn edge, progress ring, pop (shatter) VFX & sound, regrow time when the beam leaves · shielded vs exposed hit: sound set (thin ping vs heavy thud), spark size & colour, hitstop length, hit-reaction strength, break flash & stagger

## Request prompt

Add a 2 m-radius sphere shield to the game: colour #5cc8ff, additive, opacity = 0.08 + Fresnel (power 3) × 0.8; use the depth buffer to get the distance to the scene behind and brighten where it is under 0.3 m into an intersection line (intensity 1.5); overlay a slowly flowing 0.25 m hex grid; on hit, emit a ripple ring from the impact point growing 0→2.5 m over 0.5 s that lights up the hex cells it passes. Optional beam burn-through: while a focused beam hits a shielded enemy, dissolve the shield outward from the hit point with a bright burn edge and sparks and show a shrinking progress ring; after 1–2 s of accumulated exposure shatter the shield with a pop sound, stagger the enemy for 0.5–1 s and only then accept normal damage; when the beam leaves, let the shield regrow over 1–2 s. Optional shielded vs exposed feedback: while the shield is up, hits use a high, short metallic sound and small blue-white sparks with the shortest hitstop and only a slight wobble; when it breaks, play a shatter sound and flash and briefly stagger the enemy; after that, hits use a low, heavy impact sound, a larger spray, longer hitstop and a clear hit reaction. Accept: by sound alone you can tell whether the shield has broken.

## Implementation hint

Transparent pass after opaques, ZWrite off, both faces drawn. edge = 1 - saturate((sceneDepthLinear - pixelDepthLinear)/width) — needs the depth texture. a = base + fresnel + edge*k + ripple, ripple = smoothstep band of (distance(worldPos, hitPos) - t*speed). Hit positions are passed as a small array of (pos, startTime). Optional screen-space distortion (PP-09) behind it. Burn-through: accumulate exposure while a focused beam ray hits the shield; drive a dissolve mask centred on the hit point with a bright edge band, show a shrinking progress ring, and at full exposure play a shatter effect, disable the shield and open the vulnerable state; decay exposure when the beam leaves so the dissolve heals. Shielded vs exposed feedback: route every hit through the target’s current layer (shield up or broken) and pick the impact sound set, spark effect, hitstop and reaction from that layer’s table; play the break effect once on the transition.

## Related

- [VFX-14](VFX-14.md) — Aura
- [VFX-06](VFX-06.md) — Shockwave
- [PP-09](PP-09.md) — Screen-space distortion
- [MATX-07](MATX-07.md) — Hologram shader
- [REN-06](REN-06.md) — Fresnel effect/Fresnel reflectance
- [VFX-11](VFX-11.md) — Beam
- [ACT-41](ACT-41.md) — Stance break / Poise break
- [ANI-05](ANI-05.md) — Hit reaction
- [ACT-21](ACT-21.md) — Hitstop / Hit Pause / Hitfreeze

## References

- [Cyanilux — Forcefield shader breakdown](https://www.cyanilux.com/tutorials/forcefield-shader-breakdown/)
- [Unity Shader Graph — Scene Depth node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Scene-Depth-Node.html)
- [Unity Shader Graph — Fresnel Effect node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/Fresnel-Effect-Node.html)
- [Wikipedia — Alan Wake](https://en.wikipedia.org/wiki/Alan_Wake)
- [Wikipedia — Alan Wake 2](https://en.wikipedia.org/wiki/Alan_Wake_2)
- [Wikipedia — Halo: Combat Evolved (recharging energy shields on the player and on Elites)](https://en.wikipedia.org/wiki/Halo:_Combat_Evolved)
- [Stellar Blade Wiki (Fextralife) — Combat (blue glow → Blink, purple glow → Repulse; enemy Shield; Balance and Groggy)](https://stellarblade.wiki.fextralife.com/Combat)
