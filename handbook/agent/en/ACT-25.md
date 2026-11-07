# ACT-25 · Cancel Window / Action Window

**Aliases:** Frame advantage; Plus on hit; Minus on block; 幀有利; 幀不利

**Group:** Combat feedback & game feel
**Subcategory:** Combat Timing, Hit Reactions, and Protection

## What you see

The same dodge input does nothing early in an attack, but can transition out once a particular point in its later portion is reached.

## Not to be confused with

An input-buffer window determines when a button press can be remembered; a cancel window determines when the transition can actually happen. They may overlap, but are not the same timing interval.

## Use it for

Balance immediate response against attack risk. Conditions can differ by destination action, whether the attack hit, and other factors. Who may act again first after contact is a timing difference in matchup data, not a separate animation. Read it together with this cancel window; the sign alone does not decide the next move. (Former entry ACT-26, “Frame advantage”, is merged here.)

## Tunable parameters

window start · window end · destination filter · hit requirement · input buffer

## Request prompt

Set the attack's dodge-cancel window to 360–480 ms and buffer dodge inputs up to 90 ms early; before the window, remember the press without transitioning, then discard it on timeout.

## Implementation hint

Open and close cancel permission at explicit points in the source action, with conditions per destination and contact result. Store early input in a separate bounded buffer, then execute it only once the cancel window opens.

## References

- [Eric Williams — Combat Canceled，Buffer／Instant 及 On／Off 範例](https://www.gamedeveloper.com/game-platforms/combat-canceled-i-god-of-war-i-action-game-design)
