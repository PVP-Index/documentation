# Getting an API key

Every battle the plugin submits is authenticated with a per-server **API key**. Keys are issued only to servers that have been reviewed by the PvPIndex team - this is what keeps the global leaderboard honest.

## 1. Submit an application

1. Sign in to [pvpindex.com](https://pvpindex.com) (you'll need a website account first - see [Creating an account](/user/creating-an-account)).
2. Visit [pvpindex.com/apply](https://pvpindex.com/apply).
3. Fill in your server name, IP / domain, expected player count, and the game modes you intend to support.
4. Submit. You'll see your application status as **Pending** in your dashboard.

## 2. Wait for review

A PvPIndex moderator will review your application. Most are processed within a few days. You may be asked clarifying questions over email - keep an eye on the inbox you registered with.

The four possible outcomes are:

| Status | Meaning |
| --- | --- |
| **Approved** | You receive an API key by email. Your server is now listed on pvpindex.com. |
| **Rejected** | Your server isn't a fit (e.g. cracked-only, no PvP focus). Reason will be provided. |
| **Suspended** | Previously approved but currently disabled - reach out to support. |
| **Pending** | Still under review. |

## 3. Paste the key into config.yml

Open `plugins/PvPIndexBattles/config.yml` and find the `api.api_key` field:

```yaml
api:
  base_url: "https://api.pvpindex.com"
  api_key: "1|paste-your-real-key-here"
```

Save and restart. The plugin will now authenticate every request with this key.

## 4. Rotating or revoking keys

If your key is leaked, log in to pvpindex.com, open your server's detail page, and click **Rotate API key**. The old key is invalidated immediately and a new one is shown once.

> TODO: Document the planned per-server multi-key flow once the API supports it.
