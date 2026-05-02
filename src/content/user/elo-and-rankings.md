# ELO & rankings

PvPIndex uses a single, transparent **ELO** formula across every game mode. There is no secret sauce: the math is the same one used by chess, with one extra knob - the trust score of the server you played on.

## Where you start

A brand new player profile is seeded at **1200** in every game mode. Your first battle moves you up or down from there.

## How a battle changes your ELO

After every battle the formula is, per participant:

```
expected = 1 / (1 + 10^((opponent_elo - your_elo) / 400))
delta    = K * trust_factor * (actual - expected)
new_elo  = old_elo + delta
```

- `K = 32` - the standard chess K-factor. Wins against much higher-rated players give large gains; wins against much lower-rated players give small gains.
- `actual` is `1.0` for a win, `0.5` for a draw, `0.0` for a loss.
- `trust_factor` is `server.trust_score / 100`, so a fully-trusted server applies the full delta, a half-trusted one applies half, and an **unverified** server applies **zero** ELO change.

## Why unverified servers don't change ELO

PvPIndex needs to be confident the battle actually happened the way the server reported it. Verification means the team has reviewed the server, its operator, and its anti-cheat. Until that's done, battles still appear on the leaderboard timeline but don't move your rating.

## Where to see the math live

- Your profile's **ELO timeline** chart shows every confirmed battle as a vertical step.
- Hover any battle in your **history** table to see `elo_before → elo_after` for both participants.
- The full open-source implementation is in `apps/battle-validator/src/Elo/EloRatingService.php` (MIT). Three lines of math, no hidden multipliers.

## Per-game-mode ELO

ELO is tracked **per game mode**, not globally. You can be Diamond in Crystal PvP and Silver in Vanilla - they're independent rankings.

The "global" leaderboard at [pvpindex.com/leaderboards](https://pvpindex.com/leaderboards) takes a weighted average across modes, weighted by the number of battles you've played in each.

## Ranks (Bronze, Silver, Gold, …)

Each game mode has named ELO **bands** managed by the admin team. They're mostly cosmetic - they give you something more memorable than a number. Typical layout:

| Rank | ELO range |
| --- | --- |
| Bronze | < 1200 |
| Silver | 1200 – 1399 |
| Gold | 1400 – 1599 |
| Platinum | 1600 – 1799 |
| Diamond | 1800 – 1999 |
| Master | 2000 – 2199 |
| Grandmaster | 2200+ |

Exact ranges differ per game mode. See the game mode detail page on the website.

## Inactivity

Currently ELO does **not** decay with inactivity. Take a month off - your rating will be exactly where you left it. This may change; if it does, the rule will be announced and there will be a soft-launch period.

A **provisional rating** period for new accounts is planned but not yet active. When it launches, new players' first battles will use a higher K-factor so their rating converges to its true level faster. This page will be updated when it ships.
