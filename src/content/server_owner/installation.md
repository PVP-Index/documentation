# Installation

The PvPIndex plugin runs on **Paper 1.21.3+** (or any fork that implements the Paper API 26.1, including Purpur and Folia). Installation takes about two minutes.

## Prerequisites

- A running Paper-based Minecraft server.
- Java 21 or newer.
- An approved API key (see [Getting an API key](/server_owner/getting-an-api-key)).

## Drop in the JAR

1. Download `PvPIndexBattles-<version>.jar` from your server detail page on pvpindex.com (or the GitHub Releases page).
2. Place it in your server's `plugins/` directory.
3. Restart the server (or use `/reload confirm` if you have to — full restart is safer).

On first start the plugin generates `plugins/PvPIndexBattles/config.yml` with sensible defaults. The server will start with the plugin **disabled for submissions** until you set your API key.

## Verify it loaded

Run `/plugins` in console or in-game (with permission). `PvPIndexBattles` should appear in green. If you see it in red, check the latest logs in `logs/latest.log` for the error and the [Troubleshooting](/server_owner/troubleshooting) page.

## Next step

Continue to [Getting an API key](/server_owner/getting-an-api-key) to start submitting battles.

> TODO: Add screenshots of the `/plugins` output and a sample successful startup log line.
