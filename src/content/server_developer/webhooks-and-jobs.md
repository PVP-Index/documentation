# Webhooks & background jobs

This page explains how PvPIndex processes battles asynchronously after they're submitted, and what surface is (and isn't yet) available to outside integrators.

## The job chain

When a battle transitions to `confirmed`, the API atomically dispatches an ordered chain of three jobs onto the `elo` and `anticheat` queues:

```
ProcessEloBattle
   └─► RunAutoAntiCheat
          └─► RecalculateServerRating
```

| Job | Queue | Purpose |
| --- | --- | --- |
| `ProcessEloBattle` | `elo` | Calculates K=32 trust-weighted ELO delta for each participant, writes new `player_rankings` rows, appends an immutable `ranking_histories` entry per player. |
| `RunAutoAntiCheat` | `anticheat` | Runs the open `AntiCheatScanner` (loss-farming / ELO ping-pong / metadata outliers). May flip the battle to `disputed`. |
| `RecalculateServerRating` | `elo` | Updates the server's overall rating and refreshes its trust score. |

The chain is ordered: anti-cheat only runs after ELO has been applied, so a flag can produce a clean rollback rather than a partial state. If any job throws, later jobs in the chain are skipped and the battle stays in its previous status.

## Idempotency

Every job is keyed by battle UUID + step. Re-running a single job after a crash is safe — duplicate ELO will not be applied. This is what makes the **Rollback** moderation action possible: it dispatches a `RollbackBattleElo` job that is itself idempotent.

## Observability

If you self-host or are running against a tenant with Horizon exposed, the dashboard is at:

```
https://api.pvpindex.com/horizon
```

Access is restricted to admins. You can see job throughput per queue, failed jobs, retry-able jobs, and historic timing.

## Webhooks (planned)

PvPIndex does not currently expose outbound webhooks — third-party services that want near-realtime battle data must poll `GET /battles?since=...`.

A planned webhook surface will let server developers register a URL to receive `battle.confirmed`, `battle.disputed`, and `season.archived` events with HMAC-signed bodies. There is no firm timeline; track [the GitHub roadmap](https://github.com/PVP-Index) for updates.

> TODO: Document the planned `webhook_endpoints` resource and signing scheme once the design is finalised.
