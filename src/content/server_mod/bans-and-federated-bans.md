# Bans & federated bans

PvPIndex supports two ban tiers: **local** (your server only) and **federated** (shared with other verified servers in the network). Federation is **opt-in on both ends**.

## Local bans

```
/pvpmod ban <player> <duration> <reason>
```

`<duration>` accepts shorthand like `1h`, `7d`, `perm`. The player is kicked immediately and shown the ban screen text from `config.yml`:

```yaml
moderation:
  ban_screen_message: "&cYou are banned from this server.\n&7Reason: %reason%"
```

`%reason%` is interpolated to the reason you supplied.

Lift a ban early with `/pvpmod unban <player>`.

## Federated bans

Federated bans are PvPIndex's way of letting verified servers share known cheaters without forcing anyone to accept bans they didn't issue.

There are two independent flags:

```yaml
moderation:
  federated_bans:
    enabled: false          # publish: bans I issue with -federated will go to PvPIndex
    enforce_inbound: false  # consume: bans other servers publish will block on mine
    sync_interval_seconds: 300
```

- **enabled** - when `true`, any ban you issue with `/pvpmod ban -federated <player> <duration> <reason>` is published to PvPIndex. The original ban stays local; the federation copy is just a network signal.
- **enforce_inbound** - when `true`, your server pulls the federated ban list every `sync_interval_seconds` and blocks logins from anyone on it. **Off by default** - bans never silently appear on your server unless you explicitly opt in.

## Why federation is opt-in on both sides

Different communities have different tolerance for the same offence. PvPIndex's role is to make ban data discoverable and queryable, not to centrally police every verified server. Each server owner decides what they trust.

## Issuing a federated ban

```
/pvpmod ban -federated <player> perm <reason>
```

The `-federated` flag is required even if you have `enabled: true` - it must be intentional per ban. Federated bans of less than 24 hours are rejected by the API as too low-signal to be worth syncing.

## Auditing federated decisions

Every federated ban your server issues or receives is recorded in:

```
plugins/PvPIndexBattles/federated-bans.log
```

Use this when a player asks why they were blocked from your server by a ban you didn't personally issue.

> TODO: Document the planned per-server allow-list (override federated bans for specific players you trust).
