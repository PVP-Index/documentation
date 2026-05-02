# Servers

## Server object

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Internal ID |
| `slug` | string | URL-safe identifier |
| `name` | string | Server display name |
| `description` | string\|null | Server description |
| `verified` | boolean | Whether the server has been manually verified |
| `trust_score` | float | 0-100. ELO changes only apply when `trust_score >= 80` and `verified = true`. |
| `rating` | float | Community rating (0-5) |
| `ip_address` | string\|null | Server IP or hostname |
| `website_url` | string\|null | External website |
| `region` | string\|null | Region code (e.g. `"NA"`, `"EU"`) |
| `joined_at` | string | ISO 8601 datetime when the server was first registered |
| `battle_count` | integer | Total battles submitted by this server |
| `unique_players` | integer | Distinct players who have participated in battles on this server |
| `api_access` | string | `"public"` (approved), `"pending"` (under review), or `"private"` |
| `status` | string | `"online"`, `"offline"`, or `"unknown"` — based on heartbeat within the last 120 seconds |
| `player_count` | integer\|null | Current online player count (from heartbeat) |
| `max_player_count` | integer\|null | Server capacity (from heartbeat) |
| `last_seen_at` | string\|null | ISO 8601 datetime of last heartbeat |
| `uptime_percentage` | float\|null | Percentage uptime since first heartbeat. `null` if no uptime data yet. |
| `activity` | array | Historical activity data points |
| `game_modes` | array | List of game mode names active on this server |
| `top_players` | array | Top players by ELO on this server |
| `recent_battles` | array | Most recent battles submitted by this server |
| `can_manage` | boolean | `true` if the authenticated user is an owner/admin of this server (always `false` for unauthenticated requests) |

---

## `GET /servers`

List all registered servers.

```bash
curl https://api.pvpindex.com/servers
```

### Response

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

---

## `GET /servers/{slug}`

Detail for a single server.

```bash
curl https://api.pvpindex.com/servers/hypixel
```

### Response

Single server object wrapped in `data` — shape identical to an entry from `GET /servers`.

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No server with that slug |
