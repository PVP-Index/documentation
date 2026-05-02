# Public API overview

The PvPIndex API is a JSON-over-HTTPS API. All read endpoints are public — no authentication required. Write endpoints require a Bearer token (see [Authentication](/server_developer/authentication)).

## Base URL

```
https://api.pvpindex.com
```

There is no `/v1/` prefix; the API is versioned in-place. Breaking changes are announced ahead of time and deprecated endpoints continue to function for at least 90 days.

## Response conventions

Every successful response wraps its payload in a `data` key:

```json
{ "data": { ... } }
```

List responses add Laravel pagination envelopes:

```json
{
  "data": [ ... ],
  "links": {
    "first": "https://api.pvpindex.com/battles?page=1",
    "last":  "https://api.pvpindex.com/battles?page=213",
    "prev":  null,
    "next":  "https://api.pvpindex.com/battles?page=2"
  },
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 4251,
    "last_page": 213
  }
}
```

Errors return an HTTP 4xx/5xx:

```json
{ "message": "The given data was invalid.", "errors": { "field": ["Validation message."] } }
```

## CORS

All read endpoints respond with `Access-Control-Allow-Origin: *`. You can call the API directly from any browser without a proxy.

## Endpoint index

| Method | Path | Page |
| --- | --- | --- |
| GET | `/stats/overview` | [Stats](/api_reference/api-stats) |
| GET | `/game-modes` | [Game modes](/api_reference/api-game-modes) |
| GET | `/game-modes/{slug}` | [Game modes](/api_reference/api-game-modes) |
| GET | `/leaderboards` | [Leaderboards](/api_reference/api-leaderboards) |
| GET | `/leaderboards/{gameMode}` | [Leaderboards](/api_reference/api-leaderboards) |
| GET | `/players` | [Players](/api_reference/api-players) |
| GET | `/players/{identifier}` | [Players](/api_reference/api-players) |
| GET | `/players/{identifier}/rankings` | [Players](/api_reference/api-players) |
| GET | `/players/{identifier}/history` | [Players](/api_reference/api-players) |
| GET | `/players/{identifier}/season-standings` | [Players](/api_reference/api-players) |
| GET | `/seasons` | [Seasons](/api_reference/api-seasons) |
| GET | `/seasons/{slug}` | [Seasons](/api_reference/api-seasons) |
| GET | `/seasons/{slug}/leaderboard` | [Seasons](/api_reference/api-seasons) |
| GET | `/servers` | [Servers](/api_reference/api-servers) |
| GET | `/servers/{slug}` | [Servers](/api_reference/api-servers) |
| GET | `/battles` | [Battles](/api_reference/api-battles) |
| GET | `/battles/{uuid}` | [Battles](/api_reference/api-battles) |
| GET | `/battles/{uuid}/replay` | [Battles](/api_reference/api-battles) |
| GET | `/battles/{uuid}/dispute-comments` | [Battles](/api_reference/api-battles) |

`{identifier}` accepts a Minecraft username, UUID (`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`), or internal numeric ID. UUIDs are preferred — they are stable across renames.


## Base URL

```
https://api.pvpindex.com
```

There is no `/v1/` prefix; the API is versioned in-place. Breaking changes are announced ahead of time and deprecated endpoints continue to function for at least 90 days.

## Response conventions

Every successful response wraps its payload in a `data` key:

```json
{ "data": { ... } }
```

List responses add Laravel pagination envelopes:

```json
{
  "data": [ ... ],
  "links": {
    "first": "https://api.pvpindex.com/battles?page=1",
    "last":  "https://api.pvpindex.com/battles?page=213",
    "prev":  null,
    "next":  "https://api.pvpindex.com/battles?page=2"
  },
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 4251,
    "last_page": 213
  }
}
```

Errors return an HTTP 4xx/5xx:

```json
{ "message": "The given data was invalid.", "errors": { "field": ["Validation message."] } }
```

## CORS

All read endpoints respond with `Access-Control-Allow-Origin: *`. You can call the API directly from any browser without a proxy.

---

## Stats

### `GET /stats/overview`

Platform-wide counters, recent battles, and top players. Used by the website homepage.

```bash
curl https://api.pvpindex.com/stats/overview
```

