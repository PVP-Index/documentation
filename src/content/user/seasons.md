# Seasons

A **season** is a fixed window of time - typically about three months - during which battles count toward a season-specific leaderboard. At the end of the season, final standings are snapshotted, ELO is partially reset, and a new season begins.

## What a season is for

- A clean, comparable record of how each player did over a defined period.
- A reason for top players to keep fighting - a long-running ladder eventually goes stale; a season resets the field.
- A place to award seasonal achievements ("Top 10 Crystal PvP, Season 4").

## Active season

Exactly **one** season is active at any time (`is_active = true`). The website always shows the current season banner at the top of the leaderboard.

To browse a past season, use the **Season picker** on any leaderboard or season page. URL pattern:

```
pvpindex.com/seasons/<slug>
pvpindex.com/seasons/<slug>/leaderboard
```

## What happens at season end

When an admin runs `php artisan seasons:archive`, the API:

1. Snapshots every player's current `(player, game_mode, elo, rank, wins, losses)` into `season_player_rankings`. This is the **immutable final standing** for the season.
2. Marks the season `is_active = false`.
3. Applies an **ELO soft reset** so the next season starts fresher but still rewards established skill:

```
new_elo = old_elo * 0.75 + 1000 * 0.25
```

Examples:

| Old ELO | New ELO |
| --- | --- |
| 800 | 850 |
| 1200 | 1150 |
| 1600 | 1450 |
| 2000 | 1750 |
| 2400 | 2050 |

So if you ended a season at 1900, you start the next at ~1675 - still well ahead of a brand-new account at 1200, but not so far that nobody else has a chance.

## Your season standings

On your profile under **Season standings** you can see your final rank and ELO from each past season you participated in. The data comes straight from the snapshot, so it does not change retroactively even if your account is unlinked or renamed.

## Skipping a season

If you skip a season entirely, your ELO from the previous season is still soft-reset when that season ends - there is no "freeze" mechanic. Your ELO going into the next season you play is whatever the chain of soft-resets has produced.

Seasonal cosmetic rewards for top finishers are planned. Details will be published here when the feature launches.
