# Configuration

Every setting lives in `plugins/PvPIndexBattles/config.yml`. This page covers the keys you are most likely to change. Defaults are sensible — most owners only set `api.api_key`, `server.id`, and a few `enabled_*` lists.

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

- **api_key** — your server's bearer token. See [Getting an API key](/server_owner/getting-an-api-key).
- **timeout** — seconds to wait for any HTTP request before giving up.
- **retry_attempts / retry_*** — exponential backoff for in-memory retries. Defaults: 5 s, 15 s, 45 s.
- **persistent_retry_interval_seconds** — when in-memory retries are exhausted the payload is persisted to `plugins/PvPIndexBattles/failed-submissions/<uuid>.json` and re-sent every N seconds. Set to `0` to disable; admins can also force a retry with `/pvpindex retryfailed`.
- **submit_confirmed_only** — when `true`, the plugin only POSTs battles after they have been internally confirmed (e.g. survived your `anti_abuse.minimum_battle_duration_seconds` window).

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
  - VANILLA
  - UHC
  - CRYSTAL
  - NODEBUFF
```

Only modes in this list are tracked. Remove any you don't run — disabling a mode prevents the plugin from accepting battles that would not be eligible for ELO anyway.

The full set of supported modes is in `enabled_game_modes` of the default config. New modes are rolled out by PvPIndex; you only need to add the entry here to opt in.

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

`tick_rate: 20` matches vanilla and gives the smoothest replays. Drop to `10` if you have many concurrent battles and want to halve recording overhead. `max_frames` caps memory per participant — the default is roughly two hours.

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

Set to `true` to log every API request/response and every captured replay frame. Generates a lot of output — only use while diagnosing a problem.

> TODO: Document the new `velocity` and heartbeat sections once their fields stabilise.
