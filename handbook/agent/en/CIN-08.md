# CIN-08 · Barks

**Aliases:** Bark lines; Ambient dialogue; Callouts; One-liners

**Group:** Cinematics & narrative
**Subcategory:** Characters & dialogue

## What you see

Short lines characters shout automatically during play, triggered by state or events (spotting an enemy, getting hurt, reloading, idle chatter); they do not pause the game or need a reply, and usually appear as a brief subtitle or small text above the head that fades after a few seconds.

## Not to be confused with

Not conversation (CIN-05/06 need the player to read or press to advance); barks are real-time, system-triggered and interruptible. Not an emote balloon (CIN-07, symbol only).

## Use it for

Making the world feel alive, making AI look smarter, telegraphing enemy state ("Over there!"), companion callouts.

## Tunable parameters

events → line pools · repeat window · global & per-speaker cooldown · max concurrent · priority · subtitle duration

## Request prompt

In your game, add a bark system: each event (player spotted, hurt, lost target, idle 20 s) has 3–5 short lines chosen at random with no repeat of the same line within 30 s; at most 2 barks at once and a 4 s per-character cooldown; show them as small subtitles 12 px above the speaker that fade after 1.8 s, without pausing the game.

## Implementation hint

Event bus → bark manager that queries a rule table (event, speaker, world-state conditions) and picks a line; priority and cooldown arbitration; output as voice + world-anchored subtitle.

## Related

- [CIN-07](CIN-07.md) — Emote balloon
- [CIN-06](CIN-06.md) — Speech bubble
- [CIN-05](CIN-05.md) — Dialogue portrait

## References

- [Game Developer — Adding life to worlds with dialogue barks](https://www.gamedeveloper.com/design/adding-life-to-worlds-with-dialogue-barks)
- [Game Architecture blog — notes on GDC 2009 "Talking to the player with barks"](https://www.gamearch.com/2009/03/)
