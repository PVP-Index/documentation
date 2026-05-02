# Seasons

## Season object

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Internal ID |
| `number` | integer | Sequential season number (1, 2, 3, ...) |
| `name` | string | Human-readable name (e.g. `"Season 3"`) |
| `slug` | string | URL slug used in all season endpoints (e.g. `"season-3"`) |
| `starts_at` | string | ISO 8601 date (`YYYY-MM-DD`) |
| `ends_at` | string | ISO 8601 date (`YYYY-MM-DD`) |
| `is_active` | boolean | `true` for the currently running season. Exactly one season is active at a time. |

---

## `GET /seasons`

List all seasons, newest first.

```bash
curl https://api.pvpindex.com/seasons
```

### Response

```json
{
  "data": [
    {
      "id": 4,
      "number": 4,
      "name": "Season 4",
      "slug": "season-4",
      "starts_at": "2026-04-01",
      "ends_at": "2026-06-30",
      "is_active": true
    },
    {
      "id": 3,
      "number": 3,
      "name": "Season 3",
      "slug": "season-3",
      "starts_at": "2026-01-01",
      "ends_at": "2026-03-31",
      "is_active": false
    }
  ]
}
```

---

## `GET /seasons/{slug}`

Details for one season.

```bash
curl https://api.pvpindex.com/seasons/season-4
```

### Response

Single season object wrapped in `data` — shape identical to an entry from `GET /seasons`.

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No season with that slug |

---

## `GET /seasons/{slug}/leaderboard`

Archived final standings for a completed season. For the active season, standings reflect current ELO (not yet snapshotted).

### Query parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `game_mode` | string | - | Filter by game mode slug (e.g. `vanilla-1-21`). Omit to get the cross-mode top list. |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 25 | Results per page (max 100) |

```bash
curl "https://api.pvpindex.com/seasons/season-3/leaderboard?game_mode=vanilla-1-21&per_page=3"
```

### Response

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
      "id": 3,
      "number": 3,
      "name": "Season 3",
      "slug": "season-3",
      "starts_at": "2026-01-01",
      "ends_at": "2026-03-31",
      "is_active": false
    },
    "current_page": 1,
    "per_page": 3,
    "total": 4102
  }
}
```

Note: this endpoint uses a custom `meta` object that embeds the full season alongside the pagination fields, instead of the standard `links`/`meta` envelope.

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No season with that slug, or the requested `game_mode` slug does not exist |
