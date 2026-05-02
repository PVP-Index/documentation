# Game modes

## Game mode object

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Internal ID |
| `slug` | string | URL-safe identifier used in all endpoints |
| `name` | string | Human-readable display name |
| `description` | string\|null | Optional description |
| `battle_count` | integer | Total battles recorded in this mode |

---

## `GET /game-modes`

List all active game modes.

```bash
curl https://api.pvpindex.com/game-modes
```

### Response

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
    },
    {
      "id": 3,
      "slug": "sword-1-9",
      "name": "Sword 1.9",
      "description": null,
      "battle_count": 9841
    }
  ]
}
```

---

## `GET /game-modes/{slug}`

Details for a single game mode.

```bash
curl https://api.pvpindex.com/game-modes/vanilla-1-21
```

### Response

Single game mode object wrapped in `data`:

```json
{
  "data": {
    "id": 1,
    "slug": "vanilla-1-21",
    "name": "Vanilla 1.21",
    "description": null,
    "battle_count": 31042
  }
}
```

### Errors

| Status | Meaning |
| --- | --- |
| `404 Not Found` | No game mode with that slug exists, or the mode is inactive |
