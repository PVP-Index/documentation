# Multi-proxy setup

This guide covers running PvPIndex across **multiple Velocity and/or BungeeCord proxy instances** so the entire network behaves as a single connected system. When multi-proxy is active, players on any proxy can challenge each other, see a unified player list, and battle on a shared arena backend.

> **Prerequisites:** Have at least one proxy already working. See [Proxy setup (Velocity)](/server_owner/proxy-setup) or [Proxy setup (BungeeCord)](/server_owner/proxy-setup-bungeecord) first.

## How it works

All proxies connect to a shared **Redis** instance and communicate via Pub/Sub. Player locations, battle states, and cross-proxy challenges are synchronised in real time:

```
          [Redis]
          /  |  \
         v   v   v
[Velocity US]  [Velocity EU]  [BungeeCord Asia]
  |  |  |      |  |  |         |  |  |
 s1 s2 s3     s4 s5 s6        s7 s8 s9
```

1. **Proxy registration** — on startup each proxy broadcasts `PROXY_REGISTER` via Redis. Other proxies add it to their registry.
2. **Heartbeats** — every proxy sends periodic heartbeats. If a proxy misses heartbeats for `proxy_timeout` seconds it is marked offline and its players are cleaned up.
3. **Player tracking** — join/leave/switch events are broadcast so every proxy knows every online player's location.
4. **Cross-proxy challenges** — the challenge is routed through Redis to the target proxy, which forwards it to the target player's backend.
5. **Battle events** — start/end events are broadcast so all proxies report accurate global battle counts.

## Requirements

| Requirement | Details |
| --- | --- |
| Redis | 6.x+ on a host reachable by every proxy |
| Proxy plugin | `PvPIndexBattles-velocity-*.jar` **or** `PvPIndexBattles-bungeecord-*.jar` on each proxy |
| Paper plugin | `PvPIndexBattles-*.jar` on every backend server |

## Configuration

Edit `config.properties` on each proxy. The keys `network.proxy_id` and `network.region` **must be unique** per proxy; all other keys can be identical.

### Example — US proxy

```properties
paper_secret=your-shared-secret
debug=false

network.enabled=true
network.proxy_id=us-east-1
network.region=us-east

network.redis.host=redis.internal
network.redis.port=6379
network.redis.password=your-redis-password
network.redis.database=0
network.redis.pool_size=8

network.reconnect_interval=5
network.message_timeout=10
network.heartbeat_interval=15
network.proxy_timeout=45

network.transfer_strategy=shared_server
network.shared_battle_servers=arena-global
```

### Example — EU proxy

```properties
paper_secret=your-shared-secret
debug=false

network.enabled=true
network.proxy_id=eu-west-1
network.region=eu-west

# Redis connection is identical across all proxies
network.redis.host=redis.internal
network.redis.port=6379
network.redis.password=your-redis-password
network.redis.database=0
network.redis.pool_size=8

network.reconnect_interval=5
network.message_timeout=10
network.heartbeat_interval=15
network.proxy_timeout=45

network.transfer_strategy=shared_server
network.shared_battle_servers=arena-global
```

## Full configuration reference

| Key | Default | Description |
| --- | --- | --- |
| `network.enabled` | `false` | Enable the multi-proxy layer. When `false` the plugin behaves as single-proxy. |
| `network.proxy_id` | `proxy-1` | **Unique** identifier for this proxy. Must not be blank. |
| `network.region` | `default` | Region label (informational, used in `/pvpindex network` output). |
| `network.redis.host` | `localhost` | Redis server hostname. |
| `network.redis.port` | `6379` | Redis server port. |
| `network.redis.password` | *(empty)* | Redis password. Leave empty for unauthenticated Redis. |
| `network.redis.database` | `0` | Redis database index. |
| `network.redis.pool_size` | `8` | Jedis connection pool size. |
| `network.reconnect_interval` | `5` | Seconds between reconnection attempts when Redis drops. |
| `network.message_timeout` | `10` | Max message age (seconds) before the message is discarded. |
| `network.heartbeat_interval` | `15` | Seconds between heartbeat broadcasts. |
| `network.proxy_timeout` | `45` | Seconds without heartbeat before a proxy is marked offline. |
| `network.transfer_strategy` | `shared_server` | How cross-proxy battles connect players (see below). |
| `network.shared_battle_servers` | *(empty)* | Comma-separated server names shared by all proxies. |

## Transfer strategies

### `shared_server` (recommended)

Both players are routed to a backend server registered on all proxies (e.g. `arena-global`). This requires a backend that is accessible from every proxy. Works with any Minecraft client version.

### `transfer_packet`

Uses the Minecraft 1.20.5+ transfer packet to redirect one player to the other proxy directly. Requires clients on 1.20.5+ and the target proxy to be directly reachable by the client (public IP or DNS). No shared backend needed.

### `both`

Tries `shared_server` first; falls back to `transfer_packet` if no shared server is available. Useful during migration.

## Migrating from single-proxy

When `network.enabled=false` (the default), the plugin behaves exactly as before. To enable multi-proxy:

1. Deploy and configure Redis.
2. Add `network.*` keys to your existing `config.properties`.
3. Set `network.enabled=true` and a unique `network.proxy_id`.
4. Restart the proxy.
5. Repeat for every additional proxy.

No existing data is altered and the change is reversible by setting `network.enabled=false`.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| "Failed to initialize network layer" | Redis is unreachable or the password is wrong |
| Proxy shows as offline after startup | `heartbeat_interval` too long, or Redis latency |
| Cross-proxy challenges silently fail | Redis is down or the target proxy is offline |
| "Config error: proxy_id must not be blank" | `network.proxy_id` is missing from `config.properties` |

Enable `debug=true` on any proxy to see detailed message routing logs.
