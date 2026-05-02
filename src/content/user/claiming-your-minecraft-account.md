# Claiming your Minecraft account

Anyone who has ever fought a battle on a verified PvPIndex server already has a **player profile** on the website - even if they've never registered. Claiming the profile links it to your website account so you can edit it, choose what's public, and see private stats.

## Why claim?

- Your battles, ELO history, and season standings collect on a single linked profile.
- A **Claimed** badge appears on your profile so other players know it's really you.
- You unlock the **Profile settings** page (bio, social links, profile-card theme).
- You can opt out of being featured on the public leaderboard if you want.

## Step 1 - start the claim from the website

1. Log into pvpindex.com.
2. Visit `pvpindex.com/players/<your-username>`.
3. Click **This is me - claim profile**.

You'll be shown a one-time **claim code**, e.g. `7H4D-9KPW`. The code is valid for 10 minutes.

## Step 2 - verify in-game

Join any verified PvPIndex server with the same Minecraft account, and run:

```
/pvpindex claim <code>
```

If the code matches and your account on that server has the same UUID as the player profile you're claiming, the link is created instantly.

## What if I'm on a server that isn't verified?

Only verified servers can verify a claim - they're the only ones we trust the username/UUID mapping from. If your favourite server isn't verified yet, ask the owner to apply. See [Getting an API key](/server_owner/getting-an-api-key) (the doc is owner-facing, but the application step is what creates a verified server).

## I claimed the wrong profile

Visit your account settings and click **Unlink Minecraft account**. You can then claim a different profile. We log every claim/unlink in your account audit history to discourage account-takeover attempts.

## Multiple Minecraft accounts

Currently each website account can claim **one** Minecraft profile. If you actively use a main and an alt, claim the main and let the alt remain unlinked.

> TODO: Document the planned alt-account feature where a single website user can claim up to three player profiles.
