# Rate limits & errors

The PvPIndex API is rate-limited per IP and per token. Limits are generous for normal use but will block obvious abuse.

## Per-IP limits (read endpoints)

```
60 requests / minute (default)
```

Exceeding the limit returns:

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30

{ "message": "Too many requests." }
```

Always honour `Retry-After` - it is set in seconds.

## Per-token limits (authenticated endpoints)

| Token type | Limit | Notes |
| --- | --- | --- |
| User token | 120 req/min | Resets per rolling minute. |
| Server token | 600 req/min | Higher because servers submit many battles in bursts after restarts. |

## Burst tolerance

The limiter uses a leaky-bucket - short bursts above the steady-state rate are allowed as long as you stay under the per-minute cap. If you regularly need higher throughput (e.g. you operate a network of servers), apply for a quota increase via your server detail page.

## Common error responses

| HTTP | Body field | Cause |
| --- | --- | --- |
| 400 | `validation_failed` | Request body failed schema validation. `errors` field tells you which keys. |
| 401 | various | See [Authentication](/server_developer/authentication) and [Signed payloads](/server_developer/signed-payloads). |
| 403 | `unauthorised` | Token is valid but lacks scope for this endpoint (e.g. user token submitting battles). |
| 404 | `not_found` | Resource does not exist or has been soft-deleted. |
| 409 | `duplicate_uuid` | Submitting a battle with a `uuid` that is already recorded. |
| 422 | `unprocessable` | Business-rule violation - e.g. `started_at > ended_at`. |
| 429 | `too_many_requests` | Rate limit hit. Honour `Retry-After`. |
| 500 | `server_error` | Unhandled error. Safe to retry with exponential backoff. |
| 503 | `maintenance` | Planned downtime. The body's `Retry-After` will be set; usually < 5 min. |

## Recommended client behaviour

1. **Always send `Authorization` over HTTPS.** The API rejects plain HTTP.
2. **Retry only idempotent calls.** All `GET` and `POST /battles/{uuid}/{confirm,dispute}` are idempotent. `POST /battles` is idempotent on `uuid` (you'll get `409 duplicate_uuid` instead of a duplicate row).
3. **Backoff exponentially** on `5xx` and `429`. The plugin uses 5 s, 15 s, 45 s, capped at 5 min.
4. **Log the response body**, not just the status - `errors` is the actionable bit on a 400/422.

> TODO: Publish per-endpoint quotas (some heavy endpoints have stricter limits than the per-token defaults shown above).
