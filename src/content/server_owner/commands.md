# Commands

The plugin adds three commands to Paper servers and one command to the Velocity proxy.

---

## `/pvpindex` - Admin root

General administration and diagnostics. Most subcommands require `pvpindex.admin` (op by default).

| Subcommand | Permission | Description |
| --- | --- | --- |
| `/pvpindex reload` | `pvpindex.reload` | Reload `config.yml`, `gui.yml`, and `templates.yml` without restarting. |
| `/pvpindex verify <code>` | `pvpindex.admin` | Manually verify a player's website claim code in-game. |
| `/pvpindex submissions` | `pvpindex.admin` | List battle submissions currently pending or in-flight to the API. |
| `/pvpindex sync` | `pvpindex.admin` | Force an immediate sync of any un-submitted battles. |
| `/pvpindex retryfailed` | `pvpindex.admin` | Retry all persisted failed submissions from `failed-submissions/`. |

---

## `/battle` - Player queue

The main player-facing command for joining matchmaking and managing challenges. Requires `pvpindex.battle.queue` (granted to all players by default).

| Usage | Description |
| --- | --- |
| `/battle` | Open the 54-slot game mode picker GUI. Click a mode to join its queue. |
| `/battle leave` | Leave the queue or forfeit an active battle. |
| `/battle challenge <player> [mode]` | Send a duel challenge to a specific player. Works cross-server on Velocity networks. |
| `/battle accept <id>` | Accept an incoming challenge by its ID (shown in the chat prompt). |
| `/battle decline <id>` | Decline an incoming challenge. |

---

## `/pvpmod` - Moderator tools

Moderation commands for watching battles, managing replays, filing reports, and issuing bans. Requires `pvpindex.mod` (op by default).

| Usage | Permission | Description |
| --- | --- | --- |
| `/pvpmod watch <player>` | `pvpindex.mod` | Teleport into spectator mode inside a player's active battle. |
| `/pvpmod watch <battle-uuid>` | `pvpindex.mod` | Spectate a specific battle by UUID. |
| `/pvpmod watch exit` | `pvpindex.mod` | Stop spectating and return to your previous location. |
| `/pvpmod replay <battle-uuid>` | `pvpindex.mod` | Play back a finished battle in-game. |
| `/pvpmod replay pause` | `pvpindex.mod` | Pause or resume playback. |
| `/pvpmod replay speed <0.25-4>` | `pvpindex.mod` | Change playback speed. |
| `/pvpmod replay seek <seconds>` | `pvpindex.mod` | Jump to a timestamp in the replay. |
| `/pvpmod replay exit` | `pvpindex.mod` | Stop replay and return to previous location. |
| `/pvpmod report <player> <reason>` | `pvpindex.mod.report` | File a report against a player (attached to their most recent battle). |
| `/pvpmod reports [player]` | `pvpindex.mod` | View all pending reports, or filter by player. |
| `/pvpmod ban <player> <duration> <reason>` | `pvpindex.mod.ban` | Ban a player locally. Duration: `1h`, `7d`, `30d`, `perm`. |
| `/pvpmod ban -federated <player> <duration> <reason>` | `pvpindex.mod.ban.federated` | Ban and publish to the PvPIndex network (requires `federated_bans.enabled: true`). Minimum duration 24 h. |
| `/pvpmod unban <player>` | `pvpindex.mod.ban` | Lift a local ban. |

---

## `/pvpindex` - Velocity proxy

Available on the Velocity proxy when the proxy plugin is installed. See [Proxy setup](/server_owner/proxy-setup).

| Usage | Description |
| --- | --- |
| `/pvpindex` | Show help. |
| `/pvpindex global` | List all active battles across every connected backend server. |
| `/pvpindex where <player>` | Show which backend server a player is currently on. |
| `/pvpindex reload` | Reload the Velocity plugin config (console / op only). |
