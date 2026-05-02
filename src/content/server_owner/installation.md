# Installation

The PvPIndex plugin ships **two JARs**: a Paper backend plugin and an optional Velocity proxy plugin for cross-server features.

## Prerequisites

- A running Paper-based Minecraft server (Paper 1.21.3+, or any fork that implements Paper API 26.1 - Purpur, Folia, etc.).
- Java 21 or newer on the server.
- An approved API key (see [Getting an API key](/server_owner/getting-an-api-key)).

## Drop in the Paper JAR

1. Download `PvPIndexBattles-<version>.jar` from your server detail page on pvpindex.com (or the GitHub Releases page).
2. Place it in your server's `plugins/` directory.
3. Restart the server (or use `/reload confirm` if you must - full restart is safer).

On first start the plugin generates `plugins/PvPIndexBattles/config.yml` with sensible defaults. Submissions are **disabled** until you set your API key.

## Verify it loaded

Run `/plugins` in console or in-game. `PvPIndexBattles` should appear in green. If it is red, check `logs/latest.log` for the error and the [Troubleshooting](/server_owner/troubleshooting) page.

## Optional: Velocity proxy plugin

If you run a Velocity proxy and want cross-server challenges and player transfers, also install the Velocity JAR:

1. Download `PvPIndexBattles-velocity-<version>.jar` from the same release page.
2. Place it in your Velocity proxy's `plugins/` directory.
3. Restart the proxy. A `plugins/PvPIndexBattles/config.toml` is generated with a `secret` field.
4. Copy that `secret` into every backend server's `proxy.secret` in `config.yml`, then set `proxy.enabled: true` on each backend.

See [Proxy setup](/server_owner/proxy-setup) for the full configuration reference.

## Next step

Continue to [Getting an API key](/server_owner/getting-an-api-key) to start submitting battles.
