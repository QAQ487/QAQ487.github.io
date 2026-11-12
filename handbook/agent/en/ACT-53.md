# ACT-53 · Possession / Capture

**Aliases:** Possession; Capture; Possess enemy; Body takeover; Object possession; Wrap-around possession; Mouthful mode; 附身操控; 附身敵人; 附身物件; 包覆物件; 憑依; 乗り移り; キャプチャー; ほおばり

**Group:** Animation, movement & physics
**Subcategory:** Traversal abilities

## What you see

The character throws its hat, a spirit or an orb at an enemy or an object; the moment it hits, the character is sucked into the target and a possession mark appears on it (the character's hat sitting on its head, the character's eyebrows, a halo), with its eyes changed to the character's. From then on the player drives the target directly: walking the way it walks and attacking with its moves, so something that flies can fly and something that breathes fire can breathe fire, and the on-screen button prompts change to the target's. On the cancel button or a heavy hit, the character pops back out in its own form and the target returns to normal or is dazed for a moment. Variant — wrap-around possession: the character opens its mouth around an object far bigger than itself (a car, a vending machine, a pipe), its body stretches into the object's shape with the character's colours and face still showing, and it moves or uses abilities the way that object would.

## Not to be confused with

Not a copy ability (FB-35, where the character keeps its own body and only gains the other's moves plus an outfit). Not telekinesis (FB-33, where the object is held in front while the player still controls the character). Not inhale and spit (FB-34, where the target is only ammunition). Not boarding a vehicle (the character sits on it and keeps its own look).

## Use it for

Turning every enemy type into a playable move set, puzzles built on enemy traits, possessing guards in stealth, turning objects in the level into tools.

## Tunable parameters

possessable tag per target · thrown carrier (hat / spirit / orb) & hit test · enter animation & possession mark (hat, eyes, halo) · input & camera handover to the target's own moves · prompt swap · exit triggers (button, heavy hit, hazard) & exit placement · wrap-around variant: body stretched over the object, character colours and face kept (authoring defaults)

## Request prompt

Add possession. When the thrown carrier (hat, spirit or orb) hits a possessable target, play a suck-in animation, put a possession mark on the target, then hand the player's input to the target using its own movement and moves, and swap the on-screen prompts to the target's. On the cancel button, or when the target takes enough damage, play a pop-out, restore the character beside the target and return the target to its normal state. Hitting a target that cannot be possessed gives only a normal hit effect. Accept: before and after possession the player can always tell what they are controlling, and the character never pops out inside a wall.

## Implementation hint

Give every possessable actor a controller interface the player input can drive. On a valid hit, park the player character (hidden and attached to the target), switch the input and camera targets, attach the possession mark and load the prompt set from the target's move data. While possessed, the target runs its own movement and ability code. On exit, detach, find a clear spot beside the target with a capsule test, show the character with a pop and hand the target back to its AI with a short stun. For the wrap-around variant, use a dedicated mesh or a morph that stretches the character's body over the object's silhouette while keeping the face texture.

## Related

- [FB-35](FB-35.md) — Copy ability
- [FB-33](FB-33.md) — Telekinetic grab & throw
- [FB-34](FB-34.md) — Inhale & spit
- [ACT-54](ACT-54.md) — Thrown-object springboard / Cap jump

## References

- [Wikipedia — Super Mario Odyssey (Cappy captures enemies and objects; the cap works as a temporary platform)](https://en.wikipedia.org/wiki/Super_Mario_Odyssey)
- [Wikipedia — Messiah (video game) (possessing other characters)](https://en.wikipedia.org/wiki/Messiah_(video_game))
- [Wikipedia — Geist (video game) (ghost possesses objects and creatures)](https://en.wikipedia.org/wiki/Geist_(video_game))
- [Wikipedia — Ghost Trick: Phantom Detective (possessing and manipulating objects)](https://en.wikipedia.org/wiki/Ghost_Trick:_Phantom_Detective)
- [WiKirby — Mouthful Mode (Kirby wraps around an object and takes its shape)](https://wikirby.com/wiki/Mouthful_Mode)
