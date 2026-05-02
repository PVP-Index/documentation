# Watching live battles

Sometimes a recording isn't enough - you want to watch the fight as it happens. The `/pvpmod watch` command teleports you in as a silent spectator without joining the queue or the battle itself.

## Spectating a player

```
/pvpmod watch <player>
```

You're moved into spectator mode and follow the player around the arena. The other participant cannot see you and your client cannot affect the battle. Leave with `/pvpmod watch exit`.

If the player is **not** currently in a battle, the command tells you so and does nothing.

## Spectating by battle UUID

```
/pvpmod watch <battle-uuid>
```

Useful when responding to a report - paste the battle UUID from the dispute thread to be dropped straight in.

## Auto-spectate on report

In `config.yml`:

```yaml
moderation:
  spectator_on_report: true
```

When `true`, any moderator online at the moment a `/report` is filed receives a chat prompt with a clickable `/pvpmod watch <battle>` link, so reaction time stays under a few seconds.

## What you cannot do as a spectator

- Speak in the players' chat (your messages stay in the moderator chat channel).
- Affect blocks, items, or hits in the arena.
- Be visible to participants. Players on a vanilla client see no entity for you.

## Recording your own observation

Spectator vision is also written to the replay file as a separate "observer track" so the battle's replay later shows what you saw.

> TODO: Add the `/pvpmod overview` command (planned) for a top-down map of every active battle on the server at once.
