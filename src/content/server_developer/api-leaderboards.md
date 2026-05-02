# Leaderboards

## Leaderboard object

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | `player_rankings` row ID |
| `rank` | integer | Position on this leaderboard (1-based) |
| `player_id` | integer | `player_profiles` row ID |
| `username` | string | Current Minecraft username |
| `display_name` | string\|null | Custom display name set on the website |
| `avatar_url` | string | Crafthead helm URL |
| `game_mode` | string | Game mode name |
| `current_elo` | integer | Current ELO rating |
| `derived_rank` | string | Named tier (e.g. `"Grand Master"`, `"Diamond"`, `"Unranked"`) |
| `wins` | integer | |
| `losses` | integer | |
| `draws` | integer | |
| `matches_played` | integer | Total battles (wins + losses + draws) |
| `win_rate` | float | Percentage, rounded to 1 decimal place |
| `region` | string\|null | Player region code (e.g. `"NA"`, `"EU"`) |

---

## `GET /leaderboards`

Global leaderboard across all game modes. Returns the single highest ELO ranking per player, paginated.

### Query parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 25 | Results per page (max 100) |

```bash
curl "https://api.pvpindex.com/leaderboards?per_page=3"
```

### Response

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
    },
    {
      "id": 18,
      "rank": 2,
      "player_id": 18,
      "username": "Dream",
      "display_name": null,
      "avatar_url": "https://crafthead.net/helm/Dream/64",
      "game_mode": "Crystal PvP",
      "current_elo": 2150,
      "derived_rank": "Grand Master",
      "wins": 304,
      "losses": 72,
      "draws": 5,
      "matches_played": 381,
      "win_rate": 79.8,
      "region": "NA"
    }
  ],
  "links": {
    "first": "https://api.pvpindex.com/leaderboards?page=1",
    "last":  "https://api.pvpindex.com/leaderboards?page=7337",
    "prev":  null,
    "next":  "https://api.pvpindex.com/leaderboards?page=2"
  },
  "meta": {
    "current_page": 1,
    "per_page": 3,
    "total": 18342,
    "last_page": 6115
  }
}
```

---

## `GET /leaderboards/{gameMode}`

Leaderboard restricted to a single game mode. `{gameMode}` is a game mode **slug** (e.g. `crystal-pvp`).

### Query parameters

Same as `GET /leaderboards`: `page`, `per_page`.

```bash
curl "https://api.pvpindex.com/leaderboards/crystal-pvp?per_page=2"
```

### Response

Identical structure to `GET /leaderboards`. All returned entries will have the same `game_mode` value.

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No active game mode with that slug exists |
