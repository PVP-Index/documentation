# Troubleshooting

This page collects the most common problems server owners run into, and what to check.

## Battles aren't appearing on pvpindex.com

The plugin saves a copy of every payload it tries to send. Check, in order:

1. **Is the plugin enabled?** Run `/plugins` in console — `PvPIndexBattles` should be green.
2. **Is your API key correct?** A wrong key produces `401 Unauthorized` lines in `logs/latest.log`.
3. **Is your server verified?** An `is_verified=false` server still records battles but they show no ELO change. See [Verifying your server](/server_owner/verifying-your-server).
4. **Are battles being filtered?** Battles shorter than `anti_abuse.minimum_battle_duration_seconds` are silently dropped. Check the duration of the battles you expect to see.

## Failed submissions

When the API is unreachable or returns a 5xx, the plugin retries in memory according to:

```yaml
api:
  retry_attempts: 3
  retry_initial_backoff_seconds: 5
  retry_backoff_multiplier: 3.0
  retry_max_backoff_seconds: 300
```

If all in-memory retries fail, the payload is persisted to `plugins/PvPIndexBattles/failed-submissions/<uuid>.json`. A background task re-tries every `persistent_retry_interval_seconds` (default 300). To force an immediate retry pass:

```
/pvpindex retryfailed
```

Files that succeed are deleted; failures stay on disk so nothing is ever lost without your knowledge.

## "Signature mismatch" or 401 with a valid key

If you have enabled HMAC payload signing on the API side (see [Signed payloads](/server_developer/signed-payloads)), the plugin must use the **plaintext bearer token** as the signing secret. Rotating the key on the website without restarting the plugin will produce a `401 signature mismatch` until the plugin reloads.

Restart the server or run `/pvpindex reload` after every key rotation.

## Replay files are too large

Reduce `recording.tick_rate` from `20` to `10`, or lower `recording.max_frames`. Set `recording.compress: true` (default) to gzip frames before persisting.

## Plugin won't load at all

Check `logs/latest.log` for a red stack trace. The most common causes:

- **Wrong server flavour** — the plugin requires Paper API 26.1+. Spigot is not supported.
- **Java version** — Paper 1.21+ requires Java 21. `java -version` should print `21.x`.
- **Conflicting world-edit / region plugins** — these can intercept the world clone calls used by the arena pool. Disable suspect plugins one at a time.

## Where to ask for help

- Open an issue on the [PvPIndex GitHub](https://github.com/PVP-Index).
- Email support@pvpindex.com with `logs/latest.log` and your server slug.

> TODO: Add a "diagnostic dump" command (`/pvpindex diag`) and document it here.
