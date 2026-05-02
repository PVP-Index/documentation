# Permissions

All PvPIndex permissions are declared in `plugin.yml`. Use your server's permissions plugin (e.g. LuckPerms) to assign them to groups.

---

## Paper server permissions

| Permission | Default | Description |
| --- | --- | --- |
| `pvpindex.admin` | op | Grants access to all admin subcommands under `/pvpindex`. |
| `pvpindex.reload` | op | Allows reloading plugin configuration via `/pvpindex reload`. |
| `pvpindex.battle.queue` | true | Allows players to use `/battle` to join queues, send challenges, and forfeit. |
| `pvpindex.battle.create` | op | Internal - create a new battle session. |
| `pvpindex.battle.start` | op | Internal - start a pending battle. |
| `pvpindex.battle.cancel` | op | Internal - cancel a battle before it starts. |
| `pvpindex.battle.finish` | op | Internal - finish and submit a battle result. |
| `pvpindex.battle.submit` | op | Internal - submit battle data to the API. |
| `pvpindex.battle.dispute` | op | Internal - flag a battle as disputed. |
| `pvpindex.replay.export` | op | Export a replay file to disk. |
| `pvpindex.mod` | op | Access moderator commands: `/pvpmod watch`, `/pvpmod replay`, `/pvpmod reports`. |
| `pvpindex.mod.report` | true | File player reports via `/pvpmod report`. Granted to all by default so players can report. |
| `pvpindex.mod.ban` | op | Issue and lift local bans via `/pvpmod ban` and `/pvpmod unban`. |
| `pvpindex.mod.ban.federated` | op | Publish bans to the PvPIndex federated network. Requires a verified server with `federated_bans.enabled: true`. |

> **Tip:** Permissions marked `default: true` are active for every player regardless of permissions plugin. Set them to `false` in LuckPerms with `/lp group default permission set pvpindex.battle.queue false` to restrict access (e.g. on private servers).

---

## Recommended group setup

Below is a sensible starting point for a typical public PvP server.

| Group | Permissions to grant |
| --- | --- |
| `default` | `pvpindex.battle.queue`, `pvpindex.mod.report` *(both true by default)* |
| `moderator` | `pvpindex.mod`, `pvpindex.mod.ban` |
| `admin` | `pvpindex.admin`, `pvpindex.reload`, `pvpindex.mod.ban.federated` |

---

## Velocity proxy permissions

The proxy plugin does not expose fine-grained permissions. The `/pvpindex reload` subcommand on the proxy is restricted to operators and console automatically.

| Permission | Default | Description |
| --- | --- | --- |
| *(op check)* | op | Only operators and console can run `/pvpindex reload` on the proxy. All players can use `/pvpindex global` and `/pvpindex where`. |
