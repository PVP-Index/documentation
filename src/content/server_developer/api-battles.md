# Battles

## Battle object

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Internal ID |
| `uuid` | string | Stable UUID — use this for all external references |
| `game_mode` | string\|null | Game mode name |
| `server` | string\|null | Server display name |
| `server_slug` | string\|null | Server slug |
| `server_region` | string\|null | Server region code |
| `status` | string | `"pending"`, `"confirmed"`, or `"disputed"` |
| `dispute_reason` | string\|null | Filled when `status = "disputed"` |
| `dispute_reported_by` | string\|null | Username of the reporting user |
| `replay_url` | string\|null | Permalink to the replay endpoint |
| `replay_data` | object\|null | Raw replay payload (only present on detail/replay endpoints, not on lists) |
| `started_at` | string\|null | ISO 8601 datetime |
| `ended_at` | string\|null | ISO 8601 datetime |
| `participants` | array | One entry per player — see [Participant object](#participant-object) |

## Participant object

| Field | Type | Description |
| --- | --- | --- |
| `player_id` | integer | Internal player profile ID |
| `username` | string | Minecraft username |
| `avatar_url` | string | Crafthead helm image URL |
| `elo_before` | integer | ELO before this battle |
| `elo_after` | integer | ELO after this battle |
| `elo_change` | integer | Signed delta (`elo_after - elo_before`). `0` for unverified servers. |
| `result` | string | `"winner"`, `"loser"`, `"draw"`, or `"surrender"` |

---

## `GET /battles`

Paginated battle list, newest first.

### Query parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `status` | string | Filter by `pending`, `confirmed`, or `disputed` |
| `game_mode` | string | Filter by game mode slug |
| `server` | string | Partial name match against server name |
| `region` | string | Filter by server region |
| `per_page` | integer | Results per page (default 20) |
| `page` | integer | Page number (default 1) |

```bash
curl "https://api.pvpindex.com/battles?status=confirmed&game_mode=crystal-pvp&per_page=2"
```

### Response

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
  "links": {
    "first": "https://api.pvpindex.com/battles?page=1",
    "last":  "https://api.pvpindex.com/battles?page=4726",
    "prev":  null,
    "next":  "https://api.pvpindex.com/battles?page=2"
  },
  "meta": { "current_page": 1, "per_page": 2, "total": 94521, "last_page": 47261 }
}
```

> **Note:** `replay_data` is always `null` in list responses to avoid loading large LONGTEXT columns. Use `GET /battles/{uuid}` or `GET /battles/{uuid}/replay` when you need it.

---

## `GET /battles/{uuid}`

Full detail for a single battle identified by UUID.

```bash
curl https://api.pvpindex.com/battles/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### Response

Single battle object wrapped in `data`. The `participants` array is always present and fully populated. `replay_data` may be included if available.

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No battle with that UUID |

---

## `GET /battles/{uuid}/replay`

Raw replay payload for in-game or browser playback.

```bash
curl https://api.pvpindex.com/battles/a1b2c3d4-e5f6-7890-abcd-ef1234567890/replay
```

### Response

```json
{
  "replay_url": "https://api.pvpindex.com/battles/a1b2c3d4-.../replay",
  "replay_data": {
    "version": 1,
    "ticks": [
      {
        "tick": 0,
        "players": [
          { "id": 5,  "x": 128.5, "y": 64.0, "z": -200.3, "yaw": 90.0, "pitch": 0.0, "health": 20 },
          { "id": 18, "x": 131.0, "y": 64.0, "z": -200.1, "yaw": 270.0, "pitch": 0.0, "health": 20 }
        ],
        "events": []
      }
    ]
  }
}
```

`replay_data` is `null` for battles recorded by plugin versions prior to replay capture support.

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No battle with that UUID |

---

## `GET /battles/{uuid}/dispute-comments`

Paginated comment thread attached to a disputed battle.

```bash
curl https://api.pvpindex.com/battles/a1b2c3d4-e5f6-7890-abcd-ef1234567890/dispute-comments
```

### Response

```json
{
  "data": [
    {
      "id": 3,
      "author": "Dream",
      "body": "The server lagged out at the start, my inputs weren't registering.",
      "created_at": "2026-05-02T13:10:00.000Z"
    },
    {
      "id": 4,
      "author": "Technoblade",
      "body": "Server TPS was 18 on both sides, easily verifiable from the replay.",
      "created_at": "2026-05-02T13:22:00.000Z"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": null },
  "meta": { "current_page": 1, "per_page": 25, "total": 2, "last_page": 1 }
}
```

Adding comments requires authentication and a user token — see [Authentication](/server_developer/authentication).
