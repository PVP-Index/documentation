# PlaceholderAPI

The PvPIndex plugin provides a [PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI) expansion when PlaceholderAPI is installed alongside the plugin. All placeholders use the `pvpindex_` namespace.

PlaceholderAPI is an **optional** soft-dependency - the plugin loads and works normally without it.

## Installation

1. Install PlaceholderAPI on your Paper server.
2. Start the server with PvPIndex installed - the expansion registers itself automatically. No `/papi ecloud` download is required.

## Live state

These update in real time as battles progress.

| Placeholder | Returns |
| --- | --- |
| `%pvpindex_in_battle%` | `true` if the player is in an active battle, otherwise `false` |
| `%pvpindex_queued%` | `true` if the player is in the matchmaking queue |
| `%pvpindex_queued_mode%` | The mode ID they queued for (e.g. `sword`), or `none` |
| `%pvpindex_battle_type%` | Their current battle type (`DUEL`, `TEAM_BATTLE`, etc.), or empty if not in battle |
| `%pvpindex_battle_id%` | Full UUID of the active battle, or empty if not in battle |
| `%pvpindex_short_battle_id%` | First segment of the active battle UUID, or empty if not in battle |
| `%pvpindex_battle_short_id%` | Current game mode plus the first segment of the active battle UUID (e.g. `mace-550e8400`), or empty if not in battle |

## ELO & rank (cached)

ELO data is fetched from the API and cached per player. The cache refreshes every **5 minutes** while the player is online.

### Overall

| Placeholder | Returns |
| --- | --- |
| `%pvpindex_elo%` | Overall ELO score |
| `%pvpindex_rank%` | Overall rank position, e.g. `#42` |
| `%pvpindex_elo_change%` | Signed ELO delta from the last battle, e.g. `+18` or `-12` |

### Per game mode

Replace `<mode>` with the lowercase mode ID (e.g. `sword`, `crystal`, `pot`):

| Placeholder | Returns |
| --- | --- |
| `%pvpindex_elo_<mode>%` | ELO for the given mode, e.g. `%pvpindex_elo_sword%` |
| `%pvpindex_rank_<mode>%` | Rank in that mode, e.g. `%pvpindex_rank_pot%` |

## Win/loss counters

These counters are tracked in memory since the plugin loaded. They are reset when the plugin reloads or the server restarts.

| Placeholder | Returns |
| --- | --- |
| `%pvpindex_wins%` | Total wins |
| `%pvpindex_losses%` | Total losses |
| `%pvpindex_draws%` | Total draws |
| `%pvpindex_kd%` | Kill/death ratio (2 decimal places). Returns wins as a string if losses are 0. |

## Economy rewards (Vault)

These require [Vault](https://www.spigotmc.org/resources/vault.34315/) and a compatible economy provider. They are empty (`0.00` / `0`) when economy rewards are disabled.

| Placeholder | Returns |
| --- | --- |
| `%pvpindex_reward_last%` | The last reward amount received, e.g. `500.00` |
| `%pvpindex_streak%` | Current win streak count |

## Example scoreboard (CMI / TAB)

```yaml
# Example TAB plugin header using PvPIndex placeholders
header: |-
  &6&lPvPIndex
  ELO: &e%pvpindex_elo%  &7|  Rank: &e%pvpindex_rank%
  %pvpindex_in_battle% &8- %pvpindex_queued_mode%
```
