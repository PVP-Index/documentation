# Authentication

Authentication is required for everything except the public read endpoints documented in [API Reference](/api_reference/public-api). PvPIndex uses **Laravel Sanctum** Bearer tokens.

## Token types

There are two flavours of token, both delivered as `Authorization: Bearer <token>`:

| Token | Issued by | Used for |
| --- | --- | --- |
| **User token** | `POST /auth/login` | Acting as a website user - leaving comments, claiming a Minecraft account, accessing the moderator dashboard. |
| **Server token** | API application approval | Submitting battles and confirming/disputing them on behalf of a server. |

A user token cannot submit battles, and a server token cannot post forum comments. The two are isolated by middleware on every route.

## Getting a user token

```bash
curl -X POST https://api.pvpindex.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"..."}'
```

Response:

```json
{
  "user": { "id": 42, "username": "alice", "global_role": "user" },
  "token": "1|eyJ0eXA..."
}
```

Send the token on subsequent requests:

```bash
curl https://api.pvpindex.com/auth/me \
  -H "Authorization: Bearer 1|eyJ0eXA..."
```

Revoke with `POST /auth/logout` (sends `Authorization` header).

## Getting a server token

Server tokens are issued out-of-band. The flow is:

1. Apply at [pvpindex.com/apply](https://pvpindex.com/apply). See [Getting an API key](/server_owner/getting-an-api-key).
2. After approval an API application is created and a token is sent to your email.
3. The token grants the **server** scope: it can call `POST /battles*` for the server it was issued for, and nothing else.

Token format: `1|<base64ish>` or `2|<base64ish>`. The leading `1|` / `2|` is the Sanctum token-id prefix and **must** be sent verbatim.

## Status of an API application

```bash
curl https://api.pvpindex.com/auth/me -H "Authorization: Bearer ..."
```

Look at the `application` field for `pending`, `approved`, `rejected`, or `suspended`.

## Rotating tokens

User tokens rotate on every `POST /auth/login`. Old tokens remain valid until you call `POST /auth/logout` on each one (or until they expire, default 90 days).

Server tokens rotate from your server detail page → **Rotate API key**. The previous token is invalidated immediately.

