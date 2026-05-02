# Signed payloads

PvPIndex's battle ingestion can verify that a `POST /battles` payload was produced by the holder of the API key - not just sent with one. This is done with a small **HMAC-SHA256** signature over a canonicalised JSON form of the body.

The implementation is open source and auditable: [`pvpindex/battle-validator`](https://github.com/PVP-Index/battle-validator) (MIT). The same code runs in the plugin and in the API.

## When is signing required?

Signing is enforced when the API is configured with `PVPINDEX_REQUIRE_SIGNATURE=true`. If you self-host the API or are running against a hardened tenant, signed payloads will be **required**; unsigned requests are rejected with `401`.

For the public hosted API the default is currently `false`, but signing is **strongly recommended** - it is the only way to defend against a stolen key being used to spoof a battle from a different machine.

## How signing works

1. Take the JSON body you would have sent.
2. Canonicalise it: keys sorted alphabetically at every nesting level, `null` fields removed, no whitespace.
3. HMAC-SHA256 it using the **plaintext bearer token** as the secret.
4. Hex-encode the result and send it as the `X-PvPIndex-Signature` header.

The API recomputes the HMAC using the bearer token already on the request and compares constant-time.

## Replay window

The canonical payload is required to contain a `signed_at` ISO-8601 timestamp. Requests where `|now - signed_at| > 300 s` are rejected as **expired**, even if the signature is otherwise valid. This stops a captured request from being replayed days later.

## Reference implementation

```php
use PvpIndex\BattleValidator\Crypto\BattleSignatureSigner;

$signer = new BattleSignatureSigner();
$body   = ['uuid' => '...', 'signed_at' => gmdate('c'), /* ... */];
$signature = $signer->sign($body, $apiToken);

// Then send:
//   X-PvPIndex-Signature: $signature
//   Authorization:        Bearer $apiToken
```

The signer's source is ~80 lines of Composer-installable code in `apps/battle-validator/src/Crypto/`. It has zero Laravel dependencies - you can call it from any PHP project, or port it to any language with HMAC-SHA256.

## Signing from non-PHP clients

The canonicalisation is the only tricky part. The rules:

- Recursively sort object keys with the standard Unicode codepoint order (UTF-16BE, the JavaScript default).
- Remove `null`-valued fields entirely.
- Encode using UTF-8 with no escaping of non-ASCII codepoints.
- Encode with `,` and `:` as separators (no whitespace).
- Boolean and numeric values use the canonical JSON forms (`true`, `false`, no trailing `.0` for integers).

Run your implementation against the test vectors in `apps/battle-validator/tests/Crypto/` to verify byte-for-byte equivalence with the reference signer.

## Errors

| HTTP | Code | Meaning |
| --- | --- | --- |
| 401 | `signature_missing` | Header absent and signing is enforced. |
| 401 | `signature_malformed` | Header is not 64 hex chars. |
| 401 | `signature_expired` | `signed_at` outside the 300 s window. |
| 401 | `signature_mismatch` | HMAC did not match - wrong secret or tampered body. |

> TODO: Add a JavaScript / Kotlin port snippet once those reference clients land.
