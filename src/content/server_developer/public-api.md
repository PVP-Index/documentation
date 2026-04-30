# Public API

The PvPIndex API is a JSON-over-HTTPS API. All read endpoints are public — no authentication required. Write endpoints require a Bearer token (see [Authentication](/server_developer/authentication)).

## Base URL

```
https://api.pvpindex.com
```

There is no `/v1/` prefix; the API is versioned in-place. Breaking changes are announced ahead of time and deprecated endpoints continue to function for at least 90 days.

## Response shape

Every successful response is JSON with a single top-level key:

```json
{ "data": ... }
```

Lists are paginated and include `links` and `meta`:

```json
{
  "data": [ ... ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta":  { "current_page": 1, "per_page": 25, "total": 4231 }
}
```

Errors return an HTTP 4xx/5xx with:

```json
{ "message": "Human-readable error", "errors": { "field": ["..."] } }
```

## Public endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/stats/overview` | Platform-wide stats and recent activity |
| GET | `/servers` | List all servers |
| GET | `/game-modes` | List active game modes |
| GET | `/game-modes/{slug}` | Game mode detail + top players |
| GET | `/leaderboards` | Global leaderboard across all modes |
| GET | `/leaderboards/{gameMode}` | Per-game-mode leaderboard |
| GET | `/players` | Player list (paginated) |
| GET | `/players/{identifier}` | Player profile (UUID or username) |
| GET | `/players/{identifier}/rankings` | All game-mode rankings |
| GET | `/players/{identifier}/history` | ELO history over time |
| GET | `/players/{identifier}/season-standings` | Past season results |
| GET | `/seasons` | All seasons |
| GET | `/seasons/{slug}` | Season detail |
| GET | `/seasons/{slug}/leaderboard` | Season final standings |
| GET | `/battles` | Battle list (paginated) |
| GET | `/battles/{uuid}` | Battle detail |
| GET | `/battles/{uuid}/replay` | Replay data |
| GET | `/battles/{uuid}/dispute-comments` | Dispute thread |

`{identifier}` accepts either the player's Minecraft username (case-insensitive) or their UUID.

## Example: top 10 in the global leaderboard

```bash
curl https://api.pvpindex.com/leaderboards | jq '.data[:10]'
```

## CORS

All read endpoints respond with `Access-Control-Allow-Origin: *`. You can call the API directly from any browser without a proxy.

> TODO: Document `?include=` and `?fields=` query params once they are stabilised across all resource controllers.
