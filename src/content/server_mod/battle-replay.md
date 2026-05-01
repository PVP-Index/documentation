# Battle replay

Every battle the plugin records is replayable — both inside Minecraft and on pvpindex.com. As a moderator you can use replays to verify suspicious wins, settle disputes, and review reports.

## In-game playback

```
/pvpmod replay <battle-uuid>
```

You're put into spectator mode and the recorded events play back in real time inside an isolated arena instance. Controls:

| Key / command | Action |
| --- | --- |
| `/pvpmod replay pause` | Pause / resume |
| `/pvpmod replay speed <0.25-4>` | Change playback speed |
| `/pvpmod replay seek <seconds>` | Jump to a timestamp |
| `/pvpmod replay exit` | Stop and return to your previous location |

## Web playback

Open the battle on pvpindex.com (the URL is `pvpindex.com/battles/<uuid>`) and click **Watch replay**. The web player shows:

- A 2-D top-down view of player positions.
- Hit, kill, and damage events on a timeline.
- ELO change once the battle is confirmed.
- A side panel of inventory snapshots at the start of the match.

## What is recorded

Replays are captured at `recording.tick_rate` Hz (default 20 Hz, vanilla tick rate). Each frame includes player positions, rotations, velocities, current item, and active potion effects. Events captured separately: `damage`, `block_break`, `block_place`, `projectile_launch`, `velocity_change`, `death`, `kill`.

Local replay files live in `plugins/PvPIndexBattles/replays/<uuid>.json` (gzip-compressed when `recording.compress: true`) and are kept until the battle is older than 30 days.

## Replay isn't loading

The most common cause is the file having been pruned. Battles older than 30 days are no longer playable in-game; on the website they remain viewable as long as PvPIndex retained the upload.

If a replay you expect to exist is missing:

1. Check `plugins/PvPIndexBattles/replays/` for the `<uuid>.json` file.
2. Check `logs/latest.log` around the battle's end timestamp for `replay save failed` lines.
3. Confirm `recording.write_local_file: true` in your config.

> TODO: Document the `/pvpmod replay download <uuid>` flow once it ships, for owners who want to archive replays externally.