```json
{
  "data": {
    "total_players": 18342,
    "total_battles": 94561,
    "verified_servers": 27,
    "active_game_modes": 14,
    "battles_last_24h": 312,
    "average_elo": 1084,
    "top_players": [
      {
        "id": 5,
        "rank": 1,
        "player_id": 5,
        "username": "Technoblade",
        "display_name": "Technoblade",
        "avatar_url": "https://crafthead.net/helm/Technoblade/64",
        "game_mode": "Vanilla 1.21",
        "current_elo": 2314,
        "derived_rank": "Grand Master",
        "wins": 412,
        "losses": 38,
        "draws": 2,
        "matches_played": 452,
        "win_rate": 91.2,
        "region": "NA"
      }
    ],
    "active_modes": [
      { "game_mode": "Vanilla 1.21", "battles": 31042 },
      { "game_mode": "Crystal PvP", "battles": 18700 }
    ],
    "recent_battles": [ { "...": "see Battle object below" } ],
    "battles_over_time": [
      { "label": "2026-04-02", "value": 287 },
      { "label": "2026-04-03", "value": 301 }
    ]
  }
}
```

---

## Game modes

### `GET /game-modes`

List all active game modes.

```bash
curl https://api.pvpindex.com/game-modes
```

```json
{
  "data": [
    {
      "id": 1,
      "slug": "vanilla-1-21",
      "name": "Vanilla 1.21",
      "description": null,
      "battle_count": 31042
    },
    {
      "id": 2,
      "slug": "crystal-pvp",
      "name": "Crystal PvP",
      "description": null,
      "battle_count": 18700
    }
  ]
}
```

### `GET /game-modes/{slug}`

Detail for a single game mode, including its top players.

```bash
curl https://api.pvpindex.com/game-modes/vanilla-1-21
```

The response shape mirrors a single entry from `GET /game-modes` with any additional fields populated by the controller.

---

## Leaderboards

### `GET /leaderboards`

Global leaderboard across all game modes. Returns the highest ELO entry per player, paginated.

**Query parameters:**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 25 | Results per page (max 100) |

```bash
curl "https://api.pvpindex.com/leaderboards?per_page=5"
```

```json
{
  "data": [
    {
      "id": 5,
      "rank": 1,
      "player_id": 5,
      "username": "Technoblade",
      "display_name": "Technoblade",
      "avatar_url": "https://crafthead.net/helm/Technoblade/64",
      "game_mode": "Vanilla 1.21",
      "current_elo": 2314,
      "derived_rank": "Grand Master",
      "wins": 412,
      "losses": 38,
      "draws": 2,
      "matches_played": 452,
      "win_rate": 91.2,
      "region": "NA"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": { "current_page": 1, "per_page": 5, "total": 18342, "last_page": 3669 }
}
```

### `GET /leaderboards/{gameMode}`

Leaderboard filtered to a single game mode. `{gameMode}` is a game mode **slug** (e.g. `vanilla-1-21`).

```bash
curl https://api.pvpindex.com/leaderboards/crystal-pvp
```

Response shape is identical to `GET /leaderboards`.

---

## Players

`{identifier}` accepts any of:
- Minecraft **username** (case-insensitive, reflects latest known name)
- Minecraft **UUID** in `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` format (stable across renames - preferred)
- Internal numeric **ID**

### `GET /players`

Paginated list of all registered players.

```bash
curl https://api.pvpindex.com/players
```

Returns a standard paginated envelope; each entry mirrors the `GET /players/{identifier}` shape.

### `GET /players/{identifier}`

Full profile for a single player.

```bash
curl https://api.pvpindex.com/players/Technoblade
curl https://api.pvpindex.com/players/069a79f4-44e9-4726-a5be-fca90e38aaf5
```

```json
{
  "data": {
    "id": 5,
    "username": "Technoblade",
    "display_name": "Technoblade",
    "avatar_url": "https://crafthead.net/helm/Technoblade/64",
    "verified": true,
    "is_banned": false,
    "country": "US",
    "region": "NA",
    "global_rank": 1,
    "peak_elo": 2380,
    "wins": 412,
    "losses": 38,
    "draws": 2
  }
}
```

### `GET /players/{identifier}/rankings`

