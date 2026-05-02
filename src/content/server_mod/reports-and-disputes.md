# Reports & disputes

Players can flag a problem in two places: an in-game `/report` after a match, or a **Dispute** button on the battle page on pvpindex.com. Both end up in the same moderation queue.

## The dispute lifecycle

A battle moves through three statuses:

1. **pending** - recorded, not yet confirmed. ELO is not applied.
2. **confirmed** - automatically promoted after a short window if no party objects. ELO is applied.
3. **disputed** - at least one party has objected. ELO change (if any) is paused or rolled back pending a moderator decision.

Disputes can be raised on any battle for as long as it is editable (typically the season it occurred in).

## Filing a report in-game

```
/pvpmod report <player> <reason>
```

Triggers a moderation ticket attached to the player's most recent battle. If `moderation.spectator_on_report: true`, online moderators are also notified to spectate immediately.

## The dispute thread on the website

Each disputed battle has a comment thread visible at:

```
pvpindex.com/battles/<uuid>
```

Both participants and any moderator can post. Comments are public to viewers of that battle page. Use the thread to gather context, ask players to explain, and post your decision.

## Resolving a dispute

On the **/moderation/battles** page (visible to moderators and admins) every disputed battle is listed. For each one you can:

| Action | Effect |
| --- | --- |
| **Approve** | Battle returns to `confirmed`. ELO change applied (or restored). |
| **Reject** | Battle is marked invalid. ELO change rolled back. |
| **Rollback** | Force-reset ELO to the values before this battle, regardless of current state. Use sparingly. |

Every action is recorded in the audit log under `auditable_type=battle, auditable_id=<uuid>`.

## Best practices

- Always read the dispute thread before deciding.
- Watch the replay (in-game `/pvpmod replay <uuid>` or the web player) before deciding.
- Post a one-line public reason for your decision in the dispute thread.
- For unclear cases, prefer **Approve** unless there is concrete evidence - disputed battles with no evidence should resolve in favour of the recorded outcome.

> TODO: Add screenshots of the /moderation/battles dashboard.
