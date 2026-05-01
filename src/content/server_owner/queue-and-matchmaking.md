# Queue & matchmaking

This page covers how the queue GUI works, how battles are started, and the configuration knobs available to server owners.

## How the queue works

Players join the queue by running `/battle` (opens the mode-picker GUI) or `/battle challenge <player>` (direct duel). The queue is **per game mode** — players in the Sword queue are only matched against other players in the Sword queue.

When two players are in the same queue:

1. A battle session is created with type `DUEL`.
2. A pre-warmed arena instance for that mode's template is reserved from the pool.
3. Both players' inventories, XP, health, location, and potion effects are saved.
4. Kits are applied to both players.
5. Players are teleported to the arena's spawn points.
6. A countdown begins (configurable in `gui.yml`, default 5 seconds).
7. PvP is enabled and the battle starts.

## GUI

The 54-slot double-chest GUI is opened by `/battle`. It shows every enabled game mode as a clickable icon. The live queue count for each mode is displayed on the item's lore. Clicking an icon joins the queue for that mode.

The bottom row contains quick-action buttons:

| Slot | Button | Action |
| --- | --- | --- |
| 45 | Queue | Browse the mode list |
| 46 | Challenge | Switch to the challenge tab |
| 48 | Active battles | View ongoing battles on this server |
| 53 | Close / Leave | Leave queue or close GUI |

The GUI is configured in `plugins/PvPIndexBattles/gui.yml`. You can change item materials, display names, lore, and slot positions there.

## Challenge duels

```
/battle challenge <player> [mode]
```

Sends a challenge to `<player>`. If `[mode]` is omitted the target picks a mode from the GUI when they accept.

The target receives a clickable chat message:

```
[PlayerA] has challenged you to a duel! [Accept] [Decline]
```

Challenges expire after 30 seconds (configurable in `gui.yml`). Only one pending challenge per pair of players is allowed.

On a Velocity-connected network, `/battle challenge` works across servers — see [Proxy setup](/server_owner/proxy-setup).

## Permissions

| Permission | Default | Purpose |
| --- | --- | --- |
| `pvpindex.battle.queue` | all players | Join the queue, open the GUI, challenge players, leave |

## Enabling and disabling modes

Only modes listed in `enabled_game_modes` appear in the queue GUI. Removing a mode from the list closes its queue immediately; any player already waiting is moved back to the hub world.

## Battle types

The `enabled_battle_types` config controls which formats are available beyond 1v1 duels:

```yaml
enabled_battle_types:
  - DUEL
  - TEAM_BATTLE
  - FREE_FOR_ALL
  - RANKED_ARENA
  - PRACTICE_BATTLE
  - TOURNAMENT_MATCH
  - CLAN_GUILD_BATTLE
```

`PRACTICE_BATTLE` is recorded but awards **no ELO**. `TOURNAMENT_MATCH` and `CLAN_GUILD_BATTLE` require custom integration — they are not started through the normal queue GUI.

## Player state restore

When a battle ends (or is cancelled), every player's original state is restored:

- Inventory and armour
- Ender chest (if `player_state.include_ender_chest: true`)
- Potion effects
- Health, hunger, saturation
- Location (returned to their pre-battle position)
- Game mode
- XP level

State is also written to `plugins/PvPIndexBattles/state/<uuid>.yml` so it survives a server crash — players are restored to their saved state on next login.
