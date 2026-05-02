# Anti-cheat rules

PvPIndex's anti-cheat is a pure rule engine that runs automatically after every confirmed battle. It is open source — the full implementation lives in [`pvpindex/battle-validator`](https://github.com/PVP-Index/battle-validator) (MIT) so anyone can audit the exact logic. There are currently three rules.

## How it works

After a battle is confirmed the job processor runs `AntiCheatScanner::scan()` on a `BattleSnapshot`. The scanner checks each rule and returns a list of **flags** — one per triggered rule. Flags are stored against the battle and surfaced on the moderator dashboard for manual review. **A flag does not automatically reverse ELO or ban a player.** A moderator must act on it.

## Rule 1 — `loss_farming`

Detects a player deliberately losing fights to inflate an opponent's ELO (boosting).

**Trigger:** The losing participant has had a ELO delta below **−25** in **3 or more** of their last 10 ranked battles.

**What to look for:**

- A player with many recent heavy losses to the same opponent or small group of opponents.
- Check their ELO timeline on their profile — repeated sharp drops in a short window.
- Review the replays. Are the battles unusually short? Is the "loser" barely fighting back?

**Thresholds (source):**

```
HEAVY_LOSS_THRESHOLD       = -25   // delta must be worse than this
HEAVY_LOSS_COUNT_THRESHOLD =  3    // out of last 10 battles
```

## Rule 2 — `elo_ping_pong`

Detects two players repeatedly fighting each other to trade ELO back and forth (collusion / win-trading).

**Trigger:** The same two players appear together in **3 or more** of either player's last 10 battles.

**What to look for:**

- A near-alternating win/loss pattern between the same pair.
- Check both players' recent battle history side by side. A legitimate rivalry might be two matches; three or more in a short window is unusual.

**Thresholds (source):**

```
PING_PONG_SHARED_THRESHOLD = 3   // shared battles in last 10
```

## Rule 3 — `metadata_outlier`

Detects numeric battle metadata (e.g. damage dealt, duration, ping) that is statistically implausible given the player's history. This can indicate fabricated data submitted by a compromised or malicious server.

**Trigger:** A numeric metadata field for the current battle is more than **3×** the median of the player's last **10 battles in the same mode** (minimum 5 samples required before this rule activates).

**What to look for:**

- An extreme outlier value like a 10-second battle with 10,000 damage dealt when the player's median is 800.
- Look at the raw metadata in the battle detail page. Cross-check with the replay.

**Thresholds (source):**

```
METADATA_OUTLIER_FACTOR      = 3   // current value must exceed median × 3
METADATA_OUTLIER_MIN_SAMPLES = 5   // need at least 5 historical samples to trigger
```

## What to do with a flagged battle

1. Open the battle on the moderator dashboard.
2. Review the flag message — it shows which rule triggered and the values that caused it.
3. Watch the replay to get the full picture.
4. Take one of three actions:
   - **Approve** — battle was legitimate; flag is resolved with no ELO change.
   - **Reject** — battle should not have counted; ELO changes are not applied (if not yet applied) or are noted for manual rollback.
   - **Rollback** — ELO changes have already been applied; use the rollback action to reverse them.

See [Reports & disputes](/server_mod/reports-and-disputes) for the full moderation workflow.
