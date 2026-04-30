# Joining a battle

This page is about being a **player** on a PvPIndex-enabled server, not running one. If you're configuring matchmaking, see [Battle queue & matchmaking](/server_owner/battle-queue-and-matchmaking).

## The basics

On a PvPIndex server, type:

```
/battle
```

A GUI opens with the active game modes. Click one and you're entered into the matchmaking queue. The plugin pairs you with another player whose ELO is close to yours; once a match is found you're teleported into an arena and the battle starts.

To leave the queue:

```
/battle leave
```

## What happens during a battle

- You're moved to a fresh arena instance — no risk to your survival inventory.
- The kit for the chosen game mode is given to you automatically.
- The battle ends when one side is eliminated, the timer expires, or someone disconnects.

## Disconnects

If you disconnect mid-battle:

- For the **first 30 seconds**, the battle pauses and waits for you to reconnect.
- After 30 s, the battle resolves with you marked as **loss** by forfeit.
- A `disconnect_loss` flag is added to the battle's metadata.

If you believe a disconnect was caused by a server problem (not your internet), you can [dispute the battle](/user/disputing-a-battle).

## Inventory & XP

- All items and XP you carry into `/battle` are stored and given back when you leave the arena.
- Items you collect in the arena (kit items, drops) **do not** transfer back.
- Death in a battle doesn't drop your real inventory anywhere players can pick it up.

## Battle history

Every battle you fight shows up on your profile at:

```
pvpindex.com/players/<your-username>
```

Even if you haven't claimed your account yet — the profile exists, it's just unlinked.

## Replays

Click any battle on your profile to watch the replay. See [your profile](/user/your-profile) for more.

> TODO: Add a section on the planned spectator mode for friends ("watch this fight live from outside the arena").
