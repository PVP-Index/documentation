# Stats

## `GET /stats/overview`

Platform-wide counters, recent battles, and top players. Useful for building dashboards or embeds. No authentication required.

```bash
curl https://api.pvpindex.com/stats/overview
```

### Response

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
      { "game_mode": "Crystal PvP",  "battles": 18700 }
    ],
    "recent_battles": [
      {
        "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "game_mode": "Crystal PvP",
        "server": "Hypixel",
        "status": "confirmed",
        "started_at": "2026-05-02T12:30:00.000Z",
        "ended_at": "2026-05-02T12:34:18.000Z",
        "participants": [ { "username": "Technoblade", "result": "winner", "elo_change": 32 } ]
      }
    ],
    "battles_over_time": [
      { "label": "2026-04-02", "value": 287 },
      { "label": "2026-04-03", "value": 301 }
    ]
  }
}
```

### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total_players` | integer | Total registered player profiles |
| `total_battles` | integer | All-time battle count |
| `verified_servers` | integer | Servers with `is_verified = true` |
| `active_game_modes` | integer | Game modes with `is_active = true` |
| `battles_last_24h` | integer | Battles created in the last 24 hours |
| `average_elo` | integer | Mean `current_elo` across all `player_rankings` rows |
| `top_players` | array | Top 5 players by ELO — each entry is a [Leaderboard object](/api_reference/api-leaderboards#leaderboard-object) |
| `active_modes` | array | Battle count per game mode, sorted by activity |
| `recent_battles` | array | 10 most recent battles — each entry is a [Battle object](/api_reference/api-battles#battle-object) |
| `battles_over_time` | array | Daily battle counts for the last 30 days. Each entry: `{ "label": "YYYY-MM-DD", "value": integer }` |
