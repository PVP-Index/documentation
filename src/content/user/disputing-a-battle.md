# Disputing a battle

Sometimes a battle's recorded outcome is wrong - your opponent's connection lagged, the server crashed, somebody glitched through a wall. PvPIndex lets you raise a dispute and have a moderator review the replay.

## When to dispute

Good reasons to dispute:

- The recorded winner is wrong (you actually won; the kill credit went to the wrong player).
- A bug or exploit produced the result (you fell through the world; an item duplicated; a hack was used).
- The server crashed mid-battle and you were unfairly marked as a loss.
- You suspect the opponent was cheating in a way the auto-anti-cheat didn't catch.

Not-good reasons:

- "I didn't play well that round." That's just how PvP goes.
- "My internet was bad." Unfortunately yes - disputing a personal connection issue almost always resolves against you.

## How to dispute

1. Open the battle page: `pvpindex.com/battles/<uuid>` (the URL is on your profile under Recent battles).
2. Click **Dispute battle**.
3. Write a clear, concrete reason. Reference the replay timestamp if possible ("at 0:34 the kill credit went to the opponent even though I shot the killing arrow at 0:33").
4. Submit.

The battle's status flips to **disputed** and ELO that was applied is paused (and rolled back if you win the dispute).

## What happens next

- A moderator picks up the dispute from their queue, usually within 24 hours.
- They watch the replay (in-game or on the web player) and read the full thread.
- They reply in the dispute thread with their decision.
- They click **Approve** (your dispute is rejected - the recorded result stands), **Reject** (the battle is invalidated; ELO rolled back), or **Rollback** (forced ELO reset to before the battle).

You'll get a notification on the website when the decision is made.

## During the dispute

- Both players in the battle can post in the thread.
- A moderator can post too.
- Comments are **public** - anyone visiting the battle page can read the conversation. Don't include personal information.

## Disputing on someone else's behalf

You can only dispute battles you fought in. Spectators and friends can't open a dispute, but they can use the regular `/report` flow in-game if they witnessed cheating.

## Time limits

You can dispute a battle for as long as it remains in the **current season** plus a 7-day grace period after season end. Once a season is archived, disputes are no longer possible - the snapshot is final.

> TODO: Document the planned "self-rollback" flow for both players agreeing in the dispute thread to invalidate a no-contest battle without moderator review.
