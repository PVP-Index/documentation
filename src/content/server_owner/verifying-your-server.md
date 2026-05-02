# Verifying your server

Every server has a **trust score** between 0 and 100. The trust score is multiplied into every ELO change your battles produce - and battles from **unverified servers (`trust_score = 0`) award no ELO at all**. This is what keeps fake servers from inflating the global leaderboard.

## How trust is earned

Trust is awarded by PvPIndex moderators after a manual review. Your trust score is bumped up by:

- Submitting a healthy stream of real battles for at least a few weeks.
- Having moderators or PvPIndex admins join and observe live matches.
- Maintaining low dispute rates (most disputes resolved as approved, not as overturned).
- Configuring `anti_abuse.minimum_battle_duration_seconds` and not disabling it.

Trust can also drop if your server is found running modified clients on the leaderboard, or if dispute outcomes consistently favour the loser.

## Reading your current trust

Open your server's detail page on pvpindex.com. The trust score is shown next to your server name as a coloured pill:

| Range | Pill | Effect |
| --- | --- | --- |
| 0 | red **unverified** | Battles record but produce 0 ELO change |
| 1–40 | amber **probationary** | ELO scaled down - small contributions only |
| 41–80 | green **verified** | Full-trust ELO contributions |
| 81–100 | blue **flagship** | Same ELO weight as verified; eligible for sponsored placements |

## What "0 ELO change" means

Battles from a `trust_score = 0` server are still:

- Recorded in the global battle history.
- Visible to players on their profile pages.
- Eligible for replay and dispute.

They simply do not move anyone's ELO until your server is verified. After verification, **prior battles are not retroactively scored** - the rule is forward-looking only.

## Speeding up verification

The fastest path is to:

1. Run a stable, small set of game modes for two to four weeks.
2. Reach out to the PvPIndex team via your server detail page → **Request review**.
3. Provide a public Discord or in-game time window when a moderator can join and watch.

> TODO: Document the planned auto-trust signals (player overlap, replay quality score, etc.) once they ship.