All per-game-mode ELO rankings for a player.

```bash
curl https://api.pvpindex.com/players/Technoblade/rankings
```

```json
{
  "data": [
    {
      "game_mode": "Vanilla 1.21",
      "rank": 1,
      "elo": 2314,
      "peak_elo": 2380,
      "derived_rank": "Grand Master",
      "wins": 412,
      "losses": 38,
      "draws": 2,
      "matches_played": 452,
      "win_rate": 91.2
    },
    {
      "game_mode": "Crystal PvP",
      "rank": 14,
      "elo": 1640,
      "peak_elo": 1710,
      "derived_rank": "Diamond",
      "wins": 87,
      "losses": 61,
      "draws": 0,
      "matches_played": 148,
      "win_rate": 58.8
    }
  ]
}
```

### `GET /players/{identifier}/history`

Chronological ELO change log across all game modes. Each entry corresponds to one battle result.

```bash
curl https://api.pvpindex.com/players/Technoblade/history
```

```json
{
  "data": [
    { "date": "2026-01-15", "elo": 1204, "game_mode": "Vanilla 1.21" },
    { "date": "2026-01-15", "elo": 1236, "game_mode": "Vanilla 1.21" },
    { "date": "2026-01-16", "elo": 1218, "game_mode": "Vanilla 1.21" }
  ]
}
```

### `GET /players/{identifier}/season-standings`

Archived standings for every past season the player participated in, newest first.

```bash
curl https://api.pvpindex.com/players/Technoblade/season-standings
```

```json
{
  "data": [
    {
      "season_slug": "season-3",
      "season_name": "Season 3",
      "season_number": 3,
      "starts_at": "2026-01-01",
      "ends_at": "2026-03-31",
      "game_mode": "Vanilla 1.21",
      "final_elo": 2314,
      "peak_elo": 2380,
      "final_rank": 1,
      "wins": 412,
      "losses": 38,
      "draws": 2,
      "matches_played": 452
    }
  ]
}
```

---

## Seasons

### `GET /seasons`

All seasons, newest first.

```bash
curl https://api.pvpindex.com/seasons
```

```json
{
  "data": [
    {
      "id": 3,
      "number": 3,
      "name": "Season 3",
      "slug": "season-3",
      "starts_at": "2026-01-01",
      "ends_at": "2026-03-31",
      "is_active": false
    },
    {
      "id": 4,
      "number": 4,
      "name": "Season 4",
      "slug": "season-4",
      "starts_at": "2026-04-01",
      "ends_at": "2026-06-30",
      "is_active": true
    }
  ]
}
```

### `GET /seasons/{slug}`

Details for one season.

```bash
curl https://api.pvpindex.com/seasons/season-4
```

Response shape mirrors a single entry from `GET /seasons`.

### `GET /seasons/{slug}/leaderboard`

Archived final standings for a season. Optionally filter by game mode.

**Query parameters:**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `game_mode` | string | - | Game mode slug to filter by |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 25 | Results per page (max 100) |

```bash
curl "https://api.pvpindex.com/seasons/season-3/leaderboard?game_mode=vanilla-1-21&per_page=3"
```

```json
{
  "data": [
    {
      "rank": 1,
      "player_id": 5,
      "username": "Technoblade",
      "display_name": "Technoblade",
      "avatar_url": "https://crafthead.net/helm/Technoblade/64",
      "game_mode": "Vanilla 1.21",
      "final_elo": 2314,
      "peak_elo": 2380,
      "wins": 412,
      "losses": 38,
      "draws": 2,
      "matches_played": 452,
      "win_rate": 91.2
    }
  ],
  "meta": {
    "season": {
      "id": 3, "number": 3, "name": "Season 3", "slug": "season-3",
      "starts_at": "2026-01-01", "ends_at": "2026-03-31", "is_active": false
    },
    "current_page": 1,
    "per_page": 3,
    "total": 4102
  }
}
```

---

## Servers

### `GET /servers`

List all registered servers.

```bash
curl https://api.pvpindex.com/servers
```

