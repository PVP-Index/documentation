# Proxy setup (Velocity)

Running PvPIndex across multiple backend servers requires the **Velocity proxy plugin**. It enables cross-server player challenges and transparent player transfers into battles hosted on a different backend.

Without the proxy plugin, `/battle challenge` still works - but only for players on the same backend server.

## Architecture

```
Player A (server-1) ──/battle challenge PlayerB──▶ Velocity proxy
                                                         │
                                              ──CHALLENGE_FORWARD──▶ server-2 (PlayerB)
                                                         │
                                              ◀──CHALLENGE_ACCEPT── server-2
                                                         │
                                              ──transfer PlayerB──▶ server-1
                                                         │
                                              ──CHALLENGE_CONFIRMED──▶ server-1
                                                    Battle starts
```

## Step 1 - install the Velocity JAR

1. Download `PvPIndexBattles-velocity-<version>.jar` from the release page.
2. Place it in your Velocity proxy's `plugins/` directory.
3. Start Velocity. The plugin generates `plugins/PvPIndexBattles/config.toml` with a randomly-generated `secret`.

```toml
# plugins/PvPIndexBattles/config.toml (Velocity)
secret = "a-random-secret-here"
debug = false
heartbeat_interval_ticks = 200
```

Copy the `secret` value - you'll need it in the next step.

## Step 2 - configure each Paper backend

In `plugins/PvPIndexBattles/config.yml` on every Paper server that should participate:

```yaml
proxy:
  enabled: true
  secret: "a-random-secret-here"   # must match the Velocity config
  heartbeat_interval_ticks: 200
```

Restart each Paper server after saving.

## Step 3 - verify the connection

Run `/vpvpindex status` on the Velocity proxy console. You should see each connected backend listed with its player count. If a backend is missing, check that it registered the `pvpindex:proxy` channel - look for `[PvPIndexBattles] Proxy channel registered` in the backend's log.

Enable `debug: true` on both sides to log every plugin message for troubleshooting.

## Velocity commands

| Command | Permission | Purpose |
| --- | --- | --- |
| `/vpvpindex status` | `pvpindex.proxy.admin` | Show connected backends and active battle count |
| `/vpvpindex list` | `pvpindex.proxy.admin` | List all tracked online players and their backend server |
| `/vpvpindex reload` | `pvpindex.proxy.admin` | Reload the Velocity plugin config |

## Tab-completion across servers

When the Velocity plugin is running, the `/battle challenge <TAB>` completion on any backend shows players from **all** connected servers, not just the local one. The proxy broadcasts an updated player list every `heartbeat_interval_ticks`.

## Player transfer flow

When a cross-server challenge is accepted:

1. Velocity transfers the accepting player to the challenger's backend.
2. The `ChallengeArrivalListener` on the receiving backend waits for the player to fully load before starting the battle - this prevents race conditions where the battle begins before the player's inventory and health are initialised.
3. If the transfer fails or the player disconnects during transfer, the challenge is cancelled and both players are notified.

## Security

All plugin messages on the `pvpindex:proxy` channel are validated against the shared `secret` via HMAC. A misconfigured or missing secret means messages are silently ignored - the channel is not open to arbitrary plugin messages from untrusted backends.
