# Submitting battles

The plugin does this for you, but if you are integrating from your own software the contract is the same. This page documents the exact payload shape and the status lifecycle.

## Endpoint

```
POST /battles
Authorization: Bearer <server-token>
Content-Type:  application/json
X-PvPIndex-Signature: <hex>   (required if signing is enforced)
```

See [Signed payloads](/server_developer/signed-payloads) for the signature header.

## Minimum payload

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "game_mode": "VANILLA",
  "battle_type": "DUEL",
  "started_at": "2026-04-30T12:34:56Z",
  "ended_at":   "2026-04-30T12:35:42Z",
  "participants": [
    { "uuid": "f4e2...", "username": "alice", "result": "win"  },
    { "uuid": "9b71...", "username": "bob",   "result": "loss" }
  ]
}
```

Required fields:

| Field | Type | Notes |
| --- | --- | --- |
| `uuid` | string | Battle UUID, generated client-side. Must be unique. |
| `game_mode` | string | Slug of an enabled game mode. See `GET /game-modes`. |
| `battle_type` | string | One of `DUEL`, `TEAM_BATTLE`, `FREE_FOR_ALL`, `RANKED_ARENA`, `PRACTICE_BATTLE`, `TOURNAMENT_MATCH`, `CLAN_GUILD_BATTLE`. |
| `started_at` / `ended_at` | ISO-8601 UTC | `ended_at` must be ≥ `started_at`. |
| `participants` | array | At least 2 entries. Each needs `uuid`, `username`, `result`. |

Optional fields include `metadata` (free-form JSON), `team` (per participant for team battles), and `replay_url` (a pre-uploaded replay). See `apps/api/app/Http/Requests/StoreBattleRequest.php` in the open API repo for the canonical schema.

## Response

```json
{ "data": { "uuid": "550e...", "status": "pending", "submitted_at": "..." } }
```

Status `pending` means the battle is recorded but ELO has not yet been applied.

## The status lifecycle

```
pending  ──confirm──▶  confirmed  ──dispute──▶  disputed
   │                       ▲                        │
   └────dispute────────────┘                        │
                            ◀────moderator approve──┘
```

| From | To | Trigger |
| --- | --- | --- |
| pending | confirmed | `POST /battles/{uuid}/confirm` (auto-fired by the plugin after `auto_submit.delay_seconds`) |
| pending or confirmed | disputed | `POST /battles/{uuid}/dispute` from a participant or moderator |
| disputed | confirmed | Moderator clicks **Approve** on /moderation/battles |
| disputed | (terminal) | Moderator clicks **Reject** - ELO rolled back, battle stays as a record |

When a battle becomes `confirmed`, the API dispatches a job chain:

1. `ProcessEloBattle` - applies the ELO delta and writes a `RankingHistory` row.
2. `RunAutoAntiCheat` - flags suspicious patterns; may transition the battle to `disputed`.
3. `RecalculateServerRating` - updates the server's `rating` and `trust_score`.

## Confirming a battle

```bash
curl -X POST https://api.pvpindex.com/battles/<uuid>/confirm \
  -H "Authorization: Bearer <server-token>"
```

Idempotent - calling it again on a confirmed battle is a no-op.

## Disputing a battle

```bash
curl -X POST https://api.pvpindex.com/battles/<uuid>/dispute \
  -H "Authorization: Bearer <server-or-user-token>" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Opponent disconnected at 0:14"}'
```

> TODO: Document the planned `PATCH /battles/{uuid}` for late metadata corrections.
