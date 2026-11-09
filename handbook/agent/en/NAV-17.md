# NAV-17 · Scan pulse / Sonar ping

**Aliases:** Scan pulse; Sonar ping; Recon pulse; Pulse scan; Area scan; Echo scan; Scanner sweep; 掃描脈衝; 聲納掃描; 偵察脈衝; スキャンパルス; ソナー探知

**Group:** Visual guidance & wayfinding
**Subcategory:** Interaction cues

## What you see

The player presses scan and a bright ripple leaves the character (or a companion drone or device), racing outward across floors and walls; a thin line of light marks the wavefront and the ground it has passed glows briefly before dimming. As the front sweeps over enemies, items, interactive devices or climbable ledges, each one lights up in turn with an outline or icon coloured by type (for example red enemies, gold items, yellow climbables); enemies behind walls show as silhouettes. Farther objects light up later, so the order of the reveals gives a sense of distance. The ripple vanishes at its maximum range, the marks stay for a few seconds and then fade, and scan goes on a short cooldown.

## Not to be confused with

Not detective vision (NAV-08, a persistent filter mode that stays on until switched off); a scan pulse is a one-shot wave whose marks fade on their own. Not the X-ray silhouette (MATX-10, occluded characters always drawn as silhouettes). Not a shockwave (VFX-06, an attack's expanding ring that reveals nothing) or a contextual ping (NAV-14, a point chosen by a player).

## Use it for

Finding hidden enemies and loot while exploring, revealing climbable routes, scouting before stealth, sci-fi scanners, magical sensing, sonar or echolocation.

## Tunable parameters

wave speed & max radius · ring width & colour · ground glow behind the front · per-type highlight colour & icon (enemy / item / climbable) · reveal delay = distance ÷ wave speed · show through walls per type · mark hold time & fade · cooldown · optional ping sound per reveal (authoring defaults)

## Request prompt

Add a scan pulse. On the scan button, emit a spherical wavefront from the character that reaches its maximum radius in about a second; reconstruct world positions from scene depth and draw a thin glowing ring on pixels whose distance matches the front, briefly brightening the ground inside it. Each revealable object lights up only when the front reaches its distance: enemies get a red outline (a silhouette when occluded), items a gold icon, climbable ledges yellow. Keep the marks for a few seconds, then fade them, and put scan on a short cooldown. Accept: objects at different distances light up in order of distance, an enemy behind a wall shows as a silhouette when the front passes it, and every mark is gone after the hold time.

## Implementation hint

Store the pulse origin and start time. In a full-screen pass, reconstruct each pixel's world position from depth, take d = distance to the origin and r = speed × age, draw a ring where |d − r| is under the ring width and a fading tint where d < r. On the CPU, gather revealable objects inside the maximum radius and schedule each reveal at distance ÷ speed; on reveal, enable an outline (occluded parts drawn as a silhouette with a depth-test-greater pass, as in MATX-10) or a screen-space icon, hold it, then fade it. Run one pulse at a time and gate it with a cooldown.

## Related

- [NAV-08](NAV-08.md) — Detective-vision trail (investigation highlight mode)
- [MATX-10](MATX-10.md) — X-ray silhouette
- [VFX-06](VFX-06.md) — Shockwave
- [NAV-14](NAV-14.md) — Contextual ping (multiplayer)
- [NAV-01](NAV-01.md) — Interactable highlight
- [NAV-02](NAV-02.md) — Yellow paint

## References

- [Wikipedia — Death Stranding (odradek scan reveals invisible BTs)](https://en.wikipedia.org/wiki/Death_Stranding)
- [The Division Wiki (Fextralife) — Pulse (recon pulse marks hostiles through walls and cover)](https://thedivision.wiki.fextralife.com/Pulse)
- [Wikipedia — Horizon Zero Dawn](https://en.wikipedia.org/wiki/Horizon_Zero_Dawn)
- [Game8 — Stellar Blade: How to Scan (reveals enemies, crates and interactables; short cooldown)](https://game8.co/games/Stellar-Blade/archives/451525)