```json
{
  "data": [
    {
      "id": 1,
      "slug": "hypixel",
      "name": "Hypixel",
      "description": "The largest Minecraft server network.",
      "verified": true,
      "trust_score": 95.0,
      "rating": 4.8,
      "ip_address": "mc.hypixel.net",
      "website_url": "https://hypixel.net",
      "region": "NA",
      "joined_at": "2025-06-01T00:00:00.000Z",
      "battle_count": 18200,
      "unique_players": 9400,
      "api_access": "public",
      "status": "online",
      "player_count": 42810,
      "max_player_count": 50000,
      "last_seen_at": "2026-05-02T14:55:00.000Z",
      "uptime_percentage": 99.8,
      "activity": [],
      "game_modes": ["Vanilla 1.21", "Crystal PvP"],
      "top_players": [],
      "recent_battles": [],
      "can_manage": false
    }
  ]
}
```

`api_access` is `"public"` for approved servers, `"pending"` for applications under review, and `"private"` otherwise. `status` is `"online"` if a heartbeat was received in the last 120 seconds, `"offline"` if older, or `"unknown"` if the server has never pinged.

### `GET /servers/{slug}`

Detail for a single server.

```bash
curl https://api.pvpindex.com/servers/hypixel
```

Response shape mirrors a single entry from `GET /servers`.

---

## Battles

### `GET /battles`

Paginated battle list, newest first.

**Query parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `status` | string | Filter by status: `pending`, `confirmed`, `disputed` |
| `game_mode` | string | Filter by game mode slug |
| `server` | string | Partial name match against server name |
| `region` | string | Filter by server region |
| `per_page` | integer | Results per page (default 20) |

```bash
curl "https://api.pvpindex.com/battles?status=confirmed&game_mode=crystal-pvp&per_page=2"
```

```json
{
  "data": [
    {
      "id": 9812,
      "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "game_mode": "Crystal PvP",
      "server": "Hypixel",
      "server_slug": "hypixel",
      "server_region": "NA",
      "status": "confirmed",
      "dispute_reason": null,
      "dispute_reported_by": null,
      "replay_url": "https://api.pvpindex.com/battles/a1b2c3d4-e5f6-7890-abcd-ef1234567890/replay",
      "replay_data": null,
      "started_at": "2026-05-02T12:30:00.000Z",
      "ended_at": "2026-05-02T12:34:18.000Z",
      "participants": [
        {
          "player_id": 5,
          "username": "Technoblade",
          "avatar_url": "https://crafthead.net/helm/Technoblade/64",
          "elo_before": 2282,
          "elo_after": 2314,
          "elo_change": 32,
          "result": "winner"
        },
        {
          "player_id": 18,
          "username": "Dream",
          "avatar_url": "https://crafthead.net/helm/Dream/64",
          "elo_before": 2150,
          "elo_after": 2118,
          "elo_change": -32,
          "result": "loser"
        }
      ]
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": { "current_page": 1, "per_page": 2, "total": 18700, "last_page": 9350 }
}
```

`result` is one of `"winner"`, `"loser"`, `"draw"`, or `"surrender"`.

### `GET /battles/{uuid}`

Full detail for a single battle, identified by UUID.

```bash
curl https://api.pvpindex.com/battles/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

Response shape mirrors a single entry from `GET /battles`. The `participants` array is always included.

### `GET /battles/{uuid}/replay`

Raw replay payload for playback. `replay_data` is a JSON blob recorded by the plugin; `replay_url` is a convenience permalink.

```bash
curl https://api.pvpindex.com/battles/a1b2c3d4-e5f6-7890-abcd-ef1234567890/replay
```

```json
{
  "replay_url": "https://api.pvpindex.com/battles/a1b2c3d4-.../replay",
  "replay_data": { "version": 1, "ticks": [ { "...": "..." } ] }
}
```

`replay_data` may be `null` for battles recorded by older plugin versions that did not capture packet data.

### `GET /battles/{uuid}/dispute-comments`

Paginated comment thread for a disputed battle.

```bash
curl https://api.pvpindex.com/battles/a1b2c3d4-e5f6-7890-abcd-ef1234567890/dispute-comments
```

```json
{
  "data": [
    {
      "id": 3,
      "author": "Dream",
      "body": "The server lagged out at the start, my inputs weren't registering.",
      "created_at": "2026-05-02T13:10:00.000Z"
    }
  ]
}
```
