# Players

## Identifier

All player endpoints accept `{identifier}` in three forms:

| Form | Example | Notes |
| --- | --- | --- |
| Minecraft username | `Technoblade` | Case-insensitive. Reflects the most recent name synced from battle submissions. |
| Minecraft UUID | `069a79f4-44e9-4726-a5be-fca90e38aaf5` | Stable across renames — **preferred for permanent links**. |
| Internal ID | `5` | Integer primary key. Avoid exposing in external systems where possible. |

---

## `GET /players`

Paginated list of all registered player profiles.

```bash
curl "https://api.pvpindex.com/players?page=1"
```

### Response

Standard paginated envelope; each item mirrors the [player profile object](#get-playersidentifier).

---

## `GET /players/{identifier}`

Full profile for a single player.

```bash
curl https://api.pvpindex.com/players/Technoblade
curl https://api.pvpindex.com/players/069a79f4-44e9-4726-a5be-fca90e38aaf5
```

### Response

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

### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Internal player profile ID |
| `username` | string | Minecraft username (latest known) |
| `display_name` | string\|null | Website display name if set, otherwise mirrors `username` |
| `avatar_url` | string | Crafthead helm image URL |
| `verified` | boolean | Whether the player has linked a website account via the claim flow |
| `is_banned` | boolean | Whether the player is currently banned from the platform |
| `country` | string | ISO 3166-1 alpha-2 country code, or empty string |
| `region` | string | Region code (e.g. `"NA"`, `"EU"`, `"ASIA"`) |
| `global_rank` | integer | Position on the all-modes global leaderboard. `0` if unranked. |
| `peak_elo` | integer | Highest ELO the player has ever reached across all game modes |
| `wins` | integer | Total wins across all game modes |
| `losses` | integer | Total losses across all game modes |
| `draws` | integer | Total draws across all game modes |

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No player found with that username, UUID, or ID |

---

## `GET /players/{identifier}/rankings`

All per-game-mode ELO rankings for a player.

```bash
curl https://api.pvpindex.com/players/Technoblade/rankings
```

### Response

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

### Fields

| Field | Type | Description |
| --- | --- | --- |
| `game_mode` | string | Game mode name |
| `rank` | integer | Position within this game mode (1-based) |
| `elo` | integer | Current ELO in this mode |
| `peak_elo` | integer | Highest ELO ever reached in this mode |
| `derived_rank` | string | Named tier resolved from `rank_definitions` (e.g. `"Diamond"`, `"Unranked"`) |
| `wins` | integer | |
| `losses` | integer | |
| `draws` | integer | |
| `matches_played` | integer | |
| `win_rate` | float | Percentage, 1 decimal place |

---

## `GET /players/{identifier}/history`

Chronological ELO change log across all game modes. Each entry corresponds to one recorded battle result.

```bash
curl https://api.pvpindex.com/players/Technoblade/history
```

### Response

```json
{
  "data": [
    { "date": "2026-01-15", "elo": 1204, "game_mode": "Vanilla 1.21" },
    { "date": "2026-01-15", "elo": 1236, "game_mode": "Vanilla 1.21" },
    { "date": "2026-01-16", "elo": 1218, "game_mode": "Vanilla 1.21" },
    { "date": "2026-01-17", "elo": 1680, "game_mode": "Crystal PvP" }
  ]
}
```

Results are ordered by `created_at` ascending. Use this to build ELO-over-time charts.

---

## `GET /players/{identifier}/season-standings`

Archived standings for every past season the player participated in, newest season first.

```bash
curl https://api.pvpindex.com/players/Technoblade/season-standings
```

### Response

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

Returns an empty `data` array for players who have not completed any season.
