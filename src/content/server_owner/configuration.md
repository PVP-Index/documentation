# Configuration

Every setting lives in `plugins/PvPIndexBattles/config.yml`. This page covers the keys you are most likely to change. Defaults are sensible - most owners only set `api.api_key`, `server.id`, and a few `enabled_*` lists.

## API connection

```yaml
api:
  base_url: "https://api.pvpindex.com"
  api_key: "change-me"
  timeout: 10
  retry_attempts: 3
  retry_initial_backoff_seconds: 5
  retry_backoff_multiplier: 3.0
  retry_max_backoff_seconds: 300
  persistent_retry_interval_seconds: 300
  submit_confirmed_only: false
```

- **api_key** - your server's bearer token. See [Getting an API key](/server_owner/getting-an-api-key).
- **timeout** - seconds to wait for any HTTP request before giving up.
- **retry_attempts / retry_*** - exponential backoff for in-memory retries. Defaults: 5 s, 15 s, 45 s.
- **persistent_retry_interval_seconds** - when in-memory retries are exhausted the payload is persisted to `plugins/PvPIndexBattles/failed-submissions/<uuid>.json` and re-sent every N seconds. Set to `0` to disable; admins can also force a retry with `/pvpindex retryfailed`.
- **submit_confirmed_only** - when `true`, the plugin only POSTs battles after they have been internally confirmed (e.g. survived your `anti_abuse.minimum_battle_duration_seconds` window).

## Server identity

```yaml
server:
  id: "default-server"
```

Set this to the slug of your server on pvpindex.com (visible in the URL of your server's detail page). It is recorded with every battle so that historical data survives changes to your machine, IP, or network name.

## Enabled game modes

```yaml
enabled_game_modes:
  - OVERALL
  - SWORD
  - POT
  - NODEBUFF
  - SOUP
  - AXE
  - MACE
  - BOXING
  - SUMO
  - CRYSTAL
  - UHC
  - VANILLA
  - SMP
  - NETHOP
```

Only modes in this list are tracked and visible in the queue GUI. Remove any you don't want to run. See [Game modes](/server_owner/game-modes) for a description of each.

The default config enables all shipped modes. New modes added by PvPIndex only activate when you add the entry here.

## Battle types

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

Practice and tournament battles are recorded but **do not award ELO** by default. Disable any you don't want even captured.

## Replay recording

```yaml
recording:
  detail_level: "HIGH"
  tick_rate: 20
  max_frames: 144000
  compress: true
  keep_event_log: true
  write_local_file: true
```

`tick_rate: 20` matches vanilla and gives the smoothest replays. Drop to `10` if you have many concurrent battles and want to halve recording overhead. `max_frames` caps memory per participant - the default is roughly two hours.

## Auto-submit & anti-abuse

```yaml
auto_submit:
  enabled: true
  delay_seconds: 5

anti_abuse:
  minimum_battle_duration_seconds: 10
  mark_disputed_on_early_disconnect: true
```

Battles shorter than `minimum_battle_duration_seconds` are silently dropped to stop instant-spawn-loss farming. If a player disconnects early, the battle is auto-flagged as **disputed** so a moderator reviews it.

## Arena pre-generation pool

```yaml
arena_pool:
  enabled: true
  warm_size_per_template: 2
  refill_async: true
```

Keeps `warm_size_per_template` ready-to-use arena instances per template so the matchmaking queue can teleport players in instantly. See [Arenas & templates](/server_owner/arenas-and-templates).

## Moderation & federated bans

```yaml
moderation:
  spectator_on_report: true
  ban_screen_message: "&cYou are banned from this server.\n&7Reason: %reason%"
  federated_bans:
    enabled: false
    enforce_inbound: false
    sync_interval_seconds: 300
```

See [Bans & federated bans](/server_mod/bans-and-federated-bans) for what each flag does. Federated bans are **off by default** and the inbound enforcement is opt-in.

## Debug

```yaml
debug: false
```

Set to `true` to log every API request/response, Velocity channel message, GUI event, and challenge lifecycle step. Generates a lot of output - only use while diagnosing a problem.

## Player state

```yaml
player_state:
  include_ender_chest: true
```

When `true`, a player's ender-chest contents are saved before a battle and restored afterwards. Disable only if another plugin manages ender-chest persistence.

## Velocity tracking (replay)

This section controls movement sampling for replay files. It is **not** the cross-server Velocity proxy - see [Proxy setup](/server_owner/proxy-setup) for that.

```yaml
velocity:
  enabled: true
  threshold: 0.1
  tracking_interval_ticks: 2
```

- **threshold** - minimum speed delta (blocks/tick) that gets recorded as a `velocity_change` event. Lower = smoother replays; higher = smaller files.
- **tracking_interval_ticks** - how often velocity is sampled. `1` = every tick; `2` = every other tick. Increase to reduce CPU overhead on busy servers.

## Battle batch scheduler (heartbeat)

```yaml
battle_batch:
  enabled: true
  flush_interval_ticks: 40
  max_batch_size: 20
```

The plugin sends a periodic heartbeat to the API so the backend can detect mid-battle server crashes. `flush_interval_ticks: 40` fires every 2 seconds at 20 TPS. `max_batch_size` caps how many active battles are included per heartbeat.

## Cleanup

```yaml
cleanup:
  interval_ticks: 100
```

How often (in ticks, default 5 seconds) the plugin sweeps for stale arena worlds, orphaned battle sessions, and expired challenge requests. Increase on very small servers to reduce overhead; decrease on high-churn servers if worlds accumulate.

## Cross-server proxy integration

```yaml
proxy:
  enabled: false
  secret: ""
  heartbeat_interval_ticks: 200
```

Enable this only if you are running the **Velocity PvPIndex plugin** on your proxy for cross-server challenges and player transfers. See [Proxy setup](/server_owner/proxy-setup).

- **secret** - must match the `secret` in the Velocity plugin's config.
- **heartbeat_interval_ticks** - how often the Paper backend pings the proxy (default 10 seconds).
