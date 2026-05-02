# Proxy setup (BungeeCord)

PvPIndex supports **BungeeCord** as an alternative to Velocity. The BungeeCord proxy plugin provides the same cross-server battle routing, challenge forwarding, and network coordination as the Velocity plugin.

> **Prefer Velocity?** See [Proxy setup (Velocity)](/server_owner/proxy-setup) for the Velocity walkthrough. For multi-proxy networks spanning several proxies, see [Multi-proxy setup](/server_owner/multi-proxy-setup).

## Requirements

| Requirement | Details |
| --- | --- |
| Java | 21+ |
| BungeeCord | 1.21+ (latest stable build recommended) |
| Paper backends | 1.21.x or 26.1.x |

## Step 1 — install the BungeeCord JAR

1. Download `PvPIndexBattles-bungeecord-<version>.jar` from the release page.
2. Place it in your BungeeCord `plugins/` folder.
3. Start BungeeCord. The plugin generates `plugins/PvPIndex-Proxy/config.properties` with defaults.

## Step 2 — generate and set a shared secret

Open `plugins/PvPIndex-Proxy/config.properties` and set a strong random value for `paper_secret`:

```properties
# Must match proxy.secret in each Paper backend's config.yml
paper_secret=your-shared-secret

# Optional: restrict which backend servers are monitored (empty = all)
monitored_servers=

debug=false
```

## Step 3 — configure each Paper backend

In `plugins/PvPIndexBattles/config.yml` on every Paper server that should participate:

```yaml
proxy:
  enabled: true
  secret: "your-shared-secret"   # must match paper_secret in BungeeCord config
  heartbeat_interval_ticks: 200
```

Restart each Paper backend after saving.

## Step 4 — verify the connection

Run `/pvpindex network` on the BungeeCord proxy. You should see each connected backend listed with its current player count. If a backend is missing:

1. Confirm `proxy.enabled: true` is set on that backend.
2. Confirm `proxy.secret` matches `paper_secret` exactly.
3. Check the backend's log for `[PvPIndexBattles] Proxy channel registered`.
4. Enable `debug=true` in the BungeeCord config to log all plugin messages.

## Commands

| Command | Permission | Description |
| --- | --- | --- |
| `/pvpindex` | `pvpindex.admin` | Show plugin info and version |
| `/pvpindex network` | `pvpindex.admin` | Show connected backend servers and player counts |
| `/pvpindex reload` | `pvpindex.admin` | Reload config (requires proxy restart to take full effect) |

## Differences from Velocity

| Feature | Velocity | BungeeCord |
| --- | --- | --- |
| Config format | `config.properties` | `config.properties` (same keys) |
| Config hot-reload | `/vpvpindex reload` (hot) | `/pvpindex reload` (requires restart) |
| Plugin messaging | Modern API | Legacy `ServerInfo.sendData()` |
| Player-conduit requirement | No | A player must be on the target backend for plugin messages to arrive |
| Modern Forwarding | Built-in | Requires separate setup |
| Multi-proxy Redis networking | ✓ Supported | ✓ Supported |

> **Note:** BungeeCord plugin messaging requires a player to be present on the target backend as a conduit. On a very empty backend with no players, cross-server challenge messages may not arrive until someone joins.

## Multi-proxy setup

BungeeCord proxies can participate in a multi-proxy network alongside Velocity proxies. Add `network.*` keys to `config.properties`:

```properties
network.enabled=true
network.proxy_id=bungee-asia-1
network.region=asia
network.redis.host=redis.internal
network.redis.port=6379
```

See [Multi-proxy setup](/server_owner/multi-proxy-setup) for the full guide including all configuration keys.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Plugin messages not arriving | `paper_secret` mismatch, or no players on target backend |
| Commands not registered | Verify the JAR loaded with `/bungee plugins` |
| Cross-server challenges fail | Enable `debug=true` and check BungeeCord console |
| "Config error" on startup | Malformed `config.properties` — check for missing `=` or stray spaces |
